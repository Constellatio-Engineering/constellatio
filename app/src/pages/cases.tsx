import { getAllCases, type getAllCasesResult } from "@/services/content/getAllCases";

import { type GetStaticProps } from "next";
import React, { type FunctionComponent } from "react";

export const getStaticProps: GetStaticProps<getAllCasesResult, Record<string, never>> = async () =>
{
  const resAllCases = await getAllCases();

  return {
    props: {
      Cases: resAllCases?.Cases ?? null,
    },
    revalidate: 1,
  };
  
};

const NextPage: FunctionComponent<getAllCasesResult> = ({ Cases }) =>
{
  const CasesList = Cases?.allCase?.edges || null;
  console.log({ CasesList });

  const overviewPage = null;

  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
};

export default NextPage;
