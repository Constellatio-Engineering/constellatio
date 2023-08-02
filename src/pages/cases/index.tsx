import { Layout } from "@/components/layouts/Layout";
import { IGenCasesQuery } from "@/services/graphql/__generated/sdk";
import { caisySDK } from "@/services/graphql/getSdk";
import { GetStaticProps } from "next";
import Link from "next/link";

export default function Cases({ cases }: { cases: IGenCasesQuery }) {
  return (
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
}

export const getStaticProps: GetStaticProps = async () => {
  const cases = await caisySDK.Cases();

  return {
    props: {
      cases,
    },
  };
};
