import { IGenArticle, IGenCase } from "../graphql/__generated/sdk";

export const getCaisyImageBlurUrl = (imageSrc: string): string =>
{
  const imageUrl = new URL(imageSrc);
  const searchParams = new URLSearchParams(imageUrl.search);
  searchParams.set("w", "32");

  return imageUrl.origin + imageUrl.pathname + "?" + searchParams.toString();
};

export const sortByTopic = (a: Pick<(IGenArticle | IGenCase), "topic">, b: Pick<(IGenArticle | IGenCase), "topic">): number =>
{
  const sortingA = a?.topic?.[0]?.sorting;
  const sortingB = b?.topic?.[0]?.sorting;

  if(sortingA == null)
  {
    return 1;
  }

  if(sortingB == null)
  {
    return -1;
  }

  return sortingA - sortingB;
};
