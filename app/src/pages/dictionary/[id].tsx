import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DetailsPage from "@/components/pages/DetailsPage/DetailsPage";
import { type NextPageWithLayout } from "@/pages/_app";
import getAllArticles from "@/services/content/getAllArticles";
import { getArticleById } from "@/services/content/getArticleById";
import getArticlesOverviewProps, { type ArticleWithNextAndPreviousArticleId } from "@/services/content/getArticlesOverviewProps";

import { type GetStaticPathsResult, type GetStaticProps, type GetStaticPaths } from "next";

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
  const { article } = await getArticleById({ id: params?.id });
  const { allArticles } = await getArticlesOverviewProps();
  const articleFromAllArticle = allArticles.find((article) => article.id === params?.id);

  if(!article)
  {
    return {
      notFound: true,
      revalidate: false
    };
  }

  const fullTextTaskJsonContent = article.fullTextTasks?.json?.content;

  if(fullTextTaskJsonContent != null)
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fullTextTaskJsonContent as any[]).forEach((content, i) =>
    {
      article.fullTextTasks!.json.content[i] = {
        ...content,
        id: String(i)
      };
    });
  }

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
  return (
    <>
      <PageHead pageTitle={article?.title || "Artikel ohne Titel"}/>
      <DetailsPage content={article} variant="dictionary"/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
