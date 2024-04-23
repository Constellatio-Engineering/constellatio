export const getCaisyImageBlurUrl = (imageSrc: string): string =>
{
  const imageUrl = new URL(imageSrc);
  const searchParams = new URLSearchParams(imageUrl.search);
  searchParams.set("w", "32");

  return imageUrl.origin + imageUrl.pathname + "?" + searchParams.toString();
};
