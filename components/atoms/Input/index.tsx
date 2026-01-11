import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../src/lib/utils';

/**
 * Input variants using class-variance-authority
 */
const inputVariants = cva(
  [
    'flex w-full rounded-md border bg-transparent px-3 py-2',
    'text-sm ring-offset-background',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-neutral-400',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        default: 'border-neutral-300 focus-visible:border-primary-500',
        error: 'border-error-500 focus-visible:ring-error-500',
        success: 'border-success-500 focus-visible:ring-success-500',
      },
      inputSize: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

/**
 * Input component props
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Error message to display below the input
   */
  error?: string;

  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
}

/**
 * Input component
 *
 * A form input component that supports multiple variants, sizes,
 * error states, and icons.
 *
 * @example
 * // Basic input
 * <Input placeholder="Enter your email" />
 *
 * // With error state
 * <Input variant="error" error="Invalid email address" />
 *
 * // With icons
 * <Input startIcon={<SearchIcon />} placeholder="Search..." />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      type = 'text',
      error,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const errorId = error ? `${inputId}-error` : undefined;

    // Determine variant based on error prop
    const computedVariant = error ? 'error' : variant;

    if (startIcon || endIcon) {
      return (
        <div className="relative w-full">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant: computedVariant, inputSize }),
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={errorId}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {endIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant: computedVariant, inputSize }),
          className
        )}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
