import TableCell from "@/components/atoms/tableCell/TableCell";
import { getProps } from "@/services/content/getProps";

import { type GetStaticProps } from "next";
import React, { type FunctionComponent } from "react";

const NextPage: FunctionComponent = (props: any) =>
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
