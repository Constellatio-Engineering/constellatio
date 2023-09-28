import { Layout } from "@/components/layouts/Layout";
import useSearchResults from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";

import { type NextPageContext, type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Search: NextPage = () => 
{
  const { isLoading, searchResults } = useSearchResults();
  const router = useRouter();
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const setSearchValue = useSearchBarStore((s) => s.setSearchValue);

  useEffect(() => 
  {
    if(typeof window !== "undefined")
    {
      if(router.query.find !== searchValue) 
      {
        setSearchValue(router.query.find as string);
      }
    }
  }, [router.query.find]);

  console.log("router.query.find", router.query.find);
  console.log("searchValue", searchValue);

  return (
    <Layout>
      <div>search</div>
    </Layout>
  );
};

// Search.getInitialProps = async ({ asPath, pathname, query }: NextPageContext) => 
// {
//   console.log("query", query, "pathname", pathname, "asPath", asPath);
//   return {};
// };

export default Search;
