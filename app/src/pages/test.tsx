import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import PageHeader from "@/components/organisms/pageHeader/PageHeader";
import { getProps, type GetPropsResult } from "@/services/content/getProps";
import { IGenPageHeader, Maybe, type IGenPage } from "@/services/graphql/__generated/sdk";

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
  const pageComponents = Page?.components;
  return (
    <div>
      <Header/>
      {pageComponents?.map((component: Maybe<IGenPageHeader>, index: number) => 
      {
        switch (component?.__typename) 
        {
          case "PageHeader":
            return <PageHeader key={index} {...component}/>;
          default:
            return null;

        }
      })}
      <Footer/>
    </div>
  );
};

export default NextPage;

// component?.__typename === "PageHeader" ? (
//   <PageHeader key={index} {...component}/>
// ) : null)
