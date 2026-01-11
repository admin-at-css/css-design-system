# Form Patterns

This guide documents form patterns and best practices for the CSS Design System. Forms are critical for data collection and user interaction.

## Table of Contents

- [Form Layout Guidelines](#form-layout-guidelines)
- [Input Validation Patterns](#input-validation-patterns)
- [Error Handling](#error-handling)
- [Multi-Step Forms](#multi-step-forms)
- [Inline Editing](#inline-editing)
- [Auto-Save Pattern](#auto-save-pattern)

---

## Form Layout Guidelines

### Single Column Layout (Recommended)

Single column forms have higher completion rates and are easier to navigate.

```tsx
<form className="max-w-md space-y-4">
  <FormField label="Full Name" required>
    <Input placeholder="John Doe" />
  </FormField>

  <FormField label="Email Address" required>
    <Input type="email" placeholder="john@example.com" />
  </FormField>

  <FormField label="Password" required helperText="Must be at least 8 characters">
    <Input type="password" />
  </FormField>

  <Button type="submit" className="w-full">Create Account</Button>
</form>
```

### Multi-Column Layout

Use sparingly, only for related short fields like city/state/zip.

```tsx
<form className="max-w-2xl space-y-4">
  <FormField label="Street Address">
    <Input placeholder="123 Main St" />
  </FormField>

  <div className="grid grid-cols-6 gap-4">
    <FormField label="City" className="col-span-3">
      <Input placeholder="San Francisco" />
    </FormField>
    <FormField label="State" className="col-span-1">
      <Input placeholder="CA" />
    </FormField>
    <FormField label="ZIP" className="col-span-2">
      <Input placeholder="94102" />
    </FormField>
  </div>
</form>
```

### Form Sections

Group related fields with clear section headers.

```tsx
<form className="max-w-2xl space-y-8">
  {/* Personal Information */}
  <section>
    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
    <div className="space-y-4">
      <FormField label="Full Name" required>
        <Input />
      </FormField>
      <FormField label="Email" required>
        <Input type="email" />
      </FormField>
    </div>
  </section>

  {/* Shipping Address */}
  <section>
    <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
    <div className="space-y-4">
      <FormField label="Address">
        <Input />
      </FormField>
      <FormField label="City">
        <Input />
      </FormField>
    </div>
  </section>

  <Button type="submit">Save Changes</Button>
</form>
```

---

## Input Validation Patterns

### Real-Time Validation

Validate as the user types (with debouncing) for fields like username availability.

```tsx
function UsernameField() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  const checkUsername = useDebouncedCallback(async (value: string) => {
    if (value.length < 3) return;
    setStatus('checking');
    const isAvailable = await checkUsernameAvailability(value);
    setStatus(isAvailable ? 'available' : 'taken');
  }, 500);

  return (
    <FormField
      label="Username"
      error={status === 'taken' ? 'This username is already taken' : undefined}
    >
      <div className="relative">
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            checkUsername(e.target.value);
          }}
          className={cn(
            status === 'available' && 'border-success-500',
            status === 'taken' && 'border-error-500'
          )}
        />
        {status === 'checking' && (
          <Spinner className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
        )}
        {status === 'available' && (
          <CheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success-500" />
        )}
      </div>
    </FormField>
  );
}
```

### On-Blur Validation

Validate when the user leaves a field. Best for most validation scenarios.

```tsx
function EmailField() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validate = (value: string) => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate(email));
  };

  return (
    <FormField
      label="Email"
      error={touched ? error : undefined}
      required
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (touched) setError(validate(e.target.value));
        }}
        onBlur={handleBlur}
      />
    </FormField>
  );
}
```

### On-Submit Validation

Validate all fields when the form is submitted.

```tsx
function RegistrationForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: FormData) => {
    const errors: Record<string, string> = {};

    const name = formData.get('name') as string;
    if (!name) errors.name = 'Name is required';

    const email = formData.get('email') as string;
    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
    }

    const password = formData.get('password') as string;
    if (!password) errors.password = 'Password is required';
    else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    return errors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    // Submit form...
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField label="Name" error={errors.name} required>
        <Input id="name" name="name" />
      </FormField>

      <FormField label="Email" error={errors.email} required>
        <Input id="email" name="email" type="email" />
      </FormField>

      <FormField label="Password" error={errors.password} required>
        <Input id="password" name="password" type="password" />
      </FormField>

      <Button type="submit">Register</Button>
    </form>
  );
}
```

---

## Error Handling

### Field-Level Errors

Display errors directly below the relevant field.

```tsx
<FormField
  label="Email"
  error="Please enter a valid email address"
  required
>
  <Input type="email" variant="error" />
</FormField>
```

### Form-Level Errors

Display at the top of the form for server-side or general errors.

```tsx
function FormWithError() {
  const [formError, setFormError] = useState('');

  return (
    <form className="space-y-4">
      {formError && (
        <Alert variant="error" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      {/* Form fields... */}
    </form>
  );
}
```

### Error Summary

For long forms, show a summary of all errors at the top.

```tsx
function ErrorSummary({ errors }: { errors: Record<string, string> }) {
  const errorList = Object.entries(errors);

  if (errorList.length === 0) return null;

  return (
    <Alert variant="error" className="mb-6">
      <AlertTitle>Please fix the following errors:</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          {errorList.map(([field, message]) => (
            <li key={field}>
              <a href={`#${field}`} className="underline">
                {message}
              </a>
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
```

---

## Multi-Step Forms

For complex forms that benefit from being broken into steps.

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const totalSteps = 3;

  const updateFormData = (data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <Card className="max-w-lg mx-auto">
      <Card.Header>
        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-neutral-500 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full">
            <div
              className="h-full bg-primary-600 rounded-full transition-all"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card.Title>
          {step === 1 && 'Personal Information'}
          {step === 2 && 'Contact Details'}
          {step === 3 && 'Review & Submit'}
        </Card.Title>
      </Card.Header>

      <Card.Content>
        {step === 1 && (
          <StepOne data={formData} onUpdate={updateFormData} />
        )}
        {step === 2 && (
          <StepTwo data={formData} onUpdate={updateFormData} />
        )}
        {step === 3 && (
          <StepThree data={formData} />
        )}
      </Card.Content>

      <Card.Footer className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
        >
          Previous
        </Button>

        {step < totalSteps ? (
          <Button onClick={nextStep}>Continue</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </Card.Footer>
    </Card>
  );
}
```

---

## Inline Editing

Allow users to edit content directly without a separate form.

```tsx
function InlineEdit({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
        />
        <Button size="sm" onClick={handleSave}>Save</Button>
        <Button size="sm" variant="ghost" onClick={handleCancel}>Cancel</Button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="group flex items-center gap-2 hover:bg-neutral-50 px-2 py-1 rounded"
    >
      <span>{value}</span>
      <PencilIcon className="h-4 w-4 text-neutral-400 opacity-0 group-hover:opacity-100" />
    </button>
  );
}
```

---

## Auto-Save Pattern

Automatically save form data as the user types.

```tsx
function AutoSaveForm() {
  const [data, setData] = useState({ title: '', content: '' });
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  const debouncedSave = useDebouncedCallback(async (data: typeof data) => {
    setSaveStatus('saving');
    try {
      await saveToServer(data);
      setSaveStatus('saved');
    } catch (error) {
      setSaveStatus('error');
    }
  }, 1000);

  const handleChange = (field: keyof typeof data, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    debouncedSave(newData);
  };

  return (
    <form className="space-y-4">
      {/* Save Status Indicator */}
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        {saveStatus === 'saving' && (
          <>
            <Spinner className="h-4 w-4" />
            <span>Saving...</span>
          </>
        )}
        {saveStatus === 'saved' && (
          <>
            <CheckIcon className="h-4 w-4 text-success-500" />
            <span>All changes saved</span>
          </>
        )}
        {saveStatus === 'error' && (
          <>
            <AlertIcon className="h-4 w-4 text-error-500" />
            <span>Failed to save</span>
          </>
        )}
      </div>

      <FormField label="Title">
        <Input
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </FormField>

      <FormField label="Content">
        <Textarea
          value={data.content}
          onChange={(e) => handleChange('content', e.target.value)}
          rows={10}
        />
      </FormField>
    </form>
  );
}
```

---

## Best Practices Summary

| Practice | Description |
|----------|-------------|
| **Label all fields** | Every input needs an associated label |
| **Mark required fields** | Use asterisk (*) and aria-required |
| **Provide helper text** | Guide users with format expectations |
| **Show errors inline** | Display errors near the relevant field |
| **Focus first error** | On submit, focus the first invalid field |
| **Use appropriate types** | email, tel, number, date for better UX |
| **Smart defaults** | Pre-fill known values |
| **Group related fields** | Use fieldsets and sections |
| **Progressive disclosure** | Show advanced options only when needed |
