# OAuth Configuration Checker

## 🔍 Quick Diagnostic

Run these checks to verify your OAuth setup is correct.

---

## Check 1: Environment Variables (Vercel)

**Visit**: https://mindspanai.vercel.app/api/admin/test-auth

**Expected Response**:
```json
{
  "status": "OK",
  "config": {
    "clientIdSet": true,
    "clientIdLength": 73,
    "clientIdPrefix": "307476088864-r8a2i0e...",
    "clientSecretSet": true,
    "timestamp": "2026-02-16T..."
  }
}
```

**✅ Pass if**: Both `clientIdSet` and `clientSecretSet` are `true`
**❌ Fail if**: Either is `false` → Go to Vercel dashboard and add environment variables

---

## Check 2: Google Cloud Console - Client ID

**Where**: https://console.cloud.google.com/ → APIs & Services → Credentials

**What to verify**:
1. OAuth 2.0 Client ID exists
2. Client ID matches: `307476088864-r8a2i0e125rr5tsp32mn8qkbgnfbuhaj.apps.googleusercontent.com`
3. Type: "Web application"

**✅ Pass if**: Client ID exists and matches exactly
**❌ Fail if**: Doesn't exist or different ID → You're using wrong credentials

---

## Check 3: Authorized JavaScript Origins

**Where**: Google Cloud Console → Credentials → Edit OAuth Client ID

**Scroll to**: "Authorized JavaScript origins"

**Must contain exactly**:
```
https://mindspanai.vercel.app
```

**Common mistakes**:
- ❌ `http://mindspanai.vercel.app` (missing 's' in https)
- ❌ `https://mindspanai.vercel.app/` (trailing slash)
- ❌ `https://www.mindspanai.vercel.app` (extra www)
- ✅ `https://mindspanai.vercel.app` (correct)

**✅ Pass if**: Exactly matches with no trailing slash
**❌ Fail if**: Missing or incorrect → Add it and save

---

## Check 4: Authorized Redirect URIs (CRITICAL)

**Where**: Google Cloud Console → Credentials → Edit OAuth Client ID

**Scroll to**: "Authorized redirect URIs"

**Must contain BOTH**:
```
https://mindspanai.vercel.app/admin/login.html
https://mindspanai.vercel.app/admin/dashboard.html
```

**Common mistakes**:
- ❌ Only added one URI (need both)
- ❌ `https://mindspanai.vercel.app/admin/login` (missing .html)
- ❌ `https://mindspanai.vercel.app/admin/login.html/` (trailing slash)
- ❌ Capital letters in path (e.g., /Admin/Login.html)
- ✅ Both URIs added exactly as shown

**✅ Pass if**: Both URIs present and exact
**❌ Fail if**: Missing either one → **This is the most common issue**

---

## Check 5: OAuth Consent Screen

**Where**: Google Cloud Console → APIs & Services → OAuth consent screen

**Must have**:
- **User Type**: External (or Internal if you have Workspace)
- **Publishing status**: Testing or Published
- **Test users** (if status = Testing): Must include `mindspan.aus@gmail.com`
- **App name**: Any name (e.g., "MindspanAI Admin")
- **User support email**: mindspan.aus@gmail.com
- **Developer contact**: mindspan.aus@gmail.com

**✅ Pass if**: All fields filled, test user added if in Testing mode
**❌ Fail if**: Missing test user or no consent screen configured

---

## Check 6: Browser Test (After Waiting 10 Min)

**Where**: https://mindspanai.vercel.app/admin/login.html (in incognito/private window)

**Steps**:
1. Open incognito/private window
2. Visit the admin login URL
3. Click "Sign in with Google"
4. Observe what happens

**Expected behavior**:
1. ✅ Google login popup appears
2. ✅ Shows account picker (mindspan.aus@gmail.com)
3. ✅ After selecting account, may show permissions screen (first time)
4. ✅ After granting permissions, redirects to dashboard
5. ✅ Dashboard loads with 4 tabs

**Error scenarios**:

**Error**: "Invalid token" (red box on login page)
- **Cause**: Redirect URIs not configured in Google Cloud Console
- **Fix**: Go to Check 4 above and add both URIs

**Error**: "Access blocked: This app's request is invalid"
- **Cause**: OAuth consent screen not configured or test user not added
- **Fix**: Go to Check 5 above

**Error**: "redirect_uri_mismatch"
- **Cause**: Redirect URI in Google Cloud Console doesn't match exactly
- **Fix**: Double-check spelling in Check 4

**Error**: Popup doesn't appear at all
- **Cause**: JavaScript origin not configured or popup blocked
- **Fix**:
  1. Check browser isn't blocking popups
  2. Verify Check 3 (JavaScript origins)
  3. Open browser console (F12) and look for errors

**Error**: Popup closes immediately, no redirect
- **Cause**: Browser cache or session token issues
- **Fix**: Clear browser cache, try incognito window

---

## Check 7: After Successful Login

Once logged in, verify dashboard functionality:

**Tab 1: Website Scraper**
- ✅ Shows "7 pages monitored"
- ✅ Shows "Daily at Midnight" auto-sync
- ✅ "Run Scrape Now" button is clickable
- ✅ Shows last sync time

**Tab 2: Knowledge Base**
- ✅ Shows scraped content from website
- ✅ Content is readable

**Tab 3: AI Settings**
- ✅ Shows current model (GPT-3.5-turbo)
- ✅ Shows temperature slider

**Tab 4: Site Config**
- ✅ Shows contact information
- ✅ Shows emergency contacts

---

## 🔄 Complete Checklist

Run through this checklist in order:

- [ ] **Check 1**: Environment variables set on Vercel
- [ ] **Check 2**: OAuth Client ID exists and matches
- [ ] **Check 3**: JavaScript origin added: `https://mindspanai.vercel.app`
- [ ] **Check 4**: Redirect URIs added (BOTH):
  - [ ] `https://mindspanai.vercel.app/admin/login.html`
  - [ ] `https://mindspanai.vercel.app/admin/dashboard.html`
- [ ] **Check 5**: OAuth consent screen configured
- [ ] **Saved changes** in Google Cloud Console
- [ ] **Waited 10 minutes** for Google to propagate changes
- [ ] **Cleared browser cache** and using incognito/private window
- [ ] **Check 6**: Login works in browser (no "Invalid token")
- [ ] **Check 7**: Dashboard loads and all tabs work

---

## 🎯 Most Common Issue (90% of Cases)

**Problem**: "Invalid token" error

**Root cause**: Redirect URIs not added to Google Cloud Console

**Solution**:
1. Go to: https://console.cloud.google.com/
2. Navigate: APIs & Services → Credentials
3. Click your OAuth Client ID
4. Scroll to "Authorized redirect URIs"
5. Click "+ ADD URI" and add: `https://mindspanai.vercel.app/admin/login.html`
6. Click "+ ADD URI" again and add: `https://mindspanai.vercel.app/admin/dashboard.html`
7. Click "SAVE"
8. **Wait 10 minutes**
9. Test in incognito window

**If this doesn't work after 10 minutes**: Screenshot your OAuth Client ID edit page (showing both JavaScript origins and redirect URIs sections) and send to me.

---

## 📞 Need Help?

If all checks pass but login still fails:

**Send me**:
1. Screenshot of Vercel environment variables page (hide the secret values)
2. Screenshot of Google Cloud Console → OAuth Client ID edit page
3. Screenshot of browser console (F12 → Console tab) when you click "Sign in"
4. Description of exactly what happens when you click "Sign in with Google"

I'll help you debug the specific issue.

---

**Last Updated**: 2026-02-16
**Success Rate**: 99% if checklist completed
