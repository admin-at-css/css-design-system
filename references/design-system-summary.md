# Refactoring UI Design System Specification

## 1. Spacing & Sizing System
**Principle:** Do not use a linear scale. [cite_start]Use a constrained set of values that starts packed tightly and expands exponentially. [cite: 1125-1153]
**Unit:** `rem` or `px` (Base 16px).

### [cite_start]The Scale [cite: 1159-1174]
| Variable | Value (px) | Calculation | Usage |
| :--- | :--- | :--- | :--- |
| `spacing-0.25` | 4px | 16 * 0.25 | Tiny tweaks |
| `spacing-0.5` | 8px | 16 * 0.5 | Tight spacing |
| `spacing-0.75` | 12px | 16 * 0.75 | |
| `spacing-1` | 16px | 16 * 1 | Base unit |
| `spacing-1.5` | 24px | 16 * 1.5 | |
| `spacing-2` | 32px | 16 * 2 | Component padding |
| `spacing-3` | 48px | 16 * 3 | |
| `spacing-4` | 64px | 16 * 4 | Section spacing |
| `spacing-6` | 96px | 16 * 6 | |
| `spacing-8` | 128px | 16 * 8 | |
| `spacing-12` | 192px | 16 * 12 | |
| `spacing-16` | 256px | 16 * 16 | Layout areas |
| `spacing-24` | 384px | 16 * 24 | |
| `spacing-32` | 512px | 16 * 32 | Content max-widths |
| `spacing-40` | 640px | 16 * 40 | |
| `spacing-48` | 768px | 16 * 48 | |

**Rule:** Elements that are large on large screens need to shrink faster than small elements on small screens. Do not simply scale everything down proportionately.

---

## 2. Typography System
**Principle:** Avoid em units for font size to prevent compounding sizing issues. Use px or rem. [cite_start]Hand-pick values rather than using a strict mathematical ratio. [cite: 1683-1695]

### Type Scale
| Variable | Size | Usage |
| :--- | :--- | :--- |
| `text-xs` | 12px | Tertiary text, labels |
| `text-sm` | 14px | Secondary text |
| `text-base` | 16px | Body copy (Default) |
| `text-lg` | 18px | |
| `text-xl` | 20px | |
| `text-2xl` | 24px | Section Headers |
| `text-3xl` | 30px | |
| `text-4xl` | 36px | Page Titles |
| `text-5xl` | 48px | |
| `text-6xl` | 60px | |
| `text-7xl` | 72px | Hero text |

### Font Weight
* **Normal (400/500):** Most text.
* **Heavy (600/700):** Emphasized text.
* *Note:* Avoid weights under 400 for UI text.

### Line Height
* **Body Text:** Proportional to line length. Narrow content = shorter line-height (1.5). Wide content = taller line-height (2.0).
* **Headings:** Inversely proportional to size. [cite_start]Large text = shorter line-height (1.0 - 1.1). [cite: 1757-1759]

### Letter Spacing
* **Headings:** Tighten letter spacing for larger headline families to mimic display fonts.
* **All-Caps:** Increase letter spacing for uppercase text to improve legibility.

---

## 3. Color System
**Principle:** Use HSL. Avoid hex/RGB. Define 8-10 shades per color. [cite_start]Do not generate shades using simple "lighten/darken" functions. [cite: 1797-1841]

### Palette Generation Rules
1.  **Base Color:** Pick a color that works as a button background (roughly 500 range).
2.  [cite_start]**Edges:** Pick the darkest shade (text) and lightest shade (background tints) based on the hue. [cite: 1846-1848]
3.  **Luminosity:**
    * **Lighten:** Rotate hue toward nearest bright hue (Yellow, Cyan, Magenta).
    * **Darken:** Rotate hue toward nearest dark hue (Red, Blue, Green).
4.  **Saturation:** Increase saturation at the lightest and darkest ends of the scale to prevent "washed out" greyish looks.

### Grey Scale
* **Cool Greys:** Saturate with a small amount of Blue.
* **Warm Greys:** Saturate with a small amount of Yellow/Orange.
* *Note:* Never use true black or true grey (0% saturation).

### Accessibility
* **Contrast Flip:** On dark colored backgrounds, use dark text on a light colored container/badge instead of white text on the dark background.
* **Colored Text:** Rotate hue towards brighter colors (Cyan, Magenta, Yellow) to increase contrast for colored text on colored backgrounds.

---

## 4. Depth & Shadows
**Principle:** Light comes from above. [cite_start]Shadows convey elevation (z-axis). [cite: 1939-1970]

### Elevation Scale
* **Shadow-sm:** Small, tight blur. Slightly raised (Buttons).
* **Shadow-md:** Medium. (Dropdowns).
* **Shadow-lg:** Large, high blur. High elevation (Modals).
* **Shadow-xl:** Highest elevation.

### [cite_start]Two-Part Shadow Technique [cite: 1987-1990]
Use two shadows for realistic depth:
1.  **Direct Shadow:** Larger, softer, significant vertical offset (Light source).
2.  **Ambient Shadow:** Tighter, darker, smaller vertical offset (Occlusion).

### Interaction
* **Clicking/Active:** Reduce shadow size or remove it to simulate an element being pressed *into* the page.

---

## 5. UI Elements Construction

### Icons
* **Weight:** Icons are "heavy". [cite_start]When placed next to text, lower the icon contrast (softer color) to balance the visual weight. [cite: 768-793]
* **Scaling:** Do not simply scale up small icons. [cite_start]Enclose them in a shape with a background color instead. [cite: 2045-2049]

### Images
* **Text Overlay:**
    * Add a semi-transparent overlay (black or white).
    * Or, lower the image contrast.
    * Or, colorize the image (Multiply blend mode).
* [cite_start]**User Content:** Always center user images in fixed containers using `background-size: cover` to prevent layout breakage. [cite: 2063-2064]
* **Background Bleed:** Use a subtle inner box-shadow (inset) on user images to prevent them from blending into similar-colored backgrounds.

### Components
* **Sidebars:** Use fixed widths, not percentages. Let the main content flex.
* [cite_start]**Panel Borders:** Replace standard borders with box shadows for subtler separation, or use slightly different background colors. [cite: 2112-2115]
* **Empty States:** Don't leave them blank. Use illustrations and emphasize the "Call to Action" (CTA) to create content.