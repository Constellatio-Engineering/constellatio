import SearchBar from "@/components/molecules/searchBar/SearchBar";
import useSearchStore from "@/stores/search.store";

import { Drawer } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";
import SearchOverlayLeftSide from "./SearchOverlayLeftSide";
import SearchOverlayRightSide from "./SearchOverlayRightSide";
import SearchOverlayWrapper from "./SearchOverlayWrapper";

interface SearchOverlayProps {}

const SearchOverlay: FunctionComponent<SearchOverlayProps> = () => 
{
  const isDrawerOpened = useSearchStore((s) => s.isDrawerOpened);
  const searchValue = useSearchStore((s) => s.searchValue);
  const router = useRouter();
  const toggleDrawer = useSearchStore((s) => s.toggleDrawer);
  const hasInput = searchValue.length > 0;

  useEffect(() =>
  {
    toggleDrawer(false);
  }, [router.pathname, toggleDrawer]);

  return (
    <SearchOverlayWrapper hasInput={hasInput}>
      <Drawer
        padding={0}
        withCloseButton={false}
        returnFocus={false}
        opened={isDrawerOpened}
        onClose={() => toggleDrawer(false)}
        position="top"
        title={<SearchBar/>}
        styles={styles.drawerStyles()}>
        <SearchOverlayLeftSide hasInput={hasInput}/>
        <SearchOverlayRightSide hasInput={hasInput}/>
      </Drawer>
    </SearchOverlayWrapper>
  );
};

export default SearchOverlay;
