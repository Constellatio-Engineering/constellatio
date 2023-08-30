import { Layout } from "@/components/layouts/Layout";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { DragDropGame } from "@/components/organisms/DragDropGame/DragDropGame";
import { type IGenCaseByIdQuery } from "@/services/graphql/__generated/sdk";
import { caisySDK } from "@/services/graphql/getSdk";

import { Title } from "@mantine/core";
import { type GetStaticPaths, type GetStaticProps, type GetStaticPathsResult } from "next";
import { type FunctionComponent } from "react";

import { type ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery
{
  id: string | undefined;
}

export const getStaticPaths: GetStaticPaths<Params> = () =>
{
  // TODO: Remove this once we have real data from caisy
  return {
    fallback: true,
    paths: [],
  };

  /* const cases = await caisySDK.Cases();
  const allEdges = cases.allCase?.edges;

  if(!allEdges || allEdges.length === 0)
  {
    return {
      fallback: false,
      paths: []
    };
  }

  const paths: GetStaticPathsResult<Params>["paths"] = allEdges
    .map(edge => edge?.node?.id)
    .filter(Boolean)
    .map(edgeIid => ({
      params: {
        id: edgeIid
      },
    }));

  return {
    fallback: true,
    paths
  };*/
};

// this is the type of the props that getStaticProps will return
export interface GetCaseDetailPagePropsResult 
{
  readonly caseById: IGenCaseByIdQuery; 
}

export const getStaticProps: GetStaticProps<GetCaseDetailPagePropsResult, Params> = ({ params }) =>
{
  // TODO: Remove this once we have real data from caisy
  return {
    props: {
      caseById: {
        Case: {
          __typename: "Case",
          facts: undefined,
          id: "dummy-id",
          legalArea: undefined,
          title: "Dummy title",
        }
      },
    },
    revalidate: 1,
  };

  /* const caseId = params?.id;

  if(caseId == null)
  {
    throw new Error("caseId is null. How did this happen?");
  }

  const caseById = await caisySDK.CaseById({ id: caseId });

  return {
    props: {
      caseById,
    },
    revalidate: 1,
  };*/
};

const CaseDetailPage: FunctionComponent<GetCaseDetailPagePropsResult> = ({ caseById }) =>
{
  console.log(caseById);
  return (
    <Layout>
      <header className="py-16 bg-[#C7D3FB] bg-[url('/images/grid-pattern.svg')] bg-cover bg-center">
        <div className="container mx-auto grid grid-cols-2 items-center justify-end">
          {/* <Title>{caseById.Case?.title}</Title>*/}
          <Title>TODO: Render Case Title</Title>
          <div className="min-w-[400px] justify-self-end rounded-lg bg-[#5B74C7]">
            <div className="p-4 text-white">32 VIEWS</div>
            <div className="bg-white rounded-lg flex flex-col">
              <div className="flex space-x-8 px-4 py-3">
                <div className="flex flex-col">
                  <p className="text-sm">LEGAL AREA</p>
                  {/* <p className="text-lg font-semibold">{caseById.Case?.legalArea?.title}</p>*/}
                  <p className="text-lg font-semibold">TODO: Display legalArea title</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">TOPIC</p>
                  {/* <p className="text-lg font-semibold">{caseById.Case?.topic?.title}</p>*/}
                  <p className="text-lg font-semibold">TODO: Display topic title</p>
                </div>
              </div>
              <hr className="m-0 w-full border-0 h-px bg-neutral-200"/>
              <div className="flex space-x-8 px-4 py-3">
                <div className="flex flex-col">
                  <p className="text-sm">LEGAL AREA</p>
                  {/* <p className="text-lg font-semibold">{caseById.Case?.legalArea?.title}</p>*/}
                  <p className="text-lg font-semibold">TODO: Display legalArea title</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">TOPIC</p>
                  {/* <p className="text-lg font-semibold">{caseById.Case?.topic?.title}</p>*/}
                  <p className="text-lg font-semibold">TODO: Display topic title</p>
                </div>
              </div>
              <hr className="m-0 w-full border-0 h-px bg-neutral-200"/>
              <div className="flex space-x-8 px-4 py-3">
                <div className="flex flex-col">
                  <p className="text-sm">LEGAL AREA</p>
                  {/* <p className="text-lg font-semibold">{caseById.Case?.legalArea?.title}</p>*/}
                  <p className="text-lg font-semibold">TODO: Display legalArea title</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">TOPIC</p>
                  {/* <p className="text-lg font-semibold">{caseById.Case?.topic?.title}</p>*/}
                  <p className="text-lg font-semibold">TODO: Display topic title</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="pt-16 pb-24">
        <div className="container mx-auto grid grid-cols-2">
          <div>
            <Title size={32} mb={24}>
              Facts
            </Title>
            <p>TODO: Render Case facts and sections</p>
            {/* <Richtext richTextContent={caseById.Case?.facts}/>
            {caseById.Case?.sections?.map((edge, index) =>
            {
              if(index > 0) { return null; }

              return (
                <div key={edge?.id}>
                  <Title size={24}>{edge?.title}</Title>
                  <Richtext richTextContent={edge?.content}/>
                  <DragDropGame/>
                </div>
              );
            })}*/}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CaseDetailPage;

