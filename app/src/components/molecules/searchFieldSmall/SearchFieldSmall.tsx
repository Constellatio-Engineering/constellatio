import { CrossFilled } from "@/components/Icons/CrossFilled";
import { Search } from "@/components/Icons/Search";

import React, { useState, type FunctionComponent } from "react";

import * as styles from "./SearchFieldSmall.styles";

const SearchFieldSmall: FunctionComponent = () => 
{
  const [inputValue, setInputValue] = useState<string>("");
  const handleSubmit = (): void => console.log(inputValue);
  const handleReset = (): void => setInputValue("");
  return (
    <div css={styles.wrapper}>
      <div className="search-icon" onClick={() => handleSubmit()}>
        <Search/>
      </div>
      <input
        type="text"
        name="searchFieldSmall"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search"
      />
      {
        inputValue && (
          <div className="cross-icon" onClick={() => handleReset()}>
            <CrossFilled/>
          </div>
        )
      }
    </div>
  );
};

export default SearchFieldSmall;
