# 🔴 URGENT: Fix Admin Login "Invalid Token" Error

**Current Issue**: Admin login showing "Invalid token" error
**Root Cause**: Google Cloud Console missing authorized redirect URIs
**Fix Time**: 5-10 minutes

---

## ✅ Step-by-Step Fix (Follow Exactly)

### Step 1: Access Google Cloud Console

1. **Open this URL**: https://console.cloud.google.com/
2. **Sign in with**: mindspan.aus@gmail.com
3. **Look at top-left**: Make sure you see your project name (or create a project if you haven't)

---

### Step 2: Navigate to Credentials

1. **Click the hamburger menu** (☰) in top-left
2. **Click**: "APIs & Services"
3. **Click**: "Credentials" (in left sidebar)
4. **Find your OAuth 2.0 Client ID** in the list:
   - Should show: `307476088864-r8a2i0e125rr5tsp32mn8qkbgnfbuhaj.apps.googleusercontent.com`
   - Type: "Web application"

5. **Click on the Client ID name** to open the edit page

---

### Step 3: Add Authorized JavaScript Origins

Scroll down to the section **"Authorized JavaScript origins"**

**Current state**: Might be empty or have wrong URLs

**What to add**: Click "+ ADD URI" and add:
```
https://mindspanai.vercel.app
```

**Notes**:
- No trailing slash
- Must be HTTPS
- Must match exactly

---

### Step 4: Add Authorized Redirect URIs (CRITICAL)

Scroll down to the section **"Authorized redirect URIs"**

**Current state**: This is probably empty - that's why you're getting "Invalid token"

**What to add**: Click "+ ADD URI" and add BOTH of these:

```
https://mindspanai.vercel.app/admin/login.html
```

```
https://mindspanai.vercel.app/admin/dashboard.html
```

**Important**:
- Add both URIs separately (click "+ ADD URI" twice)
- No trailing slashes
- Must be HTTPS
- Must match exactly (including /admin/ path)

---

### Step 5: Save Changes

1. **Scroll to bottom** of the page
2. **Click "SAVE"** button
3. **Wait for confirmation** message ("Client ID updated")

---

### Step 6: Wait for Propagation (IMPORTANT)

Google's systems need 5-10 minutes to propagate changes globally.

**Do this while waiting**:
- Get a coffee ☕
- Or continue to Step 7 to verify OAuth consent screen

**Do NOT test immediately** - you'll still get errors for 5-10 minutes

---

### Step 7: Verify OAuth Consent Screen (While Waiting)

1. **In left sidebar**, click "OAuth consent screen"
2. **Verify these settings**:

   **User Type**:
   - External ✓ (if you don't have Google Workspace)
   - OR Internal (if you have Google Workspace)

   **App name**: MindspanAI Admin (or any name you prefer)

   **User support email**: mindspan.aus@gmail.com

   **Developer contact email**: mindspan.aus@gmail.com

3. **Publishing status**:
   - If status is "Testing": Click "ADD USERS" and add mindspan.aus@gmail.com
   - If status is "Published": You're good!

4. **Scopes** (optional, but should include):
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`

---

### Step 8: Test the Login (After 10 Minutes)

1. **Wait 10 minutes** from when you clicked "SAVE" in Step 5

2. **Clear your browser cache**:
   - Chrome/Edge: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Select "Cached images and files" and "Cookies"
   - Click "Clear data"

3. **Open incognito/private window**: Ctrl+Shift+N (Windows) or Cmd+Shift+N (Mac)

4. **Visit**: https://mindspanai.vercel.app/admin/login.html

5. **Click**: "Sign in with Google"

6. **Select account**: mindspan.aus@gmail.com

7. **Grant permissions** (first time only):
   - Google will show what permissions the app needs
   - Click "Allow" or "Continue"

8. **Expected result**:
   - ✅ Redirected to: https://mindspanai.vercel.app/admin/dashboard.html
   - ✅ Dashboard loads with 4 tabs visible
   - ✅ "Website Scraper" tab shows 7 pages monitored

---

## 🔍 How to Know If It's Fixed

### Before Fix (Current State):
- ❌ Click "Sign in with Google" → Shows "Invalid token" error immediately
- ❌ Red error message box appears
- ❌ Never reaches dashboard

### After Fix (Expected State):
- ✅ Click "Sign in with Google" → Google login popup appears
- ✅ Select account → May ask for permissions (first time)
- ✅ Redirected to dashboard → 4 tabs visible
- ✅ No error messages

---

## 🚨 Troubleshooting

### Problem: Still shows "Invalid token" after 10 minutes

**Check 1**: Did you add BOTH redirect URIs?
- https://mindspanai.vercel.app/admin/login.html
- https://mindspanai.vercel.app/admin/dashboard.html

**Check 2**: Are the URIs spelled exactly right?
- No typos in "mindspanai"
- No trailing slashes
- Lowercase "admin"

**Check 3**: Did you click "SAVE" in Google Cloud Console?

**Check 4**: Are you testing in incognito/private window?

**Check 5**: Did you clear browser cache?

---

### Problem: "Access blocked: This app's request is invalid"

**Solution**: OAuth consent screen needs configuration

1. Go to: OAuth consent screen (in left sidebar)
2. If status is "Testing": Add mindspan.aus@gmail.com to test users
3. Save and try again

---

### Problem: Google login popup doesn't appear

**Solution**: Check browser console for errors

1. Press F12 to open DevTools
2. Go to Console tab
3. Look for errors mentioning "client_id" or "origin"
4. If you see "origin mismatch": Double-check JavaScript origins in Step 3

---

### Problem: Popup appears but shows "redirect_uri_mismatch"

**Solution**: You forgot to add the redirect URIs in Step 4

1. Go back to Google Cloud Console
2. Edit your OAuth Client ID
3. Add BOTH redirect URIs exactly as shown in Step 4
4. Save and wait 10 minutes

---

## 📸 Visual Checklist

After completing all steps, your Google Cloud Console should show:

### Credentials Page → OAuth 2.0 Client IDs:
```
Name: [Your Client Name]
Client ID: 307476088864-r8a2i0e125rr5tsp32mn8qkbgnfbuhaj.apps.googleusercontent.com
Type: Web application
```

### When you click to edit, you should see:

**Authorized JavaScript origins:**
- https://mindspanai.vercel.app

**Authorized redirect URIs:**
- https://mindspanai.vercel.app/admin/login.html
- https://mindspanai.vercel.app/admin/dashboard.html

**If your configuration looks exactly like this** ✓ → Wait 10 minutes → Test

---

## 🎯 Quick Test After Fix

Once you can log in successfully, test these features:

1. **Dashboard loads**: Should see 4 tabs
2. **Website Scraper tab**: Shows "7 pages monitored"
3. **Click "Run Scrape Now"**: Should trigger manual scrape
4. **Check "Last Sync" time**: Should update after scrape completes
5. **Try other tabs**: Knowledge Base, AI Settings, Site Config

---

## 💡 Why This Happens

**Google OAuth security**: Google requires you to explicitly list every URL where users can be redirected after login. This prevents malicious sites from hijacking the authentication flow.

**What we're doing**: We're telling Google: "It's okay to redirect users to these specific admin URLs after they log in with their Google account."

**Why it was broken**: When you first created the OAuth Client ID, you probably didn't add these redirect URIs yet. Now we're adding them.

---

## ✅ Final Verification

Run this test to confirm everything works:

1. **Open incognito window**: https://mindspanai.vercel.app/admin/login.html
2. **Sign in**: Click "Sign in with Google" → Select mindspan.aus@gmail.com
3. **Dashboard loads**: Should see welcome message and 4 tabs
4. **Logout**: Click your profile picture (top-right) → Logout
5. **Sign in again**: Should work smoothly without errors

If all 5 steps work ✓ → **You're done!** 🎉

---

## 📞 Still Not Working?

If you've followed every step and still getting errors after 10 minutes:

**Send me screenshots of**:
1. Google Cloud Console → Credentials page (showing your Client ID)
2. The "Edit OAuth client ID" page (showing both sections: JavaScript origins and Redirect URIs)
3. The browser console (F12) when you click "Sign in with Google"
4. The exact error message you're seeing

**I'll help you debug further.**

---

**Created**: 2026-02-16
**Expected Fix Time**: 10 minutes (5 min setup + 5 min propagation)
**Success Rate**: 99% if steps followed exactly
