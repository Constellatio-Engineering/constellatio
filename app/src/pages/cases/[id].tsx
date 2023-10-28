import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/pageHead/PageHead";
import DetailsPage from "@/components/pages/DetailsPage/DetailsPage";
import getAllCases from "@/services/content/getAllCases";
import { getCaseById } from "@/services/content/getCaseById";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next";
import { type FunctionComponent } from "react";

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
  readonly legalCase: IGenCase;
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

  return {
    props: { legalCase },
    revalidate: 10
  };

};

const NextPage: FunctionComponent<GetCaseDetailPagePropsResult> = ({ legalCase }) =>
{
  return (
    <>
      <PageHead pageTitle={legalCase.title || "Fälle"}/>
      <Layout>
        <DetailsPage variant="case" content={legalCase}/>
      </Layout>
    </>
  );
};

export default NextPage;
