import { Search } from "@/components/Icons/Search";
import { useForumQuestionsSearchStore } from "@/stores/forumQuestionsSearch.store";

import { Input } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchBar.styles";

const SearchBar: FunctionComponent = () =>
{
  const searchValue = useForumQuestionsSearchStore((s) => s.searchValue);
  const setSearchValue = useForumQuestionsSearchStore((s) => s.setSearchValue);

  return (
    <form>
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

export default SearchBar;
