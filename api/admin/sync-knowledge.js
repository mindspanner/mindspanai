// Vercel Edge Function: /api/admin/sync-knowledge
// Authenticated endpoint for manual knowledge updates
// Admin posts updated data (fees, bio, availability) → stored in Supabase knowledge_cache

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    // Simple bearer token auth (matches existing admin pattern)
    const authHeader = request.headers.get('Authorization');
    const adminToken = process.env.ADMIN_API_TOKEN;
    if (adminToken && authHeader !== `Bearer ${adminToken}`) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401, headers }
        );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return new Response(
            JSON.stringify({ error: 'Supabase not configured' }),
            { status: 500, headers }
        );
    }

    const sbHeaders = {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
    };

    // GET — return current cache entries
    if (request.method === 'GET') {
        try {
            const res = await fetch(
                `${supabaseUrl}/rest/v1/knowledge_cache?is_current=eq.true&select=*&order=topic`,
                { headers: sbHeaders }
            );
            const data = await res.json();
            return new Response(JSON.stringify({ cache: data }), { status: 200, headers });
        } catch (e) {
            return new Response(
                JSON.stringify({ error: e.message }),
                { status: 500, headers }
            );
        }
    }

    // POST — update a topic's knowledge
    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers }
        );
    }

    try {
        const { topic, content, content_text, source_url } = await request.json();

        if (!topic || !content_text) {
            return new Response(
                JSON.stringify({ error: 'Required: topic (string), content_text (string). Optional: content (object), source_url (string).' }),
                { status: 400, headers }
            );
        }

        const validTopics = ['fees', 'bio', 'availability', 'services', 'contact', 'locations', 'qualifications', 'general'];
        if (!validTopics.includes(topic)) {
            return new Response(
                JSON.stringify({ error: `Invalid topic. Must be one of: ${validTopics.join(', ')}` }),
                { status: 400, headers }
            );
        }

        // Mark existing entries for this topic as not current
        await fetch(
            `${supabaseUrl}/rest/v1/knowledge_cache?topic=eq.${topic}&is_current=eq.true`,
            {
                method: 'PATCH',
                headers: { ...sbHeaders, 'Prefer': 'return=minimal' },
                body: JSON.stringify({ is_current: false })
            }
        );

        // Insert new current entry
        const newEntry = {
            topic,
            source: 'halaxy_manual',
            source_url: source_url || null,
            content: content || {},
            content_text,
            content_hash: await hashContent(content_text),
            scraped_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            is_current: true
        };

        const insertRes = await fetch(`${supabaseUrl}/rest/v1/knowledge_cache`, {
            method: 'POST',
            headers: { ...sbHeaders, 'Prefer': 'return=representation' },
            body: JSON.stringify(newEntry)
        });

        if (!insertRes.ok) {
            const errText = await insertRes.text();
            throw new Error(`Supabase insert failed: ${errText}`);
        }

        const inserted = await insertRes.json();

        return new Response(
            JSON.stringify({
                success: true,
                message: `Knowledge for "${topic}" updated successfully`,
                entry: inserted[0] || inserted
            }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('[SyncKnowledge] Error:', error.message);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers }
        );
    }
}

async function hashContent(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
