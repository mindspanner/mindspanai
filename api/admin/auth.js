// Vercel Edge Function: /api/admin/auth.js
// Google OAuth authentication for admin access

export const config = {
    runtime: 'edge',
};

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const ALLOWED_EMAILS = ['mindspan.aus@gmail.com', 'info@mindspan.com.au']; // Specific allowed emails
const ALLOWED_DOMAIN = 'mindspan.com.au'; // Also allow any @mindspan.com.au email
// The client ID used in the login page — fallback if env var not set
const FRONTEND_CLIENT_ID = '307476088864-r8a2i0e125rr5tsp32mn8qkbgnfbuhaj.apps.googleusercontent.com';

export default async function handler(request) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers }
        );
    }

    try {
        const { credential } = await request.json();

        if (!credential) {
            return new Response(
                JSON.stringify({ error: 'Missing credential' }),
                { status: 400, headers }
            );
        }

        // Verify Google ID token
        const payload = await verifyGoogleToken(credential);

        if (!payload) {
            return new Response(
                JSON.stringify({ error: 'Invalid token' }),
                { status: 401, headers }
            );
        }

        // Check email authorization
        const email = payload.email;
        const emailDomain = email.split('@')[1];

        // Allow specific emails OR emails from allowed domain
        const isAuthorized = ALLOWED_EMAILS.includes(email) || emailDomain === ALLOWED_DOMAIN;

        if (!isAuthorized) {
            return new Response(
                JSON.stringify({
                    error: 'Unauthorized email',
                    message: `Only authorized Mindspan emails are allowed`
                }),
                { status: 403, headers }
            );
        }

        // Create session token (simple JWT for now)
        const sessionToken = await createSessionToken({
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        });

        return new Response(
            JSON.stringify({
                success: true,
                token: sessionToken,
                user: {
                    email: payload.email,
                    name: payload.name,
                    picture: payload.picture
                }
            }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('Auth error:', error);
        return new Response(
            JSON.stringify({ error: 'Authentication failed', details: error.message }),
            { status: 500, headers }
        );
    }
}

// Verify Google ID token
async function verifyGoogleToken(token) {
    try {
        const response = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
        );

        if (!response.ok) {
            console.error('Token verification failed:', response.status, await response.text());
            return null;
        }

        const data = await response.json();
        console.log('Token data:', { aud: data.aud, email: data.email, email_verified: data.email_verified });
        console.log('Expected CLIENT_ID:', GOOGLE_CLIENT_ID);

        // Verify audience (client ID) — accept either env var or hardcoded frontend ID
        const expectedClientId = GOOGLE_CLIENT_ID || FRONTEND_CLIENT_ID;
        if (expectedClientId && data.aud !== expectedClientId && data.aud !== FRONTEND_CLIENT_ID) {
            console.error('Invalid audience. Expected:', expectedClientId, 'Got:', data.aud);
            return null;
        }

        // Verify email is verified
        if (!data.email_verified) {
            console.error('Email not verified');
            return null;
        }

        console.log('Token verified successfully for:', data.email);
        return data;

    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

// Create session token (simple implementation - enhance with JWT library in production)
async function createSessionToken(user) {
    const payload = {
        ...user,
        iat: Date.now(),
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };

    // For now, return base64 encoded JSON
    // TODO: Use proper JWT signing with secret key
    return btoa(JSON.stringify(payload));
}
