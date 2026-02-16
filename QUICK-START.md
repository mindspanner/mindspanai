# MindspanAI v3.2.0 - Quick Start Guide

**🎉 Your AI assistant is live at**: https://mindspanai.vercel.app

---

## ⚡ 2-Minute Setup Checklist

### ✅ Already Done (No Action Needed)
- ✅ AI chat interface deployed and live
- ✅ Gradient orb branding throughout
- ✅ Knowledge base with Ilker's details
- ✅ Emergency protocol detection
- ✅ Admin backend created
- ✅ Website scraping configured (daily)
- ✅ Version updated to v3.2.0
- ✅ All documentation complete

### ⚠️ Action Required (15 Minutes Total)

#### 1. Fix Admin Login (10 minutes)
**Why**: Currently showing "Invalid token" error
**What to do**:
1. Open: https://console.cloud.google.com/
2. Go to: APIs & Services → Credentials
3. Click your OAuth Client ID
4. Add these to **Authorized redirect URIs**:
   ```
   https://mindspanai.vercel.app/admin/login.html
   https://mindspanai.vercel.app/admin/dashboard.html
   ```
5. Save and wait 5 minutes

**Full instructions**: See `ADMIN-LOGIN-FIX.md`

#### 2. Add Chat Widget to SquareSpace (5 minutes)
**What to do**:
1. SquareSpace → Settings → Advanced → Code Injection
2. Copy code from `COPY-THIS-CODE.txt`
3. Paste into Footer section
4. Save
5. Refresh www.mindspan.com.au

**Full instructions**: See `SQUARESPACE-IMPLEMENTATION.md`

---

## 📱 What You Have Now

### Main Chat Interface
**URL**: https://mindspanai.vercel.app
**Features**:
- Gradient orb logo in header
- 4 quick-action cards (collapse into corner orb after clicking)
- Corner orb menu with hover dropdown
- AI-powered responses using GPT-3.5-turbo
- Emergency protocol detection
- Direct booking link to Halaxy

### Chat Widget (for SquareSpace)
**URL**: https://mindspanai.vercel.app/widget-embed.html
**Features**:
- Gradient orb button (bottom-right)
- Opens chat window on click
- Mobile-responsive fullscreen
- Ready to embed on www.mindspan.com.au

### Admin Dashboard (after OAuth fix)
**URL**: https://mindspanai.vercel.app/admin/login.html
**Features**:
- Google OAuth login (mindspan.aus@gmail.com)
- Website scraper (7 pages: mindspan.com.au + Halaxy)
- Daily auto-sync at midnight
- Manual sync button
- Knowledge base editor
- AI settings control

---

## 🎯 Test It Out

### Test the Main Chat
1. Visit: https://mindspanai.vercel.app
2. Click a quick-action card (e.g., "What services do you offer?")
3. Cards should disappear and corner orb should appear
4. Type a question or hover over corner orb for dropdown
5. Test emergency detection: Type "I'm feeling suicidal"
   - Should show red emergency banner
   - Should provide crisis resources

### Test the Widget
1. Visit: https://mindspanai.vercel.app/widget-embed.html
2. Look for gradient orb in bottom-right corner
3. Watch floating + color rotation animations
4. Click orb → Chat window opens
5. Click × or outside window → Closes

---

## 📊 Quick Reference

### Live URLs
| Resource | URL |
|----------|-----|
| Main Chat | https://mindspanai.vercel.app |
| Widget Embed | https://mindspanai.vercel.app/widget-embed.html |
| Admin Login | https://mindspanai.vercel.app/admin/login.html |
| Admin Dashboard | https://mindspanai.vercel.app/admin/dashboard.html |
| Auth Diagnostic | https://mindspanai.vercel.app/api/admin/test-auth |

### Credentials
| Service | Email | Notes |
|---------|-------|-------|
| Admin Login | mindspan.aus@gmail.com | Google OAuth |
| GitHub | Your GitHub account | Auto-deploy on push |
| Vercel | Linked to GitHub | Hosts the application |
| OpenRouter | API key in env vars | Powers AI responses |

### Key Files
| File | Purpose |
|------|---------|
| `index.html` | Main chat interface |
| `widget-embed.html` | SquareSpace widget |
| `admin/login.html` | Admin login page |
| `admin/dashboard.html` | Admin panel |
| `api/chat.js` | AI chat endpoint |
| `api/scrape-website.js` | Website scraper |
| `api/admin/auth.js` | OAuth authentication |

---

## 💡 How to Update

### Update the Chat Interface
1. Edit `index.html` (or any file)
2. Run in terminal:
   ```bash
   cd "/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web"
   git add -A
   git commit -m "Your update message"
   git push origin main
   ```
3. Wait 30 seconds → Live at https://mindspanai.vercel.app

### Update the Knowledge Base
**Option 1**: Via Admin Dashboard (after OAuth fix)
1. Login: https://mindspanai.vercel.app/admin/login.html
2. Click "Website Scraper" tab
3. Click "Run Scrape Now"
4. Knowledge base updates automatically

**Option 2**: Edit Code Directly
1. Edit `api/chat.js` → Update `KNOWLEDGE_BASE` constant
2. Commit and push (see above)
3. Knowledge base updates in ~30 seconds

---

## 🔧 Common Tasks

### Add a New Page to Scraper
1. Edit `api/scrape-website.js`
2. Add to `PAGES_TO_SCRAPE` array:
   ```javascript
   { url: 'https://www.mindspan.com.au/new-page', name: 'new_page', priority: 'high' }
   ```
3. Commit and push
4. Run manual sync in admin dashboard

### Change Scraping Frequency
**Current**: Daily at midnight (Vercel free tier limitation)
**To change to hourly**: Upgrade to Vercel Pro ($20/month)
1. In `vercel.json`, change `"schedule": "0 0 * * *"` to `"0 * * * *"`
2. Upgrade Vercel plan
3. Commit and push

### Add Another Admin User
1. Edit `api/admin/auth.js`
2. Add email to `ALLOWED_EMAILS` array (line 11):
   ```javascript
   const ALLOWED_EMAILS = ['mindspan.aus@gmail.com', 'new.user@mindspan.com.au'];
   ```
3. Commit and push

### Change AI Model
**Current**: GPT-3.5-turbo ($0.50-2/month)
**To upgrade**: Edit `api/chat.js` line ~30:
```javascript
model: "openai/gpt-4", // Was: "openai/gpt-3.5-turbo"
```
**Note**: GPT-4 costs ~10x more (~$5-20/month)

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview |
| `CHANGELOG.md` | Complete version history |
| `STATUS.md` | Current status and technical specs |
| `QUICK-START.md` | This file - quick reference |
| `ADMIN-LOGIN-FIX.md` | OAuth troubleshooting |
| `SQUARESPACE-IMPLEMENTATION.md` | Widget integration guide |
| `COPY-THIS-CODE.txt` | Ready-to-paste SquareSpace code |
| `GOOGLE-OAUTH-SETUP.md` | OAuth configuration guide |
| `ADMIN-BACKEND-PLAN.md` | Admin features overview |
| `WEBSITE-SCRAPING-PLAN.md` | Scraping architecture |
| `DEPLOYMENT-CHECKLIST.md` | Deployment steps |

---

## 🆘 Troubleshooting

### Admin Login Not Working
**Error**: "Invalid token"
**Fix**: Follow `ADMIN-LOGIN-FIX.md` → Update Google Cloud Console redirect URIs

### Chat Not Responding
1. Check Vercel deployment status
2. Check OpenRouter API key in environment variables
3. Check browser console (F12) for errors

### Widget Not Showing on SquareSpace
1. Hard refresh (Cmd+Shift+R or Ctrl+F5)
2. Check Code Injection → Footer has the iframe code
3. Check browser console for iframe errors
4. Increase z-index if covered by other elements

### Scraper Not Running
1. Check Vercel cron jobs are enabled
2. Check admin dashboard "Last Sync" time
3. Try manual sync: Click "Run Scrape Now"
4. Check Vercel function logs for errors

---

## 💰 Monthly Costs

| Service | Cost |
|---------|------|
| OpenRouter (GPT-3.5) | $0.50-2.00 |
| Vercel Hosting | Free |
| GitHub | Free |
| Google OAuth | Free |
| **Total** | **$0.50-2.00** |

**Upgrade Options**:
- Vercel Pro: $20/month (hourly scraping, advanced features)
- GPT-4: ~$5-20/month (better AI responses)

---

## ✅ Success Checklist

After completing the 2 actions above, you should have:

- [ ] Admin login working (can access dashboard)
- [ ] Dashboard shows 7 pages being monitored
- [ ] Can run manual scrape
- [ ] Gradient orb appears on www.mindspan.com.au
- [ ] Clicking orb opens chat window
- [ ] Chat responds intelligently to questions
- [ ] Emergency protocol triggers for crisis keywords
- [ ] Booking link opens Halaxy in new tab
- [ ] Mobile-responsive on phone/tablet

---

## 🎉 You're All Set!

Your MindspanAI assistant is production-ready and live at:
**https://mindspanai.vercel.app**

All that's left is the 15-minute setup for admin login and SquareSpace widget.

**Questions?** Check the documentation files or contact: info@mindspan.com.au

---

**Version**: 3.2.0
**Last Updated**: 2026-02-16
**Status**: ✅ Production Ready
