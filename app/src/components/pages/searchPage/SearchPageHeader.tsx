import MenuTab from "@/components/atoms/menuTab/MenuTab";
import useSearchResults, { type SearchResults } from "@/hooks/useSearchResults";

import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import { parseAsString, useQueryState } from "next-usequerystate";
import { type FunctionComponent } from "react";

import * as styles from "./SearchPage.styles";
import { SearchPageHeaderBgLayer } from "./SearchPageHeaderBgLayer";

const SearchPageHeader: FunctionComponent = () => 
{
  const { searchResults } = useSearchResults();
  const closestTabWithResults = Object.values(searchResults).findIndex(result => result.length > 0);
  const totalSearchResults = Object.values(searchResults).reduce((acc, curr) => acc + curr.length, 0);
  const initialTab = Object.keys(searchResults)?.[closestTabWithResults] ?? "articles";
  const [tabQuery, setTabQuery] = useQueryState("tab", parseAsString.withDefault(initialTab));
  const { query } = useRouter();

  return (
    <div css={styles.headerWrapper}>
      <div css={styles.header}>
        <Title order={2}>{totalSearchResults} result{totalSearchResults > 1 && "s"} for “{query.find}”</Title>
        <span css={styles.headerBg}>
          <SearchPageHeaderBgLayer/>
        </span>
      </div>
      <div css={styles.navBar}>                                        
        {Object.keys(searchResults).map((i, index) => 
        {
          const item = i as keyof SearchResults;
          return (
            <MenuTab
              key={index}
              title={item}
              number={searchResults[item]?.length}
              active={tabQuery === item}
              onClick={() => void setTabQuery(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchPageHeader;
