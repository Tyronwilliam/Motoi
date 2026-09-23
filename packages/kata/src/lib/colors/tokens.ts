import { recordFromKeys } from '../utils/record';

export const COLOR_TOKENS = [
  'primary',
  'secondary',
  'muted',
  'accent',
  'destructive',
  'success',
  'warning',
  'info',
] as const;

export type ColorToken = (typeof COLOR_TOKENS)[number];

export const tokenMap = (prefix: string): Record<ColorToken, string> => {
  return recordFromKeys({
    keys: COLOR_TOKENS,
    toValue: (token) => `${prefix}-${token}`,
  });
};

export const BG = tokenMap('bg');
export const BORDER = tokenMap('border');
export const RING = tokenMap('ring');
