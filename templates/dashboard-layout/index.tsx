import * as React from 'react';
import { cn } from '../../src/lib/utils';

/**
 * Dashboard Layout Props
 */
export interface DashboardLayoutProps {
  /**
   * Sidebar content
   */
  sidebar?: React.ReactNode;

  /**
   * Header content
   */
  header?: React.ReactNode;

  /**
   * Main content
   */
  children: React.ReactNode;

  /**
   * Sidebar collapsed state
   */
  sidebarCollapsed?: boolean;

  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Dashboard Layout Component
 *
 * A flexible dashboard layout with sidebar and header.
 *
 * @example
 * <DashboardLayout
 *   sidebar={<Sidebar />}
 *   header={<Header />}
 * >
 *   <DashboardContent />
 * </DashboardLayout>
 */
export function DashboardLayout({
  sidebar,
  header,
  children,
  sidebarCollapsed = false,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-neutral-50', className)}>
      {/* Sidebar */}
      {sidebar && (
        <aside
          className={cn(
            'fixed left-0 top-0 z-40 h-screen bg-white border-r border-neutral-200',
            'transition-all duration-300',
            sidebarCollapsed ? 'w-16' : 'w-64'
          )}
        >
          {sidebar}
        </aside>
      )}

      {/* Main Content Area */}
      <div
        className={cn(
          'transition-all duration-300',
          sidebar && (sidebarCollapsed ? 'ml-16' : 'ml-64')
        )}
      >
        {/* Header */}
        {header && (
          <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
            {header}
          </header>
        )}

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

/**
 * Dashboard Header Component
 */
export function DashboardHeader({
  title,
  actions,
  className,
}: {
  title?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between h-16 px-6', className)}>
      {title && (
        <h1 className="text-xl font-semibold text-neutral-900">{title}</h1>
      )}
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

/**
 * Dashboard Sidebar Component
 */
export function DashboardSidebar({
  logo,
  navigation,
  footer,
  className,
}: {
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Logo */}
      {logo && (
        <div className="flex items-center h-16 px-4 border-b border-neutral-200">
          {logo}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">{navigation}</nav>

      {/* Footer */}
      {footer && (
        <div className="p-4 border-t border-neutral-200">{footer}</div>
      )}
    </div>
  );
}

/**
 * Stats Grid Component
 */
export function StatsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}

/**
 * Stat Card Component
 */
export function StatCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p
              className={cn(
                'text-sm mt-2',
                trend === 'up' ? 'text-success-600' : 'text-error-600'
              )}
            >
              {trend === 'up' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardLayout;
