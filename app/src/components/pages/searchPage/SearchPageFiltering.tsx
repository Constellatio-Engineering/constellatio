import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { Trash } from "@/components/Icons/Trash";
import FiltersButton from "@/components/molecules/filtersButton/FiltersButton";
import FilterTag from "@/components/molecules/filterTag/FilterTag";

import { type FunctionComponent, useState } from "react";

import * as styles from "./SearchPage.styles";

const SearchPageFiltering: FunctionComponent = () => 
{
  // const [filters, setFilters] = useState<string[]>(["Filter One", "Filter Two", "Filter Three", "Filter Four", "Filter Five", "Filter Six"]);
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <>
      {filters.length > 0 && (
        <div css={styles.filtersArea}>
          <FiltersButton title="Filters"/>
          <div css={styles.selectedFiltersArea}>
            {filters?.map((filter: string, index: number) => (
              <div key={index} onClick={() => setFilters(filters.filter(x => x !== filter))}>
                <FilterTag title={filter}/>
              </div>
            ))}
          </div>
          <LinkButton title="Alle Filter zurücksetzen" icon={<Trash/>}/>
        </div>
      )}
    </>
  );
};

export default SearchPageFiltering;
