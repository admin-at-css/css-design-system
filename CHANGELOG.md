# Changelog

All notable changes to the CSS Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial design system setup

---

## [1.0.0] - 2024-01-11

### Added

#### Design Tokens
- Complete color palette with primary (Deep Navy Blue), secondary (Sky Blue), and neutral (Slate Gray) scales
- Typography system with Inter as primary font family
- Spacing scale following Refactoring UI exponential principles
- Shadow system with two-part shadow technique for realistic depth
- Animation tokens with durations, easings, and keyframes
- Border radius and width tokens
- Breakpoint definitions for responsive design

#### Components - Atoms
- **Button**: Primary, secondary, outline, ghost, destructive, and link variants with loading state
- **Input**: Text input with error/success states and icon support
- **Typography**: Heading, Text, Label, Code, and Blockquote components
- **Badge**: Status badges with multiple variants and dot indicator
- **Avatar**: User avatar with image and fallback support
- **Checkbox**: Accessible checkbox with label and description
- **Switch**: Toggle switch component

#### Components - Molecules
- **FormField**: Form field wrapper with label, helper text, and error message
- **Card**: Flexible card component with Header, Content, and Footer
- **Alert**: Alert messages with info, success, warning, and error variants
- **SearchBar**: Search input with clear button and submit functionality

#### Components - Organisms
- **Modal**: Dialog component with customizable size and content
- **Navigation**: Flexible navigation with horizontal/vertical layouts
- **DataTable**: Data table with sorting, loading states, and empty state

#### Documentation
- Getting Started guide
- Design Principles documentation
- Accessibility Guidelines (WCAG 2.1 AA)
- Design Tokens reference
- Usage Examples

#### Patterns
- Navigation patterns (top nav, sidebar, breadcrumb, tabs, pagination)
- Form patterns (validation, multi-step, inline editing, auto-save)
- Feedback patterns (toast, loading, empty states, error states)
- Layout patterns (page layouts, grid systems, containers)
- Data visualization patterns (stat cards, charts, tables)

#### Styles
- CSS reset based on modern best practices
- Global styles with base typography and focus states
- Utility classes for common patterns
- Light and dark theme support via CSS custom properties

#### Infrastructure
- React 18 with TypeScript 5
- Vite for development and building
- Storybook 8 for component documentation
- Vitest for testing
- ESLint and Prettier for code quality
- Husky and lint-staged for git hooks

---

## Version Guidelines

### Major (X.0.0)
- Breaking changes to component APIs
- Removal of deprecated features
- Major visual changes to existing components

### Minor (0.X.0)
- New components
- New variants for existing components
- New design tokens
- Non-breaking enhancements

### Patch (0.0.X)
- Bug fixes
- Documentation updates
- Minor visual adjustments
- Performance improvements

---

[Unreleased]: https://github.com/cepat-service-station/css-design-system/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/cepat-service-station/css-design-system/releases/tag/v1.0.0
