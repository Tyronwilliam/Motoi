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
