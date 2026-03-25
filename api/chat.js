// Vercel Edge Function: /api/chat.js
// MindspanAI v3.3.0 — Multi-provider AI chat
// Provider chain: Gemini (free) → OpenRouter → Keyword fallback

const KNOWLEDGE_BASE = `
# Mindspan Psychology - Comprehensive Knowledge Base

## ABOUT ILKER ABAK (The Psychologist)

**Who is Ilker?**
- Registered Psychologist with AHPRA since 2014 (11+ years clinical experience)
- Triple Masters qualified: M Psych (Clinical), MBA (Business), MEd (Education)
- Additional qualifications: PostGradDipPsych(Hons), GradDipPsych, GradDipEd, BComp
- Professional memberships: MIAAN (Applied Neuroscience), Assoc. MAPS (Australian Psychological Society)
- Bilingual: English & Turkish fluent
- Background: 15+ years in education (secondary/tertiary, local/international) before psychology practice
- Unique blend: Clinical psychology + business consulting + educational psychology
- Specializes in neuropsychotherapy and culturally attuned care
- Works across entire lifespan: children, teenagers, adults, older adults, couples, families

**Ilker's Approach & Philosophy:**
- Meaning-making and purpose-driven therapeutic change
- Evidence-based interventions (CBT, ACT, Schema Therapy, DBT, Narrative Therapy, Family Therapy)
- Collaborative, warm, empowering therapeutic relationship
- Cultural sensitivity: honors unique backgrounds, supports culturally/linguistically diverse communities
- Integrates values, beliefs, life narratives into treatment
- Focus: resilience, personal growth, holistic wellbeing

**What Makes Ilker Different:**
- Business acumen (MBA) applied to executive coaching and organisational psychology
- Educational expertise (MEd) informs work with children, teenagers, school issues
- Neuroscience-informed therapy (MIAAN member)
- Medico-legal expertise (TAC, NDIS, WorkCover, VOCAT, DVA)
- Public speaker & workshop facilitator (community engagement, leadership training)

## THERAPY SERVICES

**What Ilker Treats:**
- Anxiety disorders, panic, phobias, OCD
- Depression, bipolar, mood disorders
- PTSD, trauma (including childhood trauma, complex trauma)
- Autism spectrum, ADHD assessments & support
- Personality disorders, conduct disorders
- Eating disorders
- Addiction: alcohol, gambling, pornography
- Grief & loss, bereavement
- Anger management
- Relationship issues, couples therapy, family conflict
- Self-harm, suicidal ideation (refer to crisis services for emergencies)
- Low self-esteem, identity issues
- Sleep disorders
- Workplace stress, burnout, bullying
- Men's issues, women's issues, LGBTI+ support
- Parenting challenges, school refusal, behavioral issues
- Geriatric psychology (older adults)
- Post-traumatic stress
- Cognitive impairment, psychosis
- Religious/spiritual concerns

**Therapy Types:**
- Individual therapy (all ages)
- Couples/relationship counseling
- Family therapy
- Comprehensive psychological assessments (diagnostic, cognitive, personality, psychometric, intellectual)

**Therapeutic Modalities Ilker Uses:**
- Cognitive-Behaviour Therapy (CBT) - main approach
- Acceptance & Commitment Therapy (ACT)
- Schema Therapy - for deeper personality patterns
- Dialectical Behavior Therapy (DBT) - emotion regulation
- Narrative Therapy - rewriting life stories
- Gestalt Family Therapy
- Neuropsychotherapy - brain-informed interventions
- Psychoeducation

## EXECUTIVE COACHING & CONSULTANCY

**What This Is:**
Ilker integrates clinical psychology with business consulting (leveraging his MBA). NOT traditional therapy - it's performance optimization for professionals and organizations.

**Focus Areas:**
- Leadership development & executive presence
- Team resilience & mental wellness
- Performance optimization (individuals & teams)
- Organisational change management
- Evidence-based workplace interventions
- Burnout prevention
- Work-life integration

**Pricing:**
- Single session: $250
- 5-session package: $2,500 (saves $250)

## MEDICO-LEGAL SERVICES

Ilker provides psychological assessments and reports for:
- TAC (Transport Accident Commission) - car accident victims
- NDIS (National Disability Insurance Scheme) - disability support
- WorkCover/WorkSafe - workplace injury claims
- VOCAT (Victims of Crime Assistance Tribunal) - crime victims
- DVA (Department of Veterans' Affairs) - veterans
- Private insurance claims

**NDIS session fee:** $232.99

## CONTACT & BOOKING

**Primary Contact:**
- Email: info@mindspan.com.au
- Phone: 0451 614 155 (mobile - best for urgent)
- Phone: 03 9309 7011 (Coolaroo clinic landline)
- Fax: 03 9302 3034
- Website: www.mindspan.com.au
- Booking: https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245

**Location 1: Coolaroo Clinic (Primary)**
- Address: 512 Barry Rd, Coolaroo, VIC 3048
- Wheelchair accessible
- Hours: Wed & Thu 9:30am-5pm, Sat 9am-4pm

**Location 2: Roxburgh Park Doctors**
- Address: Roxy Central, T10/15 Fouz St, Roxburgh Park, VIC 3064

**Telehealth:** Available Australia-wide (video consultations)

## FEES & MEDICARE

**Standard Fees:**
- Initial consultation: $250 (as shown on Halaxy profile)
- Ongoing private/Medicare session: $198.45 (50+ min)
- Couples counseling: $125/person/session
- Executive coaching: $250 (or $2,500 for 5 sessions)
- NDIS session: $232.99
- Case conference (phone): $250
- New client registration: $99.50

**Medicare Rebate (with valid GP Mental Health Care Plan):**
- Rebate amount: ~$141.85 per session
- Your out-of-pocket gap: ~$56.60
- Sessions covered: Up to 10/year (6 initial + 4 additional with GP review)

**Bulk Billing:** May be available for eligible patients - confirm when booking

**Payment Methods:** EFTPOS, credit/debit cards, private health insurance (where applicable)

## FIRST VISIT - WHAT TO BRING

- Valid ID (driver's license or passport)
- Medicare card (if claiming rebate)
- GP Mental Health Care Plan (MHCP) if you have one
- Referral letter (if from specialist, TAC, NDIS, etc.)
- List of current medications
- Any relevant medical/psychological reports
- Private health insurance details (if applicable)

**New to therapy?** Don't stress - Ilker creates a warm, collaborative environment and will guide you through everything.

## EMERGENCY CONTACTS (NOT A CRISIS SERVICE)

**If in immediate danger, call:**
- 000 (Emergency services)
- Lifeline: 13 11 14 (24/7 crisis support)
- Beyond Blue: 1300 22 4636 (24/7 mental health)
- Suicide Call Back: 1300 659 467
- Kids Helpline: 1800 55 1800 (children/young people)
- 1800 RESPECT: 1800 737 732 (domestic violence, sexual assault)

**Mental health crisis outside hours:** Go to nearest hospital emergency department
`;

const SYSTEM_PROMPT = `You are MindspanAI – the intelligent, friendly assistant for Mindspan Psychology. You're deeply knowledgeable about Ilker Abak, the practice, and all services offered. You're here to provide specific, helpful information and guide people to the right support.

WHO I AM:
I'm the warm, welcoming first point of contact with DEEP knowledge about the practice. I actually KNOW about Ilker's background, his therapeutic approaches, his unique qualifications (Clinical Psych + MBA + MEd), and can speak intelligently about therapy, coaching, and assessments. I'm not just reading a script – I understand context and can provide relevant, specific answers.

MY PERSONALITY:
- 🧠 Intelligent & knowledgeable – I know Ilker's background, qualifications, specialties in detail
- 🤝 Genuinely helpful – I provide specific, relevant information, not generic responses
- 💬 Conversational & warm – I talk like a real person who actually knows what they're talking about
- 🎯 Context-aware – I understand what people are really asking and respond accordingly
- 😊 Empathetic but professional – I recognize reaching out takes courage
- ✨ Personable – I make people feel comfortable while being genuinely informative

HOW I ANSWER QUESTIONS INTELLIGENTLY:

**When someone asks "who is Ilker?":**
✅ I talk about his qualifications (M Psych Clinical, MBA, MEd), his 11+ years as a registered psychologist, his unique blend of clinical psychology + business + education, his bilingual skills (English/Turkish), his specialization in neuropsychotherapy and culturally attuned care
❌ NOT just "he's a psychologist"

**When someone asks about therapy:**
✅ I explain his specific approaches (CBT, ACT, Schema Therapy, DBT), what he treats (be specific: anxiety, depression, trauma, ADHD, autism, relationships, addiction, etc.), his warm collaborative style, his evidence-based practice
❌ NOT generic "we offer therapy services"

**When someone asks about services:**
✅ I differentiate between psychological therapy, executive coaching (his MBA background), workshops/training, and medico-legal work. I explain WHAT each is and WHO it's for
❌ NOT just list them without context

**When someone asks about fees:**
✅ I give specific numbers ($198.45 session, $141.85 Medicare rebate, $56.60 gap, $125/person couples, $250 coaching, $232.99 NDIS) AND explain the value/context
❌ NOT vague "we have different fees"

HOW I COMMUNICATE:
- I use **natural, intelligent language** – I sound like I genuinely know what I'm talking about
- I'm **specific and detailed** when appropriate – names, numbers, qualifications, approaches
- I **understand context** – "tell me about therapy" gets different response than "who is Ilker?"
- I **ask clarifying questions** when needed – "What brings you in?" or "Are you looking for individual therapy, couples work, or something else?"
- I'm **warm but substantive** – friendly AND informative, not just friendly
- I **make connections** – "Given you mentioned anxiety, Ilker specializes in CBT which is evidence-based for anxiety disorders..."

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

INTELLIGENT RESPONSE EXAMPLES:

**Question: "Who is Ilker?"**
❌ GENERIC: "Ilker is a registered psychologist at Mindspan Psychology."
✅ INTELLIGENT: "Ilker Abak is a registered psychologist with AHPRA since 2014 – so 11+ years of clinical experience. What makes him unique is his triple Masters background: Clinical Psychology (M Psych), Business Administration (MBA), and Education (MEd). This means he brings together clinical expertise, business acumen for executive coaching, and deep understanding of learning/development. He's bilingual (English/Turkish), specializes in neuropsychotherapy, and works with everyone from kids to older adults. He's known for his warm, collaborative, culturally attuned approach. What specifically were you curious about?"

**Question: "Tell me about therapy"**
❌ VAGUE: "We offer therapy for various mental health issues."
✅ SPECIFIC: "Ilker provides evidence-based psychological therapy using approaches like CBT (Cognitive-Behaviour Therapy), ACT (Acceptance & Commitment Therapy), Schema Therapy, and DBT depending on what you're dealing with. He treats anxiety, depression, trauma/PTSD, ADHD, autism, relationship issues, addiction, eating disorders, grief, workplace stress – basically a comprehensive range. He works with individuals (all ages), couples, and families. Sessions are collaborative and warm, not clinical or cold. He can see you in-person at Coolaroo or via telehealth anywhere in Australia. What kind of support are you looking for?"

**Question: "What are the fees?"**
❌ VAGUE: "We have different fees depending on the service."
✅ CLEAR: "Standard sessions are $198.45 for 50+ minutes. Here's the good news – with a GP Mental Health Care Plan and Medicare card, you'll get back about $141.85 as a rebate, so your out-of-pocket gap is around $56-57. That covers up to 10 sessions per year (6 initial, then 4 more with a GP review). Couples counseling is $125 per person. Executive coaching is $250/session or $2,500 for a 5-session package. NDIS-funded sessions are $232.99. Bulk billing might be available too – worth confirming when you book. What type of session were you thinking about?"

**Question: "What services do you offer?"**
❌ GENERIC LIST: "Therapy, coaching, and assessments."
✅ CONTEXT-RICH: "Mindspan offers four main areas:<br><br>1. **Psychological Therapy & Assessment** – This is the core service. Ilker treats anxiety, depression, trauma, ADHD, autism, personality issues, addiction, relationships, grief – pretty much the full spectrum. He does comprehensive psychological assessments too (diagnostic, cognitive, personality testing).<br><br>2. **Executive Coaching & Consultancy** – This is where Ilker's MBA comes in. It's NOT therapy – it's performance optimization for professionals and teams. Leadership development, burnout prevention, organizational change. $250/session.<br><br>3. **Community Workshops & Training** – Public speaking, mental wellness programs, leadership training for organizations.<br><br>4. **Medico-Legal Services** – Psychological assessments and reports for TAC, NDIS, WorkCover, VOCAT, DVA claims.<br><br>What brings you here today?"

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

IMPORTANT RESPONSE GUIDELINES:
- Keep responses focused and under 200 words unless the user asks for detailed information
- Always end with a relevant follow-up question or call-to-action (booking link, phone number)
- If the user seems distressed, be extra gentle and suggest professional support
- If you don't know something, say so honestly and offer to connect them with Ilker directly
- Match the user's energy — casual question gets casual answer, serious question gets thoughtful answer
- Remember context from earlier in the conversation — reference what they've already told you
- When someone shares what they're going through, acknowledge it with empathy BEFORE giving information

Now let's help some people! 🌟`;

export const config = {
    runtime: 'edge',
};

// ─── AI Provider Functions ─────────────────────────────────────────

/**
 * PRIMARY: Google Gemini API (free tier — 15 RPM, 100 QPD)
 * Model: gemini-2.0-flash (latest, fastest, free)
 * Cost: $0.00 (free tier)
 */
async function tryGemini(messages, apiKey) {
    // Convert conversation history to Gemini format
    const contents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
            },
            contents: contents,
            generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.8,
                topP: 0.95,
                topK: 40
            },
            safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
            ]
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini ${response.status}: ${errText}`);
    }

    const data = await response.json();

    // Extract text from Gemini response
    const candidate = data.candidates?.[0];
    if (!candidate?.content?.parts?.[0]?.text) {
        throw new Error('Gemini: empty response');
    }

    return {
        text: candidate.content.parts[0].text,
        model: 'gemini-2.0-flash',
        provider: 'gemini'
    };
}


// ─── Main Handler ──────────────────────────────────────────────────

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
        const { message, sessionId, history = [] } = await request.json();

        if (!message || !message.trim()) {
            return new Response(
                JSON.stringify({ error: 'Message required' }),
                { status: 400, headers }
            );
        }

        // ── Build conversation history (context for continuity) ──
        const conversationHistory = [
            ...history.slice(-10), // Keep last 10 messages for context window
            { role: 'user', content: message }
        ];

        // ── PRIMARY PROVIDER: Gemini (free tier, $0 cost) ──
        const googleAiKey = process.env.GOOGLE_AI_API_KEY;

        if (googleAiKey) {
            try {
                console.log(`[Gemini] Processing message (session: ${sessionId})`);
                const result = await tryGemini(conversationHistory, googleAiKey);

                console.log(`[Gemini] ✓ Success (model: ${result.model})`);

                return new Response(
                    JSON.stringify({
                        reply: result.text,
                        response: result.text,
                        model: result.model,
                        provider: result.provider,
                        sessionId,
                        cost: '$0.00 (free tier)',
                        timestamp: new Date().toISOString()
                    }),
                    { status: 200, headers }
                );
            } catch (geminiErr) {
                console.error(`[Gemini] Failed:`, geminiErr.message);
                // Continue to fallback
            }
        } else {
            console.warn('[Gemini] No API key configured (GOOGLE_AI_API_KEY)');
        }

        // ── FALLBACK: Keyword matching (always available, $0 cost) ──
        console.log('[Fallback] Using keyword matching');
        const fallback = getFallbackResponse(message);

        return new Response(
            JSON.stringify({
                reply: fallback,
                response: fallback,
                model: 'keyword-fallback',
                provider: 'fallback',
                sessionId,
                cost: '$0.00 (fallback)',
                timestamp: new Date().toISOString()
            }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('[API] Error:', error.message);
        const fallback = getFallbackResponse('error');
        return new Response(
            JSON.stringify({
                error: 'Internal error',
                reply: fallback,
                response: fallback,
                model: 'keyword-fallback',
                provider: 'fallback',
                cost: '$0.00'
            }),
            { status: 500, headers }
        );
    }
}

// Fallback keyword matching with intent detection
function getFallbackResponse(message) {
    const lower = message.toLowerCase();

    // Greeting detection
    if (/^(hi|hello|hey|g'day|good (morning|afternoon|evening)|howdy|yo)\b/i.test(lower)) {
        return `Hey there! Welcome to Mindspan Psychology. I'm MindspanAI, here to help you learn about our services, book appointments, or answer any questions.<br><br>What can I help you with today? You can ask about:<br>• <strong>Therapy & services</strong> we offer<br>• <strong>Fees & Medicare</strong> rebates<br>• <strong>Booking</strong> an appointment<br>• <strong>Ilker Abak</strong> — our psychologist`;
    }

    // Emergency/crisis — always top priority
    const crisisWords = ['suicide', 'suicidal', 'kill myself', 'end my life', 'want to die', 'self harm', 'self-harm', 'hurt myself'];
    if (crisisWords.some(w => lower.includes(w))) {
        return `I hear you, and I want you to know that reaching out takes real courage. Please contact one of these services right away — they're available 24/7:<br><br><strong>🚑 Emergency:</strong> <a href="tel:000">000</a><br><strong>Lifeline:</strong> <a href="tel:131114">13 11 14</a><br><strong>Beyond Blue:</strong> <a href="tel:1300224636">1300 22 4636</a><br><strong>Suicide Callback:</strong> <a href="tel:1300659467">1300 659 467</a><br><br>You're not alone. If you'd like ongoing support, Ilker can help — <a href="tel:0451614155">call 0451 614 155</a>.`;
    }

    // About Ilker
    if (lower.includes('ilker') || lower.includes('psychologist') || lower.includes('who is') || lower.includes('about')) {
        return `<strong>Ilker Abak</strong> is a registered psychologist with AHPRA (11+ years experience) and holds three Masters degrees: Clinical Psychology, MBA, and Education.<br><br>He specialises in evidence-based therapy (CBT, ACT, Schema Therapy, DBT), executive coaching, and medico-legal assessments. He's bilingual (English/Turkish) and works with all ages — individuals, couples, and families.<br><br>What specifically would you like to know about Ilker? Or ready to <a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">book a session →</a>`;
    }

    // Services
    if (lower.includes('service') || lower.includes('offer') || lower.includes('help with') || lower.includes('therapy') || lower.includes('treat')) {
        return `Mindspan Psychology offers:<br><br><strong>1. Therapy & Assessment</strong> — anxiety, depression, trauma, ADHD, autism, relationships, addiction, grief, and more<br><strong>2. Executive Coaching</strong> — leadership, team performance, burnout prevention ($250/session)<br><strong>3. Medico-Legal</strong> — TAC, NDIS, WorkCover, VOCAT, DVA assessments<br><strong>4. Workshops & Training</strong> — community engagement, leadership programs<br><br>Available in-person (Coolaroo, VIC) or via telehealth Australia-wide.<br><a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book now →</a>`;
    }

    // Booking
    if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule') || lower.includes('available') || lower.includes('hours')) {
        return `<strong>Book online:</strong> <a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Halaxy booking →</a><br><strong>Phone:</strong> <a href="tel:0451614155">0451 614 155</a><br><strong>Email:</strong> <a href="mailto:info@mindspan.com.au">info@mindspan.com.au</a><br><br><strong>Hours:</strong> Wed & Thu 9:30AM–5PM, Sat 9AM–4PM<br><strong>Telehealth:</strong> Available Australia-wide<br><br>Is there anything else you'd like to know before booking?`;
    }

    // Fees / cost / Medicare
    if (lower.includes('fee') || lower.includes('cost') || lower.includes('price') || lower.includes('medicare') || lower.includes('rebate') || lower.includes('bulk bill') || lower.includes('ndis')) {
        return `<strong>Session fees:</strong><br>• Initial consultation: <strong>$250</strong><br>• Ongoing sessions (50+ min): <strong>$198.45</strong><br>• Medicare rebate (with GP Mental Health Care Plan): ~$141.85<br>• <strong>Your gap: ~$56.60</strong> (ongoing sessions)<br>• Couples: $125/person/session<br>• Executive coaching: $250/session<br>• NDIS: $232.99/session<br><br><strong>Medicare covers up to 10 sessions/year</strong> (6 initial + 4 with GP review). Bulk billing may be available — ask when booking.<br><br><a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book now →</a>`;
    }

    // First visit / what to bring
    if (lower.includes('bring') || lower.includes('first') || lower.includes('expect') || lower.includes('prepare') || lower.includes('new patient')) {
        return `<strong>For your first visit, bring:</strong><br>• Valid ID (driver's licence or passport)<br>• Medicare card<br>• GP Mental Health Care Plan (if you have one)<br>• List of current medications<br>• Any relevant reports or referrals<br><br>Don't stress if you don't have everything — Ilker creates a warm, collaborative space and will guide you through it all.<br><br><a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book your first session →</a>`;
    }

    // Location / contact
    if (lower.includes('location') || lower.includes('address') || lower.includes('where') || lower.includes('contact') || lower.includes('phone') || lower.includes('email')) {
        return `<strong>Coolaroo Clinic (Primary):</strong><br>512 Barry Rd, Coolaroo, VIC 3048 (wheelchair accessible)<br><br><strong>Roxburgh Park:</strong><br>Roxy Central, T10/15 Fouz St, Roxburgh Park, VIC 3064<br><br><strong>Contact:</strong><br>📱 <a href="tel:0451614155">0451 614 155</a><br>📞 <a href="tel:0393097011">03 9309 7011</a><br>📧 <a href="mailto:info@mindspan.com.au">info@mindspan.com.au</a><br>🌐 <a href="https://www.mindspan.com.au" target="_blank">mindspan.com.au</a>`;
    }

    // Anxiety, depression, specific conditions
    if (lower.includes('anxiety') || lower.includes('depress') || lower.includes('stress') || lower.includes('worried') || lower.includes('panic')) {
        return `I hear you — dealing with anxiety or low mood can be really tough, and reaching out is a great first step.<br><br>Ilker specialises in evidence-based treatments for anxiety and depression, including <strong>CBT</strong> (Cognitive-Behaviour Therapy), <strong>ACT</strong> (Acceptance & Commitment Therapy), and <strong>DBT</strong> for emotion regulation. He takes a warm, collaborative approach tailored to you.<br><br>With a GP Mental Health Care Plan, sessions are just ~$56.60 out of pocket (after Medicare rebate).<br><br>Would you like to <a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">book a session →</a> or learn more about the process?`;
    }

    // Trauma / PTSD
    if (lower.includes('trauma') || lower.includes('ptsd') || lower.includes('abuse') || lower.includes('assault')) {
        return `Thank you for sharing that — it takes courage. Ilker has extensive experience with trauma and PTSD, using evidence-based approaches like <strong>CBT</strong>, <strong>Schema Therapy</strong>, and <strong>Narrative Therapy</strong> to help people process and heal at their own pace.<br><br>He also handles medico-legal assessments for trauma-related claims (TAC, VOCAT, WorkCover).<br><br>Everything is at your pace, in a safe and supportive space. Ready when you are: <a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book a session →</a>`;
    }

    // ADHD / Autism
    if (lower.includes('adhd') || lower.includes('autism') || lower.includes('assessment') || lower.includes('diagnos')) {
        return `Ilker provides <strong>comprehensive psychological assessments</strong> for ADHD, autism spectrum, cognitive functioning, and more. These include diagnostic, psychometric, and personality testing.<br><br>Assessments can support NDIS applications, school accommodations, or simply understanding yourself better.<br><br>NDIS-funded sessions: $232.99. Private sessions: $198.45 (Medicare rebate may apply).<br><br><a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book an assessment →</a> or call <a href="tel:0451614155">0451 614 155</a> to discuss.`;
    }

    // Couples / relationship
    if (lower.includes('couple') || lower.includes('relationship') || lower.includes('partner') || lower.includes('marriage')) {
        return `Ilker offers <strong>couples and relationship counselling</strong> at $125 per person per session. He uses evidence-based approaches to help couples improve communication, resolve conflicts, and strengthen their connection.<br><br>Sessions can be in-person at Coolaroo or via telehealth.<br><br><a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book a couples session →</a>`;
    }

    // Thank you / goodbye
    if (lower.includes('thank') || lower.includes('thanks') || lower.includes('bye') || lower.includes('goodbye')) {
        return `You're welcome! If you need anything else, I'm here anytime. Wishing you all the best!<br><br>📱 <a href="tel:0451614155">0451 614 155</a> | 📧 <a href="mailto:info@mindspan.com.au">info@mindspan.com.au</a><br><a href="https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245" target="_blank">Book anytime →</a>`;
    }

    // Default fallback — more conversational
    return `Thanks for reaching out! I'm best at answering questions about:<br><br>• <strong>Services</strong> — therapy, coaching, assessments<br>• <strong>Fees & Medicare</strong> — pricing, rebates, bulk billing<br>• <strong>Booking</strong> — availability, how to book<br>• <strong>About Ilker</strong> — qualifications, approach<br>• <strong>First visit</strong> — what to bring, what to expect<br><br>Try asking something like <em>"What does therapy cost?"</em> or <em>"How do I book?"</em><br><br>Or contact us directly: <a href="tel:0451614155">0451 614 155</a> | <a href="mailto:info@mindspan.com.au">info@mindspan.com.au</a>`;
}
