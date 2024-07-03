import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DetailsPage from "@/components/pages/DetailsPage/DetailsPage";
import { type NextPageWithLayout } from "@/pages/_app";
import getAllCases from "@/services/content/getAllCases";
import { getCaseById, type FullLegalCase } from "@/services/content/getCaseById";
import { type TDragAndDropGameOptionType } from "@/stores/dragDropGame.store";
import { shuffleArray } from "@/utils/array";

import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next";

import { type ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery
{
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () =>
{
  const allCases = await getAllCases();
  const paths: GetStaticPathsResult<Params>["paths"] = allCases
    .filter(legalCase => Boolean(legalCase.id))
    .map((legalCase) => ({
      params: {
        id: legalCase.id!,
      }
    }));

  return {
    fallback: true,
    paths
  };
};

type GetCaseDetailPagePropsResult = {
  readonly legalCase: FullLegalCase;
};

export const getStaticProps: GetStaticProps<GetCaseDetailPagePropsResult, Params> = async ({ params }) =>
{
  const { legalCase } = await getCaseById({ id: params?.id });

  if(!legalCase)
  {
    return {
      notFound: true,
      revalidate: false
    };
  }

  const fullTextTaskJsonContent = legalCase.fullTextTasks?.json?.content;

  if(fullTextTaskJsonContent != null)
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fullTextTaskJsonContent as any[]).forEach((content, i) =>
    {
      legalCase.fullTextTasks!.json.content[i] = {
        ...content,
        id: String(i)
      };
    });
  }

  legalCase.fullTextTasks?.connections?.forEach((connection) =>
  {
    if(connection?.__typename === "DragNDropGame")
    {
      const options = connection.game.options as Array<Omit<TDragAndDropGameOptionType, "originalIndex">>;
      const correctAnswers = options.filter((option) => option.correctAnswer);

      connection.game.options = options.map((option) => ({
        ...option,
        originalIndex: correctAnswers.findIndex((correctAnswer) => correctAnswer.id === option.id),
      }) satisfies TDragAndDropGameOptionType);
      connection.game.options = shuffleArray<TDragAndDropGameOptionType>(connection.game.options);
    }
  });

  return {
    props: { legalCase },
    revalidate: 10
  };
};

const Page: NextPageWithLayout<GetCaseDetailPagePropsResult> = ({ legalCase }) =>
{
  return (
    <>
      <PageHead pageTitle={legalCase?.title || "Fall ohne Titel"}/>
      <DetailsPage variant="case" content={legalCase}/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
