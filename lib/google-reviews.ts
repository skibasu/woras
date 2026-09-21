const PLACE_ID = "ChIJY6Sxx26NdiIRfFgTyZxdcg8"

type GoogleReview = {
    rating: number
    text: {
        text: string
        languageCode: string
    }
    authorAttribution: {
        displayName: string
        uri: string
        photoUri?: string
    }
    publishTime: string
    googleMapsUri: string
}

type GooglePlaceResponse = {
    id: string
    rating?: number
    userRatingCount?: number
    displayName?: {
        text: string
    }
    reviews?: GoogleReview[]
}

export async function getGoogleReviews() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY

    if (!apiKey) {
        throw new Error("GOOGLE_PLACES_API_KEY is not defined")
    }

    const response = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
        headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,reviews",
        },
    })

    if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`)
    }

    const data: GooglePlaceResponse = await response.json()

    return data
}
