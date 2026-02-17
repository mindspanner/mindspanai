# Website Code Comparison & Update Guide

## Current State: www.mindspan.com.au/agent

### Embedded Code Found on Website

#### 1. Main Chat Container (OUTDATED - Needs Update)
**Location**: Footer section
```html
<iframe
  class="mindspan-chat-container"
  src="https://mindspanai.vercel.app/"
  title="MindspanAI Administrative Assistant"
  allow="clipboard-write">
</iframe>
```

**Status**: ✅ **UP TO DATE** - This already points to latest v3.3.0 interface

---

#### 2. Widget Embed (OUTDATED - Needs Update)
**Location**: Fixed overlay (bottom-right)
```html
<iframe
  src="https://mindspanai.vercel.app/widget-embed.html"
  style="position: fixed; bottom: 0px; right: 0px; width: 100%; height: 100%; border: none; z-index: 999999; pointer-events: auto;"
  allow="clipboard-write"
  id="mindspan-widget">
</iframe>
```

**Status**: ✅ **UP TO DATE** - This already points to latest v3.3.0 widget

---

#### 3. CSS Styling (OUTDATED - Needs Complete Replacement)
**Location**: Inline stylesheet in page header

**Current Code** (OLD - ChatGPT-style not reflected):
```css
.mindspan-orb-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.3) 70%, rgba(255, 255, 255, 0.1));
  /* ... old styling ... */
}
```

**Status**: ❌ **NEEDS UPDATE** - Replace with latest gradient specs

**NEW Code** (ChatGPT-style v3.3.0):
```css
.mindspan-orb-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%,
    rgba(255, 255, 255, 0.8),
    rgba(102, 126, 234, 0.9) 30%,
    rgba(118, 75, 162, 1) 70%,
    rgba(50, 40, 80, 1));
  box-shadow:
    0 6px 18px rgba(102, 126, 234, 0.4),
    inset 0 -4px 8px rgba(0, 0, 0, 0.2),
    inset 0 4px 8px rgba(255, 255, 255, 0.3);
  position: relative;
  animation: rotate-gradient-slow 8s linear infinite;
}

.mindspan-orb-logo::after {
  content: "";
  position: absolute;
  top: 20%;
  left: 25%;
  width: 18px;
  height: 18px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent);
  border-radius: 50%;
  filter: blur(3px);
}

@keyframes rotate-gradient-slow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
```

---

#### 4. Header Gradient (NEEDS UPDATE)
**Current Code**:
```css
.mindspan-header {
  background: linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%);
  padding: 20px 32px;
}
```

**Status**: ✅ **ACCEPTABLE** - Gradient colors match, but should standardize padding

**Recommended Update**:
```css
.mindspan-header {
  background: #f7f9fc;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
```

---

## Rainbow Mindspan Orb Image Implementation

### Step 1: Save Image
Save the rainbow Mindspan orb image to:
```
/public/assets/orbs/rainbow-mindspan.png
```

### Step 2: Update CSS to Support Image Orbs

Add this CSS rule to support image-based orbs:

```css
.mindspan-orb-logo.image-orb {
  background: none !important;
  background-image: url('/assets/orbs/rainbow-mindspan.png') !important;
  background-size: cover !important;
  background-position: center !important;
  animation: rotate-gradient-slow 8s linear infinite, float-orb 3s ease-in-out infinite;
}

@keyframes float-orb {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
```

### Step 3: JavaScript to Switch Orbs

Add this script to dynamically load orb selection from admin:

```html
<script>
// Load selected orb from API
async function loadSelectedOrb() {
  try {
    const response = await fetch('https://mindspanai.vercel.app/api/config/orbs');
    const data = await response.json();

    if (data.currentOrb && data.currentOrb.type === 'image') {
      // Apply image orb
      const orbElements = document.querySelectorAll('.mindspan-orb-logo');
      orbElements.forEach(orb => {
        orb.classList.add('image-orb');
        orb.style.backgroundImage = `url('${data.currentOrb.imageUrl}')`;
      });
    }
    // Otherwise, gradient orb is default (already in CSS)
  } catch (error) {
    console.log('Using default gradient orb');
  }
}

// Load on page ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSelectedOrb);
} else {
  loadSelectedOrb();
}
</script>
```

---

## Update Priority

### 🔴 **HIGH PRIORITY** (Do Immediately)

1. **Update `.mindspan-orb-logo` CSS** - Replace gradient with new v3.3.0 specs
2. **Add image orb support CSS** - New `.mindspan-orb-logo.image-orb` class
3. **Add orb loading script** - JavaScript to fetch selected orb from admin

### 🟡 **MEDIUM PRIORITY** (Do When Convenient)

4. **Update `.mindspan-header` CSS** - Optional: Change to light gray background
5. **Standardize padding** - Match new ChatGPT-style spacing

### 🟢 **LOW PRIORITY** (Already Good)

6. **iframe URLs** - Already pointing to latest versions ✓
7. **Widget positioning** - Already correct ✓
8. **Z-index** - Already set to 999999 ✓

---

## Exact Code to Replace

### Find This (Lines to Remove):

```css
.mindspan-orb-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.3) 70%, rgba(255, 255, 255, 0.1));
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 18px, rgba(0, 0, 0, 0.2) 0px -4px 8px inset, rgba(255, 255, 255, 0.3) 0px 4px 8px inset;
  flex-shrink: 0;
  position: relative;
  animation: 8s linear 0s infinite normal none running rotate-gradient-slow;
}

.mindspan-orb-logo::after {
  content: "";
  position: absolute;
  top: 22%;
  left: 28%;
  width: 18px;
  height: 18px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50%;
  filter: blur(4px);
}
```

### Replace With This:

```css
/* Gradient Orb (Default) */
.mindspan-orb-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%,
    rgba(255, 255, 255, 0.8),
    rgba(102, 126, 234, 0.9) 30%,
    rgba(118, 75, 162, 1) 70%,
    rgba(50, 40, 80, 1));
  box-shadow:
    0 6px 18px rgba(102, 126, 234, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 -4px 8px rgba(0, 0, 0, 0.2),
    inset 0 4px 8px rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  position: relative;
  animation: rotate-gradient-slow 8s linear infinite;
}

.mindspan-orb-logo::after {
  content: "";
  position: absolute;
  top: 20%;
  left: 25%;
  width: 18px;
  height: 18px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent);
  border-radius: 50%;
  filter: blur(3px);
}

/* Image Orb Support (Rainbow Mindspan, etc.) */
.mindspan-orb-logo.image-orb {
  background: none !important;
  background-image: url('/assets/orbs/rainbow-mindspan.png') !important;
  background-size: cover !important;
  background-position: center !important;
}

.mindspan-orb-logo.image-orb::after {
  display: none; /* Hide gradient highlight for image orbs */
}

@keyframes rotate-gradient-slow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
```

---

## Testing Checklist

After making updates, verify:

- [ ] Gradient orb appears with purple-to-blue colors (not white)
- [ ] Orb has 3D effect with shadow and highlight
- [ ] Color rotation animation works (8s cycle)
- [ ] Admin panel → Site Config shows orb selector
- [ ] Selecting "Rainbow Mindspan Logo" switches to image orb
- [ ] Main chat iframe loads latest v3.3.0 interface
- [ ] Widget iframe loads latest v3.3.0 widget
- [ ] Both orbs match across all instances

---

## Summary

**UPDATE THESE SECTIONS**:
1. ✅ CSS for `.mindspan-orb-logo` (priority 1)
2. ✅ Add `.mindspan-orb-logo.image-orb` support (priority 1)
3. ✅ Add JavaScript orb loader (priority 1)

**ALREADY CORRECT**:
- ✅ Main chat iframe URL
- ✅ Widget iframe URL
- ✅ Widget positioning and z-index

**Files to Save**:
- Rainbow orb image → `/public/assets/orbs/rainbow-mindspan.png`

---

**Last Updated**: 2026-02-17
**Version**: 3.3.0
**Status**: Ready for deployment
