import { type IGenArticle } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

interface IGetArticleByIdProps 
{
  Article: IGenArticle | null;
}

export const getArticleById = async ({
  id,
}: {
  id: string;
}): Promise<IGetArticleByIdProps> => 
{
  const { Article } = await caisySDK.getArticleById({ id });

  return {
    Article: Article || null,
  };
};
