import { type ComponentPropsWithoutRef, type ElementType } from 'react';

/**
 * Common size variants used across components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common variant types for components
 */
export type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

/**
 * Status variants for semantic coloring
 */
export type Status = 'success' | 'error' | 'warning' | 'info';

/**
 * Orientation for layout components
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * Alignment options
 */
export type Align = 'start' | 'center' | 'end';

/**
 * Polymorphic component props that allow changing the rendered element
 *
 * @example
 * type ButtonProps<T extends ElementType> = PolymorphicProps<T, { variant: Variant }>;
 */
export type PolymorphicProps<
  T extends ElementType,
  Props = {}
> = Props &
  Omit<ComponentPropsWithoutRef<T>, keyof Props | 'as'> & {
    as?: T;
  };

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
}

/**
 * Props for components with loading state
 */
export interface LoadingProps {
  /**
   * Whether the component is in a loading state
   */
  loading?: boolean;
}

/**
 * Props for form field components
 */
export interface FormFieldProps {
  /**
   * The label for the field
   */
  label?: string;

  /**
   * Helper text displayed below the field
   */
  helperText?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;
}

/**
 * Data item with ID for lists
 */
export interface DataItem {
  id: string | number;
  [key: string]: unknown;
}

/**
 * Async state for data fetching
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
