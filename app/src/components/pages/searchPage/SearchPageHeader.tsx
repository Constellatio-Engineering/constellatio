import MenuTab from "@/components/atoms/menuTab/MenuTab";
import useSearchResults from "@/hooks/useSearchResults";

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
            await setTabQuery(Object.keys(searchResults)?.[0] ?? "articles");
          }
          else 
          {
            await setTabQuery(routerTabQuery as string);
          }
        }
        catch (error) 
        {
          console.error(error);
        }
      })();
      
    }

  /** 
   * if added tabQuery to the dependency array, it will cause issues activating menu tab on route change or sharing url
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTabQuery, routerTabQuery, searchResults]);

  return (
    <div css={styles.headerWrapper}>
      <div css={styles.header}>
        <Title order={2}>54 results for “Corporate”</Title>
        <span css={styles.headerBg}>
          <SearchPageHeaderBgLayer/>
        </span>
      </div>
      <div css={styles.navBar}>                                        
        {Object.keys(searchResults).map((item, index) => (
          <MenuTab
            key={index}
            title={item}
            number={(searchResults as { [key: string]: unknown[] })[item]?.length}
            active={tabQuery === item}
            onClick={async () => 
            {
              await router.replace({ query: { ...router.query, tab: item } });
              await setTabQuery(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPageHeader;
