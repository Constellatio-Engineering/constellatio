import TableCell from "@/components/atoms/tableCell/TabelCell";
import { getProps } from "@/services/content/getProps";

import { type GetStaticProps } from "next";
import React from "react";

const NextPage = (props: any): any => 
{
  console.log({ ...props?.Page });
  return (
    <div>
      <TableCell/>
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
