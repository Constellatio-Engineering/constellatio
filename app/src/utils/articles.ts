import { type IGenArticle } from "@/services/graphql/__generated/sdk";

export const sortArticlesByTopic = (a: IGenArticle, b: IGenArticle): number =>
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
