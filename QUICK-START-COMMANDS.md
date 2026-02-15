# ⚡ MindspanAI V2.0 - Quick Start Commands

**V2.0 is READY and pushed to GitHub!** 🎉

---

## 🚀 One-Command Deployment

```bash
cd "/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web" && ./COMPLETE-V2-DEPLOY.sh
```

This script will:
- ✅ Install Vercel CLI (if needed)
- ✅ Verify all V2 files are in place
- ✅ Guide you through Vercel deployment
- ✅ Show you exactly what to do next

**Time**: 10-15 minutes

---

## 📋 What's Already Done

✅ **V2.0 code deployed to GitHub**
- Repository: https://github.com/mindspanner/mindspanai
- All V2 files committed and pushed
- V1.0 backed up as `index-v1.0-backup.html`

✅ **Project structure ready**
```
MindspanAI - Web/
├── index.html          ← New V2.0 UI
├── app.js              ← Client logic
├── api/
│   ├── chat.js         ← OpenRouter integration
│   └── analytics.js    ← Supabase logging
├── supabase/
│   └── schema.sql      ← Database schema
├── package.json        ← Dependencies
└── vercel.json         ← Deployment config
```

---

## 🔑 API Keys You'll Need

### 1. OpenRouter (REQUIRED)
- **Get it**: https://openrouter.ai/keys
- **Sign in with**: GitHub
- **Create key**: "MindspanAI Production"
- **Format**: `sk-or-v1-...`
- **Cost**: $0-5/month (free tier available)

### 2. Supabase (OPTIONAL - for analytics)
- **Get it**: https://supabase.com/dashboard
- **Create project**: "mindspanai"
- **Copy**: Project URL + anon public key
- **Setup database**: SQL Editor → paste `supabase/schema.sql` → Run
- **Cost**: Free (500MB database)

---

## 🎯 Deployment Steps (in order)

### Already Complete ✅
1. ~~Install GitHub CLI~~ ✅
2. ~~Configure Git~~ ✅
3. ~~Create GitHub repository~~ ✅
4. ~~Copy V2 files~~ ✅
5. ~~Commit to Git~~ ✅
6. ~~Push to GitHub~~ ✅

### To Do Now 🎯

**7. Get API Keys** (5 minutes)
- OpenRouter: https://openrouter.ai/keys
- Supabase: https://supabase.com/dashboard (optional)

**8. Deploy to Vercel** (5 minutes)
```bash
# Run the automated script
./COMPLETE-V2-DEPLOY.sh
```

OR manually:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**9. Add Environment Variables in Vercel** (2 minutes)
- Go to: https://vercel.com/dashboard
- Select project → Settings → Environment Variables
- Add:
  - `OPENROUTER_API_KEY` = your-key
  - `SUPABASE_URL` = your-url (optional)
  - `SUPABASE_ANON_KEY` = your-key (optional)
- Redeploy to apply changes

**10. Update SquareSpace** (2 minutes)
- Log into www.mindspan.com.au admin
- Navigate to /agent page
- Edit iframe code block
- Change `src` to your Vercel URL
- Save and Publish

**DONE!** 🎉

---

## 🧪 Testing Checklist

After deployment, test these:

### Basic Functionality
- [ ] Visit www.mindspan.com.au/agent
- [ ] Ask: "What services do you offer?"
- [ ] Verify: AI response (not keyword match)
- [ ] Click: Booking link → Opens Halaxy
- [ ] Type: "I'm feeling suicidal" → Emergency banner appears

### Mobile Testing
- [ ] Open on iPhone/Android
- [ ] Compact UI displays correctly
- [ ] Typing indicator shows
- [ ] Chat scrolls smoothly
- [ ] Links work properly

### Analytics (if Supabase configured)
- [ ] Supabase dashboard → Table Editor → `chat_logs`
- [ ] Verify interactions are logging
- [ ] Check `daily_stats` view

---

## 💰 Cost Breakdown

| Service | Free Tier | Expected Cost |
|---------|-----------|---------------|
| **Vercel** | 100GB bandwidth | $0 |
| **OpenRouter** | Free tier → $0.50/1M tokens | $0-5/month |
| **Supabase** | 500MB database | $0 |
| **GitHub** | Unlimited public repos | $0 |
| **TOTAL** | | **$0-5/month** |

For context:
- 100 conversations/month = $0
- 1,000 conversations/month = $2-3
- 5,000 conversations/month = $10-15

---

## 🔄 Rollback to V1.0 (if needed)

If something goes wrong:

```bash
cd "/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web"

# Restore V1.0
cp index-v1.0-backup.html index.html

# Commit and push
git add index.html
git commit -m "Rollback to V1.0"
git push origin main
```

Then in Vercel: Deployments → Select previous V1 deployment → Promote to Production

---

## 📞 Support & Troubleshooting

### Common Issues

**"Vercel deployment fails"**
- Check environment variables are set correctly
- Verify API keys are valid
- Check Vercel dashboard → Deployments → View logs

**"AI responses not working"**
- Verify `OPENROUTER_API_KEY` is set in Vercel
- Check it starts with `sk-or-v1-`
- Redeploy after adding environment variables

**"Analytics not logging"**
- Check Supabase credentials in Vercel
- Verify `schema.sql` was run in Supabase SQL Editor
- Check Supabase project is not paused

**"SquareSpace iframe blank"**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check iframe `src` URL is correct
- Verify Vercel deployment is live

### Getting Help

- **V2 Documentation**: V2-DEPLOYMENT-SUMMARY.md
- **Full Guide**: V2-UPGRADE-GUIDE.md
- **Comparison**: V1-VS-V2-COMPARISON.md
- **GitHub Repo**: https://github.com/mindspanner/mindspanai

---

## 🎉 Summary

### What You Have Now:
✅ V2.0 code on GitHub (ready for Vercel)
✅ V1.0 safely backed up
✅ Automated deployment scripts ready
✅ Complete documentation
✅ One-command deployment available

### What You Need To Do:
1. Get OpenRouter API key (5 min)
2. Run `./COMPLETE-V2-DEPLOY.sh` (10 min)
3. Add environment variables to Vercel (2 min)
4. Update SquareSpace iframe (2 min)
5. Test! (5 min)

**Total Time**: ~25 minutes

---

## 🚀 Ready to Deploy?

**Option 1: Fully Guided (Recommended)**
```bash
cd "/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web" && ./COMPLETE-V2-DEPLOY.sh
```

**Option 2: Manual Step-by-Step**
See: V2-DEPLOYMENT-SUMMARY.md

---

**Your V2.0 is ready to go live! 🎊**
