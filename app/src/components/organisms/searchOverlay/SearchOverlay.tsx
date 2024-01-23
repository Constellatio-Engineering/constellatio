import SearchBar from "@/components/molecules/searchBar/SearchBar";
import useSearchBarStore from "@/stores/searchBar.store";

import { Drawer } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";
import SearchOverlayLeftSide from "./SearchOverlayLeftSide";
import SearchOverlayRightSide from "./SearchOverlayRightSide";

interface SearchOverlayProps {}

const SearchOverlay: FunctionComponent<SearchOverlayProps> = () => 
{
  const isDrawerOpened = useSearchBarStore((s) => s.isDrawerOpened);
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const { pathname } = useRouter();
  const closeDrawer = useSearchBarStore((s) => s.closeDrawer);
  const hasInput = searchValue?.length > 0;

  useEffect(() =>
  {
    useSearchBarStore.getState().closeDrawer();
  }, [pathname]);

  return (
    <Drawer
      padding={0}
      withCloseButton={false}
      returnFocus={false}
      opened={isDrawerOpened}
      onClose={closeDrawer}
      position="top"
      title={<SearchBar/>}
      styles={styles.drawerStyles()}>
      <SearchOverlayLeftSide hasInput={hasInput}/>
      <SearchOverlayRightSide hasInput={hasInput}/>
    </Drawer>
  );
};

export default SearchOverlay;
