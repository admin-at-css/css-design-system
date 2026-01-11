# Feedback Patterns

This guide documents feedback patterns that communicate system status, user actions, and state changes in the CSS Design System.

## Table of Contents

- [Toast Notifications](#toast-notifications)
- [Loading States](#loading-states)
- [Empty States](#empty-states)
- [Error States](#error-states)
- [Success Confirmations](#success-confirmations)
- [Progress Indicators](#progress-indicators)

---

## Toast Notifications

Temporary messages that appear briefly to communicate feedback about an action.

### When to Use

- Confirming a completed action
- Non-blocking error messages
- Background process updates
- Transient information

### Implementation

```tsx
// Toast Provider (wrap your app)
import { Toast, ToastProvider, ToastViewport } from '@radix-ui/react-toast';

function App() {
  return (
    <ToastProvider>
      {/* Your app */}
      <ToastViewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-96 z-50" />
    </ToastProvider>
  );
}

// Toast Hook
function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = useCallback(({ title, description, variant = 'default', duration = 5000 }) => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, title, description, variant, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return { toast, toasts };
}

// Toast Component
function ToastNotification({ title, description, variant }) {
  const variants = {
    default: 'bg-white border-neutral-200',
    success: 'bg-success-50 border-success-200',
    error: 'bg-error-50 border-error-200',
    warning: 'bg-warning-50 border-warning-200',
  };

  const icons = {
    default: null,
    success: <CheckCircleIcon className="h-5 w-5 text-success-500" />,
    error: <XCircleIcon className="h-5 w-5 text-error-500" />,
    warning: <AlertTriangleIcon className="h-5 w-5 text-warning-500" />,
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 shadow-lg',
        variants[variant]
      )}
      role="alert"
      aria-live="polite"
    >
      {icons[variant] && <span aria-hidden="true">{icons[variant]}</span>}
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        {description && <p className="text-sm text-neutral-600 mt-1">{description}</p>}
      </div>
      <button
        onClick={onDismiss}
        className="text-neutral-400 hover:text-neutral-600"
        aria-label="Dismiss"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

// Usage
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
        title: 'Failed to save',
        description: error.message,
        variant: 'error',
      });
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

### Toast Guidelines

| Type | Duration | Use Case |
|------|----------|----------|
| Success | 3-5 seconds | Action completed |
| Info | 5 seconds | General information |
| Warning | 8 seconds | Important notice |
| Error | Manual dismiss | Critical errors |

---

## Loading States

### Spinner

For actions that take 1-3 seconds.

```tsx
function Spinner({ size = 'md', className }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  return (
    <svg
      className={cn('animate-spin text-primary-600', sizes[size], className)}
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Full page loading
function PageLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-4 text-neutral-600">Loading...</p>
      </div>
    </div>
  );
}
```

### Skeleton Screens

For content that takes longer to load. Show the layout structure.

```tsx
function Skeleton({ className }) {
  return (
    <div
      className={cn('animate-pulse bg-neutral-200 rounded', className)}
      aria-hidden="true"
    />
  );
}

// Card skeleton
function CardSkeleton() {
  return (
    <Card>
      <Card.Header>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32 mt-2" />
      </Card.Header>
      <Card.Content className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </Card.Content>
    </Card>
  );
}

// Table skeleton
function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// Usage
function DataList() {
  const { data, isLoading } = useFetchData();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return data.map((item) => <Card key={item.id}>{/* ... */}</Card>);
}
```

### Button Loading State

```tsx
function SubmitButton({ loading, children }) {
  return (
    <Button disabled={loading}>
      {loading && <Spinner size="sm" className="mr-2" />}
      {loading ? 'Saving...' : children}
    </Button>
  );
}
```

---

## Empty States

When there's no content to display.

### Implementation

```tsx
function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-neutral-400" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-medium text-neutral-900 mb-2">
        {title}
      </h3>
      <p className="text-neutral-500 max-w-sm mb-6">
        {description}
      </p>

      {/* Action */}
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Usage examples
<EmptyState
  icon={FolderIcon}
  title="No projects yet"
  description="Get started by creating your first project."
  action={{ label: 'Create Project', onClick: () => {} }}
/>

<EmptyState
  icon={SearchIcon}
  title="No results found"
  description="Try adjusting your search or filters to find what you're looking for."
  action={{ label: 'Clear Filters', onClick: clearFilters }}
/>

<EmptyState
  icon={InboxIcon}
  title="All caught up!"
  description="You have no unread notifications."
/>
```

### Empty State Guidelines

| Context | Title | Action |
|---------|-------|--------|
| New user | Welcoming, encouraging | Create first item |
| No search results | Helpful | Clear filters |
| No data | Informative | Import data |
| Completed tasks | Celebratory | None needed |

---

## Error States

### Page-Level Error

```tsx
function ErrorPage({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-error-100 flex items-center justify-center mx-auto mb-4">
          <AlertCircleIcon className="h-8 w-8 text-error-500" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-neutral-600 mb-6">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
          <Button onClick={reset}>Try Again</Button>
        </div>
      </div>
    </div>
  );
}
```

### Component-Level Error

```tsx
function DataWithError() {
  const { data, error, refetch } = useFetchData();

  if (error) {
    return (
      <Alert variant="error">
        <AlertTitle>Failed to load data</AlertTitle>
        <AlertDescription>
          {error.message}
          <Button
            variant="link"
            className="ml-2 p-0 h-auto"
            onClick={refetch}
          >
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return <DataDisplay data={data} />;
}
```

### Error Boundary

```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          error={this.state.error}
          reset={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}
```

---

## Success Confirmations

### Inline Success

```tsx
function SuccessMessage({ message, onDismiss }) {
  return (
    <Alert variant="success" className="mb-4">
      <CheckCircleIcon className="h-5 w-5" />
      <AlertTitle>{message}</AlertTitle>
      {onDismiss && (
        <button onClick={onDismiss} className="ml-auto">
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
}
```

### Success Modal

```tsx
function SuccessModal({ isOpen, onClose, title, message }) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="sm" className="text-center">
        <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="h-8 w-8 text-success-500" />
        </div>
        <ModalTitle>{title}</ModalTitle>
        <p className="text-neutral-600 mt-2">{message}</p>
        <Button className="mt-6 w-full" onClick={onClose}>
          Done
        </Button>
      </ModalContent>
    </Modal>
  );
}
```

---

## Progress Indicators

### Linear Progress

```tsx
function Progress({ value, max = 100, className }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn('h-2 bg-neutral-200 rounded-full overflow-hidden', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className="h-full bg-primary-600 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// With label
function ProgressWithLabel({ value, max = 100, label }) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span className="text-neutral-500">{percentage}%</span>
      </div>
      <Progress value={value} max={max} />
    </div>
  );
}
```

### Step Indicator

```tsx
function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step */}
          <div className="flex items-center">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                index < currentStep
                  ? 'bg-success-500 text-white'
                  : index === currentStep
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-500'
              )}
            >
              {index < currentStep ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                'ml-2 text-sm hidden sm:inline',
                index <= currentStep ? 'text-neutral-900' : 'text-neutral-500'
              )}
            >
              {step.label}
            </span>
          </div>

          {/* Connector */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                'flex-1 h-0.5 mx-4',
                index < currentStep ? 'bg-success-500' : 'bg-neutral-200'
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
```

---

## Guidelines Summary

| Pattern | When to Use | Duration |
|---------|-------------|----------|
| Toast | Action feedback | 3-8 seconds |
| Spinner | Short loading | < 3 seconds |
| Skeleton | Content loading | Any |
| Empty State | No content | Permanent |
| Error State | Failures | Until resolved |
| Progress | Long operations | Duration-based |
