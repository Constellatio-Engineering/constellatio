import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import PersonalSpacePage from "@/components/pages/personalSpacePage/PersonalSpacePage";
import { type NextPageWithLayout } from "@/pages/_app";

import React from "react";

const Page: NextPageWithLayout = () =>
{
  return (
    <>
      <PageHead pageTitle="Persönlicher Bereich"/>
      <PersonalSpacePage/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
