import * as React from 'react';
import { cn } from '../../../src/lib/utils';

/**
 * Column definition for DataTable
 */
export interface Column<T> {
  /**
   * Unique identifier for the column
   */
  id: string;

  /**
   * Header text or element
   */
  header: React.ReactNode;

  /**
   * Function to access the cell value
   */
  accessor?: keyof T | ((row: T) => unknown);

  /**
   * Custom cell renderer
   */
  cell?: (props: { value: unknown; row: T; index: number }) => React.ReactNode;

  /**
   * Column width
   */
  width?: string | number;

  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Whether the column is sortable
   */
  sortable?: boolean;
}

/**
 * DataTable component props
 */
export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column definitions
   */
  columns: Column<T>[];

  /**
   * Data to display
   */
  data: T[];

  /**
   * Whether the table is loading
   */
  loading?: boolean;

  /**
   * Empty state element
   */
  emptyState?: React.ReactNode;

  /**
   * Whether to show borders
   */
  bordered?: boolean;

  /**
   * Whether rows are striped
   */
  striped?: boolean;

  /**
   * Whether rows are hoverable
   */
  hoverable?: boolean;

  /**
   * Key accessor for rows
   */
  getRowKey?: (row: T, index: number) => string | number;

  /**
   * Callback when a row is clicked
   */
  onRowClick?: (row: T, index: number) => void;
}

/**
 * Skeleton row for loading state
 */
const SkeletonRow = ({ columns }: { columns: number }) => (
  <tr>
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="p-4">
        <div className="h-4 bg-neutral-200 rounded animate-pulse" />
      </td>
    ))}
  </tr>
);

/**
 * DataTable component
 *
 * A flexible data table component for displaying tabular data.
 *
 * @example
 * const columns = [
 *   { id: 'name', header: 'Name', accessor: 'name' },
 *   { id: 'email', header: 'Email', accessor: 'email' },
 *   {
 *     id: 'actions',
 *     header: 'Actions',
 *     cell: ({ row }) => <Button onClick={() => edit(row)}>Edit</Button>
 *   },
 * ];
 *
 * <DataTable columns={columns} data={users} />
 */
function DataTable<T extends Record<string, unknown>>({
  className,
  columns,
  data,
  loading = false,
  emptyState,
  bordered = false,
  striped = false,
  hoverable = true,
  getRowKey,
  onRowClick,
  ...props
}: DataTableProps<T>) {
  const getCellValue = (row: T, column: Column<T>): unknown => {
    if (column.accessor) {
      if (typeof column.accessor === 'function') {
        return column.accessor(row);
      }
      return row[column.accessor];
    }
    return null;
  };

  const renderCell = (row: T, column: Column<T>, index: number) => {
    const value = getCellValue(row, column);

    if (column.cell) {
      return column.cell({ value, row, index });
    }

    return value as React.ReactNode;
  };

  const isEmpty = !loading && data.length === 0;

  return (
    <div className={cn('relative w-full overflow-auto', className)} {...props}>
      <table className="w-full caption-bottom text-sm">
        <thead className="bg-neutral-50 [&_tr]:border-b">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className={cn(
                  'h-12 px-4 text-left align-middle font-medium text-neutral-500',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right',
                  bordered && 'border-r last:border-r-0'
                )}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} columns={columns.length} />
            ))
          ) : isEmpty ? (
            // Empty state
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                {emptyState || (
                  <div className="py-12 text-neutral-500">No data available</div>
                )}
              </td>
            </tr>
          ) : (
            // Data rows
            data.map((row, index) => {
              const key = getRowKey ? getRowKey(row, index) : index;

              return (
                <tr
                  key={key}
                  className={cn(
                    'border-b transition-colors',
                    striped && index % 2 === 1 && 'bg-neutral-50',
                    hoverable && 'hover:bg-neutral-50',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        'p-4 align-middle',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        bordered && 'border-r last:border-r-0'
                      )}
                    >
                      {renderCell(row, column, index)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

DataTable.displayName = 'DataTable';

export { DataTable };
