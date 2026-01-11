# Layout Patterns

This guide documents layout patterns for consistent page structure across the CSS Design System.

## Table of Contents

- [Page Layouts](#page-layouts)
- [Grid Systems](#grid-systems)
- [Container Patterns](#container-patterns)
- [Responsive Patterns](#responsive-patterns)

---

## Page Layouts

### Full-Width Layout

```tsx
function FullWidthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

### Sidebar Layout

```tsx
function SidebarLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar className="w-64 flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### Split Layout

```tsx
function SplitLayout({ left, right }) {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-primary-900 flex items-center justify-center">
        {left}
      </div>
      <div className="w-1/2 flex items-center justify-center p-8">
        {right}
      </div>
    </div>
  );
}
```

---

## Grid Systems

### 12-Column Grid

```tsx
function Grid({ children, cols = 12, gap = 6 }) {
  return (
    <div className={`grid grid-cols-${cols} gap-${gap}`}>
      {children}
    </div>
  );
}

// Usage
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-4">Sidebar</div>
  <div className="col-span-8">Main Content</div>
</div>
```

### Auto-Fit Grid

```tsx
// Cards that automatically adjust
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  {items.map((item) => <Card key={item.id} />)}
</div>
```

---

## Container Patterns

### Centered Container

```tsx
function Container({ size = 'lg', children }) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size])}>
      {children}
    </div>
  );
}
```

### Prose Container

```tsx
// For long-form content
function ProseContainer({ children }) {
  return (
    <div className="max-w-prose mx-auto px-4">
      {children}
    </div>
  );
}
```

---

## Responsive Patterns

### Stack to Row

```tsx
// Stacks on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div className="md:w-1/3">Sidebar</div>
  <div className="md:w-2/3">Content</div>
</div>
```

### Hide/Show at Breakpoints

```tsx
// Mobile only
<div className="block md:hidden">Mobile Menu</div>

// Desktop only
<div className="hidden md:block">Desktop Menu</div>
```

---

## Best Practices

| Practice | Description |
|----------|-------------|
| Mobile-first | Start with mobile layout, add breakpoints |
| Fixed sidebars | Use fixed width for sidebars, let content flex |
| Semantic HTML | Use `<main>`, `<aside>`, `<header>`, `<footer>` |
| Consistent spacing | Use spacing tokens throughout |
| Max-width limits | Prevent content from becoming too wide |
