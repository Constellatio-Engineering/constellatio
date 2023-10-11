import { Input } from "@/components/atoms/Input/Input";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { Search } from "@/components/Icons/Search";
import useSearchBarStore from "@/stores/searchBar.store";

import { type TextInputProps } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchField.styles";

type SearchFieldProps = TextInputProps & {
  readonly size?: "small" | "normal";
};

const SearchField: FunctionComponent<SearchFieldProps> = ({
  size = "normal",
  ...props
}) => 
{
  const theme = useMantineTheme();
  const searchValue = useSearchBarStore(s => s.searchValue);
  const setSearchValue = useSearchBarStore(s => s.setSearchValue);

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
        defaultValue={searchValue}
        rightSection={ResetIcon}
        {...props}
      />
    </div>
  );
};

export default SearchField;
