// import useSearchResults from "@/hooks/useSearchResults";

import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import useSearchResults from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";

import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchPage.styles";
import SearchPageFiltering from "./SearchPageFiltering";
import SearchPageHeader from "./SearchPageHeader";
import SearchPageResults from "./SearchPageResults";

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => 
{
  const { searchResults } = useSearchResults();
  const searchValue = useSearchBarStore((s) => s.searchValue);

  // const { isLoading, searchResults } = useSearchResults();

  // console.log("searchResults", searchResults);

  return (
    <div css={styles.wrapper}>
      {Object.values(searchResults).every((result) => result.length === 0) ? (
        <EmptyStateCard
          variant="For-large-areas"
          title={`No Search Results Found for “${searchValue}”`}
          text="Try different search Entry"
        />
      ) : (
        <>
          <SearchPageHeader/>
          <SearchPageFiltering/>
          <SearchPageResults/>
          {/* SearchPage */}
        </>
      )}
    </div>
  );
};

export default SearchPage;
