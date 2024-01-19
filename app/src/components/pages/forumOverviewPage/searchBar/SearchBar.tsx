import { Search } from "@/components/Icons/Search";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";

import { Input } from "@mantine/core";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./SearchBar.styles";

const SearchBarContent: FunctionComponent = () =>
{
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <form onSubmit={() => console.log("submit")}>
      <Input
        data-autofocus
        type="search"
        name="Durchsuchen"
        title="Durchsuchen"
        placeholder="Durchsuchen"
        styles={styles.inputStyles()}
        icon={<Search size={24}/>}
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
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
