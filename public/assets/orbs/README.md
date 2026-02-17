# MindspanAI Orb Assets

## Available Orbs

### 1. Gradient Purple (Default)
- **ID**: `gradient-purple`
- **Type**: CSS Radial Gradient
- **Colors**: Purple (#667eea) to Blue (#764ba2)
- **Style**: 3D gradient sphere with highlight

### 2. Rainbow Mindspan Logo
- **ID**: `rainbow-mindspan`
- **File**: `rainbow-mindspan.png`
- **Type**: Image
- **Style**: Rainbow gradient with white Mindspan brain logo

## Adding New Orbs

1. Save orb image to this directory (`public/assets/orbs/`)
2. Update `api/config/orbs.js` with new orb entry
3. Orb will appear in Admin Panel → Site Config → Orb Selection

## Image Requirements

- **Format**: PNG with transparency preferred
- **Size**: 512x512px minimum (will be scaled down)
- **Shape**: Circular or square (CSS will make it round)
- **File naming**: lowercase-with-hyphens.png
