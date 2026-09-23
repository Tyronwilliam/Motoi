import { recordFromKeys } from '../utils/record';
import { COLOR_TOKENS, tokenMap, type ColorToken } from './tokens';

export const TEXT = tokenMap('text');

export const FOREGROUND_TEXT = recordFromKeys({
  keys: COLOR_TOKENS,
  toValue: (token: ColorToken) => `${TEXT[token]}-foreground`,
});

export type Typography = Extract<
  ColorToken,
  'primary' | 'secondary' | 'muted' | 'destructive'
>;

export const typographyClasses = (color: Typography): string => {
  return TEXT[color];
};
