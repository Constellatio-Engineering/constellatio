import MenuTab from "@/components/atoms/menuTab/MenuTab";
import useSearchResults, { type SearchResultsKey } from "@/hooks/useSearchResults";

import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import { type FunctionComponent } from "react";

import * as styles from "./SearchPage.styles";
import { SearchPageHeaderBgLayer } from "./SearchPageHeaderBgLayer";

type Props = {
  readonly setTabQuery: (tab: SearchResultsKey) => Promise<URLSearchParams>;
  readonly tabQuery: string;
  readonly totalSearchResults: number;
};

const SearchPageHeader: FunctionComponent<Props> = ({ setTabQuery, tabQuery, totalSearchResults }) =>
{
  const { searchResults } = useSearchResults();
  const { query } = useRouter();

  const tabItems: Array<{
    label: SearchResultsKey;
    resultsCount: number;
  }> = [{
    label: "cases",
    resultsCount: searchResults.cases?.length
  }, {
    label: "articles",
    resultsCount: searchResults.articles?.length
  }, {
    label: "userUploads",
    resultsCount: searchResults.userUploads?.length + searchResults.userDocuments?.length
  }];

  return (
    <div css={styles.headerWrapper}>
      <div css={styles.header}>
        <Title order={2}>{totalSearchResults} result{totalSearchResults > 1 && "s"} for “{query.find}”</Title>
        <span css={styles.headerBg}>
          <SearchPageHeaderBgLayer/>
        </span>
      </div>
      <div css={styles.navBar}>                                        
        {tabItems.map((item, index) => 
        {
          return (
            <MenuTab
              key={index}
              title={item.label}
              number={item.resultsCount}
              active={tabQuery === item.label}
              onClick={() => void setTabQuery(item.label)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchPageHeader;
