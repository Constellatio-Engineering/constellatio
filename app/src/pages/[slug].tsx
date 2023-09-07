import { getProps } from "@/services/content/getProps";

import { type GetStaticPaths, type GetStaticProps } from "next";
import React, { type FunctionComponent } from "react";

export const getStaticProps: GetStaticProps<Awaited<ReturnType<typeof getProps>>> = async ({ params }) => 
{
  let slug = params?.slug as string;

  if(!slug) 
  {
    slug = "";
  }

  const resPage = await getProps({ slug });

  return {
    props: {
      ...(resPage || null),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
{
  return { fallback: true, paths: [] };
};

const NextPage: FunctionComponent<{readonly Page: null}> = ({ Page }) =>
{
  console.log(Page);
  return <div><p>Hello World</p></div>;
};

export default NextPage;
