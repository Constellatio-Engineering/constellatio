import { caisySDK } from "../graphql/getSdk";

export const getProps = async ({ slug }: { slug: string }) => 
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
