import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../../src/lib/utils';

/**
 * Switch component props
 */
export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /**
   * Label text for the switch
   */
  label?: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: {
    root: 'h-4 w-7',
    thumb: 'h-3 w-3 data-[state=checked]:translate-x-3',
  },
  md: {
    root: 'h-5 w-9',
    thumb: 'h-4 w-4 data-[state=checked]:translate-x-4',
  },
  lg: {
    root: 'h-6 w-11',
    thumb: 'h-5 w-5 data-[state=checked]:translate-x-5',
  },
};

/**
 * Switch component
 *
 * A toggle switch for boolean values, built on Radix UI primitives.
 *
 * @example
 * // Basic switch
 * <Switch label="Enable notifications" />
 *
 * // With description
 * <Switch
 *   label="Dark mode"
 *   description="Use dark theme throughout the application"
 * />
 *
 * // Controlled
 * <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, description, size = 'md', id: providedId, ...props }, ref) => {
  const generatedId = React.useId();
  const id = providedId || generatedId;
  const descriptionId = description ? `${id}-description` : undefined;

  const switchElement = (
    <SwitchPrimitive.Root
      id={id}
      ref={ref}
      className={cn(
        'peer inline-flex shrink-0 cursor-pointer items-center rounded-full',
        'border-2 border-transparent transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary-600',
        'data-[state=unchecked]:bg-neutral-200',
        sizeClasses[size].root,
        className
      )}
      aria-describedby={descriptionId}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-white shadow-lg ring-0',
          'transition-transform data-[state=unchecked]:translate-x-0',
          sizeClasses[size].thumb
        )}
      />
    </SwitchPrimitive.Root>
  );

  if (label || description) {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1.5">
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
        </div>
        {switchElement}
      </div>
    );
  }

  return switchElement;
});

Switch.displayName = 'Switch';

export { Switch };
