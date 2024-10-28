export function getIsPrimitive(value: unknown): value is string | number | boolean
{
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

export function getIsObjectWithId(value: unknown): value is { id: unknown }
{
  return value != null && typeof value === "object" && "id" in value;
}

export function getIsObjectWithValue(value: unknown): value is { value: unknown }
{
  return value != null && typeof value === "object" && "value" in value;
}
