import { Layout } from "@/components/layouts/Layout";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";
import { getCommonProps } from "@/utils/commonProps";
import { type CaseSearchIndexItem, searchIndices, type UploadSearchIndexItem } from "@/utils/search";

import { useQuery } from "@tanstack/react-query";
import { MeiliSearch } from "meilisearch";
import { type GetServerSideProps } from "next";
import { type SSRConfig } from "next-i18next";
import { type FunctionComponent, useMemo, useState } from "react";

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

type SearchResults = {
  cases: CaseSearchIndexItem[];
  userUploads: UploadSearchIndexItem[];
};

const initialSearchResults: SearchResults = {
  cases: [],
  userUploads: [],
};

const Home: FunctionComponent<ServerSidePropsResult> = () =>
{
  const [input, setInput] = useState<string>("");
  const hasInput = input.length > 0;

  const { data: searchToken } = api.search.getTenantToken.useQuery(undefined, {
    refetchOnMount: "always",
    retry: false,
    staleTime: env.NEXT_PUBLIC_MEILISEARCH_TENANT_TOKEN_EXPIRATION_TIME_MS - 1000,
  });

  const meiliSearch = useMemo(() => !searchToken ? null : new MeiliSearch({
    apiKey: searchToken,
    host: env.NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL
  }), [searchToken]);

  const { data: searchResults = initialSearchResults, isLoading } = useQuery({
    enabled: hasInput && meiliSearch != null,
    keepPreviousData: true,
    queryFn: async () =>
    {
      if(!meiliSearch)
      {
        return initialSearchResults;
      }

      const { results } = await meiliSearch.multiSearch({
        queries: [
          {
            indexUid: searchIndices.cases,
            q: input,
          },
          {
            indexUid: searchIndices.userUploads,
            q: input,
          }
        ]
      });

      return ({
        cases: results?.[0]?.hits ?? [],
        userUploads: results?.[1]?.hits ?? [],
      });
    },
    queryKey: ["search", input],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 3000,
  });

  return (
    <Layout>
      <div style={{ padding: 100 }}>
        <h1>Search</h1>
        <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
        {(hasInput && isLoading) && <p>Loading...</p>}
        {hasInput && (
          <div style={{ marginTop: 10 }}>
            <h2>Cases</h2>
            {searchResults.cases.length === 0 && <p style={{ color: "#acacac", fontStyle: "italic" }}>No results</p>}
            {searchResults.cases.map(result => (
              <div key={result.id}>
                <p>{result.title}</p>
              </div>
            ))}
            <h2 style={{ marginTop: 10 }}>Uploads</h2>
            {searchResults.userUploads.length === 0 && <p style={{ color: "#acacac", fontStyle: "italic" }}>No results</p>}
            {searchResults.userUploads.map(result => (
              <div key={result.uuid}>
                <p>{result.originalFilename}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
