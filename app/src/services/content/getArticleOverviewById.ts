import { caisySDK } from "../graphql/getSdk";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getArticleOverviewById = async ({ id }: {id: string | undefined}) =>
{
  if(id == null)
  {
    return null;
  }

  const { Article } = await caisySDK.getArticleOverviewById({ id });
  return Article || null;
};
