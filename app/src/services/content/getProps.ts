// import { type IGenPage } from "@/services/graphql/__generated/sdk";

// import { caisySDK } from "../graphql/getSdk";

type GetPropsParams = {
  slug: string;
};

// export type GetPropsResult = {
//   Page: IGenPage | null;
// };

// type GetProps = (props: GetPropsParams) => Promise<GetPropsResult>;

export const getProps = ({ slug }: GetPropsParams): {Page: string} =>
{
  // if partner slug is undefined, return vanilla page
  if(slug === undefined) 
  {
    return {
      Page: "null",
    };
  }

  const Page = "null";
  // const Page = await caisySDK.Page({ slug });

  return {
    Page,
  };
};
