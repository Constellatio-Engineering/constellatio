import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/pageHead/PageHead";
import SearchPage from "@/components/pages/searchPage/SearchPage";
import useSearchBarStore from "@/stores/searchBar.store";

import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Search: NextPage = () => 
{
  const router = useRouter();
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const setSearchValue = useSearchBarStore((s) => s.setSearchValue);

  useEffect(() => 
  {
    if(router.query.find !== searchValue)
    {
      setSearchValue(router.query.find as string);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.find]);

  return (
    <>
      <PageHead pageTitle={"Suchergebnisse" + (searchValue ? ` für ${searchValue}` : "")}/>
      <Layout>
        <SearchPage/>
      </Layout>
    </>
  );
};

export default Search;
