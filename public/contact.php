<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.',
    ]);

    exit;
}

$rawBody = file_get_contents('php://input');

if ($rawBody === false || $rawBody === '') {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Missing request body.',
    ]);

    exit;
}

$data = json_decode($rawBody, true);

if (!is_array($data)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid JSON payload.',
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Form data
|--------------------------------------------------------------------------
*/

$login = trim((string) ($data['login'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

$attachments = $data['attachments'] ?? [];


/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

if ($login === '' || $email === '' || $message === '') {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields.',
    ]);

    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid email.',
    ]);

    exit;
}

if (!is_array($attachments)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid attachments format.',
    ]);

    exit;
}

if (count($attachments) > 10) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Too many attachments.',
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Validate attachments
|--------------------------------------------------------------------------
*/

foreach ($attachments as $attachment) {
    if (!is_array($attachment)) {
        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Invalid attachment entry.',
        ]);

        exit;
    }

    $name = (string) ($attachment['name'] ?? '');
    $dataUrl = (string) ($attachment['data'] ?? '');

    if (
        $name === '' ||
        $dataUrl === '' ||
        strpos($dataUrl, 'data:image/jpeg;base64,') !== 0
    ) {
        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Invalid attachment data.',
        ]);

        exit;
    }
}


/*
|--------------------------------------------------------------------------
| Google Apps Script
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Replace this with your real Apps Script /exec URL.
|
*/

$googleAppsScriptUrl =
    'https://script.google.com/macros/s/AKfycbxxzkK9aTH308809350T71VD5GgsacnDUBPRYK8-izP6KptaMOP036wq9Ziu3dh-LnP-g/exec';


/*
|--------------------------------------------------------------------------
| Prepare payload
|--------------------------------------------------------------------------
*/

$payload = json_encode([
    'login' => $login,
    'email' => $email,
    'message' => $message,
    'attachments' => $attachments,
]);

if ($payload === false) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Failed to encode request payload.',
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Send request to Google Apps Script
|--------------------------------------------------------------------------
*/

$curl = curl_init($googleAppsScriptUrl);

if ($curl === false) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Could not initialize server request.',
    ]);

    exit;
}

curl_setopt_array($curl, [
    CURLOPT_POST => true,

    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
    ],

    CURLOPT_POSTFIELDS => $payload,

    CURLOPT_RETURNTRANSFER => true,

    // Google Apps Script can redirect the response.
    CURLOPT_FOLLOWLOCATION => true,

    CURLOPT_TIMEOUT => 30,
]);

$responseBody = curl_exec($curl);

$curlError = curl_error($curl);

$httpCode = (int) curl_getinfo(
    $curl,
    CURLINFO_HTTP_CODE
);

curl_close($curl);


/*
|--------------------------------------------------------------------------
| cURL error
|--------------------------------------------------------------------------
*/

if ($responseBody === false) {
    http_response_code(502);

    echo json_encode([
        'success' => false,
        'message' => 'Mail provider request failed.',
        'error' => $curlError,
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Parse Google Apps Script response
|--------------------------------------------------------------------------
*/

$responseData = json_decode($responseBody, true);

if (!is_array($responseData)) {
    http_response_code(502);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid response from mail provider.',
        'httpCode' => $httpCode,
        'response' => $responseBody,
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Check Google Apps Script response
|--------------------------------------------------------------------------
*/

$isSuccess =
    $httpCode >= 200 &&
    $httpCode < 300 &&
    (($responseData['success'] ?? false) === true);


if (!$isSuccess) {
    $messageFromProvider = '';

    if (
        isset($responseData['message']) &&
        is_string($responseData['message'])
    ) {
        $messageFromProvider =
            trim($responseData['message']);
    }

    http_response_code(502);

    echo json_encode([
        'success' => false,
        'message' =>
            $messageFromProvider !== ''
                ? $messageFromProvider
                : 'Mail provider rejected the request.',
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Success
|--------------------------------------------------------------------------
*/

http_response_code(200);

echo json_encode([
    'success' => true,
    'message' => 'Message sent',
]);