import { Layout } from "@/components/layouts/Layout";
import ProfilePage from "@/components/pages/profilePage/ProfilePage";

import { type GetStaticProps } from "next/types";
import React, { type FunctionComponent } from "react";

type IProfilePageProps = { 
  readonly data: string;
};

export const getStaticProps: GetStaticProps<IProfilePageProps> = () =>
{
  return {
    props: {
      data: "data"
    }
  };
};

const Page: FunctionComponent<IProfilePageProps> = ({ data }) =>
{
  console.log({ data });
  return (
    <Layout>
      <ProfilePage/>
    </Layout>
  );
};

export default Page;
