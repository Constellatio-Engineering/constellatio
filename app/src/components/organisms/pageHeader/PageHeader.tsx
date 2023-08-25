import React, { FunctionComponent, useState } from "react";

import * as styles from "./PageHeader.style";
import { IGenPageHeader } from "@/services/graphql/__generated/sdk";
import CategoryTab from "@/components/molecules/categoryTab/CategoryTab";
import { Title } from "@mantine/core";
import { FiltersIcon } from "@/components/Icons/filters";
import { TrashIcon } from "@/components/Icons/trash";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import FiltersButton from "@/components/filtersButton/FiltersButton";
import FilterTag from "@/components/filterTag/FilterTag";


const PageHeader: FunctionComponent<IGenPageHeader> = ({ title, categories }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
  // const [filters, setFilters] = useState<string[]>(["filterItem 1", "filterItem 2", "filterItem 3", "filterItem 4", "filterItem 5"])
  const [filters, setFilters] = useState<string[]>([])
  return (
    <div >
      <div css={styles.contentHeader} className="header">
        <Title order={1}>{title}</Title>
        <div css={styles.categoriesButtons}>
          {categories?.map((category: any, index: number) => (
            <div key={index} onClick={() => setSelectedCategoryIndex(index)}>
              <CategoryTab {...category} itemsNumber={20} selected={index === selectedCategoryIndex} />
            </div>
          ))}
        </div>

        <div css={styles.filtersArea}>
          <FiltersButton title="Filters" />
          {/* this can be a helper or a provider with global state passed to the cases list for filters */}
          {filters.length > 0 && (<><div css={styles.selectedFiltersArea}>
            {filters?.map((filter: any, index: number) => (<div key={index} onClick={() => setFilters(filters.filter(x => x !== filter))}> <FilterTag title={filter} /></div>))}
          </div>
            <LinkButton title={<BodyText styleType={"body-01-medium"}>Clear all filters</BodyText>} icon={<TrashIcon />} /></>)}
        </div>



      </div>
    </div>
  )
};

export default PageHeader;
