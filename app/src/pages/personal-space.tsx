import { Layout } from "@/components/layouts/Layout";
import PersonalSpacePage from "@/components/pages/personalSpacePage/PersonalSpacePage";

import React, { type FunctionComponent } from "react";

const Page: FunctionComponent = () =>
{
  return (
    <Layout>
      <PersonalSpacePage/>
    </Layout>
  );
};

export default Page;
