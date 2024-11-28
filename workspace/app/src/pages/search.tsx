import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import SearchPage from "@/components/pages/searchPage/SearchPage";
import { type NextPageWithLayout } from "@/pages/_app";
import useSearchBarStore from "@/stores/searchBar.store";

const Search: NextPageWithLayout = () =>
{
  const searchValue = useSearchBarStore((s) => s.searchValue);
  
  return (
    <>
      <PageHead pageTitle={"Suchergebnisse" + (searchValue ? ` für ${searchValue}` : "")}/>
      <SearchPage/>
    </>
  );
};

Search.getLayout = Layout;

export default Search;
