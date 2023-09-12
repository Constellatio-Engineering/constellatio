import { Layout } from "@/components/layouts/Layout";
import DetailsPage from "@/components/pages/CasePage/CasePage";
import { getCaseById } from "@/services/content/getCaseById";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import type { GetStaticProps, GetStaticPaths } from "next";
import { type FunctionComponent } from "react";

interface ICasePageProps 
{
  readonly legalCase: IGenCase;
}

export const getStaticProps: GetStaticProps = async ({ params }) => 
{
  const id = Array.isArray(params?.slug) ? (params?.slug[0] ?? "") : (params?.slug ?? "");
  const resCase = await getCaseById({ id });
  return {
    props: {
      id,
      legalCase: resCase?.Case ?? null
    }
  };

};

const NextPage: FunctionComponent<ICasePageProps> = ({ legalCase }) => 
{
  return (
    <Layout>
      <DetailsPage {...legalCase} variant="dictionary"/>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => 
{
  return {
    fallback: true,
    paths: []
  };
};

export default NextPage;
