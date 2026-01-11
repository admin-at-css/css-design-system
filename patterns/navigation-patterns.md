# Navigation Patterns

This guide documents navigation patterns used throughout the CSS Design System. Each pattern includes when to use it, implementation details, and accessibility considerations.

## Table of Contents

- [Top Navigation](#top-navigation)
- [Sidebar Navigation](#sidebar-navigation)
- [Breadcrumb Navigation](#breadcrumb-navigation)
- [Tab Navigation](#tab-navigation)
- [Pagination](#pagination)
- [Mobile Navigation](#mobile-navigation)

---

## Top Navigation

### Description

A horizontal navigation bar typically placed at the top of the page. Best for applications with 3-7 primary navigation items.

### When to Use

- Marketing websites and landing pages
- Applications with few primary sections
- When brand visibility is important

### Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]     [Home] [Products] [About] [Contact]     [User Menu] │
└─────────────────────────────────────────────────────────────────┘
```

### Implementation

```tsx
import {
  Navigation,
  NavigationList,
  NavigationItem,
  NavigationLink,
} from 'css-design-system';

function TopNavigation() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="CSS" className="h-8 w-auto" />
          </a>

          {/* Main Navigation */}
          <Navigation>
            <NavigationList orientation="horizontal">
              <NavigationItem>
                <NavigationLink href="/" active>Home</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink href="/products">Products</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink href="/about">About</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink href="/contact">Contact</NavigationLink>
              </NavigationItem>
            </NavigationList>
          </Navigation>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

### Best Practices

- Keep navigation items to 3-7 items
- Use clear, action-oriented labels
- Highlight the current page
- Place the most important items first

### Accessibility Considerations

- Use `<nav>` element with `aria-label`
- Include skip navigation link
- Ensure keyboard navigation works
- Use `aria-current="page"` for active items

---

## Sidebar Navigation

### Description

A vertical navigation panel typically placed on the left side of the screen. Best for applications with many navigation items organized into categories.

### When to Use

- Admin dashboards
- Applications with nested navigation
- Complex apps with many sections
- When persistent navigation is needed

### Structure

```
┌─────────┬─────────────────────────────────────┐
│ [Logo]  │                                     │
├─────────┤                                     │
│ Section │                                     │
│  • Item │            Main Content             │
│  • Item │                                     │
│         │                                     │
│ Section │                                     │
│  • Item │                                     │
│  • Item │                                     │
└─────────┴─────────────────────────────────────┘
```

### Implementation

```tsx
function SidebarNavigation() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-neutral-50 border-r border-neutral-200">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-neutral-200">
        <img src="/logo.svg" alt="CSS" className="h-8 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="p-4" aria-label="Main navigation">
        {/* Section 1 */}
        <div className="mb-6">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Dashboard
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="/dashboard"
                className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium bg-primary-50 text-primary-700"
                aria-current="page"
              >
                <HomeIcon className="h-4 w-4" />
                Overview
              </a>
            </li>
            <li>
              <a
                href="/analytics"
                className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
              >
                <ChartIcon className="h-4 w-4" />
                Analytics
              </a>
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-6">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Management
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="/users"
                className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
              >
                <UsersIcon className="h-4 w-4" />
                Users
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
```

### Best Practices

- Group related items into sections
- Use icons for quick recognition
- Keep section labels short
- Consider collapsible sections for deep navigation

---

## Breadcrumb Navigation

### Description

A secondary navigation showing the user's location within the site hierarchy.

### When to Use

- Content-heavy websites
- E-commerce product pages
- Multi-level page hierarchies
- To help users understand their location

### Implementation

```tsx
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-neutral-400" aria-hidden="true" />
            )}
            {index === items.length - 1 ? (
              <span className="text-neutral-600" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-neutral-500 hover:text-neutral-900"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Usage
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Oil Filters', href: '/products/oil-filters' },
    { label: 'Premium Filter XL' },
  ]}
/>
```

### Accessibility Considerations

- Use `<nav>` with `aria-label="Breadcrumb"`
- Use ordered list for semantic structure
- Mark current page with `aria-current="page"`

---

## Tab Navigation

### Description

Horizontal tabs for switching between related content panels.

### When to Use

- Related content that doesn't need to load separately
- Settings pages with multiple sections
- When content is mutually exclusive

### Implementation

```tsx
import * as Tabs from '@radix-ui/react-tabs';

function TabNavigation() {
  return (
    <Tabs.Root defaultValue="overview">
      <Tabs.List className="flex border-b border-neutral-200">
        <Tabs.Trigger
          value="overview"
          className="px-4 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 text-neutral-600 hover:text-neutral-900"
        >
          Overview
        </Tabs.Trigger>
        <Tabs.Trigger
          value="analytics"
          className="px-4 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 text-neutral-600 hover:text-neutral-900"
        >
          Analytics
        </Tabs.Trigger>
        <Tabs.Trigger
          value="settings"
          className="px-4 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 text-neutral-600 hover:text-neutral-900"
        >
          Settings
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="overview" className="p-4">
        Overview content...
      </Tabs.Content>
      <Tabs.Content value="analytics" className="p-4">
        Analytics content...
      </Tabs.Content>
      <Tabs.Content value="settings" className="p-4">
        Settings content...
      </Tabs.Content>
    </Tabs.Root>
  );
}
```

### Accessibility Considerations

- Use proper ARIA roles (tablist, tab, tabpanel)
- Arrow keys should navigate between tabs
- Only active tab should be in tab order

---

## Pagination

### Description

Navigation for moving through pages of content.

### When to Use

- Long lists that are paginated
- Search results
- Data tables with many rows

### Implementation

```tsx
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = generatePageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination">
      <ul className="flex items-center gap-1">
        {/* Previous */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go to previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((page) => (
          <li key={page}>
            {page === '...' ? (
              <span className="px-3 py-2">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium',
                  page === currentPage
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                )}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go to next page"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
```

---

## Mobile Navigation

### Description

Navigation patterns optimized for mobile devices, typically using a hamburger menu or bottom navigation.

### Hamburger Menu Pattern

```tsx
function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img src="/logo.svg" alt="CSS" className="h-8" />
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          {/* Navigation items */}
        </nav>
      </div>
    </>
  );
}
```

### Bottom Navigation Pattern (Mobile App Style)

```tsx
function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 lg:hidden">
      <ul className="flex justify-around">
        {[
          { icon: HomeIcon, label: 'Home', href: '/' },
          { icon: SearchIcon, label: 'Search', href: '/search' },
          { icon: CartIcon, label: 'Cart', href: '/cart' },
          { icon: UserIcon, label: 'Account', href: '/account' },
        ].map(({ icon: Icon, label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="flex flex-col items-center gap-1 px-4 py-3 text-neutral-600"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

## Summary

| Pattern | Use Case | Mobile Friendly |
|---------|----------|-----------------|
| Top Navigation | Marketing sites, simple apps | Use hamburger |
| Sidebar | Dashboards, complex apps | Collapsible drawer |
| Breadcrumb | Deep hierarchies | Truncate middle |
| Tabs | Related content panels | Scrollable tabs |
| Pagination | Long lists | Simplified controls |
