import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Search } from "@/components/Icons/Search";
import LegalFieldsAndTopicsTags from "@/components/molecules/legalFieldsAndTopicsTags/LegalFieldsAndTopicsTags";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import { useForumQuestionsSearchResults } from "@/hooks/useForumQuestionsSearchResults";
import { useForumQuestionsSearchStore } from "@/stores/forumQuestionsSearch.store";
import { getForumQuestionUrl } from "@/utils/paths";

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
      <form css={styles.form} onSubmit={e => e.preventDefault()} autoComplete={"off"}>
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />
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
            <div key={question.id} css={styles.searchResult}>
              <div css={styles.overflowOverlay}/>
              <Link href={getForumQuestionUrl(question)} css={styles.searchResultLink}>
                <CustomLink styleType="link-content-title" component="span" style={{ marginRight: 4 }}>
                  {question.title}
                </CustomLink>
                <LegalFieldsAndTopicsTags
                  displayMode={"inline"}
                  shouldRenderTagsAsLinks={false}
                  topicsIds={question.topics.map((topic) => topic.id)}
                  legalFieldId={question.legalFields.map((field) => field.id)[0]}
                  subfieldsIds={question.subfields.map((subfield) => subfield.id)}
                />
              </Link>
            </div>
          ))}
        </div>
        <div css={styles.dropDownOverflowGradient}/>
      </Popover.Dropdown>
    </Popover>
  );
};

export default SearchBar;
