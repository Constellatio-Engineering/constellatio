import getCasesOverviewProps, { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";

import { type GetStaticProps } from "next";
import React, { type FunctionComponent } from "react";

export const getStaticProps: GetStaticProps<
Awaited<ReturnType<typeof getCasesOverviewProps>>
> = async () =>
{
  const resPage = await getCasesOverviewProps();

  return {
    props: {
      ...(resPage || null),
    },
    revalidate: 1,
  };
};

const NextPage: FunctionComponent<ICasesOverviewProps> = (props) =>
{
  console.log(props);

  if(!props)
  {
    return <div>Page Props not found</div>;
  }

  return (
    <div>
      Hello World Test Page
    </div>
  );
};

export default NextPage;
