import { type IGenPage } from "@/services/graphql/__generated/sdk";

import { caisySDK } from "../graphql/getSdk";

type GetProps = (props: {
  slug: string;
}) => Promise<{
  Page: IGenPage | null;
}>;

export const getProps: GetProps = async ({ slug }) =>
{
  // if partner slug is undefined, return vanilla page
  if(slug === undefined) 
  {
    return {
      Page: null,
    };
  }

  const Page = await caisySDK.Page({ slug });

  return {
    Page: Page?.allPage?.edges?.[0]?.node || null,
  };
};
