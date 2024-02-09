import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import Tag from "@/components/atoms/tag/Tag";
import { Search } from "@/components/Icons/Search";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import { useForumQuestionsSearchResults } from "@/hooks/useForumQuestionsSearchResults";
import { useForumQuestionsSearchStore } from "@/stores/forumQuestionsSearch.store";
import { appPaths } from "@/utils/paths";

import { Input, Popover } from "@mantine/core";
import Link from "next/link";
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
      zIndex={20}
      width={"100%"}
      offset={0}>
      <form css={styles.form} onSubmit={e => e.preventDefault()}>
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
      <Popover.Dropdown css={styles.dropdown}>
        <div css={styles.dropdownContentWrapper}>
          {searchResults && searchResults.hits.length === 0 && (
            <EmptyStateCard
              variant="For-small-areas"
              title="Keine Ergebnisse"
              text="Bitte versuche es mit anderen Begriffen oder Tags, um relevante Inhalte zu finden."
            />
          )}
          {searchResults?.hits.map((question) => (
            <Link key={question.id} href={`${appPaths.forum}/${question.id}`} css={styles.searchResult}>
              <CustomLink styleType="link-content-title" component="p">
                {question.title}
              </CustomLink>
              <Tag title={question.legalFieldName}/>
            </Link>
          ))}
        </div>
        <div css={styles.dropDownOverflowGradient}/>
      </Popover.Dropdown>
    </Popover>
  );
};

export default SearchBar;
