import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DetailsPage from "@/components/pages/DetailsPage/DetailsPage";
import getAllArticles from "@/services/content/getAllArticles";
import { getArticleById } from "@/services/content/getArticleById";
import { type IGenArticle } from "@/services/graphql/__generated/sdk";

import { type GetStaticPathsResult, type GetStaticProps, type GetStaticPaths } from "next";
import { type FunctionComponent } from "react";

import { type ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery
{
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () =>
{
  const allArticles = await getAllArticles();
  const paths: GetStaticPathsResult<Params>["paths"] = allArticles
    .filter(article => Boolean(article.id))
    .map((article) => ({
      params: {
        id: article.id!,
      }
    }));

  return {
    fallback: true,
    paths
  };
};

type GetArticleDetailPagePropsResult = {
  readonly article: IGenArticle;
};

export const getStaticProps: GetStaticProps<GetArticleDetailPagePropsResult, Params> = async ({ params }) =>
{
  const { article } = await getArticleById({ id: params?.id });

  if(!article)
  {
    return {
      notFound: true,
      revalidate: false
    };
  }

  return {
    props: { article },
    revalidate: 10
  };
};

const NextPage: FunctionComponent<GetArticleDetailPagePropsResult> = ({ article }) =>
{
  return (
    <>
      <PageHead pageTitle={article?.title || "Artikel ohne Titel"}/>
      <Layout>
        <DetailsPage content={article} variant="dictionary"/>
      </Layout>
    </>
  );
};

export default NextPage;
