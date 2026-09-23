import { FOREGROUND_TEXT } from './typography';
import { BG, type ColorToken } from './tokens';

export type Status = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export const STATUS_COLOR_TOKEN: Record<Status, ColorToken> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'destructive',
  neutral: 'muted',
};

export const statusColorClasses = (status: Status): string => {
  const token = STATUS_COLOR_TOKEN[status];
  return `${BG[token]} ${FOREGROUND_TEXT[token]}`;
};
