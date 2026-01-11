# Figma Resources

This document contains links to Figma files and resources for the CSS Design System.

## Main Design Files

| File | Description | Access |
|------|-------------|--------|
| **CSS Design System** | Complete component library | [View in Figma](#) |
| **CSS Brand Guidelines** | Logo, colors, typography | [View in Figma](#) |
| **CSS Icon Library** | Custom and curated icons | [View in Figma](#) |

## Getting Started with Figma

### 1. Request Access

Contact the design team to get access to the Figma files:
- **Email**: design-system@cepatservicestation.com
- **Slack**: #design-system

### 2. Install Figma Fonts

The design system uses these fonts:
- **Inter** - Primary font family (install from Google Fonts)
- **JetBrains Mono** - Monospace font for code

### 3. Enable Libraries

Once you have access:
1. Open the CSS Design System file
2. Click the book icon in the left sidebar
3. Enable "CSS Design System" as a library

---

## File Structure

```
CSS Design System
├── Cover
├── 📐 Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Shadows
│   └── Icons
├── 🔲 Components
│   ├── Atoms
│   │   ├── Button
│   │   ├── Input
│   │   ├── Badge
│   │   ├── Avatar
│   │   └── ...
│   ├── Molecules
│   │   ├── Card
│   │   ├── Alert
│   │   ├── FormField
│   │   └── ...
│   └── Organisms
│       ├── Navigation
│       ├── Modal
│       ├── DataTable
│       └── ...
├── 📄 Patterns
│   ├── Navigation Patterns
│   ├── Form Patterns
│   ├── Feedback Patterns
│   └── Layout Patterns
└── 📱 Templates
    ├── Dashboard
    ├── Authentication
    └── Content Pages
```

---

## Design Tokens Sync

Design tokens are synchronized between Figma and code using the following process:

1. **Source of Truth**: `design-tokens/*.json` files in this repository
2. **Figma Sync**: Tokens are imported into Figma using Tokens Studio plugin
3. **Updates**: When tokens are updated in code, re-import them in Figma

### Token Mapping

| JSON Token | Figma Style |
|------------|-------------|
| `colors.primary.600` | `Primary/600` |
| `typography.fontSize.base` | `Text/Base` |
| `spacing.4` | Effect: `Spacing/4` |
| `shadows.md` | Effect: `Shadow/Medium` |

---

## Component Status

| Component | Design | Development | Documentation |
|-----------|--------|-------------|---------------|
| Button | ✅ Complete | ✅ Complete | ✅ Complete |
| Input | ✅ Complete | ✅ Complete | ✅ Complete |
| Card | ✅ Complete | ✅ Complete | ✅ Complete |
| Modal | ✅ Complete | ✅ Complete | ✅ Complete |
| DataTable | ✅ Complete | ✅ Complete | ✅ Complete |
| Navigation | ✅ Complete | ✅ Complete | ✅ Complete |

---

## Design Handoff Process

### For Designers

1. Design using components from the CSS Design System library
2. Use Auto Layout for responsive designs
3. Add annotations for interactions and states
4. Link to design specs in the PR

### For Developers

1. Check the Figma file for component specifications
2. Use the "Inspect" panel for CSS properties
3. Export assets at appropriate resolutions
4. Reference the design file in commit messages

---

## Plugin Recommendations

| Plugin | Purpose |
|--------|---------|
| **Tokens Studio** | Design token management |
| **Iconify** | Icon library access |
| **Stark** | Accessibility checking |
| **Autoflow** | User flow diagrams |
| **Content Reel** | Placeholder content |

---

## Contact

**Design Team**
- **Lead Designer**: [Name]
- **Email**: design@cepatservicestation.com
- **Slack**: #design-system
