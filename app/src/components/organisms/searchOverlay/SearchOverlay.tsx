import SearchBar from "@/components/molecules/searchBar/SearchBar";
import useSearchStore from "@/stores/search.store";

import { Drawer, Loader } from "@mantine/core";
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
    <Drawer
      padding={0}
      withCloseButton={false}
      returnFocus={false}
      opened={isDrawerOpened}
      onClose={() => toggleDrawer(false)}
      position="top"
      title={<SearchBar/>}
      styles={styles.drawerStyles()}>
      <Loader color="brand-01.4"/>
    </Drawer>
  );
};

export default SearchOverlay;
