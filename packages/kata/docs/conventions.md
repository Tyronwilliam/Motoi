# Code conventions — @motoi/kata

Rules decided along the way, to apply consistently across this package.

## No `function` declarations

Always const arrow functions, never `function foo() {}`.

```ts
// ❌
export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

// ✅
export const objectKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};
```

Applies everywhere: utility functions (`lib/`), React components, Storybook story helpers.

## One file per domain, not a catch-all file

When several concepts share a topic (e.g. colors) but have different responsibilities, they live in separate files within the same folder rather than one file that mixes everything.

```
src/lib/colors/
├── index.ts        # barrel — @/lib/colors
├── tokens.ts        # source of truth: ColorToken, BG, BORDER, RING
├── typography.ts     # text color only: TEXT, FOREGROUND_TEXT, Typography
└── status.ts         # business whitelist Status + its mapping to ColorToken
```

`tokens.ts` depends on nothing, `typography.ts` depends on `tokens.ts`, `status.ts` depends on both — never a circular dependency. A single entry point for consumers: the `index.ts` barrel.

## Public whitelist: `Extract` when names match, mapping table otherwise

A public type exposed to design system consumers (`Typography`, `Status`, ...) is a whitelist of allowed values. Two cases:

**Public names are already valid `ColorToken`s** → derive with `Extract`, no mapping table (avoids unnecessary indirection and stays in sync if `ColorToken` changes):

```ts
export type Typography = Extract<
  ColorToken,
  'primary' | 'secondary' | 'muted' | 'destructive'
>;

export const typographyClasses = (color: Typography): string => TEXT[color];
```

**Public names diverge from `ColorToken`** (e.g. `error` ≠ `destructive`, `neutral` ≠ `muted`) → independent literals + explicit mapping table:

```ts
export type Status = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export const STATUS_COLOR_TOKEN: Record<Status, ColorToken> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'destructive',
  neutral: 'muted',
};
```

## No `as` (type assertion) in business code

An `as Type` cast hides a potential error from the compiler. When building a typed object still requires an assertion (e.g. filling a `Record<K, V>` key by key in a loop), it's isolated once in a reusable generic helper instead of being repeated in every business file.

```ts
// src/lib/utils/record.ts — the only place in the project with this cast
export const recordFromKeys = <K extends PropertyKey, V>({
  keys,
  toValue,
}: {
  keys: readonly K[];
  toValue: (key: K) => V;
}): Record<K, V> => {
  const result = {} as Record<K, V>;
  for (const key of keys) {
    result[key] = toValue(key);
  }
  return result;
};
```

```ts
// src/lib/colors/tokens.ts — no cast here
export const tokenMap = (prefix: string): Record<ColorToken, string> => {
  return recordFromKeys({
    keys: COLOR_TOKENS,
    toValue: (token) => `${prefix}-${token}`,
  });
};
```

`K extends PropertyKey` (not `K extends string`) to cover both `string` keys (`ColorToken`) and `number` keys (`SpacingScale`).

Accepted exception: `as const` on a literal array to derive a union type (`COLOR_TOKENS`, `SPACING_SCALE`) — this isn't an assertion that lies to the compiler, just freezing literals.

## Dynamic Tailwind classes → `@source inline(...)` required

Tailwind scans source code for **literal** class names. Any class built dynamically (`` `bg-${token}` ``, `` `${prefix}-${step}` ``) is invisible to its scanner: the CSS is never generated, the class has no effect at runtime — silently, with no build error.

Every prefix/value combination used dynamically (spacing, colors) must be listed in an `@source inline(...)` directive in `src/styles.css`:

```css
@source inline("{p,px,py,...}-{0,2,4,6,8,10,12,14,16}");
@source inline("{bg,text,border,ring}-{primary,secondary,...}");
```

## Colocated tests

Tests live in a `__tests__/` folder next to the code they test, never in a separate test tree.

```
src/lib/utils/
├── record.ts
└── __tests__/
    └── record.test.ts
```

Prioritize pure functions with real logic (mapping, transformation, edge cases) over static data objects already covered indirectly elsewhere.
