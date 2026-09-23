export const SPACING_SCALE = [0, 2, 4, 6, 8, 10, 12, 14, 16] as const;

export type SpacingScale = (typeof SPACING_SCALE)[number];

const scaleMap = (prefix: string): Record<SpacingScale, string> => {
  return Object.fromEntries(
    SPACING_SCALE.map((step) => [step, `${prefix}-${step}`]),
  ) as Record<SpacingScale, string>;
};

export const PADDING = {
  all: scaleMap('p'),
  x: scaleMap('px'),
  y: scaleMap('py'),
  top: scaleMap('pt'),
  right: scaleMap('pr'),
  bottom: scaleMap('pb'),
  left: scaleMap('pl'),
};

export const MARGIN = {
  all: scaleMap('m'),
  x: scaleMap('mx'),
  y: scaleMap('my'),
  top: scaleMap('mt'),
  right: scaleMap('mr'),
  bottom: scaleMap('mb'),
  left: scaleMap('ml'),
};

export const GAP = {
  all: scaleMap('gap'),
  x: scaleMap('gap-x'),
  y: scaleMap('gap-y'),
};


const SPACING_PROP_MAP = {
  p: PADDING.all,
  px: PADDING.x,
  py: PADDING.y,
  pt: PADDING.top,
  pr: PADDING.right,
  pb: PADDING.bottom,
  pl: PADDING.left,
  m: MARGIN.all,
  mx: MARGIN.x,
  my: MARGIN.y,
  mt: MARGIN.top,
  mr: MARGIN.right,
  mb: MARGIN.bottom,
  ml: MARGIN.left,
  gap: GAP.all,
  gapX: GAP.x,
  gapY: GAP.y,
} as const;

export type SpacingProps = Partial<
  Record<keyof typeof SPACING_PROP_MAP, SpacingScale>
>;

/**
 * Resolve a set of spacing props into Tailwind classes.
 *
 * @param props - Spacing props to resolve (e.g. `{ gap: 4, mt: 6 }`); keys
 * with an `undefined` value are ignored.
 * @returns A space-separated string of Tailwind classes (e.g. `"gap-4 mt-6"`).
 */
export const spacingClasses = (props: SpacingProps): string => {
  return Object.entries(props)
    .filter((entry): entry is [keyof typeof SPACING_PROP_MAP, SpacingScale] =>
      entry[1] !== undefined,
    )
    .map(([key, value]) => SPACING_PROP_MAP[key][value])
    .join(' ');
};
