import MenuTab from "@/components/atoms/menuTab/MenuTab";
import useSearchResults, { type SearchResults, type SearchResultsKey } from "@/hooks/useSearchResults";

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
