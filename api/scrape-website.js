// Vercel Edge Function: /api/scrape-website.js
// Scrapes mindspan.com.au website for knowledge base updates

export const config = {
    runtime: 'edge',
};

const PAGES_TO_SCRAPE = [
    { url: 'https://www.mindspan.com.au/', name: 'homepage' },
    { url: 'https://www.mindspan.com.au/about', name: 'about' },
    { url: 'https://www.mindspan.com.au/services', name: 'services' },
    { url: 'https://www.mindspan.com.au/fees', name: 'fees' },
    { url: 'https://www.mindspan.com.au/faq', name: 'faq' },
    { url: 'https://www.mindspan.com.au/contact', name: 'contact' }
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

    // Verify admin authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401, headers }
        );
    }

    // TODO: Verify JWT token here
    // const token = authHeader.substring(7);
    // const isValid = await verifyAdminToken(token);
    // if (!isValid) return 401

    try {
        const scrapedData = {};
        const errors = [];

        // Scrape each page
        for (const page of PAGES_TO_SCRAPE) {
            try {
                const response = await fetch(page.url, {
                    headers: {
                        'User-Agent': 'MindspanAI-Scraper/1.0'
                    }
                });

                if (!response.ok) {
                    errors.push({ page: page.name, error: `HTTP ${response.status}` });
                    continue;
                }

                const html = await response.text();

                // Extract text content (simple extraction - can be enhanced)
                const textContent = extractTextFromHTML(html);

                scrapedData[page.name] = {
                    url: page.url,
                    content: textContent,
                    scrapedAt: new Date().toISOString(),
                    contentLength: textContent.length
                };

            } catch (error) {
                errors.push({ page: page.name, error: error.message });
            }
        }

        // Detect changes by comparing with previous scrape
        const changes = await detectChanges(scrapedData);

        // Save to storage (Vercel KV or file system)
        await saveScrapedData(scrapedData);

        return new Response(
            JSON.stringify({
                success: true,
                scrapedPages: Object.keys(scrapedData).length,
                errors: errors.length > 0 ? errors : null,
                changes: changes,
                timestamp: new Date().toISOString()
            }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('Scraping error:', error);
        return new Response(
            JSON.stringify({ error: 'Scraping failed', details: error.message }),
            { status: 500, headers }
        );
    }
}

// Extract text from HTML (basic implementation)
function extractTextFromHTML(html) {
    // Remove scripts, styles, and other non-content tags
    let text = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return text.substring(0, 10000); // Limit to 10k chars per page
}

// Detect changes from previous scrape
async function detectChanges(newData) {
    try {
        // TODO: Load previous scrape data from storage
        // For now, return empty changes
        return [];
    } catch (error) {
        console.error('Change detection error:', error);
        return [];
    }
}

// Save scraped data to storage
async function saveScrapedData(data) {
    try {
        // TODO: Save to Vercel KV or file storage
        // For now, just log
        console.log('Saving scraped data:', Object.keys(data));
    } catch (error) {
        console.error('Save error:', error);
    }
}
