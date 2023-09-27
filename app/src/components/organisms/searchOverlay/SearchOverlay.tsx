import SearchBar from "@/components/molecules/searchBar/SearchBar";
import useSearchStore from "@/stores/search.store";

import { Drawer, Loader } from "@mantine/core";
import React, { useEffect, type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";
import SearchOverlayLeftSide from "./SearchOverlayLeftSide";
import SearchOverlayRightSide from "./SearchOverlayRightSide";
import SearchOverlayWrapper from "./SearchOverlayWrapper";

interface SearchOverlayProps {}

const SearchOverlay: FunctionComponent<SearchOverlayProps> = () => 
{
  const isDrawerOpened = useSearchStore((s) => s.isDrawerOpened);
  const searchResults = useSearchStore((s) => s.searchResults);
  const isLoading = useSearchStore((s) => s.isLoading);
  const searchValue = useSearchStore((s) => s.searchValue);
  // const router = useRouter();
  const toggleDrawer = useSearchStore((s) => s.toggleDrawer);
  const hasInput = searchValue.length > 0;

  // useEffect(() =>
  // {
  //   toggleDrawer(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router.pathname]);

  console.log("searchResults", searchResults);
  console.log("searchValue", searchValue);

  const DataIsLoading = hasInput && isLoading && <Loader color="brand-01.4" size="30px"/>;

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
        <SearchOverlayLeftSide DataIsLoading={DataIsLoading} hasInput={hasInput}/>
        <SearchOverlayRightSide DataIsLoading={DataIsLoading} hasInput={hasInput}/>
      </Drawer>
    </SearchOverlayWrapper>
  );
};

export default SearchOverlay;
