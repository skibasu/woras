<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');


function jsonResponse(
    bool $success,
    string $message,
    int $statusCode = 200
): never {
    http_response_code($statusCode);

    echo json_encode(
        [
            'success' => $success,
            'message' => $message,
        ],
        JSON_UNESCAPED_UNICODE
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| Request method
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(
        false,
        'Invalid request method.',
        405
    );
}


/*
|--------------------------------------------------------------------------
| Read request body
|--------------------------------------------------------------------------
*/

$rawBody = file_get_contents('php://input');

if ($rawBody === false || trim($rawBody) === '') {
    jsonResponse(
        false,
        'Missing request body.',
        400
    );
}


/*
|--------------------------------------------------------------------------
| Decode JSON
|--------------------------------------------------------------------------
*/

$data = json_decode($rawBody, true);

if (!is_array($data)) {
    jsonResponse(
        false,
        'Invalid JSON payload.',
        400
    );
}


/*
|--------------------------------------------------------------------------
| Read fields
|--------------------------------------------------------------------------
*/

$login = trim((string) ($data['login'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

$attachments = $data['attachments'] ?? [];


/*
|--------------------------------------------------------------------------
| Validate required fields
|--------------------------------------------------------------------------
*/

if ($login === '' || $email === '' || $message === '') {
    jsonResponse(
        false,
        'Missing required fields.',
        400
    );
}


/*
|--------------------------------------------------------------------------
| Validate email
|--------------------------------------------------------------------------
*/

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(
        false,
        'Invalid email.',
        400
    );
}


/*
|--------------------------------------------------------------------------
| Validate attachments
|--------------------------------------------------------------------------
*/

if (!is_array($attachments)) {
    jsonResponse(
        false,
        'Invalid attachments format.',
        400
    );
}

if (count($attachments) > 10) {
    jsonResponse(
        false,
        'Too many attachments.',
        400
    );
}


/*
|--------------------------------------------------------------------------
| Maximum total attachment size
|--------------------------------------------------------------------------
|
| Google Mail allows up to 25 MB of attachments.
| We keep a safety margin and allow 20 MB.
|
*/

$maxAttachmentsSize = 20 * 1024 * 1024;

$totalAttachmentSize = 0;


foreach ($attachments as $attachment) {

    if (!is_array($attachment)) {
        jsonResponse(
            false,
            'Invalid attachment entry.',
            400
        );
    }

    $name = trim((string) ($attachment['name'] ?? ''));
    $dataUrl = (string) ($attachment['data'] ?? '');

    if ($name === '' || $dataUrl === '') {
        jsonResponse(
            false,
            'Invalid attachment data.',
            400
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Only JPEG
    |--------------------------------------------------------------------------
    */

    $prefix = 'data:image/jpeg;base64,';

    if (strpos($dataUrl, $prefix) !== 0) {
        jsonResponse(
            false,
            'Only JPEG images are allowed.',
            400
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Extract Base64
    |--------------------------------------------------------------------------
    */

    $base64 = substr(
        $dataUrl,
        strlen($prefix)
    );

    if ($base64 === false || $base64 === '') {
        jsonResponse(
            false,
            'Invalid image data.',
            400
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Remove whitespace
    |--------------------------------------------------------------------------
    */

    $base64 = preg_replace(
        '/\s+/',
        '',
        $base64
    );

    if ($base64 === null || $base64 === '') {
        jsonResponse(
            false,
            'Invalid image data.',
            400
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Estimate decoded image size
    |--------------------------------------------------------------------------
    */

    $decodedSize = (int) floor(
        strlen($base64) * 3 / 4
    );

    $totalAttachmentSize += $decodedSize;


    if ($totalAttachmentSize > $maxAttachmentsSize) {
        jsonResponse(
            false,
            'Attachments are too large. Please use smaller images.',
            413
        );
    }
}


/*
|--------------------------------------------------------------------------
| Google Apps Script URL
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Replace this with your real /exec URL.
|
*/

$googleAppsScriptUrl =
    'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';


/*
|--------------------------------------------------------------------------
| Prepare payload
|--------------------------------------------------------------------------
*/

$payload = json_encode(
    [
        'login' => $login,
        'email' => $email,
        'message' => $message,
        'attachments' => $attachments,
    ],
    JSON_UNESCAPED_UNICODE
);


if ($payload === false) {
    jsonResponse(
        false,
        'Failed to encode request payload.',
        500
    );
}


/*
|--------------------------------------------------------------------------
| Send request to Google Apps Script
|--------------------------------------------------------------------------
*/

$curl = curl_init(
    $googleAppsScriptUrl
);

if ($curl === false) {
    jsonResponse(
        false,
        'Could not initialize mail service.',
        500
    );
}


curl_setopt_array(
    $curl,
    [
        CURLOPT_POST => true,

        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/json',
        ],

        CURLOPT_POSTFIELDS => $payload,

        CURLOPT_RETURNTRANSFER => true,

        /*
        |--------------------------------------------------------------------------
        | Google Apps Script redirects ContentService response.
        |--------------------------------------------------------------------------
        */
        CURLOPT_FOLLOWLOCATION => true,

        /*
        |--------------------------------------------------------------------------
        | Connection timeout
        |--------------------------------------------------------------------------
        */
        CURLOPT_CONNECTTIMEOUT => 10,

        /*
        |--------------------------------------------------------------------------
        | Maximum request time
        |--------------------------------------------------------------------------
        */
        CURLOPT_TIMEOUT => 45,

        /*
        |--------------------------------------------------------------------------
        | HTTP/1.1
        |--------------------------------------------------------------------------
        */
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

        /*
        |--------------------------------------------------------------------------
        | User agent
        |--------------------------------------------------------------------------
        */
        CURLOPT_USERAGENT => 'AceOfWheels Contact Form/1.0',
    ]
);


$responseBody = curl_exec($curl);

$curlError = curl_error($curl);

$httpCode = (int) curl_getinfo(
    $curl,
    CURLINFO_HTTP_CODE
);

$finalUrl = (string) curl_getinfo(
    $curl,
    CURLINFO_EFFECTIVE_URL
);


curl_close($curl);


/*
|--------------------------------------------------------------------------
| cURL error
|--------------------------------------------------------------------------
*/

if ($responseBody === false) {

    error_log(
        'AceOfWheels contact.php - cURL error: ' .
        $curlError
    );

    error_log(
        'HTTP code: ' .
        $httpCode
    );

    error_log(
        'Final URL: ' .
        $finalUrl
    );

    jsonResponse(
        false,
        'Could not connect to the mail service.',
        502
    );
}


/*
|--------------------------------------------------------------------------
| Empty response
|--------------------------------------------------------------------------
*/

if (trim($responseBody) === '') {

    error_log(
        'AceOfWheels contact.php - empty response'
    );

    error_log(
        'HTTP code: ' .
        $httpCode
    );

    error_log(
        'Final URL: ' .
        $finalUrl
    );

    jsonResponse(
        false,
        'Empty response from mail service.',
        502
    );
}


/*
|--------------------------------------------------------------------------
| Decode Google response
|--------------------------------------------------------------------------
*/

$responseData = json_decode(
    $responseBody,
    true
);


/*
|--------------------------------------------------------------------------
| Invalid JSON response
|--------------------------------------------------------------------------
*/

if (!is_array($responseData)) {

    error_log(
        'AceOfWheels contact.php - invalid provider response'
    );

    error_log(
        'HTTP code: ' .
        $httpCode
    );

    error_log(
        'Final URL: ' .
        $finalUrl
    );

    error_log(
        'Response: ' .
        substr($responseBody, 0, 2000)
    );

    jsonResponse(
        false,
        'Invalid response from mail service.',
        502
    );
}


/*
|--------------------------------------------------------------------------
| Check Google Apps Script response
|--------------------------------------------------------------------------
*/

$providerSuccess =
    ($responseData['success'] ?? false) === true;


if (
    $httpCode < 200 ||
    $httpCode >= 300 ||
    !$providerSuccess
) {

    $providerMessage = '';

    if (
        isset($responseData['message']) &&
        is_string($responseData['message'])
    ) {
        $providerMessage =
            trim($responseData['message']);
    }


    error_log(
        'AceOfWheels contact.php - provider error'
    );

    error_log(
        'HTTP code: ' .
        $httpCode
    );

    error_log(
        'Final URL: ' .
        $finalUrl
    );

    error_log(
        'Provider message: ' .
        $providerMessage
    );


    jsonResponse(
        false,
        $providerMessage !== ''
            ? $providerMessage
            : 'Mail service rejected the request.',
        502
    );
}


/*
|--------------------------------------------------------------------------
| SUCCESS
|--------------------------------------------------------------------------
*/

jsonResponse(
    true,
    'Message sent successfully.',
    200
);