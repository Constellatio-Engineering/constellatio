import SearchBar from "@/components/molecules/searchBar/SearchBar";
import useSearchStore from "@/stores/search.store";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";

interface SearchOverlayProps
{

}

const SearchOverlay: FunctionComponent<SearchOverlayProps> = () => 
{
  const isDrawerOpened = useSearchStore(s => s.isDrawerOpened);
  const toggleDrawer = useSearchStore(s => s.toggleDrawer);
  return (
    <div css={styles.wrapper}>
      <Drawer opened={isDrawerOpened} onClose={() => toggleDrawer(false)} position="top">
        <SearchBar/>
      </Drawer>
    </div>
  );
};

export default SearchOverlay;
