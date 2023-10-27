import { Layout } from "@/components/layouts/Layout";
import PersonalSpacePage from "@/components/pages/personalSpacePage/PersonalSpacePage";

import { type NextPage } from "next";

const Page: NextPage = () =>
{
  return (
    <Layout>
      <PersonalSpacePage/>
    </Layout>
  );
};

export default Page;
