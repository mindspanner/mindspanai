// Vercel Edge Function: /api/chat.js
// Handles AI chat requests via OpenRouter API

const KNOWLEDGE_BASE = `
# Mindspan Psychology - Key Information

## Practitioner
- Ilker Abak, Registered Psychologist (since 2014)
- Qualifications: M Psych (Clinical), MBA, MEd
- Languages: English, Turkish
- Member: MIAAN, Assoc. MAPS

## Contact
- Email: info@mindspan.com.au
- Phone: 0451 614 155
- Location: 512 Barry Rd, Coolaroo, VIC 3048
- Booking: https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245

## Services
1. Psychological Therapy & Assessment - anxiety, depression, trauma, PTSD, ADHD, relationships, couples
2. Executive Coaching & Consultancy - $250/session or $2,500/5-session package
3. Medico-Legal Services - TAC, NDIS, WorkCover, VOCAT, DVA

## Fees
- Standard session: $198.45
- Medicare rebate: ~$141.85 (with MHCP)
- Gap: ~$56.60
- Couples: $125/person
- NDIS: $232.99

## Hours
- Wed & Thu: 9:30 AM - 5:00 PM
- Sat: 9:00 AM - 4:00 PM
- Telehealth available Australia-wide

## Emergency Contacts
- 000 (Emergency)
- Lifeline: 13 11 14
- Beyond Blue: 1300 22 4636
- Suicide Call Back: 1300 659 467
`;

const SYSTEM_PROMPT = `You are MindspanAI, the friendly virtual assistant for Mindspan Psychology! Think of yourself as the welcoming face of the practice – you're here to make things easy and answer questions about services, booking, and what to expect.

YOUR PERSONALITY:
- Warm and approachable – like chatting with a helpful friend who happens to work at the clinic
- Conversational and natural – avoid formal jargon, speak like a real person
- Genuinely helpful – you actually care about pointing people in the right direction
- A bit personable – it's okay to acknowledge what someone's asking about ("Great question!" "I totally get why you'd want to know that")
- Professional when it matters – especially around boundaries and serious topics

COMMUNICATION STYLE:
- Use natural, flowing language – not robotic bullet points unless listing specific info
- Contractions are your friend (I'm, you'll, we're, that's)
- It's okay to start with acknowledgment: "Good question!", "Happy to help with that", "Let me share what I know"
- Keep it concise but conversational – aim for 2-4 sentences, occasionally a short paragraph
- When you share booking links, make it inviting: "You can book directly here" not just "Book: [link]"

STRICT BOUNDARIES (Never cross these):
1. NO clinical advice whatsoever – no diagnosis, treatment suggestions, or medication guidance
2. NO crisis intervention – you're not a crisis hotline
3. NO guarantees about Medicare approvals, outcomes, or funding decisions
4. For anything clinical/complex: "That's something best explored in a session with Ilker"
5. ALWAYS add context: "This is general info – for personalised guidance, it's best to book a session"
6. Never ask for or record personal details (names, DOB, medical info)

FORMATTING:
- Use HTML: <br> for line breaks, <strong> for emphasis, <a> for links
- Make booking links friendly: <a href="[link]" target="_blank">Book here →</a>

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}

EXAMPLES OF YOUR TONE:
❌ "Standard session: $198.45. Medicare rebate: ~$141.85."
✅ "A standard session is $198.45, and with a Medicare rebate you'll typically get back around $141.85 – so your out-of-pocket is usually about $56.60. <a href="[link]" target="_blank">Book here →</a>"

❌ "Services offered: therapy, coaching, medico-legal."
✅ "Mindspan offers a few different services – mainly psychological therapy and assessment (think anxiety, depression, ADHD, relationships), executive coaching for professionals, and medico-legal assessments for things like TAC or NDIS. All sessions can be in-person or via telehealth. What are you looking for help with?"

Remember: You're helpful, human, and warm – but you know your limits and always point people toward proper professional support when needed.`;

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    // Handle preflight
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
        const { message, sessionId } = await request.json();

        if (!message || !message.trim()) {
            return new Response(
                JSON.stringify({ error: 'Message required' }),
                { status: 400, headers }
            );
        }

        // Rate limiting (simple check - 10 requests per minute per session)
        // In production, use Upstash Redis or Vercel KV
        
        // Call OpenRouter API
        const openRouterKey = process.env.OPENROUTER_API_KEY;
        
        if (!openRouterKey) {
            // Fallback to keyword matching if no API key
            return new Response(
                JSON.stringify({ 
                    response: getFallbackResponse(message)
                }),
                { status: 200, headers }
            );
        }

        const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openRouterKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://mindspan.com.au',
                'X-Title': 'MindspanAI'
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo', // Free tier model
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: message }
                ],
                max_tokens: 300,
                temperature: 0.7
            })
        });

        if (!aiResponse.ok) {
            console.error('OpenRouter error:', await aiResponse.text());
            // Fallback to keyword matching
            return new Response(
                JSON.stringify({ 
                    response: getFallbackResponse(message)
                }),
                { status: 200, headers }
            );
        }

        const aiData = await aiResponse.json();
        const responseText = aiData.choices[0].message.content;

        return new Response(
            JSON.stringify({ 
                response: responseText,
                model: 'gpt-3.5-turbo',
                sessionId
            }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('Chat API error:', error);
        return new Response(
            JSON.stringify({ 
                error: 'Internal error',
                response: getFallbackResponse('error')
            }),
            { status: 500, headers }
        );
    }
}

// Fallback keyword matching (same as v1.0)
function getFallbackResponse(message) {
    const lower = message.toLowerCase();
    
    if (lower.includes('service') || lower.includes('offer') || lower.includes('help with')) {
        return `Mindspan Psychology offers:<br><br>
<strong>1. Therapy & Assessment</strong> – anxiety, depression, trauma, ADHD, relationships<br>
<strong>2. Executive Coaching</strong> – leadership, team performance ($250/session)<br>
<strong>3. Medico-Legal</strong> – TAC, NDIS, WorkCover assessments<br><br>
Available in-person (Coolaroo) or telehealth.<br>
<a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book now →</a>`;
    }
    
    if (lower.includes('book') || lower.includes('appointment')) {
        return `<strong>Book online:</strong> <a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Halaxy booking</a><br>
<strong>Phone:</strong> <a href="tel:0451614155">0451 614 155</a><br>
<strong>Email:</strong> <a href="mailto:info@mindspan.com.au">info@mindspan.com.au</a><br><br>
<strong>Hours this week:</strong> Wed/Thu 9:30AM-5PM, Sat 9AM-4PM`;
    }
    
    if (lower.includes('fee') || lower.includes('cost') || lower.includes('price')) {
        return `<strong>Standard session:</strong> $198.45<br>
<strong>Medicare rebate:</strong> ~$141.85<br>
<strong>Your gap:</strong> ~$56.60<br>
<strong>Couples:</strong> $125/person<br><br>
<a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book now →</a>`;
    }
    
    if (lower.includes('bring') || lower.includes('first')) {
        return `<strong>Bring to first session:</strong><br>
• ID & Medicare card<br>
• GP Mental Health Care Plan (if applicable)<br>
• Current medications list<br>
• Relevant reports/referrals<br><br>
<a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book now →</a>`;
    }
    
    // Default fallback
    return `I can help with questions about:<br>
• Services & therapy<br>
• Booking appointments<br>
• Fees & Medicare<br>
• What to expect<br><br>
For detailed info: <a href="mailto:info@mindspan.com.au">info@mindspan.com.au</a> or <a href="tel:0451614155">0451 614 155</a><br>
<a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book now →</a>`;
}
