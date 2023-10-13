import { Layout } from "@/components/layouts/Layout";
import PersonalSpacePage from "@/components/pages/personalSpacePage/PersonalSpacePage";
import getPopularSearches from "@/services/content/getPopularSearches";

import { type NextPage, type GetStaticProps } from "next";
import React, { type FunctionComponent } from "react";

type TPageProps = Awaited<ReturnType<typeof getPopularSearches>>;

export const getStaticProps: GetStaticProps<TPageProps> = async () => 
{
  const resPopularSearches = await getPopularSearches();

  return {
    props: resPopularSearches,
    revalidate: 10,
  };
}; 

const Page: NextPage<TPageProps> = (props) =>
{
  // console.log(props);

  return (
    <Layout>
      <PersonalSpacePage/>
    </Layout>
  );
};

export default Page;
