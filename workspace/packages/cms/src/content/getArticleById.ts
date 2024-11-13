import { type IGenArticle } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

interface IGetArticleByIdProps 
{
  article: IGenArticle | null;
}

export const getArticleById = async ({ id }: { id: string | undefined}): Promise<IGetArticleByIdProps> =>
{
  if(id == null)
  {
    return {
      article: null,
    };
  }

  const { Article } = await caisySDK.getArticleById({ id });

  return {
    article: Article || null,
  };
};
