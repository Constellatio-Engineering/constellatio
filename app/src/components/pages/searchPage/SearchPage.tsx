import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import useSearchResults from "@/hooks/useSearchResults";

import React, { type FunctionComponent } from "react";

import * as styles from "./SearchPage.styles";

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => 
{
  const { isLoading, searchResults } = useSearchResults();

  console.log("searchResults", searchResults);

  return (
    <div css={styles.wrapper}>
      <div css={styles.headerWrapper}>
        <div css={styles.header}>
          <OverviewHeader variant="red" title="test"/>
        </div>
        <div css={styles.navBar}>navbar</div>
      </div>
      SearchPage
    </div>
  );
};

export default SearchPage;
