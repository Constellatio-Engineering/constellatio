import MenuTab from "@/components/atoms/menuTab/MenuTab";
import useSearchResults from "@/hooks/useSearchResults";

import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useQueryState } from "next-usequerystate";
import React, { useEffect, type FunctionComponent, useState } from "react";

import * as styles from "./SearchPage.styles";
import { SearchPageHeaderBgLayer } from "./SearchPageHeaderBgLayer";

const SearchPageHeader: FunctionComponent = () => 
{
  const router = useRouter();
  const { searchResults } = useSearchResults();
  const [tabQuery, setTabQuery] = useQueryState("tab");
  // Used set State instead of useQueryState because I get react hydration warning
  const [activeTab, setActiveTab] = useState<string>(Object.keys(searchResults)?.[0] ?? "");

  useEffect(() => 
  {
    if(typeof window !== "undefined")
    {
      if(router.query.tab !== tabQuery) 
      {
        void (async () => 
        {
          try 
          {
            await setTabQuery(router.query.tab as string);
            setActiveTab(router.query.tab as string);
          }
          catch (error) 
          {
            console.error(error);
          }
        })();
      }
    }
  }, [tabQuery, setTabQuery, router.query.tab, searchResults]);

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
            active={router.query.tab ? activeTab === item : false}
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
