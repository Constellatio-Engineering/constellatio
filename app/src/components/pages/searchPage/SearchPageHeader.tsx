import MenuTab from "@/components/atoms/menuTab/MenuTab";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
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

  const tabItems: TabItemType[] = [{
    label: "Fälle",
    resultsCount: searchResults.cases?.length
  }, {
    label: "Lexikon",
    resultsCount: searchResults.articles?.length
  }, {
    label: "Forum",
    resultsCount: searchResults.forumQuestions?.length
  }, {
    label: "Dateien & Docs",
    resultsCount: searchResults.userUploads?.length + searchResults.userDocuments?.length
  }];

  return (
    <div css={styles.headerWrapper}>
      <div css={styles.header}>
        <span css={styles.headerBg}>
          <SearchPageHeaderBgLayer/>
        </span>
        <ContentWrapper stylesOverrides={styles.headerContentWrapper}>
          <Title order={2}>{totalSearchResults} {totalSearchResults > 1 ? "Ergebnisse" : "Ergebnis"} für “{query.find}”</Title>
        </ContentWrapper>
      </div>
      <div css={styles.navBar}>
        <ContentWrapper stylesOverrides={styles.navBarContentWrapper}>
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
        </ContentWrapper>
      </div>
    </div>
  );
};

export default SearchPageHeader;
