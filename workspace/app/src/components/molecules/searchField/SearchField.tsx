import { Input } from "@/components/atoms/Input/Input";
import { Search } from "@/components/Icons/Search";
import useSearchBarStore from "@/stores/searchBar.store";

import { type TextInputProps } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./SearchField.styles";

type SearchFieldProps = TextInputProps & {
  readonly size?: "small" | "normal";
};

const SearchField: FunctionComponent<SearchFieldProps> = ({
  size = "normal",
  ...props
}) => 
{
  const searchValue = useSearchBarStore(s => s.searchValue);
  const SearchIcon = <span css={styles.icon}><Search size={size === "normal" ? 20 : 16}/></span>;

  return (
    <div css={styles.wrapper({ searchValue, size })}>
      <Input
        inputType="text"
        type="text"
        name="Suche"
        title="Suche"
        placeholder="Suche"
        icon={SearchIcon}
        defaultValue=""
        // rightSection={ResetIcon}
        {...props}
      />
    </div>
  );
};

export default SearchField;
