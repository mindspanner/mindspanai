# 🔄 MindspanAI Website Scraping & Sync System

**Goal**: Make www.mindspan.com.au the single source of truth for all AI knowledge

---

## 🎯 Core Principle

**Two authoritative sources (automatically synced)**

```
www.mindspan.com.au (TRUTH #1) + Halaxy Profile (TRUTH #2)
    ↓
Automatic scraping every 24 hours
    ↓
Updates AI knowledge base
    ↓
MindspanAI always matches both sources
```

**Sources:**
1. **www.mindspan.com.au** - Main website (services, about, fees, contact, FAQ)
2. **Halaxy Profile** - Professional booking profile (qualifications, specializations, availability)

**Benefits:**
- ✅ Zero information mismatch
- ✅ Update either source → AI updates automatically
- ✅ No manual data entry
- ✅ Always current and accurate
- ✅ Comprehensive coverage (website + booking platform)

---

## 📊 What Gets Scraped

### **1. Homepage** (`/`)
- Mission statement
- Value proposition
- Key services overview
- Contact information
- Hero messaging

### **2. About Page** (`/about`)
- Practitioner bio (Ilker Abak)
- Qualifications
- Philosophy & approach
- Years of experience
- Languages spoken

### **3. Services Pages**
- `/services` (main)
- `/therapy`
- `/coaching`
- `/medico-legal`
- Service descriptions
- What to expect
- Who it's for

### **4. Fees & Medicare** (`/fees`)
- Session costs
- Medicare rebates
- NDIS rates
- Package pricing
- Payment options

### **5. FAQs** (`/faq`)
- Common questions
- Detailed answers
- Process explanations

### **6. Contact/Booking** (`/contact`, `/book`)
- Booking process
- Contact details
- Opening hours
- Location info
- Accessibility

### **7. Halaxy Profile** (NEW!)
**URL**: `https://www.halaxy.com/profile/ilker-abak/psychologist/359455?clinic=359358`

**What it provides:**
- Detailed qualifications & certifications
- Professional specializations
- Conditions treated (comprehensive list)
- Therapeutic modalities used
- Languages spoken
- Professional memberships (AHPRA, MAPS, MIAAN)
- Clinic locations & hours
- Real-time availability
- Booking integration
- Patient reviews & ratings
- Additional services not on main website

**Why it's important:**
- More comprehensive than main website
- Regularly updated by Ilker
- Official professional profile
- Contains booking-specific details
- Shows current availability

### **8. Telehealth Info** (`/telehealth`)
- How it works
- Tech requirements
- Benefits

---

## 🤖 Scraping Technical Implementation

### **Option A: Playwright Scraper** (RECOMMENDED)

```javascript
// /api/scrape-website.js

import { chromium } from 'playwright';

export default async function handler(req, res) {
    // Security: Only allow from admin or cron
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    const scrapedData = {
        scrapedAt: new Date().toISOString(),
        pages: {}
    };

    const pagesToScrape = [
        { url: 'https://www.mindspan.com.au/', name: 'homepage' },
        { url: 'https://www.mindspan.com.au/about', name: 'about' },
        { url: 'https://www.mindspan.com.au/services', name: 'services' },
        { url: 'https://www.mindspan.com.au/fees', name: 'fees' },
        { url: 'https://www.mindspan.com.au/faq', name: 'faq' },
        { url: 'https://www.mindspan.com.au/contact', name: 'contact' }
    ];

    for (const pageInfo of pagesToScrape) {
        const page = await context.newPage();
        await page.goto(pageInfo.url);
        
        // Extract structured data
        const content = await page.evaluate(() => {
            // Remove scripts, styles, nav, footer
            const clonedDoc = document.cloneNode(true);
            clonedDoc.querySelectorAll('script, style, nav, footer, .cookie-banner').forEach(el => el.remove());
            
            return {
                title: document.title,
                headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
                    level: h.tagName,
                    text: h.textContent.trim()
                })),
                paragraphs: Array.from(document.querySelectorAll('p')).map(p => p.textContent.trim()),
                lists: Array.from(document.querySelectorAll('ul, ol')).map(list => 
                    Array.from(list.querySelectorAll('li')).map(li => li.textContent.trim())
                ),
                // Extract specific data
                fees: Array.from(document.querySelectorAll('[class*="fee"], [class*="price"], [class*="cost"]')).map(el => el.textContent.trim()),
                hours: Array.from(document.querySelectorAll('[class*="hour"], [class*="time"], [class*="schedule"]')).map(el => el.textContent.trim())
            };
        });
        
        scrapedData.pages[pageInfo.name] = content;
        await page.close();
    }

    await browser.close();

    // Save to JSON file (commits to Git)
    const fs = require('fs/promises');
    await fs.writeFile(
        '/config/website-knowledge.json',
        JSON.stringify(scrapedData, null, 2)
    );

    // Trigger rebuild (so AI uses new data)
    await fetch('https://api.vercel.com/v1/deployments', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'mindspanai',
            gitSource: { type: 'github', ref: 'main' }
        })
    });

    return res.json({
        success: true,
        scrapedPages: Object.keys(scrapedData.pages).length,
        lastScraped: scrapedData.scrapedAt
    });
}
```

### **Option B: Cheerio HTML Parser** (Lightweight)

```javascript
// Simpler, faster, but less robust

import cheerio from 'cheerio';

async function scrapePage(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, nav, footer').remove();

    return {
        title: $('title').text(),
        headings: $('h1, h2, h3').map((i, el) => $(el).text()).get(),
        content: $('p').map((i, el) => $(el).text()).get(),
        lists: $('ul li, ol li').map((i, el) => $(el).text()).get()
    };
}
```

---

## ⏰ Automatic Scraping Schedule

### **Vercel Cron Job**

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/scrape-website",
      "schedule": "0 2 * * *"
    }
  ]
}
```

**Runs daily at 2 AM**

---

## 📝 Knowledge Base Format

### **Scraped Data Structure**

```json
{
  "scrapedAt": "2026-02-16T02:00:00Z",
  "pages": {
    "homepage": {
      "title": "Mindspan Psychology | Melbourne Psychologist",
      "mission": "Allied Health Services providing culturally sensitive...",
      "keyServices": [
        "Psychological Therapy & Assessment",
        "Executive Coaching",
        "Medico-Legal Services"
      ]
    },
    "about": {
      "practitioner": {
        "name": "Ilker Abak",
        "title": "Registered Psychologist",
        "since": "2014",
        "qualifications": ["M Psych (Clinical)", "MBA", "MEd"],
        "languages": ["English", "Turkish"],
        "memberships": ["MIAAN", "Assoc. MAPS"]
      },
      "philosophy": "Our approach emphasises meaning making..."
    },
    "fees": {
      "standardSession": "$198.45",
      "medicareRebate": "$141.85",
      "gap": "$56.60",
      "couples": "$125 per person",
      "ndis": "$232.99",
      "coaching": {
        "single": "$250",
        "package": "$2,500 for 5 sessions"
      }
    },
    "hours": {
      "wednesday": "9:30 AM - 5:00 PM",
      "thursday": "9:30 AM - 5:00 PM",
      "saturday": "9:00 AM - 4:00 PM"
    },
    "services": {
      "therapy": {
        "description": "Evidence-based psychological therapy for...",
        "conditions": ["Anxiety", "Depression", "Trauma", "PTSD", "ADHD"],
        "approach": "Integrating culturally relevant methods..."
      }
    }
  }
}
```

### **AI Prompt Integration**

```javascript
// In /api/chat.js

import websiteKnowledge from '../config/website-knowledge.json';

const KNOWLEDGE_BASE = `
# Mindspan Psychology - Official Website Information
Last Updated: ${websiteKnowledge.scrapedAt}

## About
${websiteKnowledge.pages.about.philosophy}

Practitioner: ${websiteKnowledge.pages.about.practitioner.name}
Qualifications: ${websiteKnowledge.pages.about.practitioner.qualifications.join(', ')}
Languages: ${websiteKnowledge.pages.about.practitioner.languages.join(', ')}

## Fees (OFFICIAL - from website)
- Standard Session: ${websiteKnowledge.pages.fees.standardSession}
- Medicare Rebate: ${websiteKnowledge.pages.fees.medicareRebate}
- Typical Gap: ${websiteKnowledge.pages.fees.gap}
- Couples: ${websiteKnowledge.pages.fees.couples}
- NDIS: ${websiteKnowledge.pages.fees.ndis}

## Hours
- Wednesday: ${websiteKnowledge.pages.hours.wednesday}
- Thursday: ${websiteKnowledge.pages.hours.thursday}
- Saturday: ${websiteKnowledge.pages.hours.saturday}

... (rest of scraped data)
`;
```

---

## 🔔 Change Detection & Notifications

### **Smart Diff System**

```javascript
// Detect what changed

import diff from 'deep-diff';

async function detectChanges(oldData, newData) {
    const differences = diff(oldData, newData);
    
    if (!differences || differences.length === 0) {
        return { hasChanges: false };
    }

    const changes = {
        hasChanges: true,
        summary: [],
        details: differences
    };

    // Categorize changes
    differences.forEach(change => {
        if (change.path.includes('fees')) {
            changes.summary.push(`💰 Fee changed: ${change.path.join('.')} from ${change.lhs} to ${change.rhs}`);
        } else if (change.path.includes('hours')) {
            changes.summary.push(`🕒 Hours changed: ${change.path.join('.')}`);
        } else if (change.path.includes('services')) {
            changes.summary.push(`🏥 Service updated: ${change.path.join('.')}`);
        }
    });

    return changes;
}

// Send notification email
async function notifyAdmin(changes) {
    await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ email: 'info@mindspan.com.au' }]
            }],
            from: { email: 'noreply@mindspanai.com' },
            subject: 'MindspanAI: Website changes detected',
            content: [{
                type: 'text/html',
                value: `
                    <h2>Website Changes Detected</h2>
                    <p>The following changes were found on www.mindspan.com.au:</p>
                    <ul>
                        ${changes.summary.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                    <p>AI knowledge base has been automatically updated.</p>
                `
            }]
        })
    });
}
```

---

## 🎛️ Admin Panel Integration

### **Manual Trigger from Admin**

```javascript
// In admin dashboard

<button onclick="triggerWebsiteScrape()">
    🔄 Sync from Website Now
</button>

<script>
async function triggerWebsiteScrape() {
    const response = await fetch('/api/scrape-website', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
    });
    
    const result = await response.json();
    
    if (result.success) {
        alert(`✅ Scraped ${result.scrapedPages} pages successfully!\nLast updated: ${result.lastScraped}`);
    }
}
</script>
```

### **View Scraped Data**

```html
<!-- Admin panel preview -->
<div class="scraped-data-preview">
    <h3>Current Website Knowledge</h3>
    <p>Last scraped: <strong id="lastScraped"></strong></p>
    
    <h4>Fees (from website)</h4>
    <ul id="feesList"></ul>
    
    <h4>Hours (from website)</h4>
    <ul id="hoursList"></ul>
    
    <button onclick="viewFullData()">View Full Scraped Data</button>
</div>
```

---

## 🔐 Admin Security with Google SSO

### **Implementation**

```javascript
// /api/admin/auth.js

import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://mindspanai.vercel.app/admin/callback'
);

export default async function handler(req, res) {
    const { code } = req.query;
    
    if (!code) {
        // Redirect to Google login
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['email', 'profile'],
            hd: 'mindspan.com.au' // Only allow mindspan.com.au emails
        });
        return res.redirect(authUrl);
    }

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    // Verify email domain
    if (!userInfo.data.email.endsWith('@mindspan.com.au')) {
        return res.status(403).json({ error: 'Unauthorized domain' });
    }

    // Create session token
    const sessionToken = generateSecureToken();
    
    // Store in Vercel KV or cookie
    res.setHeader('Set-Cookie', `admin_session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`);
    
    return res.redirect('/admin/dashboard');
}
```

---

## 📦 Complete File Structure

```
/mindspanai
├── /admin
│   ├── index.html              # Login page (Google SSO button)
│   ├── dashboard.html          # Main admin panel
│   ├── knowledge-base.html     # View/edit scraped data
│   └── settings.html           # AI settings
├── /api
│   ├── /admin
│   │   ├── auth.js            # Google SSO authentication
│   │   └── update-config.js   # Save admin changes
│   ├── chat.js                # Main AI endpoint (uses scraped data)
│   ├── scrape-website.js      # Website scraping endpoint
│   └── analytics.js           # Analytics
├── /config
│   ├── website-knowledge.json # Scraped website data (auto-updated)
│   ├── ai-settings.json       # AI model config
│   └── ui-config.json         # UI customization
├── index.html                 # Main chat interface
├── app.js                     # Client logic
└── vercel.json                # Cron config
```

---

## 🚀 Implementation Steps

### **Phase 1: Website Scraping**

1. Create `/api/scrape-website.js`
2. Test scraping all pages
3. Generate `website-knowledge.json`
4. Integrate into AI prompt
5. Set up cron job (daily at 2 AM)

### **Phase 2: Google SSO Admin**

1. Create Google Cloud project
2. Get OAuth credentials
3. Build `/admin/index.html` (login)
4. Create `/api/admin/auth.js`
5. Test login flow

### **Phase 3: Admin Dashboard**

1. Build dashboard UI
2. Display scraped data
3. Manual sync button
4. View change history
5. Edit overrides (optional)

### **Phase 4: Change Detection**

1. Implement diff system
2. Email notifications
3. Change log display
4. Rollback capability

---

## ⚡ Quick Start

### **1. Add to vercel.json**

```json
{
  "crons": [
    {
      "path": "/api/scrape-website",
      "schedule": "0 2 * * *"
    }
  ],
  "env": {
    "GOOGLE_CLIENT_ID": "@google-client-id",
    "GOOGLE_CLIENT_SECRET": "@google-client-secret",
    "CRON_SECRET": "@cron-secret"
  }
}
```

### **2. Set Environment Variables**

```bash
# In Vercel dashboard
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-secret
CRON_SECRET=random-secure-string
ADMIN_EMAIL=info@mindspan.com.au
```

### **3. Deploy**

```bash
git add .
git commit -m "Add website scraping + Google SSO admin"
git push origin main
```

---

## 📊 Benefits

**Before (Manual Updates):**
- ❌ Website says $200, AI says $198.45
- ❌ Hours change, AI still says old hours
- ❌ New service added, AI doesn't know
- ❌ Manual sync required

**After (Automatic Scraping):**
- ✅ Website is ALWAYS the source of truth
- ✅ Changes update automatically (daily)
- ✅ Zero information mismatch
- ✅ AI knows everything on website
- ✅ Email alerts when changes detected

---

## 🎯 Next Steps

**Ready to implement?**

**I will:**
1. Create scraping endpoint
2. Set up Google SSO admin
3. Build admin dashboard with gear icon
4. Configure automatic syncing
5. Test and deploy

**You need to:**
1. Approve this approach
2. Provide Google Cloud credentials (or I'll guide setup)
3. Test admin login
4. Review first scrape results

**Estimated time:** 3-4 hours implementation

**Want me to start building this now?** 🚀
