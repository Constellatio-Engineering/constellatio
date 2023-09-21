import { Layout } from "@/components/layouts/Layout";
import DetailsPage from "@/components/pages/DetailsPage/DetailsPage";
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
  const id = Array.isArray(params?.id) ? (params?.id[0] ?? "") : (params?.id ?? "");
  const resCase = await getCaseById({ id });
  return {
    props: {
      id,
      legalCase: resCase?.Case ?? null
    }, 
    revalidate: 10
  };

};

const NextPage: FunctionComponent<ICasePageProps> = ({ legalCase }) => 
{
  return (
    <Layout>
      <DetailsPage variant="case" content={legalCase}/>
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
