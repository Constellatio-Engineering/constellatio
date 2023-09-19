import { Layout } from "@/components/layouts/Layout";
import { env } from "@/env.mjs";
import { getCommonProps } from "@/utils/commonProps";
import { type CaseSearchIndexItem, searchIndices } from "@/utils/search";

import { useQuery } from "@tanstack/react-query";
import { MeiliSearch } from "meilisearch";
import { type GetServerSideProps } from "next";
import { type SSRConfig } from "next-i18next";
import { type FunctionComponent, useEffect, useState } from "react";

import { defaultLocale } from "../../next.config.mjs";

type ServerSidePropsResult = SSRConfig;

export const getServerSideProps: GetServerSideProps<ServerSidePropsResult> = async ({ locale = defaultLocale }) =>
{
  const commonProps = await getCommonProps({ locale });

  return {
    props: {
      ...commonProps,
      test: "test",
    },
  };
};

const meiliSearch = new MeiliSearch({
  apiKey: "super-secret-meili-master-key",
  host: env.NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL
});

const Home: FunctionComponent<ServerSidePropsResult> = () =>
{
  const [input, setInput] = useState<string>("");
  const hasInput = input.length > 0;

  const { data: casesSearchResult = [], isLoading } = useQuery({
    enabled: hasInput,
    keepPreviousData: true,
    queryFn: async () =>
    {
      const searchResult = await meiliSearch.index(searchIndices.cases).search<CaseSearchIndexItem>(input);
      return searchResult.hits;
    },
    queryKey: ["cases", input],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });

  return (
    <Layout>
      <div style={{ padding: 100 }}>
        <h1>Search</h1>
        <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
        {(hasInput && isLoading) && <p>Loading...</p>}
        {hasInput && casesSearchResult.map(result => (
          <div key={result.id}>
            <p>{result.title}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
