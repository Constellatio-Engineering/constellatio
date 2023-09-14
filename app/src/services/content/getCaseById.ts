import { type IGenCase } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

interface getCaseByIdProps
{
  Case: IGenCase | null;
}

export const getCaseById = async ({ id }: {id: string}): Promise<getCaseByIdProps> =>
{
  const { Case } = await caisySDK.getCaseById({ id });
    
  return {
    Case: Case || null,
  };
};
