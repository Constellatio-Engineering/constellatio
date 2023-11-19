import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import ProfilePageWrapper from "@/components/pages/profilePage/ProfilePage";
import { type NextPageWithLayout } from "@/pages/_app";
import { type IGenMainCategory } from "@/services/graphql/__generated/sdk";
import { getCommonProps } from "@/utils/commonProps";
import { type Nullable } from "@/utils/types";

import { type GetStaticProps } from "next";
import { type SSRConfig } from "next-i18next";
import React from "react";

import { defaultLocale } from "../../next.config.mjs";

export type IProfilePageProps = { 
  readonly allMainCategory: Array<Nullable<IGenMainCategory>>;
  readonly data: string;
};

type StaticPropsResult = SSRConfig;

export const getStaticProps: GetStaticProps<StaticPropsResult> = async ({ locale = defaultLocale }) =>
{
  const commonProps = await getCommonProps({ locale });

  return {
    props: commonProps,
  };
};

const Page: NextPageWithLayout<StaticPropsResult> = () =>
{
  return (
    <>
      <PageHead pageTitle="Profil"/>
      <ProfilePageWrapper/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
