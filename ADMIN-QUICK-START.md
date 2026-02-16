# MindspanAI Admin Backend - Quick Start Guide

Your MindspanAI agent now includes a full admin backend! Here's everything you need to know.

---

## 🎯 What's New?

### Gear Icon (⚙️) Access
- Click the gear icon in the top-right corner of MindspanAI
- Secure Google OAuth login (@mindspan.com.au only)
- Full admin dashboard

### Admin Panel Features
1. **Website Scraper** - Auto-syncs from www.mindspan.com.au daily at 2 AM
2. **Knowledge Base** - Edit fees, hours, services, contact info
3. **AI Settings** - Switch models (GPT-3.5, GPT-4, Claude), adjust temperature
4. **Site Config** - Update contact details and emergency resources

---

## 🚀 Quick Deployment (3 Steps)

### Step 1: Set up Google OAuth (15 min)

See `GOOGLE-OAUTH-SETUP.md` for detailed instructions, or quick version:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project: "MindspanAI Admin"
3. Enable OAuth → Create credentials → Web application
4. Add to Vercel: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
5. Update `admin/login.html` with your Client ID

### Step 2: Deploy (2 min)

```bash
cd "/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web"
./deploy-admin.sh
```

### Step 3: Test (1 min)

1. Visit: https://mindspanai.vercel.app
2. Click ⚙️ gear icon
3. Sign in with @mindspan.com.au account
4. Explore the dashboard!

---

## 📁 New Files Created

### Admin Interface
- `admin/login.html` - Google OAuth login page
- `admin/dashboard.html` - Main admin panel

### Backend APIs
- `api/admin/auth.js` - Google authentication
- `api/scrape-website.js` - Website scraper

### Configuration
- `vercel.json` - Updated with cron job (daily 2 AM scrape)
- `GOOGLE-OAUTH-SETUP.md` - OAuth setup guide
- `DEPLOYMENT-CHECKLIST.md` - Step-by-step deployment
- `deploy-admin.sh` - Automated deployment script

### Frontend Update
- `index.html` - Added ⚙️ gear icon in header

---

## 🔐 Security

- **OAuth Only**: No passwords, uses Google authentication
- **Domain Restricted**: Only @mindspan.com.au emails allowed
- **Token Expiry**: Sessions expire after 24 hours
- **Secure Storage**: API keys in environment variables (never in code)

---

## 🤖 Website Scraping

### How It Works

1. **Daily Automatic**: Runs at 2:00 AM every day
2. **Pages Monitored**: Homepage, About, Services, Fees, FAQ, Contact
3. **Change Detection**: Compares with previous scrape
4. **Single Source**: www.mindspan.com.au is the truth

### Manual Scrape

1. Log into admin dashboard
2. Go to "Website Scraper" tab
3. Click "🔄 Run Scrape Now"

---

## 🎨 AI Model Options

Switch between models in Admin → AI Settings:

| Model | Cost/Month | Speed | Quality | Best For |
|-------|-----------|-------|---------|----------|
| **GPT-3.5 Turbo** | $0.50-2 | ⚡️⚡️⚡️ | ⭐️⭐️⭐️ | Current (balanced) |
| GPT-4 | $15-30 | ⚡️⚡️ | ⭐️⭐️⭐️⭐️⭐️ | Highest quality |
| Claude 3 Haiku | $5-10 | ⚡️⚡️⚡️ | ⭐️⭐️⭐️⭐️ | Fast & smart |
| Claude 3 Sonnet | $20-40 | ⚡️⚡️ | ⭐️⭐️⭐️⭐️⭐️ | Best quality |

---

## 📊 Admin Dashboard Tabs

### 1. Website Scraper
- Run manual scrape
- View last scrape time
- Monitor 6 pages
- Daily automatic sync at 2 AM

### 2. Knowledge Base
- Edit services offered
- Update fees & rebates
- Modify opening hours
- Changes save to config

### 3. AI Settings
- Switch AI model
- Adjust temperature (creativity)
- Set max response tokens
- View current personality

### 4. Site Config
- Update contact email/phone
- Edit booking URL
- Manage emergency contacts

---

## 🔧 Troubleshooting

### "Can't see gear icon"
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)
- Check deployment completed
- Clear browser cache

### "Google login fails"
- Verify email is @mindspan.com.au
- Check Client ID in `admin/login.html`
- Confirm environment variables set in Vercel

### "Scraper errors"
- Check Vercel logs: `vercel logs`
- Verify www.mindspan.com.au is accessible
- Try manual scrape from dashboard

---

## 📚 Full Documentation

- `GOOGLE-OAUTH-SETUP.md` - Complete OAuth setup guide
- `DEPLOYMENT-CHECKLIST.md` - Step-by-step deployment
- `ADMIN-BACKEND-PLAN.md` - Full feature details
- `WEBSITE-SCRAPING-PLAN.md` - Scraping system architecture
- `AI-MODEL-SPECS.md` - AI model specifications

---

## 🎉 You're All Set!

Your MindspanAI agent now has:

✅ Professional admin panel
✅ Secure Google authentication
✅ Automatic website syncing
✅ Full knowledge base control
✅ AI model flexibility

**Access**: Click the ⚙️ gear icon on https://mindspanai.vercel.app

**Support**: info@mindspan.com.au
