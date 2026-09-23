import { objectKeys } from '@/lib/object-keys';
import { buttonVariantsConfig } from './styles';

export const BUTTON_VARIANTS = objectKeys(buttonVariantsConfig.variant);

export const BUTTON_SIZES = objectKeys(buttonVariantsConfig.size);

export const DEFAULT_VARIANT: (typeof BUTTON_VARIANTS)[number] = 'default';

export const DEFAULT_SIZE: (typeof BUTTON_SIZES)[number] = 'default';
