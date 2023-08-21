import { Layout } from "@/components/layouts/Layout";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { DragDropGame } from "@/components/organisms/DragDropGame/DragDropGame";
import { type IGenCaseByIdQuery, IGenCasesQuery } from "@/services/graphql/__generated/sdk";
import { caisySDK } from "@/services/graphql/getSdk";

import { Flex, Title } from "@mantine/core";
import { type GetStaticPaths, type GetStaticProps } from "next";

export default function Cases({ caseById }: { readonly caseById: IGenCaseByIdQuery }) 
{
  console.log(caseById);
  return (
    <Layout>
      <header className="py-16 bg-[#C7D3FB] bg-[url('/images/grid-pattern.svg')] bg-cover bg-center">
        <div className="container mx-auto grid grid-cols-2 items-center justify-end">
          <Title>{caseById.Case?.title}</Title>
          <div className="min-w-[400px] justify-self-end rounded-lg bg-[#5B74C7]">
            <div className="p-4 text-white">32 VIEWS</div>
            <div className="bg-white rounded-lg flex flex-col">
              <div className="flex space-x-8 px-4 py-3">
                <div className="flex flex-col">
                  <p className="text-sm">LEGAL AREA</p>
                  <p className="text-lg font-semibold">{caseById.Case?.legalArea?.title}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">TOPIC</p>
                  <p className="text-lg font-semibold">{caseById.Case?.topic?.title}</p>
                </div>
              </div>
              <hr className="m-0 w-full border-0 h-px bg-neutral-200"/>
              <div className="flex space-x-8 px-4 py-3">
                <div className="flex flex-col">
                  <p className="text-sm">LEGAL AREA</p>
                  <p className="text-lg font-semibold">{caseById.Case?.legalArea?.title}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">TOPIC</p>
                  <p className="text-lg font-semibold">{caseById.Case?.topic?.title}</p>
                </div>
              </div>
              <hr className="m-0 w-full border-0 h-px bg-neutral-200"/>
              <div className="flex space-x-8 px-4 py-3">
                <div className="flex flex-col">
                  <p className="text-sm">LEGAL AREA</p>
                  <p className="text-lg font-semibold">{caseById.Case?.legalArea?.title}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">TOPIC</p>
                  <p className="text-lg font-semibold">{caseById.Case?.topic?.title}</p>
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
            <Richtext richTextContent={caseById.Case?.facts}/>
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
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => 
{
  const cases = await caisySDK.Cases();

  return {
    fallback: "blocking",
    paths: cases.allCase?.edges!.map((edge) => ({
      params: { id: edge?.node?.id },
    })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => 
{
  const caseById = await caisySDK.CaseById({ id: params!.id as string });

  return {
    props: {
      caseById,
    },
  };
};
