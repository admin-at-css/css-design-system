/**
 * CSS Design System - Component Exports
 *
 * This file exports all components from the design system.
 * Import components directly from this file:
 *
 * @example
 * import { Button, Card, Input } from 'css-design-system';
 */

// ============================================
// ATOMS - Basic building blocks
// ============================================

export { Button, buttonVariants } from './atoms/Button';
export type { ButtonProps } from './atoms/Button';

export { Input, inputVariants } from './atoms/Input';
export type { InputProps } from './atoms/Input';

export {
  Heading,
  headingVariants,
  Text,
  textVariants,
  Label,
  Code,
  Blockquote,
} from './atoms/Typography';
export type { HeadingProps, TextProps, LabelProps } from './atoms/Typography';

export { Badge, badgeVariants } from './atoms/Badge';
export type { BadgeProps } from './atoms/Badge';

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  UserAvatar,
  avatarVariants,
} from './atoms/Avatar';
export type { AvatarProps, UserAvatarProps } from './atoms/Avatar';

export { Checkbox } from './atoms/Checkbox';
export type { CheckboxProps } from './atoms/Checkbox';

export { Switch } from './atoms/Switch';
export type { SwitchProps } from './atoms/Switch';

// ============================================
// MOLECULES - Combinations of atoms
// ============================================

export { FormField } from './molecules/FormField';
export type { FormFieldProps } from './molecules/FormField';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from './molecules/Card';
export type { CardProps } from './molecules/Card';

export { Alert, AlertTitle, AlertDescription, alertVariants } from './molecules/Alert';
export type { AlertProps } from './molecules/Alert';

export { SearchBar } from './molecules/SearchBar';
export type { SearchBarProps } from './molecules/SearchBar';

// ============================================
// ORGANISMS - Complex UI sections
// ============================================

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  modalContentVariants,
} from './organisms/Modal';
export type { ModalContentProps } from './organisms/Modal';

export {
  Navigation,
  NavigationList,
  NavigationItem,
  NavigationLink,
  NavigationSeparator,
} from './organisms/Navigation';
export type { NavigationProps, NavigationLinkProps } from './organisms/Navigation';

export { DataTable } from './organisms/DataTable';
export type { DataTableProps, Column } from './organisms/DataTable';

// ============================================
// UTILITIES
// ============================================

export { cn } from '../src/lib/utils';
