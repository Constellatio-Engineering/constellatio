import { Layout } from "@/components/layouts/Layout";
import { type IGenCasesQuery } from "@/services/graphql/__generated/sdk";
import { caisySDK } from "@/services/graphql/getSdk";

import { type GetStaticProps } from "next";
import Link from "next/link";
import { type FunctionComponent } from "react";

export const getStaticProps: GetStaticProps = async () =>
{
  const cases = await caisySDK.Cases();

  return {
    props: {
      cases: cases ?? [],
    },
  };
};

type Props = {
  readonly cases: IGenCasesQuery;
};

const Cases: FunctionComponent<Props> = ({ cases }) => (
  <Layout>
    <ul>
      {cases.allCase?.edges?.map((edge) => (
        <li key={edge?.node?.id}>
          <Link href={`/cases/${edge?.node?.id}`}>{edge?.node?.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export default Cases;
