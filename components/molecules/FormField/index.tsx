import * as React from 'react';
import { Label } from '../../atoms/Typography';
import { cn } from '../../../src/lib/utils';

/**
 * FormField component props
 */
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The label for the form field
   */
  label?: string;

  /**
   * Helper text displayed below the input
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

  /**
   * HTML for attribute to link label to input
   */
  htmlFor?: string;

  /**
   * The input or control element
   */
  children: React.ReactNode;
}

/**
 * FormField component
 *
 * A wrapper component that provides consistent layout for form fields
 * with labels, helper text, and error messages.
 *
 * @example
 * <FormField label="Email" error={errors.email} required>
 *   <Input type="email" />
 * </FormField>
 *
 * <FormField label="Password" helperText="Must be at least 8 characters">
 *   <Input type="password" />
 * </FormField>
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      required,
      htmlFor,
      children,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const inputId = htmlFor || id;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    // Clone children to pass accessibility props
    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          id: inputId,
          'aria-describedby': [helperId, errorId].filter(Boolean).join(' ') || undefined,
          'aria-invalid': !!error,
          ...child.props,
        } as React.HTMLAttributes<HTMLElement>);
      }
      return child;
    });

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}

        {enhancedChildren}

        {helperText && !error && (
          <p id={helperId} className="text-sm text-neutral-500">
            {helperText}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-sm text-error-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField };
