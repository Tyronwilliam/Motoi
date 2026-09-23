import { SPACING_SCALE } from '../../../lib/spacing';

export type SpacingValue = (typeof SPACING_SCALE)[number];
export type SpacingType = 'padding' | 'margin';
