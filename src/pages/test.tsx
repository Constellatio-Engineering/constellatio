import { DragDropGame } from "@/components/organisms/DragDropGame/DragDropGame";
import { getProps } from "@/services/content/getProps";
import { Box } from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

const NextPage = (props) => {
  console.log(props);
  return <div>NextPage
    <Box w={700}><DragDropGame game={props?.Page.components[4].game}/></Box>
  </div>;
};

export const getStaticProps: GetStaticProps = async () => {
  const resPage = await getProps({ slug: "cases" });

  return {
    revalidate: 1,
    props: {
      ...(resPage || null),
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true,
//   };
// };

export default NextPage;
