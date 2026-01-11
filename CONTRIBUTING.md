# Contributing to CSS Design System

Thank you for your interest in contributing to the CSS Design System! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Component Guidelines](#component-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Getting Help](#getting-help)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. All contributors are expected to:

- Be respectful and considerate in all interactions
- Welcome newcomers and help them get started
- Give and receive constructive feedback gracefully
- Focus on what is best for the community
- Show empathy towards other community members

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Check Command |
|------|---------|---------------|
| Node.js | >= 18.0.0 | `node --version` |
| npm | >= 9.0.0 | `npm --version` |
| Git | >= 2.0.0 | `git --version` |

### Recommended VS Code Extensions

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- TypeScript Hero (`rbbit.typescript-hero`)

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/css-design-system.git
cd css-design-system

# Add upstream remote
git remote add upstream https://github.com/cepat-service-station/css-design-system.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Setup

```bash
# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint
```

---

## Project Structure

```
css-design-system/
├── assets/                 # Brand assets (logos, icons, fonts)
├── components/             # React components
│   ├── atoms/              # Basic building blocks
│   ├── molecules/          # Combinations of atoms
│   └── organisms/          # Complex UI sections
├── design-tokens/          # Design token definitions
├── docs/                   # Documentation
├── patterns/               # UI pattern guides
├── src/                    # Source code
│   ├── lib/                # Utility functions
│   ├── hooks/              # React hooks
│   ├── types/              # TypeScript types
│   └── utils/              # Helper functions
├── styles/                 # Global CSS files
├── templates/              # Page layout templates
└── examples/               # Usage examples
```

---

## Development Workflow

### 1. Create a Branch

Use descriptive branch names:

```bash
# Feature
git checkout -b feature/add-tooltip-component

# Bug fix
git checkout -b fix/button-disabled-state

# Documentation
git checkout -b docs/update-getting-started

# Refactor
git checkout -b refactor/simplify-card-component
```

### 2. Make Changes

- Follow the component guidelines below
- Write tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all checks before committing
npm run lint
npm run typecheck
npm test
npm run build
```

### 4. Commit Your Changes

Follow the commit message guidelines below.

### 5. Push and Create PR

```bash
git push origin your-branch-name
```

Then create a pull request on GitHub.

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style (formatting, semicolons, etc.) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, etc. |
| `perf` | Performance improvements |

### Examples

```bash
feat(button): add loading state with spinner

fix(input): correct focus ring color in dark mode

docs(readme): update installation instructions

refactor(card): simplify variant implementation

test(modal): add accessibility tests
```

### Rules

- Use imperative mood ("add" not "added")
- Keep first line under 72 characters
- Reference issues when applicable

---

## Pull Request Process

### 1. Before Submitting

- [ ] Branch is up to date with `main`
- [ ] All tests pass locally
- [ ] Linting passes with no errors
- [ ] TypeScript compiles without errors
- [ ] Build completes successfully
- [ ] Documentation is updated

### 2. PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested the changes.

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Storybook stories added/updated
- [ ] Accessibility tested

## Screenshots (if applicable)
Add screenshots for visual changes.
```

### 3. Review Process

- PRs require at least one approval
- Address all review comments
- Keep PRs focused and under 500 lines when possible
- Respond to reviews within 2 business days

---

## Component Guidelines

### File Structure

```
components/atoms/Button/
├── index.tsx           # Component implementation
├── Button.test.tsx     # Tests
├── Button.stories.tsx  # Storybook stories
└── README.md           # Component documentation
```

### Component Patterns

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../src/lib/utils';

// Define variants
const buttonVariants = cva(
  'base classes here',
  {
    variants: {
      variant: {
        primary: 'primary classes',
        secondary: 'secondary classes',
      },
      size: {
        sm: 'small classes',
        md: 'medium classes',
        lg: 'large classes',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Define props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Additional props
}

// Implement component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

---

## Testing Requirements

### Minimum Coverage

- **Components**: 80% code coverage
- **Utilities**: 90% code coverage

### What to Test

1. **Rendering**: Component renders without crashing
2. **Props**: All props work as expected
3. **Variants**: All variants display correctly
4. **Interactions**: Click, hover, focus handlers work
5. **Accessibility**: ARIA attributes, keyboard navigation
6. **Edge Cases**: Empty states, error states

### Example Test

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './index';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is accessible via keyboard', async () => {
    const user = userEvent.setup();
    render(<Button>Focusable</Button>);

    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });
});
```

---

## Documentation

### Component README Template

```markdown
# ComponentName

Brief description of the component.

## Usage

\`\`\`tsx
import { ComponentName } from 'css-design-system';

<ComponentName>Example</ComponentName>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | type | default | Description |

## Examples

### Variant Example
\`\`\`tsx
<ComponentName variant="primary">Primary</ComponentName>
\`\`\`

## Accessibility

- Keyboard navigation supported
- Screen reader tested
- Focus management details

## Related Components

- [RelatedComponent](../RelatedComponent/README.md)
\`\`\`

---

## Getting Help

### Channels

- **Slack**: #design-system
- **Email**: design-system@cepatservicestation.com
- **Office Hours**: Fridays 2-3pm

### Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)

---

Thank you for contributing to the CSS Design System!
