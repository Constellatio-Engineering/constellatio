import { OverlayLines } from "@/components/Icons/bg-layer";
import { Trash } from "@/components/Icons/Trash";
import { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";

import { Title, useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./OverviewHeader.styles";
import type {
  Maybe, Scalars 
} from "../../../services/graphql/__generated/sdk";
import { LinkButton } from "../../atoms/LinkButton/LinkButton";
import CategoryTab from "../../molecules/categoryTab/CategoryTab";
import FiltersButton from "../../molecules/filtersButton/FiltersButton";
import FilterTag from "../../molecules/filterTag/FilterTag";

export interface ICasesOverviewHeaderProps 
{
  readonly categories?: ICasesOverviewProps["allMainCategories"] ;
  readonly selectedCategoryId?: string;
  readonly setSelectedCategoryId: (id: string) => void;
  readonly title?: Maybe<Scalars["String"]["output"]>;
  readonly variant: "case" | "dictionary";
}

const OverviewHeader: FunctionComponent<ICasesOverviewHeaderProps> = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  title,
  variant
}) => 
{
  const theme = useMantineTheme();
  // const [filters, setFilters] = useState<string[]>(["Filter One", "Filter Two", "Filter Three", "Filter Four", "Filter Five", "Filter Six"]);
  const [filters, setFilters] = useState<string[]>([]);
  
  return (
    <div css={styles.contentHeader({ theme, variant })} className="header">
      <div id="overlay-lines">
        <OverlayLines/>
      </div>
      <Title order={1} css={styles.title}>{title}</Title>
      <div css={styles.categoriesButtons}>
        {categories?.map((category, index: number) => category?.id && (
          <div key={index} onClick={() => setSelectedCategoryId(`${category?.id}`)}>
            <CategoryTab {...category} itemsNumber={category?.casesPerCategory} selected={category?.id === selectedCategoryId}/>
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
            <LinkButton title="Clear all filters" icon={<Trash/>}/>
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewHeader;
