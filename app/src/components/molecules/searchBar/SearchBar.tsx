import { Button } from "@/components/atoms/Button/Button";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Cross } from "@/components/Icons/Cross";
import { Search } from "@/components/Icons/Search";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import useSearchResults from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";
import { appPaths } from "@/utils/paths";

import { Input } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";
import { useRouter } from "next/router";
import React, { type FormEventHandler, type FunctionComponent, useEffect } from "react";

import * as styles from "./SearchBar.styles";

const SearchBarContent: FunctionComponent = () =>
{
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const setSearchValue = useSearchBarStore((s) => s.setSearchValue);
  const closeDrawer = useSearchBarStore((s) => s.closeDrawer);
  const router = useRouter();
  const { searchResults } = useSearchResults(searchValue);
  const setGlobalSearchHistory = useSearchBarStore((s) => s.setSearchHistory);
  const theme = useMantineTheme();

  const [localSearchHistory, setLocalSearchHistory] = useLocalStorage({
    defaultValue: [] as string[],
    key: "searchHistory",
  });

  const rightSection = searchValue ? (
    <>
      <div css={styles.searchBtns}>
        <CustomLink
          styleType="link-primary"
          component="button"
          onClick={() => setSearchValue("")}
          title="Neue Suche"
          name="Neue Suche">
          Neue Suche
        </CustomLink>
        <Button<"button">
          styleType="primary"
          type="submit"
          onClick={closeDrawer}
          disabled={Object.values(searchResults).every(result => result.length === 0)}
          name="Alle Ergebnisse"
          title="Alle Ergebnisse">
          Alle Ergebnisse
        </Button>
      </div>
      <span onClick={() => closeDrawer()} className="closeBtn"><Cross size={32}/></span>
    </>
  ) : (
    <span onClick={() => closeDrawer()} className="closeBtn"><Cross size={32}/></span>
  );

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

    void router.push({ pathname: `${appPaths.search}`, query: { find: `${searchValue}` } });

    setSearchValue("");
  };

  return (
    <form onSubmit={onSubmitSearchHandler}>
      <Input
        data-autofocus
        type="search"
        name="Durchsuchen"
        title="Durchsuchen"
        placeholder="Durchsuchen"
        styles={styles.inputStyles(theme)}
        icon={<Search size={24}/>}
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        rightSection={rightSection}
      />
    </form>
  );
};

const SearchBar: FunctionComponent = () =>
{
  return (
    <UseQueryStateWrapper>
      <SearchBarContent/>
    </UseQueryStateWrapper>
  );
};

export default SearchBar;
