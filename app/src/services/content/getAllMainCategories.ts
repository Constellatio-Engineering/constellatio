import { caisySDK } from "../graphql/getSdk";

export const getAllMainCategories = async () =>
{
  const getAllMainCategoriesResult = await caisySDK.getAllMainCategory();
  return getAllMainCategoriesResult.allMainCategory?.edges?.map(edge => edge?.node).filter(Boolean) ?? [];
};
