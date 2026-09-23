/**
 * Build a fully-keyed `Record` from a list of keys and a value mapper.
 * The one type assertion TypeScript can't avoid when constructing an object
 * key by key lives here, so consumers never need one themselves.
 */
export const recordFromKeys = <K extends string, V>({
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
