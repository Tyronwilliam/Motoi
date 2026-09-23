import { SPACING_SCALE } from '../../../lib/spacings';

export type SpacingValue = (typeof SPACING_SCALE)[number];
export type SpacingType = 'padding' | 'margin';
