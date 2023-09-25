import useSearchStore from "@/stores/search.store";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";

interface SearchOverlayProps
{

}

const SearchOverlay: FunctionComponent<SearchOverlayProps> = ({ }) => 
{
  const isDrawerOpened = useSearchStore(s => s.isDrawerOpened);
  const toggleDrawer = useSearchStore(s => s.toggleDrawer);
  console.log("isDrawerOpened", isDrawerOpened);
  return (
    <div css={styles.wrapper}>
      <Drawer opened={isDrawerOpened} onClose={() => toggleDrawer(false)} position="top">
        HIIIII
      </Drawer>
    </div>
  );
};

export default SearchOverlay;
