import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import ProfilePageWrapper from "@/components/pages/profilePage/ProfilePage";
import { type NextPageWithLayout } from "@/pages/_app";
import { getCommonProps } from "@/utils/commonProps";
import { getTrpcServerSideHelpers } from "@/utils/trpc";

import { type IGenMainCategory } from "@constellatio/cms/generated-types";
import { type Nullable } from "@constellatio/utility-types";
import { type GetServerSideProps } from "next";
import { type SSRConfig } from "next-i18next";
import React from "react";

import { defaultLocale } from "../../next.config.mjs";

export type IProfilePageProps = { 
  readonly allMainCategory: Array<Nullable<IGenMainCategory>>;
  readonly data: string;
};

type ServerSidePropsResult = SSRConfig;

export const getServerSideProps: GetServerSideProps<ServerSidePropsResult> = async (context) =>
{
  const commonProps = await getCommonProps({ locale: context.locale || defaultLocale });
  const trpcHelpers = await getTrpcServerSideHelpers(context);
  console.time("prefetch");
  await trpcHelpers.users.getUserDetails.prefetch();
  console.timeEnd("prefetch");

  return {
    props: {
      ...commonProps,
      trpcState: trpcHelpers.dehydrate(),
    },
  };
};

const Page: NextPageWithLayout<ServerSidePropsResult> = () =>
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
