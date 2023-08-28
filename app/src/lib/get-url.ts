import { env } from "@/env.mjs";

export const getURL = (): string =>
{
  let url = env.NEXT_PUBLIC_WEBSITE_URL;

  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
};
