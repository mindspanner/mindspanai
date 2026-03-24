// Vercel Edge Function: /api/analytics.js
// Logs interactions to Supabase for persistent analytics

export const config = {
    runtime: 'edge',
};

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
        const { timestamp, userMessage, responsePreview, isEmergency, sessionId } = await request.json();

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            // If Supabase not configured, just return success (graceful degradation)
            return new Response(
                JSON.stringify({ success: true, message: 'Analytics not configured' }),
                { status: 200, headers }
            );
        }

        // Insert into Supabase
        const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/interactions`, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                timestamp: timestamp || new Date().toISOString(),
                user_message: userMessage,
                response_preview: responsePreview,
                is_emergency: isEmergency || false,
                session_id: sessionId
            })
        });

        if (!supabaseResponse.ok) {
            console.error('Supabase error:', await supabaseResponse.text());
            return new Response(
                JSON.stringify({ success: false, error: 'Database error' }),
                { status: 500, headers }
            );
        }

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('Analytics error:', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500, headers }
        );
    }
}
