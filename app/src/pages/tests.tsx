
import { Layout } from "@/components/layouts/Layout";
import TestsPage from "@/components/testsPage/TestsPage";

import React, { type FunctionComponent } from "react";

const Page: FunctionComponent = () =>
{
  return (
    <Layout>
      <TestsPage/>
    </Layout>
  );
};

export default Page;
