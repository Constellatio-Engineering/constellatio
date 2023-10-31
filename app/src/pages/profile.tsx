import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/pageHead/PageHead";
import ProfilePageWrapper from "@/components/pages/profilePage/ProfilePage";
import { type IGenMainCategory } from "@/services/graphql/__generated/sdk";
import { getCommonProps } from "@/utils/commonProps";
import { type Nullable } from "@/utils/types";

import { type GetServerSideProps } from "next";
import { type SSRConfig } from "next-i18next";
import React, { type FunctionComponent } from "react";

import { defaultLocale } from "../../next.config.mjs";

export type IProfilePageProps = { 
  readonly allMainCategory: Array<Nullable<IGenMainCategory>>;
  readonly data: string;
};

type ServerSidePropsResult = SSRConfig;

export const getServerSideProps: GetServerSideProps<ServerSidePropsResult> = async ({ locale = defaultLocale }) =>
{
  const commonProps = await getCommonProps({ locale });

  return {
    props: commonProps,
  };
};

const Page: FunctionComponent<ServerSidePropsResult> = () =>
{
  return (
    <>
      <PageHead pageTitle="Profil"/>
      <Layout>
        <ProfilePageWrapper/>
      </Layout>
    </>
  );
};

export default Page;
