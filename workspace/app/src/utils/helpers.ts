import type { Nullable } from "@constellatio/utility-types";

export const getUrlSearchParams = () =>
{
  return window.location.search.slice(1);
};

export function extractNumeric(title: Nullable<string>): number | null
{
  if(!title)
  {
    return null;
  }

  const match = title.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}
