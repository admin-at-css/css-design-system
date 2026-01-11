# Design Principles

The CSS Design System is built on a foundation of clear, actionable principles that guide every design and development decision. These principles ensure consistency across all Cepat Service Station products.

## Table of Contents

- [Core Principles](#core-principles)
- [Visual Hierarchy](#visual-hierarchy)
- [Decision Framework](#decision-framework)
- [Anti-Patterns](#anti-patterns)

---

## Core Principles

### 1. Consistency Over Creativity

**What it means:** Use established patterns before creating new ones. Every element should feel like it belongs to the same family.

**In practice:**
- Use design tokens for all colors, spacing, and typography
- Follow component APIs consistently across similar components
- When in doubt, reference existing patterns in the system

**Example:**
```tsx
// GOOD: Consistent with system patterns
<Button variant="primary" size="md">Submit</Button>

// AVOID: Custom one-off styling
<button style={{ background: '#1b2a53', padding: '10px 20px' }}>Submit</button>
```

---

### 2. Accessibility First

**What it means:** Every interface must be usable by everyone, regardless of ability or device.

**In practice:**
- Maintain 4.5:1 contrast ratio for normal text, 3:1 for large text
- All interactive elements must be keyboard accessible
- Provide meaningful alt text and ARIA labels
- Support screen readers and assistive technologies

**Non-negotiable requirements:**
- Focus states on all interactive elements
- Semantic HTML structure
- Touch targets minimum 44x44px
- No color as the sole indicator of meaning

---

### 3. Clarity and Simplicity

**What it means:** Reduce cognitive load. Every element should have a clear purpose and the interface should guide users naturally.

**In practice:**
- Remove unnecessary decorations
- Use progressive disclosure for complex interfaces
- Provide clear visual hierarchy
- Write concise, action-oriented labels

**Visual weight hierarchy:**
1. Primary actions (highest emphasis)
2. Secondary actions
3. Tertiary/destructive actions (lowest emphasis)

---

### 4. Efficiency

**What it means:** Minimize steps to complete tasks. Respect users' time and attention.

**In practice:**
- Smart defaults reduce decisions
- Inline validation prevents errors
- Undo over confirmation where safe
- Remember user preferences

**Example:**
```tsx
// EFFICIENT: Show validation as user types
<Input
  error={email && !isValidEmail(email) ? "Enter a valid email" : undefined}
/>

// INEFFICIENT: Only validate on submit, then scroll to error
```

---

### 5. Flexibility and Scalability

**What it means:** Components should work across contexts while maintaining their core identity.

**In practice:**
- Components accept variant and size props
- Use composition over configuration
- Design tokens scale across breakpoints
- Support both light and dark themes

**Example:**
```tsx
// Flexible component with variants
<Card variant="elevated" | "outlined" | "filled">
  <Card.Header>
  <Card.Content>
  <Card.Footer>
</Card>
```

---

### 6. User-Centered Design

**What it means:** Design decisions are validated by real user needs, not assumptions.

**In practice:**
- Test with actual users when possible
- Consider edge cases (empty states, error states, loading)
- Design for the 80% use case, accommodate the 20%
- Gather feedback and iterate

---

## Visual Hierarchy

Following Refactoring UI principles, create hierarchy without relying solely on size:

### Techniques for Emphasis

| Technique | When to Use |
|-----------|-------------|
| **Font weight** | Primary emphasis (semibold for headings) |
| **Color** | De-emphasize (gray for secondary text) |
| **Size** | Sparingly, only for major hierarchy |
| **Spacing** | Group related, separate unrelated |
| **Position** | Important content top-left |

### Hierarchy Example

```
┌─────────────────────────────────────────┐
│  Dashboard                  ← Heading   │
│  ─────────────                          │
│  Welcome back, John        ← Secondary  │
│                                         │
│  ┌─────────┐ ┌─────────┐               │
│  │ Revenue │ │  Users  │   ← Cards     │
│  │ $12,345 │ │  1,234  │               │
│  │ +12.5%  │ │  +5.2%  │   ← Tertiary  │
│  └─────────┘ └─────────┘               │
└─────────────────────────────────────────┘
```

---

## Decision Framework

When making design decisions, follow this hierarchy:

### 1. Does a pattern exist?
→ **Yes:** Use the existing pattern
→ **No:** Continue to step 2

### 2. Is it accessible?
→ **No:** Find an accessible solution first
→ **Yes:** Continue to step 3

### 3. Is it consistent with brand?
→ **No:** Adjust to align with brand tokens
→ **Yes:** Continue to step 4

### 4. Is it simple enough?
→ **No:** Simplify until it is
→ **Yes:** Implement

### 5. Document and share
→ Create a new pattern for others to use

---

## Anti-Patterns

Avoid these common mistakes:

### Don't: Rely on Color Alone

```tsx
// BAD: Color is only indicator
<span className="text-red-500">Error occurred</span>

// GOOD: Icon + color + text
<Alert variant="error">
  <AlertIcon />
  Error: Please check your input
</Alert>
```

### Don't: Break Consistency

```tsx
// BAD: One-off button style
<button className="bg-blue-600 hover:bg-blue-700">Custom</button>

// GOOD: Use system component
<Button variant="primary">Consistent</Button>
```

### Don't: Ignore States

```tsx
// BAD: No loading or error states
<DataTable data={data} />

// GOOD: Handle all states
<DataTable
  data={data}
  loading={isLoading}
  error={error}
  emptyState={<EmptyState />}
/>
```

### Don't: Over-Design

```tsx
// BAD: Too many visual treatments
<Card
  shadow="xl"
  border="2px solid"
  borderRadius="2xl"
  gradient="linear-gradient(...)"
>

// GOOD: Subtle, purposeful styling
<Card variant="elevated">
```

---

## Summary

| Principle | Key Question |
|-----------|--------------|
| Consistency | Does this match existing patterns? |
| Accessibility | Can everyone use this? |
| Clarity | Is the purpose immediately clear? |
| Efficiency | Can we reduce steps? |
| Flexibility | Will this work in other contexts? |
| User-Centered | Is this validated by real needs? |

---

<p align="center">
  <em>"Design is not just what it looks like. Design is how it works."</em><br>
  — Steve Jobs
</p>
