import { Button } from "@/components/atoms/Button/Button";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Cross } from "@/components/Icons/Cross";
import { Search } from "@/components/Icons/Search";
import useSearchBarStore from "@/stores/searchBar.store";
import { paths } from "@/utils/paths";

import { Input } from "@mantine/core";
import Link from "next/link";
import { useQueryState } from "next-usequerystate";
import React, { useEffect, type FunctionComponent } from "react";

import * as styles from "./SearchBar.styles";

interface SearchBarProps {}

const SearchBar: FunctionComponent<SearchBarProps> = () => 
{
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const setSearchValue = useSearchBarStore((s) => s.setSearchValue);
  const toggleDrawer = useSearchBarStore((s) => s.toggleDrawer);
  const [searchQuery, setSearchQuery] = useQueryState("find");

  const rightSection = searchValue ? (
    <>
      <CustomLink styleType="link-primary" component="button" onClick={() => setSearchValue("")}>Clear</CustomLink>
      <Link href={{ pathname: `${paths.search}`, query: { find: `${searchQuery}` } }}>
        <Button<"button"> styleType="primary">View all results</Button>
      </Link>
      <span onClick={() => toggleDrawer(false)} className="closeBtn"><Cross size={32}/></span>
    </>
  ) : (
    <span onClick={() => toggleDrawer(false)} className="closeBtn"><Cross size={32}/></span>
  );

  useEffect(() => 
  {
    void (async () => 
    {
      try 
      {
        await setSearchQuery(searchValue);
      }
      catch (error) 
      {
        console.error(error);
      }
    })();
  }, [searchValue, setSearchQuery]);

  return (
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
  );
};

export default SearchBar;
