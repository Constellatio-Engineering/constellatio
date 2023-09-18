import { Layout } from "@/components/layouts/Layout";
import { env } from "@/env.mjs";
import { getCommonProps } from "@/utils/commonProps";

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
  host: env.NEXT_PUBLIC_MEILISEARCH_HOST_URL
});

type Movie = {
  id: number;
  title: string;
};

const Home: FunctionComponent<ServerSidePropsResult> = () =>
{
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() =>
  {
    meiliSearch.index("movies").search<Movie>(input)
      .then((res) => setResults(res.hits))
      .catch((err) => console.log(err));
  }, [input]);
  
  return (
    <Layout>
      <div style={{ padding: 100 }}>
        <h1>Search</h1>
        <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
        {results.map(result => (
          <div key={result.id}>
            <p>{result.title}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
