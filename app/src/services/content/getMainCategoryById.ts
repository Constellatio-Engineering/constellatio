import { caisySDK } from "../graphql/getSdk";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getMainCategoryById = async ({ id }: {id: string | undefined}) =>
{
  if(id == null)
  {
    return null;
  }

  const { MainCategory } = await caisySDK.getMainCategoryById({ id });
  return MainCategory || null;
};
