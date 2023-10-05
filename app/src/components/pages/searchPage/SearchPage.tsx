import useSearchResults from "@/hooks/useSearchResults";

import React, { type FunctionComponent } from "react";

import * as styles from "./SearchPage.styles";
import SearchPageFiltering from "./SearchPageFiltering";
import SearchPageHeader from "./SearchPageHeader";

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => 
{
  const { isLoading, searchResults } = useSearchResults();

  // console.log("searchResults", searchResults);

  return (
    <div css={styles.wrapper}>
      <SearchPageHeader/>
      <SearchPageFiltering/>
      SearchPage
    </div>
  );
};

export default SearchPage;
