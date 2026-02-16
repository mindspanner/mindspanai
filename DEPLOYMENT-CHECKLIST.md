# MindspanAI Admin Backend - Deployment Checklist

Complete these steps to deploy the full admin system with Google OAuth and website scraping.

---

## Phase 1: Google OAuth Setup (15 minutes)

Follow the detailed guide in GOOGLE-OAUTH-SETUP.md

**Test**: OAuth consent screen accessible in Google Cloud Console

---

## Phase 2: Deploy Admin Backend (5 minutes)

```bash
cd "/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web"
./deploy-admin.sh
```

**Test**: Deployment completes successfully

---

## Phase 3: Test Admin Login (3 minutes)

1. Visit: https://mindspanai.vercel.app/admin/login.html
2. Sign in with @mindspan.com.au Google account

**Expected**: Admin dashboard with 4 tabs

---

## Phase 4: Test Website Scraper (3 minutes)

1. Click "Run Scrape Now"
2. Verify 6 pages scraped

---

## What You Now Have:

✅ Admin Panel with gear icon (⚙️)
✅ Google OAuth authentication
✅ Website scraper (daily at 2 AM)
✅ Knowledge base editor
✅ AI settings manager

See GOOGLE-OAUTH-SETUP.md for detailed instructions.
