import { getProps } from "@/services/content/getProps";

import { GetStaticPaths, type GetStaticProps } from "next";
import React from "react";

import CategoryTab from "../components/categoryTab/CategoryTab";
import { CivilLawIcon } from "../components/Icons/CivilLawIcon";

const NextPage = (props: any): any => 
{
  console.log(props);
  return (
    <div>NextPage
      {/* <Box w={700}><DragDropGame game={props?.Page.components[3].game}/></Box> */}
      <CategoryTab title="Category Tab" icon={<CivilLawIcon/>} itemsNumber={3}/>
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
