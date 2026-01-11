# CSS Design System - AI Context

> This file provides structured context for AI assistants working on this codebase.
> For visual reference, humans should open `references/index.html` in a browser.

## Quick Reference

```
Brand: Cepat Service Station (PT CSS)
Stack: React 18 + TypeScript 5 + Tailwind CSS 3 + shadcn/ui
Design: Refactoring UI principles, WCAG 2.1 AA compliant
Neutral: Slate Gray (blue undertone, harmonizes with brand)
```

---

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-900` | `#1b2a53` | Deep Navy - Primary brand, headings, buttons |
| `--color-primary-500` | `#356a9d` | Sky Blue - Secondary brand, links, accents |
| `--color-primary-100` | `#dbeafe` | Light Blue - Backgrounds, hover states |

### Semantic Colors

| Purpose | Token | Light Mode | Usage |
|---------|-------|------------|-------|
| Success | `--color-success-*` | `#22c55e` (500) | Confirmations, positive actions |
| Warning | `--color-warning-*` | `#f59e0b` (500) | Cautions, pending states |
| Error | `--color-error-*` | `#ef4444` (500) | Errors, destructive actions |
| Info | `--color-info-*` | `#3b82f6` (500) | Information, tips |

### Neutral Palette (Slate Gray - CHOSEN)

```
--slate-50:  #f8fafc  /* Page backgrounds */
--slate-100: #f1f5f9  /* Card backgrounds, hover */
--slate-200: #e2e8f0  /* Borders, dividers */
--slate-300: #cbd5e1  /* Disabled borders */
--slate-400: #94a3b8  /* Placeholder text, disabled */
--slate-500: #64748b  /* Muted text, icons */
--slate-600: #475569  /* Secondary text */
--slate-700: #334155  /* Body text */
--slate-800: #1e293b  /* Headings */
--slate-900: #0f172a  /* Primary text */
--slate-950: #020617  /* High contrast */
```

---

## Typography

### Font Families

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-serif: 'Georgia', 'Times New Roman', serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Sizes (use with line-height)

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Captions, labels |
| `text-sm` | 14px | 20px | Small text, metadata |
| `text-base` | 16px | 24px | Body text (default) |
| `text-lg` | 18px | 28px | Lead paragraphs |
| `text-xl` | 20px | 28px | H4, card titles |
| `text-2xl` | 24px | 32px | H3 |
| `text-3xl` | 30px | 36px | H2 |
| `text-4xl` | 36px | 40px | H1 |
| `text-5xl` | 48px | 1 | Display |

### Font Weights

```
font-normal: 400  /* Body text */
font-medium: 500  /* Labels, buttons */
font-semibold: 600  /* Subheadings */
font-bold: 700  /* Headings */
```

---

## Spacing Scale (4px base unit)

| Token | Value | Common Usage |
|-------|-------|--------------|
| `space-0` | 0 | Reset |
| `space-1` | 4px | Tight gaps, icon padding |
| `space-2` | 8px | Small gaps, button padding-x |
| `space-3` | 12px | Medium gaps |
| `space-4` | 16px | Standard gaps, card padding |
| `space-5` | 20px | Medium-large gaps |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Large gaps |
| `space-10` | 40px | XL gaps |
| `space-12` | 48px | Section margins |
| `space-16` | 64px | Page sections |

### Component Spacing Patterns

```tsx
// Button padding
<Button className="px-4 py-2" />  // 16px horizontal, 8px vertical

// Card padding
<Card className="p-6" />  // 24px all sides

// Form field gap
<div className="space-y-4" />  // 16px between fields

// Section margin
<section className="my-12" />  // 48px top/bottom
```

---

## Shadows (Two-Part System)

Each shadow has two layers: soft ambient + sharp direct.

| Level | CSS Value | Usage |
|-------|-----------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle depth, inputs |
| `shadow` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | Cards, buttons |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` | Dropdowns, popovers |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | Modals, dialogs |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` | Large overlays |

### Z-Index Stack

```
z-0: 0       /* Base */
z-10: 10     /* Raised elements */
z-20: 20     /* Dropdowns */
z-30: 30     /* Fixed headers */
z-40: 40     /* Overlays */
z-50: 50     /* Modals */
z-[100]: 100 /* Toasts, notifications */
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | Sharp corners |
| `rounded-sm` | 4px | Subtle rounding |
| `rounded` | 6px | Buttons, inputs |
| `rounded-md` | 8px | Cards |
| `rounded-lg` | 12px | Large cards, modals |
| `rounded-xl` | 16px | Hero sections |
| `rounded-full` | 9999px | Pills, avatars |

---

## Component Patterns

### Button Variants

```tsx
// Primary (main CTA)
<Button variant="primary">Submit</Button>
// Renders: bg-primary-900 text-white hover:bg-primary-800

// Secondary (alternative action)
<Button variant="secondary">Cancel</Button>
// Renders: bg-slate-100 text-slate-700 hover:bg-slate-200

// Outline (tertiary)
<Button variant="outline">Learn More</Button>
// Renders: border border-slate-300 text-slate-700 hover:bg-slate-50

// Ghost (minimal)
<Button variant="ghost">Skip</Button>
// Renders: text-slate-600 hover:bg-slate-100

// Destructive (danger)
<Button variant="destructive">Delete</Button>
// Renders: bg-error-500 text-white hover:bg-error-600
```

### Button Sizes

```tsx
<Button size="sm">Small</Button>   // h-8 px-3 text-sm
<Button size="md">Medium</Button>  // h-10 px-4 text-sm (default)
<Button size="lg">Large</Button>   // h-12 px-6 text-base
```

### Input States

```tsx
// Default
<Input placeholder="Enter email" />

// With icon
<Input leftIcon={<MailIcon />} placeholder="Email" />

// Error state
<Input error errorMessage="Invalid email format" />

// Disabled
<Input disabled placeholder="Cannot edit" />
```

### Card Structure

```tsx
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Subtitle text</Card.Description>
  </Card.Header>
  <Card.Content>
    {/* Main content */}
  </Card.Content>
  <Card.Footer>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </Card.Footer>
</Card>
```

---

## File Structure

```
css-design-system/
├── design-tokens/          # Source of truth for all tokens
│   ├── colors.json         # Color palettes
│   ├── typography.json     # Font system
│   ├── spacing.json        # Spacing scale
│   ├── shadows.json        # Shadow system
│   └── tokens.css          # CSS custom properties
├── components/
│   ├── atoms/              # Basic elements (Button, Input, Badge)
│   ├── molecules/          # Combinations (Card, Alert, FormField)
│   └── organisms/          # Complex (Modal, Navigation, DataTable)
├── references/             # Visual HTML documentation (for humans)
│   ├── index.html          # Hub page
│   ├── color-palette.html
│   ├── typography-scale.html
│   └── ...
├── styles/
│   ├── globals.css         # Global styles
│   └── themes/             # Light/dark themes
└── docs/                   # Markdown documentation
```

---

## Code Conventions

### Naming

```tsx
// Components: PascalCase
export function UserProfile() {}

// Props interfaces: ComponentNameProps
interface ButtonProps {}

// CSS classes: kebab-case with BEM-like structure
.card-header {}
.button--primary {}
.input__icon {}

// Design tokens: kebab-case with category prefix
--color-primary-500
--space-4
--shadow-md
```

### Component Structure

```tsx
// Standard component file structure
import { cn } from '@/lib/utils';

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export function Component({
  children,
  className,
  variant = 'default',
  ...props
}: ComponentProps) {
  return (
    <div
      className={cn(
        'base-classes',
        variant === 'primary' && 'primary-classes',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### The `cn()` Utility

Always use `cn()` for conditional classes:

```tsx
import { cn } from '@/lib/utils';

cn(
  'base-class',                    // Always applied
  isActive && 'active-class',      // Conditional
  size === 'lg' && 'large-class',  // Variant
  className                        // User override (last)
)
```

---

## Accessibility Requirements

### Color Contrast

- Normal text: minimum 4.5:1 ratio
- Large text (18px+ or 14px+ bold): minimum 3:1 ratio
- Interactive elements: minimum 3:1 ratio against background

### Focus Indicators

```css
/* Default focus ring */
focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2

/* For dark backgrounds */
focus:ring-white focus:ring-offset-slate-900
```

### Keyboard Navigation

- All interactive elements must be focusable
- Tab order must be logical
- Escape closes modals/dropdowns
- Enter/Space activates buttons

### ARIA Patterns

```tsx
// Button with loading state
<Button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>

// Modal
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Dialog Title</h2>
</div>

// Form field with error
<Input
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
<span id="email-error" role="alert">{errorMessage}</span>
```

---

## Common Patterns

### Form Layout

```tsx
<form className="space-y-6">
  <FormField label="Email" required>
    <Input type="email" placeholder="you@example.com" />
  </FormField>

  <FormField label="Password" required>
    <Input type="password" />
  </FormField>

  <div className="flex gap-3 justify-end">
    <Button variant="outline">Cancel</Button>
    <Button type="submit">Sign In</Button>
  </div>
</form>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      <Card.Header>
        <Card.Title>{item.title}</Card.Title>
      </Card.Header>
      <Card.Content>{item.description}</Card.Content>
    </Card>
  ))}
</div>
```

### Empty State

```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <IconPlaceholder className="w-12 h-12 text-slate-400 mb-4" />
  <h3 className="text-lg font-semibold text-slate-900">No items yet</h3>
  <p className="text-slate-500 mt-1 mb-4">Get started by creating your first item.</p>
  <Button>Create Item</Button>
</div>
```

---

## Do's and Don'ts

### Do

- Use design tokens instead of hardcoded values
- Follow the spacing scale (multiples of 4px)
- Use semantic color tokens for states (success, error, warning)
- Include hover/focus/active states for all interactive elements
- Use Slate gray for neutral UI elements

### Don't

- Don't use arbitrary color values (use tokens)
- Don't mix different neutral palettes (stick to Slate)
- Don't use shadows without elevation context
- Don't skip accessibility attributes
- Don't use font sizes outside the type scale

---

## Quick Lookups

### When building a button:
→ See `components/atoms/Button/index.tsx`

### When adding colors:
→ See `design-tokens/colors.json` for palettes
→ Use `--color-{palette}-{shade}` tokens

### When spacing elements:
→ Use `space-{n}` where n = pixels/4
→ Example: 16px = `space-4`

### When adding shadows:
→ Use `shadow-{size}` (sm, md, lg, xl)
→ Match with appropriate z-index

### When unsure about accessibility:
→ See `docs/accessibility-guidelines.md`

---

<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

*No recent activity*
</claude-mem-context>
