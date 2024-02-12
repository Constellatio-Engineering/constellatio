import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DetailsPage from "@/components/pages/DetailsPage/DetailsPage";
import { ForumQuestionDetailPage } from "@/components/pages/forumQuestionDetailPage/ForumQuestionDetailPage";
import { db } from "@/db/connection";
import { type NextPageWithLayout } from "@/pages/_app";
import { type Question } from "@/server/api/routers/forum.router";
import { getCaseById } from "@/services/content/getCaseById";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import { useRouter } from "next/router";

/* import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next";

import { type ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery
{
  slug: [string, string];
}

export const getStaticPaths: GetStaticPaths<Params> = async () =>
{
  const allQuestions = await db.query.forumQuestions.findMany();
  const paths: GetStaticPathsResult<Params>["paths"] = allQuestions
    .map((question) => ({
      params: {
        slug: [question.slug, question.id],
      }
    }));

  return {
    fallback: true,
    paths
  };
};

type GetQuestionDetailPagePropsResult = {
  readonly question: Question;
};

export const getStaticProps: GetStaticProps<GetQuestionDetailPagePropsResult, Params> = async ({ params }) =>
{
  const { legalCase } = await getCaseById({ id: params?.id });

  if(!legalCase)
  {
    return {
      notFound: true,
      revalidate: false
    };
  }

  return {
    props: { legalCase },
    revalidate: 10
  };
};*/

const Page: NextPageWithLayout = () =>
{
  const router = useRouter();
  const questionId = router.query?.slug?.[1];

  if(!questionId)
  {
    return <p>QuestionId missing</p>;
  }

  return (
    <>
      <PageHead pageTitle={"Frage ohne Titel"}/>
      <ForumQuestionDetailPage questionId={questionId}/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
