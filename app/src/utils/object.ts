export function mapToObject<Key extends string, Value>(map: Map<Key, Value>): {
  [K in Key]: Value;
}
{
  const entries = map.entries();
  const object = Object.fromEntries(entries) as { [K in Key]: Value; };
  return object;
}

export function getIsValidKey<T extends Record<string, unknown>>(obj: T, key: string): key is Extract<keyof T, string>
{
  return Object.hasOwn(obj, key);
}
