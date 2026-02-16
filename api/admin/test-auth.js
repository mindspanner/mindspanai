// Vercel Edge Function: /api/admin/test-auth.js
// Test endpoint to check OAuth configuration

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

    return new Response(
        JSON.stringify({
            status: 'OK',
            config: {
                clientIdSet: !!GOOGLE_CLIENT_ID,
                clientIdLength: GOOGLE_CLIENT_ID ? GOOGLE_CLIENT_ID.length : 0,
                clientIdPrefix: GOOGLE_CLIENT_ID ? GOOGLE_CLIENT_ID.substring(0, 20) + '...' : 'NOT SET',
                clientSecretSet: !!GOOGLE_CLIENT_SECRET,
                timestamp: new Date().toISOString()
            }
        }),
        { status: 200, headers }
    );
}
