import { type RemoveNull } from "@constellatio/utility-types";
import { caisySDK } from "../graphql/getSdk";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCaseById = async ({ id }: {id: string | undefined}) =>
{
  if(id == null)
  {
    return {
      legalCase: null,
    };
  }

  const { Case } = await caisySDK.getCaseById({ id });
    
  return {
    legalCase: Case || null,
  };
};

export type FullLegalCase = RemoveNull<Awaited<ReturnType<typeof getCaseById>>["legalCase"]>;
