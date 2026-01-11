/**
 * CSS Design System - Common Code Snippets
 *
 * Copy-paste ready code snippets for common UI patterns.
 */

import * as React from 'react';
import {
  Button,
  Card,
  Input,
  FormField,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  SearchBar,
} from 'css-design-system';

// ============================================
// BUTTON PATTERNS
// ============================================

export function ButtonGroup() {
  return (
    <div className="flex gap-2">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </div>
  );
}

export function IconButton() {
  return (
    <Button variant="ghost" size="icon" aria-label="Settings">
      <SettingsIcon className="h-4 w-4" />
    </Button>
  );
}

export function LoadingButton() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Button loading={isLoading} onClick={() => setIsLoading(true)}>
      {isLoading ? 'Saving...' : 'Save'}
    </Button>
  );
}

// ============================================
// FORM PATTERNS
// ============================================

export function SimpleForm() {
  return (
    <form className="space-y-4">
      <FormField label="Email" required>
        <Input type="email" placeholder="you@example.com" />
      </FormField>
      <FormField label="Password" required>
        <Input type="password" />
      </FormField>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}

export function FormWithValidation() {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleBlur = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  return (
    <FormField label="Email" error={error} required>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur}
      />
    </FormField>
  );
}

// ============================================
// CARD PATTERNS
// ============================================

export function BasicCard() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description text</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>Card content goes here.</p>
      </Card.Content>
      <Card.Footer className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card>
  );
}

export function StatCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change?: string;
}) {
  return (
    <Card>
      <Card.Content className="pt-6">
        <p className="text-sm text-neutral-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {change && (
          <p className="text-sm text-success-600 mt-1">↑ {change}</p>
        )}
      </Card.Content>
    </Card>
  );
}

// ============================================
// ALERT PATTERNS
// ============================================

export function SuccessAlert() {
  return (
    <Alert variant="success">
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  );
}

export function DismissableAlert() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <Alert variant="info" onDismiss={() => setIsVisible(false)}>
      <AlertTitle>Tip</AlertTitle>
      <AlertDescription>You can dismiss this alert.</AlertDescription>
    </Alert>
  );
}

// ============================================
// MODAL PATTERNS
// ============================================

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Confirm Action</ModalTitle>
        </ModalHeader>
        <p className="text-neutral-600">
          Are you sure you want to proceed?
        </p>
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ============================================
// SEARCH PATTERNS
// ============================================

export function SearchWithResults() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);

  return (
    <div className="space-y-4">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={(q) => console.log('Search:', q)}
        showClear
        placeholder="Search..."
      />
      {results.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}

// ============================================
// BADGE PATTERNS
// ============================================

export function StatusBadge({ status }: { status: 'active' | 'pending' | 'inactive' }) {
  const variants = {
    active: 'success' as const,
    pending: 'warning' as const,
    inactive: 'default' as const,
  };

  return (
    <Badge variant={variants[status]} dot>
      {status}
    </Badge>
  );
}

// Placeholder icon components
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
