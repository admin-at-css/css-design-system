import * as React from 'react';
import { cn } from '../../../src/lib/utils';

/**
 * Navigation component props
 */
export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Navigation orientation
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Navigation variant
   */
  variant?: 'default' | 'pills' | 'underline';
}

/**
 * Navigation component
 *
 * A flexible navigation component that supports horizontal and vertical layouts.
 *
 * @example
 * <Navigation>
 *   <NavigationList>
 *     <NavigationItem>
 *       <NavigationLink href="/" active>Home</NavigationLink>
 *     </NavigationItem>
 *     <NavigationItem>
 *       <NavigationLink href="/about">About</NavigationLink>
 *     </NavigationItem>
 *   </NavigationList>
 * </Navigation>
 */
const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, orientation = 'horizontal', variant = 'default', ...props }, ref) => (
    <nav
      ref={ref}
      data-orientation={orientation}
      data-variant={variant}
      className={cn('relative', className)}
      {...props}
    />
  )
);
Navigation.displayName = 'Navigation';

/**
 * Navigation list component
 */
const NavigationList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & {
    orientation?: 'horizontal' | 'vertical';
  }
>(({ className, orientation = 'horizontal', ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      'flex list-none',
      orientation === 'horizontal' ? 'flex-row items-center gap-1' : 'flex-col gap-1',
      className
    )}
    {...props}
  />
));
NavigationList.displayName = 'NavigationList';

/**
 * Navigation item component
 */
const NavigationItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('relative', className)} {...props} />
));
NavigationItem.displayName = 'NavigationItem';

/**
 * Navigation link props
 */
export interface NavigationLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether the link is active
   */
  active?: boolean;

  /**
   * Link variant
   */
  variant?: 'default' | 'pills' | 'underline';
}

/**
 * Navigation link component
 */
const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ className, active, variant = 'default', ...props }, ref) => (
    <a
      ref={ref}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        // Default variant
        variant === 'default' && [
          'px-4 py-2 rounded-md',
          active
            ? 'bg-neutral-100 text-neutral-900'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50',
        ],
        // Pills variant
        variant === 'pills' && [
          'px-4 py-2 rounded-full',
          active
            ? 'bg-primary-600 text-white'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
        ],
        // Underline variant
        variant === 'underline' && [
          'px-4 py-2 border-b-2',
          active
            ? 'border-primary-600 text-primary-600'
            : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300',
        ],
        className
      )}
      {...props}
    />
  )
);
NavigationLink.displayName = 'NavigationLink';

/**
 * Navigation separator component
 */
const NavigationSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'horizontal' | 'vertical';
  }
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    aria-orientation={orientation}
    className={cn(
      'bg-neutral-200',
      orientation === 'vertical' ? 'w-px h-6' : 'h-px w-full',
      className
    )}
    {...props}
  />
));
NavigationSeparator.displayName = 'NavigationSeparator';

export {
  Navigation,
  NavigationList,
  NavigationItem,
  NavigationLink,
  NavigationSeparator,
};
