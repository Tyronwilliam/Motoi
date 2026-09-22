import { objectKeys } from '@/lib/object-keys';
import { buttonVariantsConfig } from './styles';

export const BUTTON_VARIANTS = objectKeys(buttonVariantsConfig.variant);

export const BUTTON_SIZES = objectKeys(buttonVariantsConfig.size);
