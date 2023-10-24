import { Layout } from "@/components/layouts/Layout";
import ProfilePageWrapper from "@/components/pages/profilePage/ProfilePage";
import { type IGenMainCategory, type IGenGetAllMainCategoryQuery } from "@/services/graphql/__generated/sdk";
import { caisySDK } from "@/services/graphql/getSdk";
import { type Nullable } from "@/utils/types";

import { type GetStaticProps } from "next/types";
import React, { type FunctionComponent } from "react";

export type IProfilePageProps = { 
  // readonly allMainCategory: Array<({
  //   _typename?: "MainCategory" | undefined;
  // } & IGenMainCategoryFragment) | null | undefined>;
  readonly allMainCategory: Array<Nullable<IGenMainCategory>>;
  readonly data: string;
};

export const getStaticProps: GetStaticProps<IProfilePageProps> = async () =>
{
  const allCategoryRes: IGenGetAllMainCategoryQuery = await caisySDK.getAllMainCategory();

  return {
    props: {
      allMainCategory: allCategoryRes?.allMainCategory?.edges?.map((edge) => edge!.node) ?? [],
      data: "data",
    },
    revalidate: 10,
  };
};

const Page: FunctionComponent<IProfilePageProps> = (props) =>
{
  return (
    <Layout>
      <ProfilePageWrapper {...props}/>
    </Layout>
  );
};

export default Page;
