import { buttonVariants, buttonVariantsConfig } from './styles';

export type ButtonVariants = typeof buttonVariants;
export type ButtonVariant = keyof typeof buttonVariantsConfig.variant;
export type ButtonSize = keyof typeof buttonVariantsConfig.size;
