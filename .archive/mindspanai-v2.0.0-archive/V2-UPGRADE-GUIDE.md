# MindspanAI v2.0 Upgrade Guide
**From**: v1.0 (static keyword matching)  
**To**: v2.0 (AI-powered with OpenRouter + Supabase)  
**Time**: 20 minutes setup + 5 minutes deployment

---

## 🎯 What's New in v2.0

### UI Improvements
✅ **Compact mobile design** – Optimized for small screens  
✅ **Conversational AI branding** – "AI Powered" badge, typing indicators  
✅ **Better UX** – Smooth animations, auto-resize input, Enter to send  
✅ **Improved accessibility** – Larger touch targets, better contrast

### Backend Upgrades
✅ **True AI responses** – OpenRouter API integration (GPT-3.5-turbo)  
✅ **Persistent analytics** – Supabase database (SQL queryable)  
✅ **Serverless architecture** – Vercel Edge Functions (zero config)  
✅ **Secure API keys** – Environment variables (never in code)  
✅ **Graceful fallback** – If API fails, falls back to v1.0 keyword matching

### Cost
- **Vercel**: $0 (free tier: 100GB bandwidth/month)
- **OpenRouter**: $0-5/month (free tier available, then $0.50/1M tokens)
- **Supabase**: $0 (free tier: 500MB database)
- **Total**: **$0-5/month** (depending on usage)

---

## 📋 Prerequisites

### Required Accounts (All Free)
1. **GitHub** (you already have: mindspanner/mindspanai)
2. **Vercel** (sign up: https://vercel.com)
3. **OpenRouter** (get API key: https://openrouter.ai/keys)
4. **Supabase** (optional but recommended: https://supabase.com)

### Local Requirements
- Git installed
- Text editor (VS Code recommended)
- Terminal/command line

---

## 🚀 Step-by-Step Deployment

### Phase 1: Get API Keys (10 min)

#### 1.1 OpenRouter API Key
1. Go to https://openrouter.ai/keys
2. Sign in with Google/GitHub
3. Click "Create Key"
4. Name it: "MindspanAI Production"
5. Copy the key (starts with `sk-or-...`)
6. **Save it** – you'll need this soon

**Cost**: Free tier available, then $0.50 per 1M tokens (≈2000 conversations)

#### 1.2 Supabase Database (Optional)
1. Go to https://supabase.com
2. Create account → "New Project"
3. Name: "mindspanai"
4. Region: Australia Southeast (Sydney)
5. Generate strong database password (save it!)
6. Wait ~2 min for provisioning
7. Go to **Settings** → **API**
8. Copy:
   - **Project URL** (e.g., `https://abc123.supabase.co`)
   - **anon public** key
9. Go to **SQL Editor** → New query
10. Paste contents of `supabase/schema.sql` (from v2 folder)
11. Run query → Tables created!

**Cost**: Free tier (500MB database, unlimited API calls)

---

### Phase 2: Update GitHub Repo (5 min)

#### 2.1 Clone Your Repo (If Not Already)
```bash
cd ~/Desktop
git clone https://github.com/mindspanner/mindspanai.git
cd mindspanai
```

#### 2.2 Create v2 Branch
```bash
git checkout -b v2.0
```

#### 2.3 Copy v2 Files
Copy all files from the `v2/` folder I created to your repo:
- `index.html` (replace existing)
- `app.js` (new file)
- `api/chat.js` (new folder + file)
- `api/analytics.js` (new file)
- `supabase/schema.sql` (new folder + file - already used above)
- `.env.example` (new file)
- `vercel.json` (new file)
- `.gitignore` (update existing)

#### 2.4 Commit & Push
```bash
git add .
git commit -m "v2.0: AI-powered with OpenRouter + Supabase"
git push origin v2.0
```

---

### Phase 3: Deploy to Vercel (5 min)

#### 3.1 Connect Vercel to GitHub
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `mindspanner/mindspanai`
4. Click "Import"

#### 3.2 Configure Environment Variables
In Vercel project settings:
1. Go to **Settings** → **Environment Variables**
2. Add:
   - `OPENROUTER_API_KEY` = (your OpenRouter key from Phase 1.1)
   - `SUPABASE_URL` = (your Supabase URL from Phase 1.2)
   - `SUPABASE_ANON_KEY` = (your Supabase anon key from Phase 1.2)
3. **Save**

#### 3.3 Deploy
1. Go to **Deployments**
2. Vercel auto-deploys from `v2.0` branch
3. Wait ~60 seconds
4. Click deployment URL (e.g., `mindspanai.vercel.app`)
5. **Test it!** → Ask a question → Should get AI response

---

### Phase 4: Update SquareSpace Embed (2 min)

#### 4.1 Update iFrame URL
1. Log into www.mindspan.com.au admin
2. Go to page at `/agent`
3. Edit the Code Block
4. Replace iFrame `src` with:
   ```html
   src="https://mindspanai.vercel.app/"
   ```
   (or your custom Vercel domain)
5. **Publish**

#### 4.2 Test Live Site
1. Visit www.mindspan.com.au/agent
2. Ask: "What services do you offer?"
3. Should get AI-generated response (not keyword match)
4. Check typing indicator appears
5. Verify emergency keywords still work

---

### Phase 5: Merge to Main (Optional – After Testing)

Once you've tested v2.0 and it's working:
```bash
git checkout main
git merge v2.0
git push origin main
```

This makes v2.0 the default branch.

---

## 🧪 Testing Checklist

Before marking as "production-ready":

- [ ] Ask 5 different questions → AI responds correctly
- [ ] Test emergency keywords ("I'm suicidal") → Banner appears
- [ ] Check mobile UI → Compact, readable, functional
- [ ] Verify typing indicator shows/hides correctly
- [ ] Test on iPhone Safari + Android Chrome
- [ ] Check analytics → Logs appear in Supabase (if configured)
- [ ] Test API fallback → Disable OpenRouter key → Should fall back to keyword matching
- [ ] Verify booking links work → Click → Opens Halaxy
- [ ] Load test → Send 10 rapid messages → No crashes

---

## 📊 Analytics Dashboard (Supabase)

### View Interaction Logs
1. Go to Supabase dashboard
2. **Table Editor** → `interactions`
3. See all user queries, timestamps, emergency flags

### Daily Stats
1. **SQL Editor** → New query:
```sql
SELECT * FROM daily_stats;
```
2. See total interactions, unique sessions, emergency count per day

### Unmatched Queries (Learning)
1. **SQL Editor** → Run:
```sql
SELECT * FROM get_unmatched_queries();
```
2. Shows queries that triggered fallback (opportunity to improve AI)

### Emergency Situations
1. **SQL Editor** → Run:
```sql
SELECT * FROM emergency_interactions;
```
2. Review all crisis triggers → Consider follow-up protocols

---

## 🔄 Rollback Plan (If Issues)

### Instant Rollback via Vercel
1. Go to Vercel dashboard → **Deployments**
2. Find previous v1.0 deployment
3. Click "..." → **Promote to Production**
4. Live in ~10 seconds

### Git Rollback
```bash
git checkout main
git revert HEAD
git push origin main
```

### Emergency Fallback
If Vercel is down, update SquareSpace iFrame to:
```html
src="https://mindspanner.github.io/mindspanai/"
```
(GitHub Pages backup – always hosts latest `main` branch)

---

## 💰 Cost Management

### Monitor Usage

**OpenRouter**:
- Dashboard: https://openrouter.ai/dashboard
- Set spending limit: $5/month
- Alert at 80% threshold

**Vercel**:
- Dashboard: https://vercel.com/usage
- Free tier: 100GB bandwidth/month
- ~10,000 conversations/month ≈ 10GB

**Supabase**:
- Dashboard: Supabase project → Settings → Database
- Free tier: 500MB database
- ~100,000 interaction logs ≈ 50MB

### Expected Monthly Cost
- **0-100 conversations/month**: $0
- **100-1000 conversations/month**: $0-5
- **1000-5000 conversations/month**: $5-15
- **5000+ conversations/month**: $15-30

---

## 🔐 Security Best Practices

### API Key Management
✅ **NEVER commit .env to Git** – Already in .gitignore  
✅ **Use Vercel environment variables** – Encrypted at rest  
✅ **Rotate keys quarterly** – Generate new keys, update Vercel  
✅ **Monitor for leaks** – Check GitHub commits for accidental exposure

### Rate Limiting
Current: None (relying on Vercel's built-in limits)  
**Recommended**: Add Upstash Redis for per-user rate limiting (Phase 3 feature)

### CORS
Currently: `Access-Control-Allow-Origin: *`  
**Recommended**: Restrict to `https://mindspan.com.au` in production

---

## 🐛 Troubleshooting

### Issue: "API Error: 500"
**Cause**: OpenRouter key invalid or quota exceeded  
**Fix**: Check OpenRouter dashboard, verify key in Vercel env vars

### Issue: "Connection error" in UI
**Cause**: Vercel function timeout or network issue  
**Fix**: Check Vercel logs (Dashboard → Functions → Logs)

### Issue: No analytics in Supabase
**Cause**: Supabase env vars not set or RLS policy blocking inserts  
**Fix**: Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel, check Supabase logs

### Issue: AI responses are generic/wrong
**Cause**: System prompt not being followed or knowledge base outdated  
**Fix**: Update `KNOWLEDGE_BASE` in `api/chat.js`, redeploy

### Issue: Mobile UI broken
**Cause**: CSS not loading or viewport meta tag missing  
**Fix**: Hard refresh (Ctrl+Shift+R), check browser console for errors

---

## 🚦 Next Steps After Deployment

### Week 1
- [ ] Monitor Supabase daily → Review emergency interactions
- [ ] Export unmatched queries → Identify gaps in knowledge base
- [ ] Test on 5 different devices (iOS, Android, desktop)
- [ ] Collect user feedback

### Month 1
- [ ] Review OpenRouter usage/costs
- [ ] Analyze daily stats → Peak usage times?
- [ ] Update knowledge base if services/fees changed
- [ ] Consider adding suggested FAQs to UI

### Month 3
- [ ] Evaluate upgrade to GPT-4 (better quality, higher cost)
- [ ] Build admin dashboard (view analytics without SQL)
- [ ] Add multi-turn conversation (context retention)
- [ ] Implement rate limiting (Upstash Redis)

---

## 📞 Support

**Deployment Issues**: Continue this Claude conversation  
**Vercel Support**: https://vercel.com/support  
**OpenRouter Support**: https://openrouter.ai/docs  
**Supabase Support**: https://supabase.com/docs

---

## ✅ Deployment Complete!

Once all steps are done, you'll have:
- ✅ AI-powered chat at www.mindspan.com.au/agent
- ✅ Persistent analytics in Supabase
- ✅ Serverless backend on Vercel
- ✅ Zero downtime deployments via Git push
- ✅ Cost: $0-5/month
- ✅ Version control + rollback capability

**Time to deploy updates**: `git push` → Live in 30 seconds

**Questions?** Continue this conversation or check troubleshooting above.
