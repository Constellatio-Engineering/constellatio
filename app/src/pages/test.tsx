import { getProps, type GetPropsResult } from "@/services/content/getProps";

import { type GetStaticProps } from "next";
import React, { type FunctionComponent } from "react";

import CategoryTab from "../components/molecules/categoryTab/CategoryTab";

export const getStaticProps: GetStaticProps<GetPropsResult, Record<string, never>> = async () =>
{
  const resPage = await getProps({ slug: "cases" });

  return {
    props: {
      ...(resPage || null),
    },
    revalidate: 1,
  };
};

const NextPage: FunctionComponent<GetPropsResult> = ({ Page }) =>
{
  console.log(Page);

  if(!Page)
  {
    return <div>Page Props not found</div>;
  }

  return (
    <div>
      {Page.components?.map((component, index) => (
        <div key={index}>
          {/* TODO: Delete this */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {component?.categories?.map((category, index) => (
            <React.Fragment key={index}>
              <CategoryTab {...category} itemsNumber={20} selected={index === 0}/>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NextPage;
