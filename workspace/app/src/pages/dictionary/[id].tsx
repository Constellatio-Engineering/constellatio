import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DetailsPage from "@/components/pages/DetailsPage/DetailsPage";
import { type NextPageWithLayout } from "@/pages/_app";

import { getAllArticles } from "@constellatio/cms/content/getAllArticles";
import { getArticleById } from "@constellatio/cms/content/getArticleById";
import { type ArticleWithNextAndPreviousArticleId, getArticlesWithNextAndPreviousArticleId } from "@constellatio/cms/utils/articles";
import { type GetStaticPaths, type GetStaticPathsResult, type GetStaticProps } from "next";

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
  readonly article: ArticleWithNextAndPreviousArticleId;
};

export const getStaticProps: GetStaticProps<GetArticleDetailPagePropsResult, Params> = async ({ params }) =>
{
  if(!params?.id || params.id === "null")
  {
    return {
      notFound: true,
      revalidate: 5
    };
  }

  const { article } = await getArticleById({ id: params?.id });

  if(!article)
  {
    return {
      notFound: true,
      revalidate: 5
    };
  }

  const allArticles = await getAllArticles();
  const articlesWithNextAndPreviousArticleId = getArticlesWithNextAndPreviousArticleId(allArticles);
  const articleFromAllArticle = articlesWithNextAndPreviousArticleId.find((article) => article.id === params?.id);

  return {
    props: {
      article: ({
        ...article,
        nextArticleId: articleFromAllArticle?.nextArticleId ?? null,
        previousArticleId: articleFromAllArticle?.previousArticleId ?? null
      })
    },
    revalidate: 10
  };
};

const Page: NextPageWithLayout<GetArticleDetailPagePropsResult> = ({ article }) =>
{
  console.log(article);

  return (
    <>
      <PageHead pageTitle={article?.title || "Artikel ohne Titel"}/>
      <DetailsPage content={article} variant="dictionary"/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
