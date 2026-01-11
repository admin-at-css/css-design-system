# Component Design Specifications

This document provides detailed design specifications for CSS Design System components.

## Button Component

### Dimensions

| Size | Height | Padding (x) | Font Size | Icon Size |
|------|--------|-------------|-----------|-----------|
| Small | 32px | 12px | 12px | 14px |
| Medium | 40px | 16px | 14px | 16px |
| Large | 48px | 24px | 16px | 18px |

### Border Radius

- Default: 6px (`--radius-md`)
- Pill: 9999px (`--radius-full`)

### States

| State | Background | Border | Text |
|-------|------------|--------|------|
| Default | `primary-600` | none | white |
| Hover | `primary-700` | none | white |
| Active | `primary-800` | none | white |
| Disabled | `primary-600` @ 50% | none | white @ 50% |
| Focus | `primary-600` | 3px ring | white |

---

## Input Component

### Dimensions

| Size | Height | Padding (x) | Font Size |
|------|--------|-------------|-----------|
| Small | 32px | 10px | 12px |
| Medium | 40px | 12px | 14px |
| Large | 48px | 14px | 16px |

### Border

- Default: 1px solid `neutral-300`
- Hover: 1px solid `neutral-400`
- Focus: 1px solid `primary-500` + 3px ring
- Error: 1px solid `error-500`

### Placeholder Color

- `neutral-400`

---

## Card Component

### Padding

- Header: 24px
- Content: 24px (0 top if following header)
- Footer: 24px (0 top)

### Border

- Color: `neutral-200`
- Width: 1px
- Radius: 8px (`--radius-lg`)

### Shadow (elevated variant)

- `shadow-md`: 0 4px 6px -1px rgb(0 0 0 / 0.1)

---

## Modal Component

### Sizes

| Size | Max Width |
|------|-----------|
| Small | 384px |
| Medium | 512px |
| Large | 672px |
| Extra Large | 896px |

### Padding

- Content: 24px
- Gap between sections: 16px

### Overlay

- Color: `neutral-900` @ 50% opacity

### Animation

- Duration: 200ms
- Easing: ease-out
- Effect: fade + scale (95% to 100%)

---

## Typography Specifications

### Heading Sizes

| Level | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| H1 | 36px | 700 | 1.25 | -0.025em |
| H2 | 30px | 600 | 1.25 | -0.025em |
| H3 | 24px | 600 | 1.375 | 0 |
| H4 | 20px | 600 | 1.375 | 0 |
| H5 | 18px | 500 | 1.5 | 0 |
| H6 | 16px | 500 | 1.5 | 0 |

### Body Text

| Variant | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Large | 18px | 400 | 1.625 |
| Base | 16px | 400 | 1.5 |
| Small | 14px | 400 | 1.5 |
| Caption | 12px | 500 | 1.5 |

---

## Spacing System

### Base Unit: 4px

| Token | Value | Common Use |
|-------|-------|------------|
| 1 | 4px | Icon gaps |
| 2 | 8px | Inline elements |
| 3 | 12px | Small padding |
| 4 | 16px | Default padding |
| 6 | 24px | Card padding |
| 8 | 32px | Section gaps |
| 12 | 48px | Large sections |
| 16 | 64px | Page sections |

---

## Color Usage Guidelines

### Text Colors

| Use Case | Light Mode | Dark Mode |
|----------|------------|-----------|
| Primary | `neutral-900` | `neutral-50` |
| Secondary | `neutral-600` | `neutral-300` |
| Disabled | `neutral-400` | `neutral-500` |
| Link | `primary-600` | `primary-400` |

### Background Colors

| Use Case | Light Mode | Dark Mode |
|----------|------------|-----------|
| Page | `white` | `neutral-900` |
| Card | `white` | `neutral-800` |
| Subtle | `neutral-50` | `neutral-800` |
| Hover | `neutral-100` | `neutral-700` |

---

## Icon Guidelines

### Sizes

| Context | Size |
|---------|------|
| Inline with text | 16px |
| Button icon | 16px-18px |
| List item | 20px |
| Feature icon | 24px |
| Hero icon | 48px+ |

### Stroke Width

- Default: 2px
- Thin: 1.5px
- Bold: 2.5px

### Color

- Inherit from text color
- Reduce opacity to 75% when next to text for visual balance
