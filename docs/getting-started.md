# Getting Started with CSS Design System

Welcome to the Cepat Service Station (CSS) Design System! This guide will help you set up and start using the design system in your projects.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Minimum Version | Check Command |
|-------------|-----------------|---------------|
| Node.js | 18.0.0 | `node --version` |
| npm | 9.0.0 | `npm --version` |
| Git | 2.0.0 | `git --version` |

### Recommended VS Code Extensions

For the best development experience, install these extensions:

- **ESLint** - `dbaeumer.vscode-eslint`
- **Prettier** - `esbenp.prettier-vscode`
- **Tailwind CSS IntelliSense** - `bradlc.vscode-tailwindcss`
- **TypeScript Hero** - `rbbit.typescript-hero`

---

## Installation

### Option 1: As a Package (Recommended for Apps)

Install the design system as an npm package:

```bash
npm install css-design-system
# or
yarn add css-design-system
# or
pnpm add css-design-system
```

### Option 2: Clone Repository (For Contributing)

Clone the repository for local development:

```bash
git clone https://github.com/cepat-service-station/css-design-system.git
cd css-design-system
npm install
```

### Verify Installation

Run the following to verify everything is set up correctly:

```bash
npm run dev        # Start development server
npm run storybook  # Start component playground
npm test           # Run tests
```

---

## Quick Start

### 1. Import Global Styles

Add the design system styles to your app's entry point:

```tsx
// main.tsx or App.tsx
import 'css-design-system/styles';
```

### 2. Configure Tailwind CSS

Extend your `tailwind.config.js` with the CSS preset:

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

Import and use components in your application:

```tsx
import { Button, Card, Input } from 'css-design-system';

function LoginForm() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Sign In</Card.Title>
        <Card.Description>
          Enter your credentials to continue
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4">
        <Input
          type="email"
          placeholder="Email address"
          label="Email"
        />
        <Input
          type="password"
          placeholder="Password"
          label="Password"
        />
        <Button variant="primary" className="w-full">
          Sign In
        </Button>
      </Card.Content>
    </Card>
  );
}
```

### 4. Use Design Tokens

Access design tokens via CSS variables or JavaScript:

```css
/* In CSS */
.custom-element {
  color: var(--color-primary-900);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
}
```

```tsx
// In JavaScript/TypeScript
import tokens from 'css-design-system/tokens';

const primaryColor = tokens.colors.primary[900];
```

---

## Project Structure

Understanding the design system structure:

```
css-design-system/
├── assets/                 # Brand assets (logos, icons, fonts)
│   ├── icons/
│   ├── images/
│   └── fonts/
├── components/             # React components
│   ├── atoms/              # Basic building blocks
│   ├── molecules/          # Combinations of atoms
│   └── organisms/          # Complex UI sections
├── design-tokens/          # Design token definitions
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   └── tokens.css
├── docs/                   # Documentation
├── patterns/               # UI pattern guides
├── styles/                 # Global CSS files
│   ├── globals.css
│   ├── reset.css
│   ├── utilities.css
│   └── themes/
├── templates/              # Page layout templates
└── examples/               # Usage examples
```

---

## Configuration

### Environment Variables

Create a `.env` file for environment-specific settings:

```env
# .env.example
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App
```

### TypeScript Configuration

The design system provides TypeScript definitions out of the box. Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true
  }
}
```

### Tailwind Customization

Override or extend tokens in your `tailwind.config.js`:

```js
import { cssPreset } from 'css-design-system/tailwind';

export default {
  presets: [cssPreset],
  theme: {
    extend: {
      colors: {
        // Add your custom colors
        brand: {
          accent: '#ff6b00',
        },
      },
    },
  },
};
```

---

## Next Steps

Now that you're set up, explore these resources:

1. **[Design Principles](./design-principles.md)** - Understand our design philosophy
2. **[Design Tokens](./design-tokens.md)** - Learn about colors, typography, and spacing
3. **[Accessibility Guidelines](./accessibility-guidelines.md)** - Build inclusive interfaces
4. **[Usage Examples](./usage-examples.md)** - See real-world implementations

### Need Help?

- **Slack:** #design-system
- **Email:** design-system@cepatservicestation.com
- **Office Hours:** Fridays 2-3pm

---

<p align="center">
  <em>Built with care by Cepat Service Station</em>
</p>
