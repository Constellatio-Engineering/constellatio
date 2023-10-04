import { type IGenCase } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

interface getCaseByIdProps
{
  legalCase: IGenCase | null;
}

export const getCaseById = async ({ id }: {id: string | undefined}): Promise<getCaseByIdProps> =>
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
