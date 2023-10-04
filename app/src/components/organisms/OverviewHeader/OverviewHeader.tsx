import { OverlayLines } from "@/components/Icons/bg-layer";
import { Trash } from "@/components/Icons/Trash";
import { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";
import type {
  IGenMainCategory,
  Maybe, Scalars
} from "@/services/graphql/__generated/sdk";

import { Title, useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./OverviewHeader.styles";
import { LinkButton } from "../../atoms/LinkButton/LinkButton";
import CategoryTab from "../../molecules/categoryTab/CategoryTab";
import FiltersButton from "../../molecules/filtersButton/FiltersButton";
import FilterTag from "../../molecules/filterTag/FilterTag";

export interface ICasesOverviewHeaderProps 
{
  readonly categories?: IArticlesOverviewProps["allMainCategories"];
  readonly selectedCategory?: IGenMainCategory;
  readonly setSelectedCategory?: React.Dispatch<React.SetStateAction<IGenMainCategory | undefined>> ;
  readonly title?: Maybe<Scalars["String"]["output"]>;
  readonly variant: "case" | "dictionary" | "red";
}

const OverviewHeader: FunctionComponent<ICasesOverviewHeaderProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
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
      <Title order={1} css={styles.title({ theme, variant })}>{title}</Title>
      <div css={styles.categoriesButtons}>
        {categories && categories.map((category: IGenMainCategory & {casesPerCategory: number}, index: number) => category?.id && setSelectedCategory && (
          <div key={index} onClick={() => setSelectedCategory(category)}>
            <CategoryTab
              {...category}
              itemsNumber={category?.casesPerCategory}
              selected={category?.id === selectedCategory?.id}
              variant={variant}
            />
          </div>
        ))}
      </div>
      <div css={styles.filtersArea}>
        {filters.length > 0 && <FiltersButton title="Filters"/>}
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
