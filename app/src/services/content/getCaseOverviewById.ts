import { caisySDK } from "../graphql/getSdk";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCaseOverviewById = async ({ id }: {id: string | undefined}) =>
{
  if(id == null)
  {
    return null;
  }

  const { Case } = await caisySDK.getCaseOverviewById({ id });
  return Case || null;
};
