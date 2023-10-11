import MenuTab from "@/components/atoms/menuTab/MenuTab";
import useSearchResults, { type SearchResults } from "@/hooks/useSearchResults";

import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useQueryState } from "next-usequerystate";
import { useEffect, type FunctionComponent } from "react";

import * as styles from "./SearchPage.styles";
import { SearchPageHeaderBgLayer } from "./SearchPageHeaderBgLayer";

const SearchPageHeader: FunctionComponent = () => 
{
  const router = useRouter();
  const routerTabQuery = router.query.tab as string;
  const { searchResults } = useSearchResults();
  const [tabQuery, setTabQuery] = useQueryState("tab");

  const closestTabWithResults = Object.values(searchResults).findIndex(result => result.length > 0);
  const totalSearchResults = Object.values(searchResults).reduce((acc, curr) => acc + curr.length, 0);

  useEffect(() => 
  {
    if(typeof window !== "undefined")
    {
      void (async () => 
      {
        try 
        {
          if(!tabQuery) 
          {
            await setTabQuery(Object.keys(searchResults)?.[closestTabWithResults] ?? "articles");
            await router.replace({ query: { ...router.query, tab: Object.keys(searchResults)?.[closestTabWithResults] ?? "articles" } });
          }
          else { await setTabQuery(routerTabQuery as string); }
        }
        catch (error) { console.error(error); }
      })();
    }
    // if added tabQuery to the dependency array, it will cause issues activating menu tab on route change or sharing url
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTabQuery, routerTabQuery, searchResults]);

  return (
    <div css={styles.headerWrapper}>
      <div css={styles.header}>
        <Title order={2}>{totalSearchResults} result{totalSearchResults > 1 && "s"} for “{router.query.find}”</Title>
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
              onClick={async () => 
              {
                await router.replace({ query: { ...router.query, tab: item } });
                await setTabQuery(item);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchPageHeader;
