// import { DragDropGame } from "@/components/organisms/DragDropGame/DragDropGame";
import { getProps } from "@/services/content/getProps";

// import { Box } from "@mantine/core";
import { type GetStaticProps } from "next";
import React from "react";

import CategoryTab from "../components/categoryTab/CategoryTab";
// import { CivilLawIcon } from "../components/Icons/CivilLawIcon";

const NextPage = (props: any): any => 
{
  console.log({ ...props?.Page });
  return (
    <div>
      {/* <Box w={700}><DragDropGame game={props?.Page.components[3].game}/></Box> */}
      {props?.Page.components.map((component: any, index: number) => (
        <div key={index}>
          {component.categories?.map((category: any, index: number) => ( 
            <React.Fragment key={index}>
              <CategoryTab {...category} itemsNumber={20} selected={index === 0}/>
            </React.Fragment>
          ))}
          
        </div>
      ))}
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
