// Vercel Edge Function: /api/config/orbs.js
// Available orb configurations for MindspanAI

export const config = {
    runtime: 'edge',
};

export const AVAILABLE_ORBS = [
    {
        id: 'gradient-purple',
        name: 'Gradient Purple (Default)',
        type: 'gradient',
        description: 'Purple to blue gradient sphere with 3D effect',
        css: `radial-gradient(circle at 30% 30%,
            rgba(255, 255, 255, 0.8),
            rgba(102, 126, 234, 0.9) 30%,
            rgba(118, 75, 162, 1) 70%,
            rgba(50, 40, 80, 1))`,
        isDefault: true
    },
    {
        id: 'rainbow-mindspan',
        name: 'Rainbow Mindspan Logo',
        type: 'image',
        description: 'Rainbow gradient sphere with white Mindspan brain logo',
        imageUrl: '/assets/orbs/rainbow-mindspan.png',
        isDefault: false
    }
];

export default async function handler(request) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    if (request.method === 'GET') {
        // Return available orbs
        return new Response(
            JSON.stringify({
                orbs: AVAILABLE_ORBS,
                currentOrb: await getCurrentOrb()
            }),
            { status: 200, headers }
        );
    }

    if (request.method === 'POST') {
        // Update selected orb (admin only)
        const { orbId, adminToken } = await request.json();

        // Verify admin token (placeholder - implement proper auth)
        if (!adminToken) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers }
            );
        }

        // Store selected orb ID (in production, use database or KV store)
        // For now, return success
        return new Response(
            JSON.stringify({
                success: true,
                orbId,
                message: 'Orb updated successfully'
            }),
            { status: 200, headers }
        );
    }

    return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers }
    );
}

// Get current selected orb (placeholder - in production, fetch from database)
async function getCurrentOrb() {
    // For now, return default
    return AVAILABLE_ORBS.find(orb => orb.isDefault) || AVAILABLE_ORBS[0];
}
