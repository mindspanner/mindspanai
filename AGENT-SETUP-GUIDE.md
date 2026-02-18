# MindspanAI Agent Setup Guide

**Version**: 3.2.0
**Date**: 2026-02-18
**Live URL**: https://mindspanai.vercel.app
**SquareSpace Site**: www.mindspan.com.au

---

## Overview

There are two things to set up on your SquareSpace site:

| # | What | Where | Purpose |
|---|------|-------|---------|
| 1 | **/agent page** | SquareSpace page `/agent` | Full-screen chat interface for dedicated use |
| 2 | **Global floating popup** | Every page (footer code injection) | Floating orb that opens a chat popup from any page |
| 3 | **Navigation button** *(optional)* | Site header (header code injection) | "Ask MindspanAI" link in your nav menu |

---

## Part 1: /agent Page — Full Chat Interface

### What This Does

Embeds the full MindspanAI chat interface on your dedicated `/agent` page. Visitors see the complete chat UI with sidebar, quick actions, and the full conversation experience.

### Step-by-Step

1. Log into SquareSpace admin at **www.mindspan.com.au**
2. Go to **Pages** in the left sidebar
3. Find and click the **/agent** page (create one if it doesn't exist)
4. Click **Edit** on the page
5. Click the **+** button to add a block
6. Search for **"Code"** and select the **Code** block
7. Paste the code below into the code block
8. Click **Save**
9. Click **Publish** to make it live
10. Test at **https://www.mindspan.com.au/agent**

### Code to Paste

```html
<iframe
    src="https://mindspanai.vercel.app/"
    width="100%"
    height="900px"
    frameborder="0"
    style="border: none; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: white;"
    title="MindspanAI - Your 24/7 Assistant"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin allow-forms"
></iframe>
```

---

## Part 2: Global Floating Chat Popup (Every Page)

### What This Does

Adds a floating chat orb in the bottom-right corner of **every page** on your site. When clicked, it opens a popup window with the full MindspanAI chat interface. Includes:

- Animated floating orb with pulse effect
- Popup window (420x680px) with chat iframe
- Close button, click-outside-to-close, ESC key support
- Mobile responsive (full-width popup on small screens)
- Privacy notice footer
- Keyboard accessible

### Step-by-Step

1. Go to **Settings** > **Advanced** > **Code Injection**
2. Click the **Footer** section
3. Paste the **entire** block of code below
4. Click **Save**
5. Hard refresh your site (**Cmd+Shift+R** on Mac, **Ctrl+F5** on Windows)
6. Look for the floating orb in the bottom-right corner of any page

### Code to Paste

```html
<!-- MindspanAI Floating Chat Popup v3.2.0 -->
<style>
.mindspan-chat-orb {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #2c5f7d 0%, #1e4257 100%);
    border-radius: 50%;
    box-shadow: 0 6px 24px rgba(44, 95, 125, 0.4);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 9999;
    animation: pulseOrb 3s ease-in-out infinite;
}

.mindspan-chat-orb:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 32px rgba(44, 95, 125, 0.6);
}

.mindspan-chat-orb:active {
    transform: scale(0.95);
}

@keyframes pulseOrb {
    0%, 100% {
        box-shadow: 0 6px 24px rgba(44, 95, 125, 0.4);
    }
    50% {
        box-shadow: 0 6px 32px rgba(44, 95, 125, 0.7);
    }
}

.orb-icon {
    width: 32px;
    height: 32px;
    color: white;
}

.orb-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: #f56565;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 11px;
    font-weight: 700;
    display: none;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    animation: bounceIn 0.5s;
}

@keyframes bounceIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

.mindspan-chat-popup {
    position: fixed;
    bottom: 100px;
    right: 24px;
    width: 420px;
    height: 680px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);
    display: none;
    flex-direction: column;
    overflow: hidden;
    z-index: 9998;
    animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mindspan-chat-popup.active {
    display: flex;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.chat-popup-header {
    background: linear-gradient(135deg, #2c5f7d 0%, #1e4257 100%);
    color: white;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.chat-header-title {
    font-size: 17px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
}

.chat-close-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.chat-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
}

.chat-popup-body {
    flex: 1;
    overflow: hidden;
    background: #f5f7fa;
}

.chat-popup-body iframe {
    width: 100%;
    height: 100%;
    border: none;
}

.chat-privacy-notice {
    padding: 14px 20px;
    background: linear-gradient(135deg, #fff9e6, #fffbf0);
    border-top: 1px solid #ffeaa7;
    font-size: 11px;
    color: #856404;
    text-align: center;
    line-height: 1.5;
}

.chat-privacy-notice a {
    color: #2c5f7d;
    text-decoration: none;
    font-weight: 600;
}

@media (max-width: 768px) {
    .mindspan-chat-popup {
        width: calc(100vw - 32px);
        height: calc(100vh - 140px);
        right: 16px;
        bottom: 90px;
        border-radius: 16px;
    }

    .mindspan-chat-orb {
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
    }

    .orb-icon {
        width: 28px;
        height: 28px;
    }
}

.mindspan-chat-orb:focus,
.chat-close-btn:focus {
    outline: 2px solid #2c5f7d;
    outline-offset: 2px;
}
</style>

<!-- Floating Orb -->
<div class="mindspan-chat-orb" onclick="toggleChatPopup()" role="button" aria-label="Open MindspanAI Chat" tabindex="0">
    <svg class="orb-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" opacity="0.9"/>
        <path d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z" fill="white" opacity="0.7"/>
    </svg>
    <div class="orb-badge" id="chatBadge">1</div>
</div>

<!-- Chat Popup -->
<div class="mindspan-chat-popup" id="chatPopup">
    <div class="chat-popup-header">
        <div class="chat-header-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white"/>
            </svg>
            MindspanAI Assistant
        </div>
        <button class="chat-close-btn" onclick="toggleChatPopup()" aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
        </button>
    </div>

    <div class="chat-popup-body">
        <iframe
            src="https://mindspanai.vercel.app/"
            title="MindspanAI Chat Interface"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
    </div>

    <div class="chat-privacy-notice">
        Private & Secure. General info only, not clinical advice. <a href="/privacy" target="_blank">Privacy Policy</a>
    </div>
</div>

<script>
(function() {
    'use strict';

    window.toggleChatPopup = function() {
        var popup = document.getElementById('chatPopup');
        var badge = document.getElementById('chatBadge');

        popup.classList.toggle('active');

        if (popup.classList.contains('active')) {
            badge.style.display = 'none';
        }
    };

    // Keyboard accessibility
    var orb = document.querySelector('.mindspan-chat-orb');
    if (orb) {
        orb.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleChatPopup();
            }
        });
    }

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        var popup = document.getElementById('chatPopup');
        var orbEl = document.querySelector('.mindspan-chat-orb');

        if (popup.classList.contains('active') &&
            !popup.contains(e.target) &&
            !orbEl.contains(e.target)) {
            popup.classList.remove('active');
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var popup = document.getElementById('chatPopup');
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
        }
    });

})();
</script>
```

---

## Part 3: Optional — Navigation Button

### What This Does

Adds a styled "Ask MindspanAI" button to your site that links to the `/agent` page. You can place this in your navigation area or any prominent location.

### Step-by-Step

1. Go to **Settings** > **Advanced** > **Code Injection**
2. Paste the code below into the **Header** section
3. Click **Save**

**Note**: Depending on your SquareSpace theme, you may need to manually place this button within your navigation menu. The code creates the styled button, but its position in the nav depends on your theme's structure.

### Code to Paste

```html
<!-- MindspanAI Navigation Button -->
<style>
.mindspan-ai-nav-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: linear-gradient(135deg, rgba(44, 95, 125, 0.1), rgba(30, 66, 87, 0.05));
    border: 1.5px solid rgba(44, 95, 125, 0.2);
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: inherit;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    text-decoration: none !important;
}

.mindspan-ai-nav-btn:hover {
    background: linear-gradient(135deg, rgba(44, 95, 125, 0.15), rgba(30, 66, 87, 0.1));
    border-color: rgba(44, 95, 125, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(44, 95, 125, 0.15);
}

.mindspan-ai-nav-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
}

.mindspan-ai-nav-btn:hover::before {
    left: 100%;
}

.ai-sparkle-icon {
    width: 20px;
    height: 20px;
    animation: sparkle 3s ease-in-out infinite;
}

@keyframes sparkle {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
    50% { transform: scale(1.15) rotate(180deg); opacity: 1; }
}

.ai-nav-text {
    font-size: 13px;
    color: #2c5f7d;
    font-weight: 600;
    letter-spacing: 0.3px;
}

.ai-nav-text-gray {
    color: #718096;
    font-weight: 400;
}

@media (max-width: 768px) {
    .ai-nav-text-gray {
        display: none;
    }
    .mindspan-ai-nav-btn {
        padding: 8px 14px;
    }
}
</style>

<a href="/agent" class="mindspan-ai-nav-btn" aria-label="Open MindspanAI Assistant">
    <svg class="ai-sparkle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#2c5f7d" opacity="0.9"/>
        <path d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z" fill="#2c5f7d" opacity="0.7"/>
        <path d="M5 14L5.5 16.5L8 17L5.5 17.5L5 20L4.5 17.5L2 17L4.5 16.5L5 14Z" fill="#2c5f7d" opacity="0.7"/>
    </svg>
    <span class="ai-nav-text">Ask MindspanAI <span class="ai-nav-text-gray">anything...</span></span>
</a>
```

---

## Customization

### Change Orb Colors

```css
.mindspan-chat-orb {
    background: linear-gradient(135deg, #2c5f7d 0%, #1e4257 100%);
    /* Replace #2c5f7d and #1e4257 with your brand colors */
}
```

### Change Orb Position

```css
.mindspan-chat-orb {
    bottom: 24px; /* Distance from bottom */
    right: 24px;  /* Distance from right */
}
```

### Change Popup Size

```css
.mindspan-chat-popup {
    width: 420px;  /* Make wider or narrower */
    height: 680px; /* Make taller or shorter */
}
```

---

## Troubleshooting

**Floating orb not showing**
- Hard refresh the page (Cmd+Shift+R / Ctrl+F5)
- Check browser console (F12) for errors
- If hidden behind other elements, increase z-index to `99999` in the CSS

**Chat not loading inside popup**
- Verify https://mindspanai.vercel.app loads directly in your browser
- Check browser console for CORS or iframe errors
- Ensure the `sandbox` attribute includes `allow-scripts allow-same-origin allow-forms`

**Animations not smooth**
- SquareSpace themes sometimes load conflicting CSS
- Add `!important` to animation properties if needed
- Widget uses CSS animations (hardware accelerated) — should be smooth on modern browsers

**Mobile issues**
- The widget is responsive by default
- On mobile, the popup expands to near-full-screen
- Test on an actual mobile device, not just browser resize

---

## Testing Checklist

After adding the code, verify:

- [ ] /agent page loads the full chat interface
- [ ] Floating orb appears in bottom-right on other pages
- [ ] Floating orb has pulse animation
- [ ] Clicking orb opens the chat popup
- [ ] Chat interface loads inside the popup
- [ ] Close button (X) works
- [ ] Clicking outside the popup closes it
- [ ] Pressing ESC closes the popup
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Test on desktop Chrome, Safari, Firefox
- [ ] Privacy notice displays at bottom of popup
- [ ] Tab key can reach the orb (keyboard accessibility)

---

## Technical Details

**Cost**: $0-2/month (Vercel free tier, OpenRouter ~$0.50/1000 conversations)

**Live URLs**:
- Production: https://mindspanai.vercel.app
- GitHub: https://github.com/mindspanner/mindspanai
- Your site: www.mindspan.com.au/agent

**How updates work**: Push code to GitHub > Vercel auto-deploys in ~30 seconds > iframes automatically load the latest version (no SquareSpace changes needed)

---

*This guide replaces: V3-SQUARESPACE-INTEGRATION.md, SQUARESPACE-IMPLEMENTATION.md, SQUARESPACE-STEPS.txt, SQUARESPACE-WIDGET-UPDATE.md*
