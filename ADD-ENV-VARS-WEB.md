# 🔑 Add Environment Variables via Vercel Dashboard

The CLI is having issues, so let's use the web dashboard instead (2 minutes):

## Step-by-Step:

### 1. Open Vercel Dashboard
Visit: **https://vercel.com/mindspans-projects/mindspanai/settings/environment-variables**

(Or navigate: Vercel Dashboard → mindspanai project → Settings → Environment Variables)

### 2. Add These Three Variables:

Click "Add New" for each:

**Variable 1:**
- Name: `OPENROUTER_API_KEY`
- Value: `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`
- Environment: Check ✅ Production, Preview, Development
- Click: Save

**Variable 2:**
- Name: `SUPABASE_URL`
- Value: `https://fwhukkbknkoalwerhhbm.supabase.co`
- Environment: Check ✅ Production, Preview, Development
- Click: Save

**Variable 3:**
- Name: `SUPABASE_ANON_KEY`
- Value: `sb_publishable_amFnMjhE_HVlnyv1dQb4OQ_AsLfOX4u`
- Environment: Check ✅ Production, Preview, Development
- Click: Save

### 3. Redeploy
- Go to: **Deployments** tab
- Click the three dots (...) next to the latest deployment
- Click: **Redeploy**
- Wait 30-60 seconds

### 4. Get Your Live URL
Once redeployment finishes, you'll see:
```
https://mindspanai.vercel.app
```
or
```
https://mindspanai-xxxxx.vercel.app
```

**Copy this URL and paste it back to me!**

---

## Quick Links:

- **Settings**: https://vercel.com/mindspans-projects/mindspanai/settings/environment-variables
- **Deployments**: https://vercel.com/mindspans-projects/mindspanai

---

**This will take 2 minutes, then your V2.0 will be LIVE!** 🚀
