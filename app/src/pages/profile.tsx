import { Layout } from "@/components/layouts/Layout";
import ProfilePage from "@/components/pages/profilePage/ProfilePage";
import { type IGenMainCategory, type IGenGetAllMainCategoryQuery } from "@/services/graphql/__generated/sdk";
import { caisySDK } from "@/services/graphql/getSdk";

import { type GetStaticProps } from "next/types";
import React, { type FunctionComponent } from "react";

export type IProfilePageProps = { 
  // readonly allMainCategory: Array<({
  //   _typename?: "MainCategory" | undefined;
  // } & IGenMainCategoryFragment) | null | undefined>;
  readonly allMainCategory: Array<IGenMainCategory | null | undefined>;
  readonly data: string;
};

export const getStaticProps: GetStaticProps<IProfilePageProps> = async () =>
{

  const allCategoryRes: IGenGetAllMainCategoryQuery = await caisySDK.getAllMainCategory();
  return {
    props: {
      allMainCategory: allCategoryRes?.allMainCategory?.edges?.map((edge) => edge!.node) ?? [],
      data: "data",
    }
  };
};

const Page: FunctionComponent<IProfilePageProps> = (props) =>
{
  return (
    <Layout>
      <ProfilePage {...props}/>
    </Layout>
  );
};

export default Page;
