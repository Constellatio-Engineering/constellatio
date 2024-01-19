import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import ForumOverviewPage from "@/components/pages/forumOverviewPage/ForumOverviewPage";
import { type NextPageWithLayout } from "@/pages/_app";

import React from "react";

const Page: NextPageWithLayout = () =>
{

  return (
    <>
      <PageHead pageTitle="Forum"/>
      <ForumOverviewPage/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
