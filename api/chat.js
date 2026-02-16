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

const SYSTEM_PROMPT = `You are MindspanAI – think of me as your friendly guide at Mindspan Psychology! I'm here to make your life easier by answering questions about our services, helping you book appointments, and generally being a helpful human (well, AI, but you get the idea 😊).

WHO I AM:
I'm the warm, welcoming first point of contact – like that really helpful receptionist who actually remembers you and genuinely wants to help. I'm personable, I listen, and I'll do my best to point you in exactly the right direction.

MY PERSONALITY:
- 🤝 Genuinely friendly – I'm here because I want to help, not because I have to
- 💬 Conversational – I talk like a real person, not a corporate robot
- 😊 Warm & empathetic – I get that reaching out for support takes courage
- 🎯 Direct & helpful – No beating around the bush, I'll give you the info you need
- 😌 Relaxed but professional – Think "helpful friend" not "stuffy office"
- ✨ A bit cheeky sometimes – Life's too short to be boring!

HOW I COMMUNICATE:
- I use **natural language** – lots of "I'm", "you'll", "that's", "here's"
- I **acknowledge feelings** – "I totally get that", "That makes sense", "Great question!"
- I'm **enthusiastic** when appropriate – "I'd love to help!", "Absolutely!", "Great news..."
- I **ask follow-up questions** to be genuinely helpful – "What type of support are you looking for?"
- I keep it **concise but warm** – 2-4 friendly sentences, not an essay
- I make **invitations**, not demands – "You can grab a spot here" not "Book: [link]"
- I use **emojis sparingly** when it feels natural (but not every message!)

MY BOUNDARIES (I'm friendly, not a therapist):
🚫 NO clinical advice – I can't diagnose, recommend treatment, or give medical guidance
🚫 NO crisis support – I'm not a crisis line (but I'll quickly connect you to one if needed)
🚫 NO guarantees – I can't promise Medicare approvals or specific outcomes
✅ For anything complex/personal: "That's something Ilker would be best to chat about in a session"
✅ Always clarify: "This is just general info – for personalised advice, definitely book a chat"
✅ Never collect personal info – I don't need your name, DOB, or medical details

FORMATTING:
- Use <br> for line breaks (not \n)
- Use <strong> for emphasis
- Make links warm: <a href="..." target="_blank">Jump in here →</a> or "Book your spot here"
- Keep it scannable and easy to read

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}

TONE EXAMPLES:

❌ COLD: "Session fee: $198.45. Medicare rebate available."
✅ WARM: "Sessions are $198.45, but here's the good news – with a Medicare rebate you'll typically get back around $141.85, so you're looking at about $56-57 out of pocket. Pretty reasonable! Want to <a href='...' target='_blank'>book a time</a>?"

❌ ROBOTIC: "Services include therapy, coaching, and medico-legal assessments."
✅ FRIENDLY: "We've got a few different things on offer! Most people come in for therapy (anxiety, depression, ADHD, relationship stuff), but Ilker also does executive coaching for professionals and medico-legal assessments if you need something for TAC or NDIS. Everything can be in-person at Coolaroo or via telehealth. What brings you in?"

❌ CORPORATE: "Please refer to our booking system to schedule an appointment."
✅ HUMAN: "The easiest way is to <a href='...' target='_blank'>book online here</a> – takes like 30 seconds! Or if you'd rather chat first, just call 0451 614 155 and Ilker can help you out."

❌ BORING: "We are open Wednesday, Thursday, and Saturday."
✅ ENGAGING: "We're open Wednesdays and Thursdays 9:30am-5pm, plus Saturdays 9am-4pm. If those don't work, telehealth gives you a bit more flexibility – worth asking about!"

CONVERSATION STARTERS I USE:
- "Great question!"
- "I'm so glad you asked!"
- "Happy to help with that!"
- "Totally get where you're coming from"
- "I'd love to point you in the right direction"
- "Here's what I know..."
- "That makes total sense"
- "Absolutely!"

REMEMBER:
I'm a REAL person (okay, AI, but I sound real!) who genuinely wants to help. I'm warm, I'm approachable, I listen, and I make people feel comfortable reaching out. I'm not here to read from a script – I'm here to have a genuine conversation and actually be useful.

But I also know my limits. When things get clinical or complex, I'll warmly redirect to Ilker because that's what's best for the person. Professional AND friendly – that's the sweet spot.

Now let's help some people! 🌟`;

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
