// import { DragDropGame } from "@/components/organisms/DragDropGame/DragDropGame";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import PageContent from "@/components/organisms/pageHeader/PageHeader";
import { getProps } from "@/services/content/getProps";
// import { type IGenPageContent, type IGenPage_Components, type Maybe } from "@/services/graphql/__generated/sdk";

import { type GetStaticProps } from "next";
import React from "react";

const NextPage = (props: any): any => 
{
  const pageComponents = props?.Page?.components;
  
  return (
    <div>
      <Header/>
      {pageComponents?.map((component: any, index: number) => 
      {
        switch (component?.__typename) 
        {
          case "PageHeader":
            return <PageContent key={index} {...component}/>;
          default:
            return null;

        }
      })}
      <Footer/>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => 
{
  const resPage = await getProps({ slug: "cases" });

  return {
    props: {
      ...(resPage || null),
    },
    revalidate: 1,
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true,
//   };
// };

export default NextPage;

// component?.__typename === "PageHeader" ? (
//   <PageHeader key={index} {...component}/>
// ) : null)
