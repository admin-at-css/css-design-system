# Quick Start Implementation Guide

This guide walks you through implementing common UI patterns using the CSS Design System.

## Prerequisites

Ensure you have the design system installed:

```bash
npm install css-design-system
```

---

## Example 1: Basic Form

A simple contact form with validation.

```tsx
import { Button, Card, Input, FormField } from 'css-design-system';
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Submit form...
    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-md mx-auto">
      <Card.Header>
        <Card.Title>Contact Us</Card.Title>
        <Card.Description>We'd love to hear from you</Card.Description>
      </Card.Header>
      <form onSubmit={handleSubmit}>
        <Card.Content className="space-y-4">
          <FormField label="Name" error={errors.name} required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormField>

          <FormField label="Email" error={errors.email} required>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormField>

          <FormField label="Message" error={errors.message} required>
            <textarea
              className="w-full border border-neutral-300 rounded-md p-3"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </FormField>
        </Card.Content>
        <Card.Footer>
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Send Message
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
}
```

---

## Example 2: Data Table

A data table with sorting and filtering.

```tsx
import { DataTable, SearchBar, Badge } from 'css-design-system';

const columns = [
  { id: 'name', header: 'Name', accessor: 'name', sortable: true },
  { id: 'email', header: 'Email', accessor: 'email' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: ({ value }) => (
      <Badge variant={value === 'active' ? 'success' : 'warning'}>
        {value}
      </Badge>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}>
        Edit
      </Button>
    ),
  },
];

function UsersTable() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useUsers(search);

  return (
    <div className="space-y-4">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search users..."
        showClear
      />
      <DataTable
        columns={columns}
        data={data}
        loading={isLoading}
        striped
        hoverable
      />
    </div>
  );
}
```

---

## Example 3: Modal Dialog

A confirmation modal.

```tsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
  Button,
} from 'css-design-system';

function DeleteConfirmation({ onConfirm }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete the item.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

---

## Example 4: Toast Notifications

Using toast notifications for feedback.

```tsx
import { Button, useToast } from 'css-design-system';

function SaveButton() {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast({
        title: 'Success',
        description: 'Your changes have been saved.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save changes. Please try again.',
        variant: 'error',
      });
    }
  };

  return <Button onClick={handleSave}>Save Changes</Button>;
}
```

---

## Next Steps

- Explore the [Component Library](../../components/)
- Read the [Design Tokens](../../docs/design-tokens.md) documentation
- Check out the [Pattern Library](../../patterns/)
