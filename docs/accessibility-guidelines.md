# Accessibility Guidelines

The CSS Design System is committed to creating inclusive digital experiences. This guide outlines our accessibility standards and implementation requirements.

## Table of Contents

- [Standards Compliance](#standards-compliance)
- [Color and Contrast](#color-and-contrast)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [Forms and Inputs](#forms-and-inputs)
- [Motion and Animation](#motion-and-animation)
- [Testing Checklist](#testing-checklist)

---

## Standards Compliance

### WCAG 2.1 Level AA

The CSS Design System targets **WCAG 2.1 Level AA** compliance. This includes:

| Criterion | Requirement | Our Implementation |
|-----------|-------------|-------------------|
| 1.1.1 | Non-text content has alternatives | Alt text, ARIA labels |
| 1.3.1 | Information conveyed by structure | Semantic HTML |
| 1.4.3 | Contrast (Minimum) | 4.5:1 normal, 3:1 large |
| 2.1.1 | Keyboard accessible | Full keyboard support |
| 2.4.7 | Focus visible | Custom focus rings |
| 4.1.2 | Name, Role, Value | ARIA attributes |

### Legal Considerations

Many jurisdictions require digital accessibility:
- **ADA** (Americans with Disabilities Act) - United States
- **EAA** (European Accessibility Act) - European Union
- **Section 508** - US Government

---

## Color and Contrast

### Contrast Requirements

| Text Type | Minimum Ratio | Example |
|-----------|---------------|---------|
| Normal text (<18px) | 4.5:1 | Body copy, labels |
| Large text (≥18px bold, ≥24px) | 3:1 | Headings |
| UI components | 3:1 | Buttons, inputs |
| Non-essential graphics | No requirement | Decorative images |

### Color Palette Compliance

Our design tokens are pre-tested for accessibility:

```css
/* COMPLIANT: High contrast combinations */
.text-on-light {
  color: var(--color-neutral-900);  /* #0f172a on white = 15.1:1 */
  background: var(--color-white);
}

.text-on-dark {
  color: var(--color-neutral-50);   /* #f8fafc on dark = 14.2:1 */
  background: var(--color-neutral-900);
}

/* COMPLIANT: Primary button */
.button-primary {
  color: var(--color-white);
  background: var(--color-primary-600);  /* 4.8:1 ratio */
}
```

### Don't Rely on Color Alone

Always provide additional indicators:

```tsx
// BAD: Color is only indicator
<span className="text-red-500">Error</span>

// GOOD: Icon + color + text
<div className="flex items-center gap-2 text-red-600">
  <AlertCircle className="w-4 h-4" aria-hidden="true" />
  <span>Error: Invalid email address</span>
</div>
```

---

## Keyboard Navigation

### Required Support

All interactive elements must be:
- Focusable with `Tab` key
- Activated with `Enter` or `Space`
- Navigable in logical order

### Common Keyboard Patterns

| Component | Keys | Behavior |
|-----------|------|----------|
| Button | `Enter`, `Space` | Activate |
| Link | `Enter` | Navigate |
| Checkbox | `Space` | Toggle |
| Radio Group | `Arrow` keys | Move selection |
| Dropdown | `Arrow` keys, `Enter`, `Escape` | Navigate, select, close |
| Modal | `Tab` (trapped), `Escape` | Navigate, close |
| Tabs | `Arrow` keys | Switch tabs |

### Implementation Example

```tsx
// Keyboard-accessible dropdown
function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(i => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect(options[focusedIndex]);
        setIsOpen(false);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div role="listbox" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* ... */}
    </div>
  );
}
```

---

## Screen Reader Support

### Semantic HTML First

Use proper HTML elements before ARIA:

```tsx
// GOOD: Semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// AVOID: Divs with ARIA roles
<div role="navigation">
  <div role="list">
    <div role="listitem"><a href="/home">Home</a></div>
  </div>
</div>
```

### Essential ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Label for element | `aria-label="Close dialog"` |
| `aria-labelledby` | Reference to labeling element | `aria-labelledby="dialog-title"` |
| `aria-describedby` | Reference to description | `aria-describedby="error-message"` |
| `aria-hidden` | Hide from assistive tech | `aria-hidden="true"` (decorative) |
| `aria-live` | Announce dynamic content | `aria-live="polite"` |
| `aria-expanded` | Disclosure state | `aria-expanded={isOpen}` |
| `aria-selected` | Selection state | `aria-selected={isSelected}` |
| `aria-disabled` | Disabled state | `aria-disabled="true"` |

### Live Regions

Announce dynamic updates to screen readers:

```tsx
// Toast notification with live region
<div
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  Your changes have been saved.
</div>

// Status updates with polite announcement
<div
  role="status"
  aria-live="polite"
>
  Loading... 50% complete
</div>
```

---

## Focus Management

### Visible Focus States

All focusable elements must have visible focus indicators:

```css
/* Base focus styles */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-500);
  border-radius: var(--radius-md);
}

/* High contrast mode support */
@media (forced-colors: active) {
  :focus-visible {
    outline: 3px solid CanvasText;
    outline-offset: 2px;
  }
}
```

### Focus Trapping for Modals

```tsx
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    const focusableElements = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    // Focus first element on open
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  );
}
```

---

## Forms and Inputs

### Label Association

Every input must have an associated label:

```tsx
// GOOD: Explicit association
<label htmlFor="email">Email address</label>
<input id="email" type="email" />

// GOOD: Implicit association
<label>
  Email address
  <input type="email" />
</label>

// BAD: No association
<span>Email address</span>
<input type="email" />
```

### Error Messages

Connect errors to inputs with `aria-describedby`:

```tsx
function FormField({ id, label, error, children }) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {React.cloneElement(children, {
        id,
        'aria-invalid': !!error,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <span id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
```

### Required Fields

Indicate required fields visually AND programmatically:

```tsx
<label htmlFor="name">
  Full name <span aria-hidden="true">*</span>
  <span className="sr-only">(required)</span>
</label>
<input id="name" required aria-required="true" />
```

---

## Motion and Animation

### Respect User Preferences

Honor the `prefers-reduced-motion` media query:

```css
/* Default animations */
.animated-element {
  transition: transform 300ms ease-out;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }

  /* Or use opacity instead of movement */
  .fade-in {
    transition: opacity 100ms linear;
  }
}
```

### In React Components

```tsx
function AnimatedComponent() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  return (
    <motion.div
      animate={{ opacity: 1, y: prefersReducedMotion ? 0 : 10 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

---

## Testing Checklist

### Automated Testing

Run these tools in your CI/CD pipeline:

- **axe-core** - Accessibility testing engine
- **Lighthouse** - Performance and accessibility audits
- **ESLint Plugin** - `eslint-plugin-jsx-a11y`

```bash
npm install --save-dev @axe-core/react
```

```tsx
// In development only
import React from 'react';
import ReactDOM from 'react-dom';
import axe from '@axe-core/react';

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}
```

### Manual Testing Checklist

- [ ] Navigate entire page with keyboard only
- [ ] Test with screen reader (VoiceOver, NVDA, JAWS)
- [ ] Verify color contrast ratios
- [ ] Check focus visibility on all interactive elements
- [ ] Test at 200% zoom
- [ ] Verify forms are usable without mouse
- [ ] Check error messages are announced
- [ ] Test with `prefers-reduced-motion`

### Screen Reader Testing

| Platform | Screen Reader | How to Enable |
|----------|---------------|---------------|
| macOS | VoiceOver | `Cmd + F5` |
| Windows | NVDA | Download free |
| Windows | JAWS | Commercial |
| iOS | VoiceOver | Settings > Accessibility |
| Android | TalkBack | Settings > Accessibility |

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

<p align="center">
  <em>Accessibility is not a feature. It's a requirement.</em>
</p>
