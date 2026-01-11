# Usage Examples

This guide provides practical examples of using the CSS Design System components and patterns in real-world scenarios.

## Table of Contents

- [Basic Component Usage](#basic-component-usage)
- [Form Examples](#form-examples)
- [Layout Patterns](#layout-patterns)
- [Data Display](#data-display)
- [Feedback Patterns](#feedback-patterns)
- [Composition Examples](#composition-examples)

---

## Basic Component Usage

### Buttons

```tsx
import { Button } from 'css-design-system';

// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>

// With Icons
<Button>
  <PlusIcon className="w-4 h-4" />
  Add Item
</Button>

// Icon-only button
<Button variant="ghost" size="icon" aria-label="Settings">
  <SettingsIcon className="w-4 h-4" />
</Button>
```

### Inputs

```tsx
import { Input, FormField } from 'css-design-system';

// Basic input
<Input
  type="email"
  placeholder="Enter your email"
/>

// With label and error
<FormField
  label="Email Address"
  error="Please enter a valid email"
  required
>
  <Input type="email" />
</FormField>

// Input with icon
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
  <Input type="search" className="pl-10" placeholder="Search..." />
</div>
```

### Cards

```tsx
import { Card } from 'css-design-system';

<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>
      Optional description text
    </Card.Description>
  </Card.Header>
  <Card.Content>
    Main content goes here
  </Card.Content>
  <Card.Footer>
    <Button variant="outline">Cancel</Button>
    <Button variant="primary">Save</Button>
  </Card.Footer>
</Card>

// Variants
<Card variant="elevated">With shadow</Card>
<Card variant="outlined">With border</Card>
<Card variant="filled">With background</Card>
```

---

## Form Examples

### Login Form

```tsx
import { Button, Card, Input, FormField, Checkbox } from 'css-design-system';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle login...
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Card.Header>
        <Card.Title>Sign In</Card.Title>
        <Card.Description>
          Enter your credentials to access your account
        </Card.Description>
      </Card.Header>
      <form onSubmit={handleSubmit}>
        <Card.Content className="space-y-4">
          <FormField
            label="Email"
            error={errors.email}
            required
          >
            <Input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </FormField>

          <FormField
            label="Password"
            error={errors.password}
            required
          >
            <Input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </FormField>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-primary-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </Card.Content>

        <Card.Footer className="flex-col gap-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={isLoading}
          >
            Sign In
          </Button>
          <p className="text-sm text-center text-neutral-500">
            Don't have an account?{' '}
            <a href="/register" className="text-primary-600 hover:underline">
              Sign up
            </a>
          </p>
        </Card.Footer>
      </form>
    </Card>
  );
}
```

### Multi-Step Form

```tsx
import { Button, Card, Input, Progress } from 'css-design-system';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  return (
    <Card>
      <Card.Header>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500">
            Step {step} of {totalSteps}
          </span>
          <Progress value={(step / totalSteps) * 100} />
          <Card.Title>
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Contact Details'}
            {step === 3 && 'Review & Submit'}
          </Card.Title>
        </div>
      </Card.Header>

      <Card.Content>
        {step === 1 && (
          <div className="space-y-4">
            <FormField label="First Name" required>
              <Input placeholder="John" />
            </FormField>
            <FormField label="Last Name" required>
              <Input placeholder="Doe" />
            </FormField>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <FormField label="Email" required>
              <Input type="email" placeholder="john@example.com" />
            </FormField>
            <FormField label="Phone">
              <Input type="tel" placeholder="+62 812 3456 7890" />
            </FormField>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            {/* Review content */}
          </div>
        )}
      </Card.Content>

      <Card.Footer className="justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 1}
        >
          Previous
        </Button>
        {step < totalSteps ? (
          <Button
            variant="primary"
            onClick={() => setStep(s => s + 1)}
          >
            Continue
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
```

---

## Layout Patterns

### Dashboard Grid

```tsx
import { Card } from 'css-design-system';

function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-neutral-200 min-h-screen p-4">
          <Navigation />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total Revenue" value="$45,231" change="+12.5%" />
            <StatsCard title="Orders" value="1,234" change="+8.2%" />
            <StatsCard title="Customers" value="891" change="+15.3%" />
            <StatsCard title="Avg. Order" value="$52.50" change="-2.1%" />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <Card.Header>
                <Card.Title>Recent Orders</Card.Title>
              </Card.Header>
              <Card.Content>
                <OrdersTable />
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>Top Products</Card.Title>
              </Card.Header>
              <Card.Content>
                <ProductsList />
              </Card.Content>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
```

### Responsive Container

```tsx
function ResponsiveLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
```

---

## Data Display

### Data Table

```tsx
import { DataTable, Badge, Button } from 'css-design-system';

const columns = [
  {
    header: 'Order ID',
    accessor: 'id',
    cell: ({ value }) => <span className="font-mono text-sm">{value}</span>,
  },
  {
    header: 'Customer',
    accessor: 'customer',
  },
  {
    header: 'Status',
    accessor: 'status',
    cell: ({ value }) => (
      <Badge variant={value === 'completed' ? 'success' : 'warning'}>
        {value}
      </Badge>
    ),
  },
  {
    header: 'Amount',
    accessor: 'amount',
    cell: ({ value }) => <span className="font-medium">${value}</span>,
  },
  {
    header: 'Actions',
    accessor: 'id',
    cell: ({ row }) => (
      <Button variant="ghost" size="sm">
        View
      </Button>
    ),
  },
];

function OrdersTable() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={isLoading}
      emptyState={
        <div className="text-center py-12">
          <p className="text-neutral-500">No orders found</p>
        </div>
      }
    />
  );
}
```

---

## Feedback Patterns

### Toast Notifications

```tsx
import { useToast, Button } from 'css-design-system';

function SaveButton() {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast({
        title: 'Changes saved',
        description: 'Your changes have been saved successfully.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error saving changes',
        description: error.message,
        variant: 'error',
      });
    }
  };

  return <Button onClick={handleSave}>Save Changes</Button>;
}
```

### Loading States

```tsx
import { Skeleton, Spinner } from 'css-design-system';

// Skeleton loading
function CardSkeleton() {
  return (
    <Card>
      <Card.Header>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
      </Card.Header>
      <Card.Content className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </Card.Content>
    </Card>
  );
}

// Spinner overlay
function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
```

### Empty States

```tsx
import { Button } from 'css-design-system';

function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
        <FolderIcon className="w-8 h-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-2">
        {title}
      </h3>
      <p className="text-neutral-500 mb-6 max-w-sm mx-auto">
        {description}
      </p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Usage
<EmptyState
  title="No projects yet"
  description="Get started by creating your first project."
  action={{ label: 'Create Project', onClick: () => {} }}
/>
```

---

## Composition Examples

### Settings Page

```tsx
function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile Section */}
        <Card>
          <Card.Header>
            <Card.Title>Profile</Card.Title>
            <Card.Description>
              Manage your public profile information
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar size="lg" src="/avatar.jpg" alt="User" />
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            <FormField label="Display Name">
              <Input defaultValue="John Doe" />
            </FormField>
            <FormField label="Bio">
              <Textarea placeholder="Tell us about yourself..." />
            </FormField>
          </Card.Content>
          <Card.Footer>
            <Button variant="primary">Save Changes</Button>
          </Card.Footer>
        </Card>

        {/* Notifications Section */}
        <Card>
          <Card.Header>
            <Card.Title>Notifications</Card.Title>
            <Card.Description>
              Configure how you receive notifications
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email notifications</p>
                  <p className="text-sm text-neutral-500">
                    Receive updates via email
                  </p>
                </div>
                <Switch />
              </label>
              <Separator />
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push notifications</p>
                  <p className="text-sm text-neutral-500">
                    Receive push notifications in browser
                  </p>
                </div>
                <Switch />
              </label>
            </div>
          </Card.Content>
        </Card>

        {/* Danger Zone */}
        <Card variant="outlined" className="border-red-200">
          <Card.Header>
            <Card.Title className="text-red-600">Danger Zone</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-neutral-500">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
```

---

<p align="center">
  <em>These examples demonstrate real-world usage patterns. Adapt them to your specific needs.</em>
</p>
