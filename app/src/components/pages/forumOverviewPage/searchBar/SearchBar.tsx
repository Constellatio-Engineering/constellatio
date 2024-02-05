import { Search } from "@/components/Icons/Search";
import { useForumQuestionsSearchResults } from "@/hooks/useForumQuestionsSearchResults";
import { useForumQuestionsSearchStore } from "@/stores/forumQuestionsSearch.store";

import { Input, Popover } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchBar.styles";
const SearchBar: FunctionComponent = () =>
{
  const searchValue = useForumQuestionsSearchStore((s) => s.searchValue);
  const setSearchValue = useForumQuestionsSearchStore((s) => s.setSearchValue);
  const isDrawerOpened = useForumQuestionsSearchStore((s) => s.isDrawerOpened);
  const toggleDrawer = useForumQuestionsSearchStore((s) => s.toggleDrawer);
  const openDrawer = useForumQuestionsSearchStore((s) => s.openDrawer);
  const { data: searchResults } = useForumQuestionsSearchResults();

  return (
    <Popover
      opened={isDrawerOpened && searchValue.length > 0}
      onChange={toggleDrawer}
      width={"100%"}
      offset={0}>
      <form onSubmit={e => e.preventDefault()}>
        <Popover.Target>
          <Input
            data-autofocus
            type="search"
            name="Durchsuchen"
            title="Durchsuchen"
            placeholder="Durchsuchen"
            styles={styles.inputStyles()}
            icon={<Search size={24}/>}
            value={searchValue}
            onClick={() => openDrawer()}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
        </Popover.Target>
      </form>
      <Popover.Dropdown css={styles.test}>
        {searchResults?.hits.map((question, index) =>
        {
          return (
            <p key={question.id}>{question.title}</p>
          );
        })}
      </Popover.Dropdown>
    </Popover>
  );
};

export default SearchBar;
