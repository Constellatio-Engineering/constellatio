import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import ForumOverviewPage from "@/components/pages/forumOverviewPage/ForumOverviewPage";
import { type NextPageWithLayout } from "@/pages/_app";
import { getCommonProps } from "@/utils/commonProps";

import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import { defaultLocale } from "../../../next.config.mjs";

export const getStaticProps: GetStaticProps = async ({ locale = defaultLocale }) =>
{
  const commonProps = await getCommonProps({ locale });

  return {
    props: commonProps,
  };
};

const Page: NextPageWithLayout = () =>
{
  const { t } = useTranslation();

  useEffect(() =>
  {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  return (
    <>
      <PageHead pageTitle="Forum"/>
      <ForumOverviewPage/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
