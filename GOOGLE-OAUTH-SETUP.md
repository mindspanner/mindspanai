# Google OAuth Setup Guide

This guide walks you through setting up Google OAuth authentication for the MindspanAI admin panel.

## Why Google OAuth?

- **Secure**: Only @mindspan.com.au email addresses can access the admin panel
- **No passwords**: Uses your existing Google account
- **Easy management**: Revoke access anytime from Google account settings

---

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Project name: `MindspanAI Admin`
4. Click **Create**

---

## Step 2: Enable Google OAuth

1. In the left sidebar, go to **APIs & Services** → **OAuth consent screen**
2. Select **External** (allows any Google account, but we'll restrict by domain in code)
3. Click **Create**

### Configure OAuth Consent Screen:

- **App name**: `MindspanAI Admin`
- **User support email**: `info@mindspan.com.au`
- **Developer contact**: `info@mindspan.com.au`
- **Authorized domains**: Add `mindspanai.vercel.app` and `mindspan.com.au`
- Click **Save and Continue**

### Scopes:

- Click **Add or Remove Scopes**
- Select:
  - `email`
  - `profile`
  - `openid`
- Click **Update** → **Save and Continue**

### Test users (optional):

- You can add `info@mindspan.com.au` as a test user
- Click **Save and Continue**

---

## Step 3: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `MindspanAI Admin Login`

### Authorized JavaScript origins:

Add these URLs:
```
https://mindspanai.vercel.app
https://www.mindspan.com.au
http://localhost:3000
```

### Authorized redirect URIs:

Add these URLs:
```
https://mindspanai.vercel.app/admin/login.html
https://www.mindspan.com.au/ai
http://localhost:3000/admin/login.html
```

5. Click **Create**

---

## Step 4: Get Your Credentials

After creating, you'll see a popup with:

- **Client ID**: `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-abc123def456`

**Important**: Copy both of these - you'll need them in the next steps!

---

## Step 5: Add Credentials to Vercel

### Option 1: Via Vercel Dashboard (Easiest)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `mindspanai` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `GOOGLE_CLIENT_ID` | Your Client ID from Step 4 | Production, Preview, Development |
| `GOOGLE_CLIENT_SECRET` | Your Client Secret from Step 4 | Production, Preview, Development |

5. Click **Save**

### Option 2: Via Vercel CLI

```bash
cd "/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web"

vercel env add GOOGLE_CLIENT_ID production
# Paste your Client ID when prompted

vercel env add GOOGLE_CLIENT_SECRET production
# Paste your Client Secret when prompted

vercel env add GOOGLE_CLIENT_ID preview
# Paste your Client ID when prompted

vercel env add GOOGLE_CLIENT_SECRET preview
# Paste your Client Secret when prompted
```

---

## Step 6: Update Admin Login Page

Open `admin/login.html` and replace this line:

```javascript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
```

With your actual Client ID:

```javascript
const GOOGLE_CLIENT_ID = '123456789-abcdefg.apps.googleusercontent.com';
```

---

## Step 7: Deploy Changes

```bash
cd "/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web"

git add .
git commit -m "Add Google OAuth admin authentication"
git push origin main

# Or deploy directly
vercel --prod
```

Wait ~30 seconds for deployment to complete.

---

## Step 8: Test Admin Login

1. Go to `https://mindspanai.vercel.app/admin/login.html`
2. Click **Sign in with Google**
3. Select your @mindspan.com.au account
4. You should be redirected to the admin dashboard

### Troubleshooting:

**Error: "Invalid client ID"**
- Make sure you updated `admin/login.html` with the correct Client ID
- Redeploy after making changes

**Error: "Unauthorized domain"**
- Verify the email domain is @mindspan.com.au
- Only this domain is allowed (configured in `api/admin/auth.js`)

**Error: "Redirect URI mismatch"**
- Go back to Google Cloud Console
- Add the exact URL you're testing from to Authorized redirect URIs
- Wait a few minutes for changes to propagate

---

## Security Notes

✅ **What's Protected:**
- Only @mindspan.com.au emails can log in
- Admin routes require authentication token
- Tokens expire after 24 hours

⚠️ **Important:**
- Never commit `GOOGLE_CLIENT_SECRET` to Git (it's in .env which is git-ignored)
- The Client ID is safe to be public (it's in the HTML file)
- You can revoke access anytime from Google Cloud Console

---

## Managing Access

### To revoke admin access:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select **MindspanAI Admin** project
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth client
5. Click **Delete** to revoke all access

### To add more allowed domains:

Edit `api/admin/auth.js`:

```javascript
const ALLOWED_DOMAINS = ['mindspan.com.au', 'otherdomain.com'];

// Update the check:
if (!ALLOWED_DOMAINS.includes(emailDomain)) {
    return Response with 403 error
}
```

---

## Need Help?

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- Contact: info@mindspan.com.au
