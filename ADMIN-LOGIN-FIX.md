# Admin Login Fix - Google OAuth Configuration

## 🔴 Current Issue

**Error**: "Invalid token" when trying to log into admin panel
**Cause**: Google Cloud Console OAuth settings missing required redirect URIs

---

## ✅ Solution: Update Google Cloud Console

You need to add authorized redirect URIs to your Google Cloud Console OAuth configuration.

### Step 1: Access Google Cloud Console

1. Go to: https://console.cloud.google.com/
2. Sign in with: **mindspan.aus@gmail.com**
3. Select your project (or create one if you haven't)

### Step 2: Navigate to OAuth Consent Screen

1. In the left sidebar, click **APIs & Services**
2. Click **OAuth consent screen**
3. Verify your app is configured:
   - **User Type**: External (or Internal if you have Google Workspace)
   - **App name**: MindspanAI Admin
   - **User support email**: mindspan.aus@gmail.com
   - **Developer contact**: mindspan.aus@gmail.com

### Step 3: Configure Authorized Redirect URIs

1. In the left sidebar, click **Credentials**
2. Find your OAuth 2.0 Client ID:
   - Client ID: `307476088864-r8a2i0e125rr5tsp32mn8qkbgnfbuhaj.apps.googleusercontent.com`
3. Click on the Client ID to edit
4. Scroll to **Authorized JavaScript origins**
5. Add these URIs:
   ```
   https://mindspanai.vercel.app
   ```

6. Scroll to **Authorized redirect URIs**
7. Add these URIs:
   ```
   https://mindspanai.vercel.app/admin/login.html
   https://mindspanai.vercel.app/admin/dashboard.html
   ```

8. Click **Save**

### Step 4: Wait for Propagation

- Changes may take 5-10 minutes to propagate
- Google's systems need to update globally

---

## 🧪 Test the Fix

### After Making Changes:

1. Wait 5-10 minutes
2. Visit: https://mindspanai.vercel.app/admin/login.html
3. Click **Sign in with Google**
4. Select your account: **mindspan.aus@gmail.com**
5. Grant permissions if prompted
6. You should be redirected to the admin dashboard

### Expected Result:

✅ Login successful
✅ Redirected to `/admin/dashboard.html`
✅ Dashboard displays 4 tabs (Website Scraper, Knowledge Base, AI Settings, Site Config)

---

## 🔍 Verification Steps

### 1. Check Environment Variables (Already Set)

Your Vercel environment variables are correctly configured:
- ✅ `GOOGLE_CLIENT_ID` is set
- ✅ `GOOGLE_CLIENT_SECRET` is set

You can verify at: https://vercel.com/your-project/settings/environment-variables

### 2. Test Auth Endpoint

Visit: https://mindspanai.vercel.app/api/admin/test-auth

Expected response:
```json
{
  "status": "OK",
  "config": {
    "clientIdSet": true,
    "clientIdLength": 72,
    "clientIdPrefix": "307476088864-r8a2i0...",
    "clientSecretSet": true,
    "timestamp": "2026-02-16T..."
  }
}
```

### 3. Check Browser Console

When testing login, open browser DevTools (F12) and check Console tab for debugging logs:

**Expected logs on successful login**:
```
Token data: {aud: "307476088864-...", email: "mindspan.aus@gmail.com", email_verified: true}
Expected CLIENT_ID: 307476088864-...
Token verified successfully for: mindspan.aus@gmail.com
```

**If you see errors**:
- "Invalid audience" → Client ID mismatch (check Vercel env vars)
- "Email not verified" → Verify your Google account email
- "Unauthorized email" → Email not in allowlist (currently: mindspan.aus@gmail.com)

---

## 📋 Complete OAuth Configuration Checklist

Before testing, ensure:

- [ ] Google Cloud Console project created
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Client ID created
- [ ] Client ID matches: `307476088864-r8a2i0e125rr5tsp32mn8qkbgnfbuhaj.apps.googleusercontent.com`
- [ ] Authorized JavaScript origins includes: `https://mindspanai.vercel.app`
- [ ] Authorized redirect URIs include:
  - [ ] `https://mindspanai.vercel.app/admin/login.html`
  - [ ] `https://mindspanai.vercel.app/admin/dashboard.html`
- [ ] Waited 5-10 minutes after saving changes
- [ ] Vercel environment variables set:
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`

---

## 🚨 Common Issues & Solutions

### Issue 1: "Invalid token" Error

**Symptoms**: Red error message on login page
**Cause**: OAuth redirect URIs not configured
**Solution**: Follow Step 3 above to add redirect URIs

### Issue 2: "Unauthorized email" Error

**Symptoms**: Login succeeds but shows "Only authorized Mindspan emails are allowed"
**Cause**: Email not in allowlist
**Current allowlist**:
- `mindspan.aus@gmail.com` (specific email)
- Anyone with `@mindspan.com.au` domain

**Solution**:
- If you want to use a different email, update `api/admin/auth.js` line 11
- Or ensure you're logging in with `mindspan.aus@gmail.com`

### Issue 3: Redirect Loop

**Symptoms**: Keeps redirecting between login and dashboard
**Cause**: Session token not being stored
**Solution**:
- Clear browser localStorage: `localStorage.clear()`
- Disable ad blockers/privacy extensions that might block localStorage
- Try incognito/private browsing mode

### Issue 4: "Access blocked: This app's request is invalid"

**Symptoms**: Google shows error page instead of login
**Cause**: OAuth consent screen not properly configured
**Solution**:
- Go to OAuth consent screen in Google Cloud Console
- Ensure app is in "Testing" or "Published" state
- Add your email to test users if app is in "Testing" mode

---

## 🎯 What Happens After Successful Login

1. **Token verification** (`api/admin/auth.js`):
   - Google token verified via `oauth2.googleapis.com/tokeninfo`
   - Email checked against allowlist
   - Session token created (24-hour expiry)

2. **Session storage** (browser localStorage):
   - `mindspanai_admin_token`: Base64 encoded session data
   - `mindspanai_admin_user`: JSON with user info (email, name, picture)

3. **Dashboard access** (`admin/dashboard.html`):
   - Checks for valid session token
   - Displays 4 tabs:
     - **Website Scraper**: Manual sync + daily auto-sync status
     - **Knowledge Base**: View/edit scraped content
     - **AI Settings**: Model selection, temperature control
     - **Site Config**: Contact info, emergency settings

4. **Session expiry**:
   - Tokens expire after 24 hours
   - User redirected back to login page
   - Must re-authenticate with Google

---

## 🔐 Security Notes

### Current Implementation:

- ✅ Google OAuth 2.0 token verification
- ✅ Email domain restriction (@mindspan.com.au)
- ✅ Specific email allowlist (mindspan.aus@gmail.com)
- ✅ HTTPS-only (Vercel enforces)
- ✅ 24-hour session expiry

### Future Enhancements (Optional):

- Use proper JWT library instead of Base64 encoding
- Add refresh tokens for seamless session renewal
- Implement CSRF protection
- Add rate limiting to prevent brute force
- Store session tokens in secure httpOnly cookies instead of localStorage

---

## 📞 Still Having Issues?

If you've followed all steps and still can't log in:

1. **Check the diagnostic endpoint**:
   - Visit: https://mindspanai.vercel.app/api/admin/test-auth
   - Verify `clientIdSet: true` and `clientSecretSet: true`

2. **Check Vercel deployment logs**:
   - Go to: https://vercel.com/your-project/deployments
   - Click on latest deployment
   - Check Function Logs for `/api/admin/auth`
   - Look for console.log outputs showing token verification

3. **Browser console debugging**:
   - Open DevTools (F12) on login page
   - Check Console tab for JavaScript errors
   - Check Network tab for failed API requests
   - Look for CORS errors or 401/403 responses

4. **Contact me**:
   - Email detailed screenshots of:
     - Login error message
     - Browser console (F12 → Console tab)
     - Network tab showing `/api/admin/auth` request/response
   - Include exact steps you took before the error

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ Click "Sign in with Google" → Google login popup appears
2. ✅ Select mindspan.aus@gmail.com → Permissions screen (first time only)
3. ✅ Grant permissions → Popup closes
4. ✅ Automatically redirected to `/admin/dashboard.html`
5. ✅ Dashboard loads with 4 tabs visible
6. ✅ "Website Scraper" tab shows 7 pages monitored
7. ✅ "Run Scrape Now" button is clickable
8. ✅ Top-right shows user profile picture and email

---

**Last Updated**: 2026-02-16
**Status**: Waiting for Google Cloud Console configuration
**Estimated Fix Time**: 15 minutes (10 min config + 5 min propagation)
