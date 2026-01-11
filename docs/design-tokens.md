# Design Tokens

Design tokens are the visual design atoms of the CSS Design System. They store design decisions as data, ensuring consistency across all platforms and products.

## Table of Contents

- [What Are Design Tokens?](#what-are-design-tokens)
- [Token Structure](#token-structure)
- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Shadows](#shadows)
- [Borders](#borders)
- [Animation](#animation)
- [Using Tokens](#using-tokens)

---

## What Are Design Tokens?

Design tokens are named entities that store visual design attributes. Instead of hardcoding `#1b2a53` throughout your codebase, you use `--color-primary-900` or `tokens.colors.primary[900]`.

### Benefits

| Benefit | Description |
|---------|-------------|
| **Consistency** | Same values used everywhere |
| **Maintainability** | Change once, update everywhere |
| **Theming** | Easy light/dark mode support |
| **Documentation** | Self-documenting design decisions |
| **Tooling** | Works with design tools (Figma, Style Dictionary) |

---

## Token Structure

Tokens are available in multiple formats:

```
design-tokens/
├── colors.json       # Color palette
├── typography.json   # Fonts, sizes, weights
├── spacing.json      # Spacing scale
├── breakpoints.json  # Responsive breakpoints
├── shadows.json      # Box shadows
├── animations.json   # Timing, easing, keyframes
├── borders.json      # Radius, widths
├── tokens.css        # CSS custom properties
└── index.json        # Manifest file
```

---

## Colors

Our color system is built on HSL principles from Refactoring UI, with proper luminosity curves and saturation adjustments.

### Primary Palette (Deep Navy Blue)

The primary color represents the CSS brand identity.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-50` | #e8ecf4 | Backgrounds, tints |
| `--color-primary-100` | #c5d0e3 | Hover backgrounds |
| `--color-primary-200` | #9fb1d0 | Disabled states |
| `--color-primary-300` | #7891bc | Light borders |
| `--color-primary-400` | #5a79ac | Icons, secondary text |
| `--color-primary-500` | #3d619c | Links, interactive |
| `--color-primary-600` | #2f5f91 | **Primary buttons** |
| `--color-primary-700` | #264b7a | Hover on primary |
| `--color-primary-800` | #1d3a63 | Active/pressed |
| `--color-primary-900` | #1b2a53 | **Text, headings** |
| `--color-primary-950` | #121c38 | Maximum contrast |

### Secondary Palette (Deep Sky Blue)

Used for accents and highlights.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-secondary-50` | #eef5f9 | Light tints |
| `--color-secondary-600` | #356a9d | **Accent color** |
| `--color-secondary-900` | #1a3349 | Dark accents |

### Semantic Colors

| Category | Token | Usage |
|----------|-------|-------|
| Success | `--color-success-500` | Confirmations, completed states |
| Error | `--color-error-500` | Errors, destructive actions |
| Warning | `--color-warning-500` | Warnings, caution states |
| Info | `--color-info-500` | Information, help text |

### Neutral (Slate Gray)

Cool gray with blue undertones for brand harmony.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-neutral-50` | #f8fafc | Page backgrounds |
| `--color-neutral-100` | #f1f5f9 | Card backgrounds |
| `--color-neutral-200` | #e2e8f0 | Borders |
| `--color-neutral-400` | #94a3b8 | Placeholder text |
| `--color-neutral-500` | #64748b | Secondary text |
| `--color-neutral-600` | #475569 | Body text |
| `--color-neutral-800` | #1e293b | Primary text |
| `--color-neutral-900` | #0f172a | Headings |

---

## Typography

### Font Families

```css
--font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### Font Sizes

| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 12px | Badges, labels |
| `--text-sm` | 14px | Secondary text |
| `--text-base` | 16px | Body text (default) |
| `--text-lg` | 18px | Lead paragraphs |
| `--text-xl` | 20px | Small headings |
| `--text-2xl` | 24px | Section headers (H3) |
| `--text-3xl` | 30px | Page sections (H2) |
| `--text-4xl` | 36px | Page titles (H1) |
| `--text-5xl` | 48px | Hero text |

### Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `--font-normal` | 400 | Body text |
| `--font-medium` | 500 | Buttons, labels |
| `--font-semibold` | 600 | Subheadings |
| `--font-bold` | 700 | Headlines |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-tight` | 1.25 | Headlines |
| `--leading-normal` | 1.5 | Body text |
| `--leading-relaxed` | 1.625 | Wide content |

---

## Spacing

Our spacing scale follows Refactoring UI's exponential approach - packed tight at small values, expanding at larger values.

### Core Scale

| Token | Value | Common Usage |
|-------|-------|--------------|
| `--space-1` | 4px | Icon gaps |
| `--space-2` | 8px | Inline spacing |
| `--space-3` | 12px | Small padding |
| `--space-4` | 16px | **Base unit** |
| `--space-6` | 24px | Component padding |
| `--space-8` | 32px | Section gaps |
| `--space-12` | 48px | Large sections |
| `--space-16` | 64px | Page sections |
| `--space-24` | 96px | Hero spacing |

### Usage Examples

```css
/* Button padding */
.button {
  padding: var(--space-2) var(--space-4);  /* 8px 16px */
}

/* Card spacing */
.card {
  padding: var(--space-6);  /* 24px */
  gap: var(--space-4);      /* 16px between elements */
}

/* Section spacing */
.section {
  padding-block: var(--space-16);  /* 64px top/bottom */
}
```

---

## Shadows

Following Refactoring UI's two-part shadow technique for realistic depth.

### Elevation Scale

| Token | Usage |
|-------|-------|
| `--shadow-xs` | Subtle lift (inputs) |
| `--shadow-sm` | Slight elevation (buttons, cards) |
| `--shadow-md` | Moderate (dropdowns, popovers) |
| `--shadow-lg` | High elevation (modals) |
| `--shadow-xl` | Maximum elevation (dialogs) |
| `--shadow-inner` | Pressed/inset states |

### Usage Example

```css
/* Card with subtle shadow */
.card {
  box-shadow: var(--shadow-sm);
}

/* Modal with high elevation */
.modal {
  box-shadow: var(--shadow-xl);
}

/* Button pressed state */
.button:active {
  box-shadow: var(--shadow-inner);
}
```

---

## Borders

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 2px | Small elements |
| `--radius-md` | 4px | Buttons, inputs |
| `--radius-lg` | 8px | Cards |
| `--radius-xl` | 12px | Modals |
| `--radius-full` | 9999px | Pills, avatars |

### Border Colors

```css
--border-default: #e2e8f0;   /* Default borders */
--border-emphasis: #cbd5e1;  /* Stronger borders */
--border-focus: #3b82f6;     /* Focus rings */
```

---

## Animation

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 100ms | Micro-interactions |
| `--duration-normal` | 200ms | Standard transitions |
| `--duration-slow` | 300ms | Large elements |

### Easing Functions

| Token | Usage |
|-------|-------|
| `--ease-out` | Entrances |
| `--ease-in` | Exits |
| `--ease-in-out` | Movements |

### Usage Example

```css
.button {
  transition: background-color var(--duration-normal) var(--ease-in-out);
}

.modal {
  animation: fadeIn var(--duration-slow) var(--ease-out);
}
```

---

## Using Tokens

### In CSS

```css
.my-component {
  color: var(--text-primary);
  background: var(--bg-default);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  transition: all var(--duration-normal) var(--ease-in-out);
}
```

### In Tailwind CSS

With our preset, tokens map to Tailwind classes:

```tsx
<div className="text-primary-900 bg-white p-4 rounded-lg shadow-md">
  Content
</div>
```

### In JavaScript/TypeScript

```tsx
import tokens from 'css-design-system/tokens';

const styles = {
  backgroundColor: tokens.colors.primary[100],
  padding: tokens.spacing[4],
};
```

---

## Token Naming Convention

Our tokens follow a consistent naming pattern:

```
--{category}-{property}-{variant/scale}

Examples:
--color-primary-500
--space-4
--text-lg
--shadow-md
--radius-lg
```

---

<p align="center">
  <em>Design tokens are the single source of truth for visual design.</em>
</p>
