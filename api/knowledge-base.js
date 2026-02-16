// Vercel Edge Function: /api/knowledge-base.js
// Returns the latest scraped knowledge base data for the AI to use

export const config = {
    runtime: 'edge',
};

// This will be populated by the scraper and stored in KV/Supabase
// For now, we'll use the static knowledge base from chat.js
// In production, this would read from Vercel KV or Supabase

export default async function handler(request) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    if (request.method !== 'GET') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers }
        );
    }

    try {
        // TODO: In production, fetch from Vercel KV or Supabase
        // For now, return placeholder indicating scraper integration
        const knowledgeBase = {
            lastUpdated: new Date().toISOString(),
            sources: [
                'https://www.mindspan.com.au/',
                'https://www.mindspan.com.au/about',
                'https://www.mindspan.com.au/services',
                'https://www.mindspan.com.au/fees',
                'https://www.mindspan.com.au/faq',
                'https://www.mindspan.com.au/contact',
                'https://www.halaxy.com/profile/ilker-abak/psychologist/359455?clinic=359358'
            ],
            status: 'static',
            note: 'Scraper configured - storage pending for dynamic updates'
        };

        return new Response(
            JSON.stringify(knowledgeBase),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('Knowledge base error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to retrieve knowledge base' }),
            { status: 500, headers }
        );
    }
}
