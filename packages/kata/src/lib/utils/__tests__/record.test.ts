import { describe, expect, it } from 'vitest';

import { recordFromKeys } from '../record';

describe('recordFromKeys', () => {
  it('should builds an entry per key using toValue', () => {
    const result = recordFromKeys({
      keys: ['primary', 'secondary'] as const,
      toValue: (key) => `bg-${key}`,
    });

    expect(result).toEqual({
      primary: 'bg-primary',
      secondary: 'bg-secondary',
    });
  });

  it('should supports numeric keys', () => {
    const result = recordFromKeys({
      keys: [0, 2, 4] as const,
      toValue: (step) => `p-${step}`,
    });

    expect(result).toEqual({
      0: 'p-0',
      2: 'p-2',
      4: 'p-4',
    });
  });

  it('should returns an empty object for an empty key list', () => {
    const result = recordFromKeys({
      keys: [] as const,
      toValue: (key) => key,
    });

    expect(result).toEqual({});
  });

  it('should calls toValue with each key', () => {
    const seen: string[] = [];

    recordFromKeys({
      keys: ['a', 'b', 'c'] as const,
      toValue: (key) => {
        seen.push(key);
        return key;
      },
    });

    expect(seen).toEqual(['a', 'b', 'c']);
  });
});
