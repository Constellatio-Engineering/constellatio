import { getProps } from "@/services/content/getProps";

import { type GetStaticPaths, type GetStaticProps, NextPage } from "next";
import React from "react";

const NextPage: NextPage<Awaited<ReturnType<typeof getProps>>> = ({ Page }) => 
{
  console.log(Page);
  return <div><p>Hello World</p></div>;
};

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

export const getStaticPaths: GetStaticPaths = async () => 
{
  return { fallback: true, paths: [] };
};

export default NextPage;
