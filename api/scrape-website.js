// Vercel Edge Function: /api/scrape-website.js
// Scrapes mindspan.com.au for knowledge base updates
// Runs daily via Vercel cron (vercel.json) and persists to Supabase

export const config = {
    runtime: 'edge',
};

// NOTE: Halaxy profile removed — it's an Angular SPA that returns framework JS, not content.
// Halaxy data is updated manually via /api/admin/sync-knowledge
const PAGES_TO_SCRAPE = [
    { url: 'https://www.mindspan.com.au/', name: 'homepage', topic: 'general', priority: 'high' },
    { url: 'https://www.mindspan.com.au/about', name: 'about', topic: 'bio', priority: 'high' },
    { url: 'https://www.mindspan.com.au/services', name: 'services', topic: 'services', priority: 'high' },
    { url: 'https://www.mindspan.com.au/fees', name: 'fees', topic: 'fees', priority: 'high' },
    { url: 'https://www.mindspan.com.au/faq', name: 'faq', topic: 'general', priority: 'medium' },
    { url: 'https://www.mindspan.com.au/contact', name: 'contact', topic: 'contact', priority: 'medium' },
];

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

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    const sbHeaders = supabaseUrl && supabaseKey ? {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    } : null;

    try {
        const results = [];
        const errors = [];

        for (const page of PAGES_TO_SCRAPE) {
            try {
                const response = await fetch(page.url, {
                    headers: { 'User-Agent': 'MindspanAI-Scraper/1.0' }
                });

                if (!response.ok) {
                    errors.push({ page: page.name, error: `HTTP ${response.status}` });
                    continue;
                }

                const html = await response.text();
                const textContent = extractTextFromHTML(html);

                // Persist to Supabase if configured
                if (sbHeaders) {
                    await persistToCache(supabaseUrl, sbHeaders, page, textContent);
                }

                results.push({
                    page: page.name,
                    topic: page.topic,
                    contentLength: textContent.length,
                    persisted: !!sbHeaders
                });

            } catch (error) {
                errors.push({ page: page.name, error: error.message });
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                scraped: results.length,
                errors: errors.length > 0 ? errors : null,
                persisted: !!sbHeaders,
                timestamp: new Date().toISOString()
            }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('[Scraper] Error:', error);
        return new Response(
            JSON.stringify({ error: 'Scraping failed', details: error.message }),
            { status: 500, headers }
        );
    }
}

async function persistToCache(supabaseUrl, sbHeaders, page, textContent) {
    const contentHash = await hashContent(textContent);

    // Check if content has changed by comparing hashes
    try {
        const existingRes = await fetch(
            `${supabaseUrl}/rest/v1/knowledge_cache?topic=eq.${page.topic}&source=eq.website_scrape&is_current=eq.true&select=content_hash`,
            { headers: sbHeaders }
        );
        const existing = await existingRes.json();

        if (existing?.[0]?.content_hash === contentHash) {
            console.log(`[Scraper] No changes for ${page.name} (${page.topic})`);
            return; // No change — skip update
        }
    } catch (e) {
        // Continue with update if check fails
    }

    // Mark old entries as not current
    await fetch(
        `${supabaseUrl}/rest/v1/knowledge_cache?topic=eq.${page.topic}&source=eq.website_scrape&is_current=eq.true`,
        {
            method: 'PATCH',
            headers: sbHeaders,
            body: JSON.stringify({ is_current: false })
        }
    );

    // Insert new entry
    await fetch(`${supabaseUrl}/rest/v1/knowledge_cache`, {
        method: 'POST',
        headers: sbHeaders,
        body: JSON.stringify({
            topic: page.topic,
            source: 'website_scrape',
            source_url: page.url,
            content: { page_name: page.name, url: page.url },
            content_text: textContent,
            content_hash: contentHash,
            scraped_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            is_current: true
        })
    });

    console.log(`[Scraper] Updated cache for ${page.name} (${page.topic})`);
}

function extractTextFromHTML(html) {
    let text = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return text.substring(0, 10000);
}

async function hashContent(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
