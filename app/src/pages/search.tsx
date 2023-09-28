import { Layout } from "@/components/layouts/Layout";
import useSearchResults from "@/hooks/useSearchResults";

import { type NextPage } from "next";
import React from "react";

const Search: NextPage = () => 
{
  const { isLoading, searchResults } = useSearchResults();

  // console.log("searchResults", searchResults);

  return (
    <Layout>
      <div>search</div>
    </Layout>
  );
};

export default Search;
