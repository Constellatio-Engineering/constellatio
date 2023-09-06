import { Layout } from "@/components/layouts/Layout";
import CasePage from "@/components/pages/CasePage/CasePage";
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
    }
  };

};

const NextPage: FunctionComponent<ICasePageProps> = ({ legalCase }) => 
{
  const content = props?.case?.fullTextTasks?.json?.content?.filter((contentItem: { content: { text: string }[]; type: string }) => contentItem?.type === "heading");
  const facts = props?.case?.facts?.richTextContent;
  return (
    <Layout>
      <CasePage {...legalCase}/>
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
