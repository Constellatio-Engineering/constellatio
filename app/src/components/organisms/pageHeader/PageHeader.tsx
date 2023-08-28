
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { TrashIcon } from "@/components/Icons/trash";
import CategoryTab from "@/components/molecules/categoryTab/CategoryTab";
import FiltersButton from "@/components/molecules/filtersButton/FiltersButton";
import FilterTag from "@/components/molecules/filterTag/FilterTag";
// import { FiltersIcon } from "@/components/Icons/filters";
import { type IGenPageHeader } from "@/services/graphql/__generated/sdk";

import { Title } from "@mantine/core";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./PageHeader.style";

const PageHeader: FunctionComponent<IGenPageHeader> = ({ categories, title }) => 
{
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [filters, setFilters] = useState<string[]>(["Filter One", "Filter Two", "Filter Three", "Filter Four", "Filter Five", "Filter Six", "Filter Seven", "Filter Eight", "Filter Nine", "Filter Ten", "Filter Eleven", "Filter Twelve", "Filter Thirteen", "Filter Fourteen", "Filter Fifteen", "Filter Sixteen", "Filter Seventeen", "Filter Eighteen", "Filter Nineteen", "Filter Twenty"]);
  // const [filters, setFilters] = useState<string[]>([]);
  return (
    <div>
      <div css={styles.contentHeader} className="header">
        <Title order={1}>{title}</Title>
        <div css={styles.categoriesButtons}>
          {categories?.map((category, index: number) => (
            <div key={index} onClick={() => setSelectedCategoryIndex(index)}>
              <CategoryTab {...category} itemsNumber={20} selected={index === selectedCategoryIndex}/>
            </div>
          ))}
        </div>
        <div css={styles.filtersArea}>
          <FiltersButton title="Filters"/>
          {/* this can be a helper or a provider with global state passed to the cases list for filters */}
          {filters.length > 0 && (
            <>
              <div css={styles.selectedFiltersArea}>
                {filters?.map((filter: string, index: number) => (
                  <div key={index} onClick={() => setFilters(filters.filter(x => x !== filter))}> 
                    <FilterTag title={filter}/>
                  </div>
                ))}
              </div>
              <LinkButton title={<BodyText styleType="body-01-medium">Clear all filters</BodyText>} icon={<TrashIcon/>}/>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default PageHeader;
