import * as React from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { cn } from '../../../src/lib/utils';

/**
 * Search icon component
 */
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-4 w-4', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

/**
 * Clear icon component
 */
const ClearIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-4 w-4', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/**
 * SearchBar component props
 */
export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  /**
   * Callback when the search value changes
   */
  onChange?: (value: string) => void;

  /**
   * Callback when the search is submitted
   */
  onSearch?: (value: string) => void;

  /**
   * Whether to show a clear button
   */
  showClear?: boolean;

  /**
   * Whether to show a submit button
   */
  showButton?: boolean;

  /**
   * Text for the submit button
   */
  buttonText?: string;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the search is loading
   */
  loading?: boolean;
}

/**
 * SearchBar component
 *
 * A search input with optional clear button and submit button.
 *
 * @example
 * // Basic search
 * <SearchBar placeholder="Search..." onChange={handleSearch} />
 *
 * // With submit button
 * <SearchBar showButton onSearch={handleSubmit} />
 *
 * // With clear button
 * <SearchBar showClear value={query} onChange={setQuery} />
 */
const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      value,
      onChange,
      onSearch,
      showClear = false,
      showButton = false,
      buttonText = 'Search',
      size = 'md',
      loading = false,
      placeholder = 'Search...',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState('');
    const searchValue = value !== undefined ? String(value) : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onChange?.('');
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !showButton) {
        onSearch?.(searchValue);
      }
    };

    const inputSizeMap = {
      sm: 'sm' as const,
      md: 'md' as const,
      lg: 'lg' as const,
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={cn('flex gap-2', className)}
        role="search"
      >
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <SearchIcon />
          </div>
          <Input
            ref={ref}
            type="search"
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              'pl-10',
              showClear && searchValue && 'pr-10'
            )}
            inputSize={inputSizeMap[size]}
            {...props}
          />
          {showClear && searchValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          )}
        </div>
        {showButton && (
          <Button
            type="submit"
            variant="primary"
            size={size}
            loading={loading}
          >
            {buttonText}
          </Button>
        )}
      </form>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
