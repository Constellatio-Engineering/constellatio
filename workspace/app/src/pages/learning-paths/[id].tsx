import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import ErrorPage from "@/components/pages/errorPage/ErrorPage";
import { LearningPathDetailsPage } from "@/components/pages/learningPathDetails/LearningPathDetails";
import { type NextPageWithLayout } from "@/pages/_app";

import { getAllLearningPaths } from "@constellatio/cms/content/getAllLearningPaths";
import { caisySDK } from "@constellatio/cms/sdk";
import { getLearningPathExtraData, type LearningPathWithExtraData } from "@constellatio/cms/utils/learningPaths";
import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";

import { type ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery
{
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () =>
{
  const allLearningPaths = await getAllLearningPaths();

  const paths: GetStaticPathsResult<Params>["paths"] = allLearningPaths
    .filter(learningPath => Boolean(learningPath.id))
    .map((learningPath) => ({
      params: {
        id: learningPath.id!,
      }
    }));

  return {
    fallback: true,
    paths
  };
};

export type GetLearningPathDetailPagePropsResult = {
  readonly learningPath: LearningPathWithExtraData;
};

export const getStaticProps: GetStaticProps<GetLearningPathDetailPagePropsResult, Params> = async ({ params }) =>
{
  if(!params?.id || params.id === "null")
  {
    return {
      notFound: true,
      revalidate: 5
    };
  }

  const { LearningPath } = await caisySDK.getLearningPathById({ id: params.id });

  if(!LearningPath)
  {
    return {
      notFound: true,
      revalidate: 5
    };
  }

  const learningPath = getLearningPathExtraData(LearningPath);

  return {
    props: { learningPath },
    revalidate: 10
  };
};

const Page: NextPageWithLayout<GetLearningPathDetailPagePropsResult> = ({ learningPath }) =>
{
  if(!learningPath)
  {
    // Don't know why this happens but sometimes the learningPath is null even though the staticPaths and staticProps are working correctly.
    return <ErrorPage title={"learningPath was null"}/>;
  }

  return (
    <>
      <PageHead pageTitle={learningPath.title || "Lernpfad ohne Titel"}/>
      <LearningPathDetailsPage {...learningPath}/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
