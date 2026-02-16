# SquareSpace Widget Update Guide

## 🎯 Goal
Replace the current chat widget icon with the branded gradient orb design to match MindspanAI's visual identity.

---

## ✅ What Was Fixed

### 1. **Corner Orb Animation** (Fixed)
- Cards now properly collapse and transform into corner orb
- Added console debugging for troubleshooting
- Fixed `sendMessageFromOrb()` function for dropdown clicks
- Hover dropdown now works correctly

### 2. **Gradient Orb Chat Widget** (New)
- Created `widget-embed.html` with branded gradient orb button
- Matches exact design from main UI (3D gradient sphere)
- Floating + color rotation animations
- Opens chat iframe when clicked
- Fully responsive for mobile

---

## 🚀 Option 1: Update Existing SquareSpace Widget Icon

If you're using a chat widget plugin in SquareSpace, update its icon to match the gradient orb:

### CSS to Add to Your SquareSpace Site:

```css
/* Replace chat widget icon with gradient orb */
[your-chat-widget-selector] {
    width: 64px !important;
    height: 64px !important;
    border-radius: 50% !important;
    background: radial-gradient(circle at 30% 30%,
        rgba(255, 255, 255, 0.9),
        rgba(102, 126, 234, 0.95) 30%,
        rgba(118, 75, 162, 1) 70%,
        rgba(50, 40, 80, 1)) !important;
    box-shadow:
        0 8px 28px rgba(102, 126, 234, 0.4),
        0 4px 12px rgba(0, 0, 0, 0.2),
        inset 0 -6px 12px rgba(0, 0, 0, 0.25),
        inset 0 6px 12px rgba(255, 255, 255, 0.3) !important;
    animation: float-widget 3s ease-in-out infinite,
               rotate-gradient 8s linear infinite !important;
}

@keyframes float-widget {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
}

@keyframes rotate-gradient {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}
```

**How to apply:**
1. Go to SquareSpace → Design → Custom CSS
2. Paste the CSS above
3. Replace `[your-chat-widget-selector]` with your actual chat button selector
4. Save changes

---

## 🚀 Option 2: Use the Custom Widget Embed (Recommended)

Replace your current chat integration with the new branded widget.

### Step 1: Access the Widget File

The widget is deployed at:
```
https://mindspanai.vercel.app/widget-embed.html
```

### Step 2: Embed in SquareSpace

**Method A: Code Block (Easiest)**

1. Go to the page where you want the chat widget
2. Add a **Code Block**
3. Paste this HTML:

```html
<iframe
    src="https://mindspanai.vercel.app/widget-embed.html"
    style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; pointer-events: none; z-index: 9999;"
    allow="clipboard-write"
    id="mindspan-widget-frame"
></iframe>

<script>
// Allow clicks on widget button/window only
document.getElementById('mindspan-widget-frame').addEventListener('load', function() {
    this.style.pointerEvents = 'all';
});
</script>
```

**Method B: Code Injection (Site-Wide)**

1. Go to SquareSpace → Settings → Advanced → Code Injection
2. Add to **Footer**:

```html
<script>
(function() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://mindspanai.vercel.app/widget-embed.html';
    iframe.style.cssText = 'position:fixed;bottom:0;right:0;width:100%;height:100%;border:none;pointer-events:all;z-index:9999;';
    iframe.allow = 'clipboard-write';
    document.body.appendChild(iframe);
})();
</script>
```

3. Save

---

## 🎨 Widget Features

**Visual:**
- ✨ Gradient sphere orb (matches main UI)
- 🌈 Color rotation animation (8s cycle)
- 🌊 Floating effect (3s gentle motion)
- 💫 3D depth with realistic lighting
- 📱 Fully responsive for mobile

**Functionality:**
- Click orb → Opens chat window
- Chat window has header with orb icon
- Close button (×) to minimize
- Click outside to close
- Embeds https://mindspanai.vercel.app/ iframe

---

## 🧪 Test the Widget

**Live Preview:**
Visit: https://mindspanai.vercel.app/widget-embed.html

You'll see:
1. Gradient orb button in bottom-right corner
2. Floating + color rotation animations
3. Click to open chat window
4. Chat window has matching orb icon in header

---

## 🔧 Customization Options

### Change Widget Position

Edit the CSS in `widget-embed.html`:

```css
.widget-button {
    bottom: 24px;  /* Distance from bottom */
    right: 24px;   /* Distance from right */

    /* For left side: */
    /* left: 24px; */
    /* right: auto; */
}
```

### Change Widget Size

```css
.widget-button {
    width: 64px;   /* Larger = 72px, Smaller = 48px */
    height: 64px;
}
```

### Change Chat Window Size

```css
.chat-window {
    width: 400px;   /* Make wider/narrower */
    height: 600px;  /* Make taller/shorter */
}
```

---

## 📊 Comparison

| Feature | Old Widget | New Gradient Orb Widget |
|---------|-----------|------------------------|
| Design | Generic icon | Branded 3D gradient sphere |
| Animation | Static | Floating + color rotation |
| Visual Identity | Not branded | Matches MindspanAI perfectly |
| Mobile Support | Varies | Fully responsive |
| Customization | Limited | Full CSS control |

---

## ✅ Recommended Implementation

1. **Test First**: Visit https://mindspanai.vercel.app/widget-embed.html to preview
2. **Decide Method**:
   - Option 1 (CSS only) = Quick fix for existing widget
   - Option 2 (New embed) = Full branded experience (recommended)
3. **Implement**: Follow steps for chosen option
4. **Test**: Check on desktop + mobile
5. **Adjust**: Customize position/size if needed

---

## 🆘 Troubleshooting

**Widget not showing:**
- Check z-index isn't being overridden by other SquareSpace elements
- Try increasing z-index to 99999 in the iframe style

**Animation not smooth:**
- Ensure SquareSpace isn't loading conflicting CSS
- Try adding `!important` to animation properties

**Mobile issues:**
- The widget is responsive by default
- On mobile, chat window goes fullscreen
- Test on actual mobile device, not just browser resize

---

## 🎉 Result

After implementation, your SquareSpace site will have:
- ✅ Branded gradient orb chat button
- ✅ Consistent visual identity with MindspanAI
- ✅ Smooth animations (floating + color rotation)
- ✅ Professional, polished appearance
- ✅ Mobile-optimized experience

The chat widget will now be instantly recognizable as part of the MindspanAI brand!

---

**Questions?** Contact: info@mindspan.com.au
