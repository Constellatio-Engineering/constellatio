import SearchBar from "@/components/molecules/searchBar/SearchBar";
import useSearchResults from "@/hooks/useSearchResults";
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
  const router = useRouter();
  const toggleDrawer = useSearchBarStore((s) => s.toggleDrawer);
  const hasInput = searchValue?.length > 0;

  const { popularSearches } = useSearchResults();

  console.log(popularSearches);

  useEffect(() =>
  {
    toggleDrawer(false);
  }, [router.pathname, toggleDrawer, router.query]);

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
      <SearchOverlayLeftSide hasInput={hasInput}/>
      <SearchOverlayRightSide hasInput={hasInput}/>
    </Drawer>
  );
};

export default SearchOverlay;
