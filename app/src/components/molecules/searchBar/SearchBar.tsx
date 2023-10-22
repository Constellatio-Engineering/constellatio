import { Button } from "@/components/atoms/Button/Button";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Cross } from "@/components/Icons/Cross";
import { Search } from "@/components/Icons/Search";
import useSearchResults from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";
import { paths } from "@/utils/paths";

import { Input } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useQueryState } from "next-usequerystate";
import React, { useEffect, type FunctionComponent, type FormEventHandler } from "react";

import * as styles from "./SearchBar.styles";

interface SearchBarProps {}

const SearchBar: FunctionComponent<SearchBarProps> = () => 
{
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const setSearchValue = useSearchBarStore((s) => s.setSearchValue);
  const toggleDrawer = useSearchBarStore((s) => s.toggleDrawer);
  const [searchQuery, setSearchQuery] = useQueryState("find");
  const router = useRouter();
  const { searchResults } = useSearchResults();
  const setGlobalSearchHistory = useSearchBarStore((s) => s.setSearchHistory);

  const [localSearchHistory, setLocalSearchHistory] = useLocalStorage({
    defaultValue: [] as string[],
    key: "searchHistory",
  });

  const rightSection = searchValue ? (
    <>
      <CustomLink styleType="link-primary" component="button" onClick={() => setSearchValue("")}>Clear</CustomLink>
      <Button<"button"> styleType="primary" type="submit" disabled={Object.values(searchResults).every(result => result.length === 0)}>
        View all results
      </Button>
      <span onClick={() => toggleDrawer(false)} className="closeBtn"><Cross size={32}/></span>
    </>
  ) : (
    <span onClick={() => toggleDrawer(false)} className="closeBtn"><Cross size={32}/></span>
  );

  useEffect(() => 
  {
    void setSearchQuery(searchValue);
  }, [searchValue, setSearchQuery]);

  useEffect(() => 
  {
    if(typeof window !== "undefined") 
    {
      setGlobalSearchHistory(localSearchHistory);
    }
  }, [localSearchHistory, setGlobalSearchHistory]);

  const onSubmitSearchHandler: FormEventHandler<HTMLFormElement> = (e) => 
  {
    e.preventDefault();

    if(!localSearchHistory.find((search) => search?.trim().toLowerCase() === searchValue?.trim().toLowerCase()))
    {
      setLocalSearchHistory((prev) => [...prev, searchValue]);
    }

    void router.push({ pathname: `${paths.search}`, query: { find: `${searchQuery}` } });
  };

  return (
    <form onSubmit={onSubmitSearchHandler}>
      <Input
        data-autofocus
        type="search"
        placeholder="Type Here"
        styles={styles.inputStyles()}
        icon={<Search size={24}/>}
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        rightSection={rightSection}
      />
    </form>
  );
};

export default SearchBar;
