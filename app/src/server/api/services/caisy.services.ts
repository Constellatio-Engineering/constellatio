import type { IGenLegalArea, IGenMainCategory, IGenTopic } from "@/services/graphql/__generated/sdk";
import { caisySDK } from "@/services/graphql/getSdk";

export const getAllLegalFields = async (): Promise<IGenMainCategory[]> =>
{
  const allCategoryRes = await caisySDK.getAllMainCategory();
  const categories: IGenMainCategory[] = allCategoryRes
    ?.allMainCategory
    ?.edges
    ?.map((edge) => edge?.node)
    ?.filter(Boolean)
    ?? [];
  return categories;
};

export const getAllSubfields = async (): Promise<IGenLegalArea[]> =>
{
  const allLegalAreaRes = await caisySDK.getAllLegalArea();
  const legalAreas: IGenLegalArea[] = allLegalAreaRes
    ?.allLegalArea
    ?.edges
    ?.map((edge) => edge?.node)
    ?.filter(Boolean)
    ?? [];
  return legalAreas;
};

export const getAllTopics = async (): Promise<IGenTopic[]> =>
{
  const allTopicsRes = await caisySDK.getAllTopics();
  const topics: IGenTopic[] = allTopicsRes
    ?.allTopic
    ?.edges
    ?.map((edge) => edge?.node)
    ?.filter(Boolean)
    ?? [];
  return topics;
};
