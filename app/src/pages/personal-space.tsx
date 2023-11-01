import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import PersonalSpacePage from "@/components/pages/personalSpacePage/PersonalSpacePage";

import { type NextPage } from "next";

const Page: NextPage = () =>
{
  return (
    <>
      <PageHead pageTitle="Persönlicher Bereich"/>
      <Layout>
        <PersonalSpacePage/>
      </Layout>
    </>
  );
};

export default Page;
