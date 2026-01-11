import * as React from 'react';
import { cn } from '../../src/lib/utils';

/**
 * Content Layout Props
 */
export interface ContentLayoutProps {
  /**
   * Main content
   */
  children: React.ReactNode;

  /**
   * Header content
   */
  header?: React.ReactNode;

  /**
   * Sidebar content (table of contents, etc.)
   */
  sidebar?: React.ReactNode;

  /**
   * Footer content
   */
  footer?: React.ReactNode;

  /**
   * Sidebar position
   */
  sidebarPosition?: 'left' | 'right';

  /**
   * Maximum content width
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'prose';

  /**
   * Custom class name
   */
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
  prose: 'max-w-prose',
};

/**
 * Content Layout Component
 *
 * A layout for documentation, articles, and content pages.
 *
 * @example
 * <ContentLayout
 *   header={<Header />}
 *   sidebar={<TableOfContents />}
 *   sidebarPosition="right"
 * >
 *   <Article />
 * </ContentLayout>
 */
export function ContentLayout({
  children,
  header,
  sidebar,
  footer,
  sidebarPosition = 'right',
  maxWidth = 'lg',
  className,
}: ContentLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
          {header}
        </header>
      )}

      {/* Main Content Area */}
      <div
        className={cn('mx-auto px-4 sm:px-6 lg:px-8', maxWidthClasses[maxWidth])}
      >
        <div className="flex gap-8 py-8">
          {/* Left Sidebar */}
          {sidebar && sidebarPosition === 'left' && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">{sidebar}</div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>

          {/* Right Sidebar */}
          {sidebar && sidebarPosition === 'right' && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">{sidebar}</div>
            </aside>
          )}
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="border-t border-neutral-200 bg-neutral-50">
          {footer}
        </footer>
      )}
    </div>
  );
}

/**
 * Prose Container for Article Content
 */
export function ProseContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'prose prose-neutral max-w-none',
        'prose-headings:font-semibold prose-headings:tracking-tight',
        'prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline',
        'prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
        'prose-pre:bg-neutral-900',
        className
      )}
    >
      {children}
    </article>
  );
}

/**
 * Table of Contents Component
 */
export function TableOfContents({
  items,
  activeId,
}: {
  items: { id: string; title: string; level: number }[];
  activeId?: string;
}) {
  return (
    <nav className="space-y-1">
      <p className="text-sm font-semibold text-neutral-900 mb-3">On this page</p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            'block text-sm transition-colors',
            item.level === 2 && 'pl-0',
            item.level === 3 && 'pl-4',
            item.level === 4 && 'pl-8',
            activeId === item.id
              ? 'text-primary-600 font-medium'
              : 'text-neutral-500 hover:text-neutral-900'
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}

/**
 * Page Header Component
 */
export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="border-b border-neutral-200 pb-6 mb-6">
      {breadcrumb && <div className="mb-4">{breadcrumb}</div>}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">{title}</h1>
          {description && (
            <p className="mt-2 text-lg text-neutral-600">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

/**
 * Pagination Component
 */
export function PageNavigation({
  prev,
  next,
}: {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}) {
  return (
    <div className="flex justify-between items-center pt-6 mt-6 border-t border-neutral-200">
      {prev ? (
        <a
          href={prev.href}
          className="group flex flex-col items-start text-left"
        >
          <span className="text-sm text-neutral-500">Previous</span>
          <span className="text-primary-600 group-hover:underline">
            ← {prev.title}
          </span>
        </a>
      ) : (
        <div />
      )}
      {next && (
        <a
          href={next.href}
          className="group flex flex-col items-end text-right"
        >
          <span className="text-sm text-neutral-500">Next</span>
          <span className="text-primary-600 group-hover:underline">
            {next.title} →
          </span>
        </a>
      )}
    </div>
  );
}

export default ContentLayout;
