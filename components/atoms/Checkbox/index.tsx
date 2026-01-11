import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../../../src/lib/utils';

/**
 * Check icon component
 */
const CheckIcon = () => (
  <svg
    className="h-3.5 w-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/**
 * Minus icon for indeterminate state
 */
const MinusIcon = () => (
  <svg
    className="h-3.5 w-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

/**
 * Checkbox component props
 */
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * Label text to display next to the checkbox
   */
  label?: string;

  /**
   * Description text displayed below the label
   */
  description?: string;

  /**
   * Error message
   */
  error?: string;
}

/**
 * Checkbox component
 *
 * An accessible checkbox component built on Radix UI primitives.
 *
 * @example
 * // Basic checkbox
 * <Checkbox label="Accept terms" />
 *
 * // With description
 * <Checkbox
 *   label="Marketing emails"
 *   description="Receive updates about new features"
 * />
 *
 * // Controlled
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 * />
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, error, id: providedId, ...props }, ref) => {
  const generatedId = React.useId();
  const id = providedId || generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const checkbox = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded border border-neutral-300',
        'ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 data-[state=checked]:text-white',
        'data-[state=indeterminate]:bg-primary-600 data-[state=indeterminate]:border-primary-600 data-[state=indeterminate]:text-white',
        error && 'border-error-500',
        className
      )}
      aria-describedby={
        [descriptionId, errorId].filter(Boolean).join(' ') || undefined
      }
      aria-invalid={!!error}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {props.checked === 'indeterminate' ? <MinusIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (label || description) {
    return (
      <div className="flex items-start gap-3">
        {checkbox}
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          {description && (
            <p id={descriptionId} className="text-sm text-neutral-500">
              {description}
            </p>
          )}
          {error && (
            <p id={errorId} className="text-sm text-error-500">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return checkbox;
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
