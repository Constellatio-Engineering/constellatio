import { caisySDK } from "../graphql/getSdk";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getTopicById = async ({ id }: {id: string | undefined}) =>
{
  if(id == null)
  {
    return null;
  }

  const { Topic } = await caisySDK.getTopicById({ id });
  return Topic || null;
};
