import { Input } from "@/components/atoms/Input/Input";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { Search } from "@/components/Icons/Search";
import useSearchStore from "@/stores/search.store";

import { useMantineTheme } from "@mantine/styles";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchField.styles";

type SearchFieldProps = {
  readonly size?: "small" | "normal";
};

const SearchField: FunctionComponent<SearchFieldProps> = ({ size = "normal" }) => 
{
  const theme = useMantineTheme();
  const searchValue = useSearchStore(s => s.searchValue);
  const setSearchValue = useSearchStore(s => s.setSearchValue);

  const SearchIcon = <span css={styles.icon}><Search size={size === "normal" ? 20 : 16}/></span>;

  const ResetIcon = <span onClick={() => setSearchValue("")} css={styles.icon}><CrossFilled size={size === "normal" ? 20 : 16}/></span>;

  return (
    <div css={styles.wrapper({ searchValue, size, theme })}>
      <Input
        inputType="text"
        type="text"
        name="searchFieldSmall"
        placeholder="Search"
        icon={SearchIcon}
        rightSection={ResetIcon}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchField;
