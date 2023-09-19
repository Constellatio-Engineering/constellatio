import { Layout } from "@/components/layouts/Layout";
import DetailsPage from "@/components/pages/CasePage/CasePage";
import { getArticleById } from "@/services/content/getArticleById";
import { type IGenArticle } from "@/services/graphql/__generated/sdk";

import type { GetStaticProps, GetStaticPaths } from "next";
import { type FunctionComponent } from "react";

interface ICasePageProps 
{
  readonly legalArticle: IGenArticle;
}

export const getStaticProps: GetStaticProps = async ({ params }) => 
{
  const id = Array.isArray(params?.id) ? (params?.id[0] ?? "") : (params?.id ?? "");
  const resArticle = await getArticleById({ id });
  return {
    props: {
      id,
      legalArticle: resArticle?.Article ?? null
    }
  };

};

const NextPage: FunctionComponent<ICasePageProps> = ({ legalArticle }) => 
{
  // console.log({ legalArticle });
  
  return (
    <Layout>
      <DetailsPage content={legalArticle} variant="dictionary"/>
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
