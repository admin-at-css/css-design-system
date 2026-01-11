import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../src/lib/utils';

/**
 * Typography variants for headings
 */
const headingVariants = cva('font-sans text-neutral-900', {
  variants: {
    level: {
      h1: 'text-4xl font-bold tracking-tight leading-tight',
      h2: 'text-3xl font-semibold tracking-tight leading-tight',
      h3: 'text-2xl font-semibold leading-snug',
      h4: 'text-xl font-semibold leading-snug',
      h5: 'text-lg font-medium leading-normal',
      h6: 'text-base font-medium leading-normal',
    },
  },
  defaultVariants: {
    level: 'h1',
  },
});

/**
 * Heading component props
 */
export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /**
   * The semantic HTML level to render
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Heading component
 *
 * Renders semantic heading elements with consistent styling.
 *
 * @example
 * <Heading level="h1">Page Title</Heading>
 * <Heading level="h2" as="h3">Visually h2, semantically h3</Heading>
 */
const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 'h1', as, children, ...props }, ref) => {
    const Component = as || level;

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

/**
 * Text variants for body text
 */
const textVariants = cva('font-sans', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-neutral-900',
      muted: 'text-neutral-500',
      subtle: 'text-neutral-400',
      primary: 'text-primary-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      error: 'text-error-600',
    },
    leading: {
      none: 'leading-none',
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    color: 'default',
    leading: 'normal',
  },
});

/**
 * Text component props
 */
export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  /**
   * The HTML element to render
   */
  as?: 'p' | 'span' | 'div' | 'label';
}

/**
 * Text component
 *
 * Renders body text with consistent styling.
 *
 * @example
 * <Text>Default paragraph text</Text>
 * <Text size="sm" color="muted">Small muted text</Text>
 * <Text as="span" weight="bold">Bold inline text</Text>
 */
const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { className, size, weight, color, leading, as = 'p', children, ...props },
    ref
  ) => {
    const Component = as;

    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, weight, color, leading }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

/**
 * Label component for form fields
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Whether the field is required
   */
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium text-neutral-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <>
            <span aria-hidden="true" className="text-error-500 ml-1">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

/**
 * Code component for inline code
 */
const Code = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        'relative rounded bg-neutral-100 px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  );
});

Code.displayName = 'Code';

/**
 * Blockquote component
 */
const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => {
  return (
    <blockquote
      ref={ref}
      className={cn(
        'border-l-4 border-neutral-300 pl-4 italic text-neutral-600',
        className
      )}
      {...props}
    />
  );
});

Blockquote.displayName = 'Blockquote';

export {
  Heading,
  headingVariants,
  Text,
  textVariants,
  Label,
  Code,
  Blockquote,
};
