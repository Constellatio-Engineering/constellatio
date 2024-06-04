import { caisySDK } from "../graphql/getSdk";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getSubCategoryById = async ({ id }: {id: string | undefined}) =>
{
  if(id == null)
  {
    return null;
  }

  const { SubCategory } = await caisySDK.getSubCategoryById({ id });
  return SubCategory || null;
};
