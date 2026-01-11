# Input

The Input component is used to capture user input in forms. It supports various types, states, sizes, and can include icons.

## Usage

```tsx
import { Input } from 'css-design-system';

function Example() {
  return <Input type="email" placeholder="Enter your email" />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `variant` | `'default' \| 'error' \| 'success'` | `'default'` | Visual variant |
| `inputSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input |
| `error` | `string` | - | Error message (sets variant to error) |
| `startIcon` | `ReactNode` | - | Icon at the start of input |
| `endIcon` | `ReactNode` | - | Icon at the end of input |
| `disabled` | `boolean` | `false` | Whether the input is disabled |

Plus all standard HTML input attributes.

## Examples

### Basic Input Types

```tsx
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email address" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="date" />
<Input type="search" placeholder="Search..." />
```

### Sizes

```tsx
<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium (default)" />
<Input inputSize="lg" placeholder="Large" />
```

### With Icons

```tsx
import { Search, Mail, Eye } from 'lucide-react';

<Input
  startIcon={<Search className="h-4 w-4" />}
  placeholder="Search..."
/>

<Input
  startIcon={<Mail className="h-4 w-4" />}
  type="email"
  placeholder="Email"
/>

<Input
  type="password"
  placeholder="Password"
  endIcon={<Eye className="h-4 w-4 cursor-pointer" />}
/>
```

### States

```tsx
// Error state
<Input variant="error" placeholder="Invalid input" />

// Success state
<Input variant="success" placeholder="Valid input" />

// Disabled
<Input disabled placeholder="Disabled input" />
```

### With Error Message

When used with FormField, errors are automatically connected:

```tsx
<FormField label="Email" error="Please enter a valid email">
  <Input type="email" />
</FormField>
```

## Accessibility

- Uses `aria-invalid` when in error state
- Connects to error message via `aria-describedby`
- Supports all standard keyboard navigation
- Focus ring is visible for keyboard users

## Related Components

- [FormField](../../molecules/FormField/README.md) - Wrapper with label and error
- [Textarea](../Textarea/README.md) - Multi-line text input
- [Select](../Select/README.md) - Dropdown selection
