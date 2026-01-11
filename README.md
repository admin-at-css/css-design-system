# CSS Design System

[![npm version](https://img.shields.io/npm/v/css-design-system.svg)](https://www.npmjs.com/package/css-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/cepat-service-station/css-design-system/ci.yml)](https://github.com/cepat-service-station/css-design-system/actions)

> A comprehensive UI/UX pattern library for **Cepat Service Station (PT CSS)**, built with React, TypeScript, Tailwind CSS, and shadcn/ui following Refactoring UI principles.

<p align="center">
  <img src="./assets/images/logo-horizontal-original.svg" alt="CSS Logo" width="300">
</p>

---

## Table of Contents

- [Overview](#overview)
- [Visual Reference Library](#visual-reference-library)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Design Tokens](#design-tokens)
- [Components](#components)
- [Patterns](#patterns)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## Overview

The CSS Design System provides a unified visual language and reusable components for all Cepat Service Station digital products. It ensures consistency, accessibility, and efficiency across internal tools and public-facing applications.

### Key Features

- **Brand-Aligned**: Built around CSS brand colors (Deep Navy Blue `#1b2a53` & Sky Blue `#356a9d`)
- **Accessible**: WCAG 2.1 AA compliant with full keyboard navigation
- **Responsive**: Mobile-first approach with responsive breakpoints
- **Dark Mode**: Full light and dark theme support
- **TypeScript**: Complete type safety with comprehensive type definitions
- **Beginner-Friendly**: Extensive documentation for developers of all skill levels

---

## Visual Reference Library

Interactive HTML documentation showcasing all design tokens and components. Open `references/index.html` in a browser to explore.

<p align="center">
  <img src="./docs/screenshots/index-hero.png" alt="Design System Hub" width="800">
</p>

### Reference Pages

| Reference | Description | Preview |
|-----------|-------------|---------|
| [Color Palette](./references/color-palette.html) | Brand colors, semantic colors, contrast ratios | <img src="./docs/screenshots/color-palette.png" width="200"> |
| [Typography Scale](./references/typography-scale.html) | Font sizes, weights, line heights, text styles | <img src="./docs/screenshots/typography-scale.png" width="200"> |
| [Spacing Scale](./references/spacing-scale.html) | 4px-based spacing, semantic tokens | <img src="./docs/screenshots/spacing-scale.png" width="200"> |
| [Shadow & Elevation](./references/shadow-elevation.html) | Two-part shadows, z-index, focus rings | <img src="./docs/screenshots/shadow-elevation.png" width="200"> |
| [Component Showcase](./references/component-showcase.html) | Interactive component demos | <img src="./docs/screenshots/component-showcase.png" width="200"> |
| [Neutral Palette](./references/gray-tone-comparison.html) | Slate Gray — chosen neutral system | <img src="./docs/screenshots/neutral-palette.png" width="200"> |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/cepat-service-station/css-design-system.git

# Navigate to directory
cd css-design-system

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook (component playground)
npm run storybook

# Run tests
npm test
```

---

## Installation

### As a Package (for consuming projects)

```bash
npm install css-design-system
# or
yarn add css-design-system
# or
pnpm add css-design-system
```

### Peer Dependencies

Ensure you have these installed in your project:

```bash
npm install react react-dom tailwindcss
```

---

## Usage

### 1. Import Global Styles

```tsx
// In your main entry file (e.g., main.tsx or App.tsx)
import 'css-design-system/styles/globals.css';
```

### 2. Configure Tailwind CSS

```js
// tailwind.config.js
import { cssPreset } from 'css-design-system/tailwind';

export default {
  presets: [cssPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/css-design-system/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### 3. Use Components

```tsx
import { Button, Card, Input, FormField } from 'css-design-system';

function LoginForm() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Sign In</Card.Title>
        <Card.Description>Enter your credentials</Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4">
        <FormField label="Email" required>
          <Input type="email" placeholder="you@example.com" />
        </FormField>
        <FormField label="Password" required>
          <Input type="password" />
        </FormField>
        <Button variant="primary" className="w-full">Sign In</Button>
      </Card.Content>
    </Card>
  );
}
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [Getting Started](./docs/getting-started.md) | Initial setup and configuration |
| [Design Principles](./docs/design-principles.md) | Core design philosophy |
| [Accessibility Guidelines](./docs/accessibility-guidelines.md) | WCAG compliance guide |
| [Design Tokens](./docs/design-tokens.md) | Colors, typography, spacing |
| [Usage Examples](./docs/usage-examples.md) | Code examples and recipes |

---

## Design Tokens

Our design tokens follow Refactoring UI principles:

```css
/* Use via CSS custom properties */
.custom-element {
  color: var(--color-primary-900);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

See [design-tokens/](./design-tokens/) for complete token definitions:

| File | Description |
|------|-------------|
| `colors.json` | Primary, secondary, neutral, semantic colors |
| `typography.json` | Font families, sizes, weights, line heights |
| `spacing.json` | Spacing scale (4px base unit) |
| `breakpoints.json` | Responsive breakpoints |
| `shadows.json` | Elevation shadows |
| `animations.json` | Timing and easing functions |

---

## Components

### Atomic Design Structure

```
components/
├── atoms/              # Basic building blocks
│   ├── Button/
│   ├── Input/
│   ├── Badge/
│   ├── Avatar/
│   ├── Checkbox/
│   └── Switch/
├── molecules/          # Combinations of atoms
│   ├── FormField/
│   ├── SearchBar/
│   ├── Card/
│   └── Alert/
└── organisms/          # Complex UI sections
    ├── Navigation/
    ├── Modal/
    └── DataTable/
```

### Component Status

| Component | Status | Storybook |
|-----------|--------|-----------|
| Button | ✅ Stable | [View](./components/atoms/Button/) |
| Input | ✅ Stable | [View](./components/atoms/Input/) |
| Card | ✅ Stable | [View](./components/molecules/Card/) |
| Modal | ✅ Stable | [View](./components/organisms/Modal/) |
| DataTable | ✅ Stable | [View](./components/organisms/DataTable/) |

---

## Patterns

Reusable UI patterns for common use cases:

| Pattern | Description |
|---------|-------------|
| [Navigation Patterns](./patterns/navigation-patterns.md) | Top nav, sidebar, breadcrumbs, tabs |
| [Form Patterns](./patterns/form-patterns.md) | Validation, multi-step, inline editing |
| [Feedback Patterns](./patterns/feedback-patterns.md) | Toast, loading, empty states |
| [Layout Patterns](./patterns/layout-patterns.md) | Grid systems, containers |
| [Data Visualization](./patterns/data-visualization-patterns.md) | Stats, charts, tables |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 18](https://reactjs.org/) | UI framework |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Component primitives |
| [Radix UI](https://www.radix-ui.com/) | Accessible primitives |
| [Vite](https://vitejs.dev/) | Build tool |
| [Storybook 8](https://storybook.js.org/) | Component documentation |
| [Vitest](https://vitest.dev/) | Unit testing |

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for:

- Development setup
- Code style guidelines
- Branch naming conventions
- Commit message format
- Pull request process

---

## Team

**CSS Design System Team**

| Role | Contact |
|------|---------|
| Design Lead | design-system@cepatservicestation.com |
| Engineering | dev@cepatservicestation.com |
| Support | #design-system (Slack) |

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

**Note**: CSS brand assets (logos, icons) are proprietary and require separate permission for use outside official CSS projects.

---

<p align="center">
  Built with care by <strong>Cepat Service Station</strong><br>
  <em>Professional, Stable, Committed</em>
</p>
