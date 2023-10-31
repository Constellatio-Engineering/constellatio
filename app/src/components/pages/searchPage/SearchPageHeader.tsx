import MenuTab from "@/components/atoms/menuTab/MenuTab";
import useSearchResults, { type SearchResultsKey } from "@/hooks/useSearchResults";

import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import { type FunctionComponent } from "react";

import { type TabItemType, convertTabsAsSearchResultsKey } from "./seachPageHelpers";
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

  console.log("tabQuery", tabQuery);

  const tabItems: TabItemType[] = [{
    label: "Fälle",
    resultsCount: searchResults.cases?.length
  }, {
    label: "Lexikon",
    resultsCount: searchResults.articles?.length
  }, {
    label: "Deine Dateien",
    resultsCount: searchResults.userUploads?.length + searchResults.userDocuments?.length
  }];

  return (
    <div css={styles.headerWrapper}>
      <div css={styles.header}>
        <Title order={2}>{totalSearchResults} {totalSearchResults > 1 ? "Ergebnisse" : "Ergebnis"} für “{query.find}”</Title>
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
              active={tabQuery === convertTabsAsSearchResultsKey(item)}
              onClick={() => void setTabQuery(convertTabsAsSearchResultsKey(item))}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchPageHeader;
