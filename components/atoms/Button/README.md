# Button

The Button component is used to trigger actions or events, such as submitting a form, opening a dialog, or performing an operation.

## Installation

The Button component is part of the CSS Design System. If you haven't already, install the design system:

```bash
npm install css-design-system
```

## Usage

```tsx
import { Button } from 'css-design-system';

function Example() {
  return <Button variant="primary">Click me</Button>;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' \| 'link'` | `'primary'` | Visual style of the button |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Shows loading spinner and disables button |
| `asChild` | `boolean` | `false` | Renders as a Slot, passing props to child element |
| `leftIcon` | `ReactNode` | - | Icon displayed before button text |
| `rightIcon` | `ReactNode` | - | Icon displayed after button text |

Plus all standard HTML button attributes (`onClick`, `type`, etc.)

## Examples

### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Learn more</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Loading State

When `loading` is true, the button shows a spinner and is disabled:

```tsx
const [isLoading, setIsLoading] = useState(false);

<Button loading={isLoading} onClick={handleSubmit}>
  {isLoading ? 'Saving...' : 'Save Changes'}
</Button>
```

### With Icons

```tsx
import { PlusIcon, ArrowRightIcon } from 'lucide-react';

// Left icon
<Button leftIcon={<PlusIcon className="h-4 w-4" />}>
  Add Item
</Button>

// Right icon
<Button rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
  Continue
</Button>

// Icon-only button (for toolbars, etc.)
<Button size="icon" aria-label="Settings">
  <SettingsIcon className="h-4 w-4" />
</Button>
```

### As a Link

Use `asChild` to render the button as a different element (like a link):

```tsx
<Button asChild variant="link">
  <a href="/about">About Us</a>
</Button>

// With Next.js Link
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Full Width

```tsx
<Button className="w-full">Full Width Button</Button>
```

### Button Group

```tsx
<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button variant="primary">Save Changes</Button>
</div>
```

## Accessibility

The Button component follows WAI-ARIA button guidelines:

- **Keyboard Navigation**: Buttons are focusable and can be activated with `Enter` or `Space` keys
- **Focus Indicator**: Visible focus ring for keyboard users
- **Disabled State**: Uses both `disabled` attribute and `aria-disabled`
- **Loading State**: Uses `aria-busy` to indicate loading
- **Icon Buttons**: Always provide `aria-label` for icon-only buttons

```tsx
// Good: Icon button with aria-label
<Button size="icon" aria-label="Delete item">
  <TrashIcon />
</Button>

// Bad: No accessible name
<Button size="icon">
  <TrashIcon />
</Button>
```

## Design Guidelines

### When to Use Each Variant

| Variant | Use Case |
|---------|----------|
| **Primary** | Main action on a page (Submit, Save, Create) |
| **Secondary** | Secondary actions that complement the primary |
| **Outline** | Secondary actions with less visual weight |
| **Ghost** | Tertiary actions, toolbars, navigation |
| **Destructive** | Dangerous actions (Delete, Remove, Cancel subscription) |
| **Link** | Navigation-like actions that look like hyperlinks |

### Button Hierarchy

On any given page or form:
- **One primary** action (most prominent)
- **Few secondary** actions (supporting)
- **Many tertiary** actions (least prominent)

```tsx
// Form with proper hierarchy
<div className="flex gap-2">
  <Button variant="ghost">Cancel</Button>           {/* Tertiary */}
  <Button variant="outline">Save as Draft</Button>  {/* Secondary */}
  <Button variant="primary">Publish</Button>        {/* Primary */}
</div>
```

### Spacing

- Use `gap-2` (8px) for button groups
- Use `gap-4` (16px) for spaced-out actions
- Align buttons to the right in forms and dialogs

## Related Components

- [Input](../Input/README.md) - Form input fields
- [FormField](../../molecules/FormField/README.md) - Form field wrapper
- [Modal](../../organisms/Modal/README.md) - Dialog with action buttons
