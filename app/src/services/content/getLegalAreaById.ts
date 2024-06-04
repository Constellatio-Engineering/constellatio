import { caisySDK } from "../graphql/getSdk";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getLegalAreaById = async ({ id }: {id: string | undefined}) =>
{
  if(id == null)
  {
    return null;
  }

  const { LegalArea } = await caisySDK.getLegalAreaById({ id });
  return LegalArea || null;
};
