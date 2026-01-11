import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../src/lib/utils';

/**
 * Button variants using class-variance-authority
 *
 * This pattern allows type-safe variant management with Tailwind CSS.
 * Each variant maps to a set of Tailwind classes that define the button's appearance.
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-md text-sm font-medium',
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      /**
       * Visual variants that determine the button's color scheme
       */
      variant: {
        primary:
          'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
        secondary:
          'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
        outline:
          'border border-neutral-300 bg-transparent hover:bg-neutral-100 active:bg-neutral-200 text-neutral-900',
        ghost:
          'bg-transparent hover:bg-neutral-100 active:bg-neutral-200 text-neutral-900',
        destructive:
          'bg-error-600 text-white hover:bg-error-700 active:bg-error-800',
        link: 'text-primary-600 underline-offset-4 hover:underline',
      },
      /**
       * Size variants that determine padding and text size
       */
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Button component props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will render as a Slot component,
   * allowing you to pass a custom element as the child.
   *
   * @example
   * <Button asChild>
   *   <Link href="/about">About</Link>
   * </Button>
   */
  asChild?: boolean;

  /**
   * If true, shows a loading spinner and disables the button.
   */
  loading?: boolean;

  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;
}

/**
 * Loading spinner component
 */
const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
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

/**
 * Button component
 *
 * A flexible button component that supports multiple variants, sizes,
 * loading states, and can render as different elements via the asChild prop.
 *
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 *
 * // Button with loading state
 * <Button loading>Saving...</Button>
 *
 * // Button with icons
 * <Button leftIcon={<PlusIcon />}>Add Item</Button>
 *
 * // Button as a link
 * <Button asChild variant="link">
 *   <a href="/about">Learn more</a>
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Spinner className="h-4 w-4" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className="inline-flex shrink-0" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
