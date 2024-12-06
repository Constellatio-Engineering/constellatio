import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import { LearningPathDetailsPage } from "@/components/pages/learningPathDetails/LearningPathDetails";
import { type NextPageWithLayout } from "@/pages/_app";

import { getAllLearningPaths } from "@constellatio/cms/content/getAllLearningPaths";
import { type IGenLearningPath } from "@constellatio/cms/generated-types";
import { caisySDK } from "@constellatio/cms/sdk";
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

type GetLearningPathDetailPagePropsResult = {
  readonly learningPath: IGenLearningPath;
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

  const { LearningPath } = await caisySDK.getLearningPathById({ id: "4f9adf51-1500-4f19-b59b-0c79c10ebde3" });

  if(!LearningPath)
  {
    return {
      notFound: true,
      revalidate: 5
    };
  }

  return {
    props: { learningPath: LearningPath },
    revalidate: 10
  };
};

const Page: NextPageWithLayout<GetLearningPathDetailPagePropsResult> = ({ learningPath }) =>
{
  return (
    <>
      <PageHead pageTitle={learningPath.title || "Lernpfad ohne Titel"}/>
      <LearningPathDetailsPage {...learningPath}/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
