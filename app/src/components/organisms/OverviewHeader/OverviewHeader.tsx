import { OverlayLines } from "@/components/Icons/bg-layer";
import { Trash } from "@/components/Icons/Trash";
import { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";
import type {
  IGenMainCategory,
  Maybe, Scalars
} from "@/services/graphql/__generated/sdk";

import { Title, useMantineTheme } from "@mantine/core";
import { type Options } from "next-usequerystate";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./OverviewHeader.styles";
import { LinkButton } from "../../atoms/LinkButton/LinkButton";
import CategoryTab from "../../molecules/categoryTab/CategoryTab";
import FiltersButton from "../../molecules/filtersButton/FiltersButton";
import FilterTag from "../../molecules/filterTag/FilterTag";

export interface ICasesOverviewHeaderProps 
{
  readonly categories?: IArticlesOverviewProps["allMainCategories"];
  readonly selectedCategorySlug?: IGenMainCategory["mainCategory"];
  readonly setSelectedCategorySlug?: (value: string | ((old: string | null) => string | null) | null, options?: Options | undefined) => Promise<URLSearchParams>;
  readonly title?: Maybe<Scalars["String"]["output"]>;
  readonly variant: "case" | "dictionary" | "red";
}

export const slugFormatter = (name: string): string => name
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9-]/g, "")
  .replace(/-+/g, "-");

const OverviewHeader: FunctionComponent<ICasesOverviewHeaderProps> = ({
  categories,
  selectedCategorySlug,
  setSelectedCategorySlug,
  title,
  variant
}) => 
{
  const theme = useMantineTheme();
  const [filters, setFilters] = useState<string[]>([]);
  return (
    <div css={styles.contentHeader({ theme, variant })} className="header">
      <div id="overlay-lines">
        <OverlayLines/>
      </div>
      <Title order={1} css={styles.title({ theme, variant })}>{title}</Title>
      <div css={styles.categoriesButtons}>
        {categories && categories.map((category: IGenMainCategory & {casesPerCategory: number}, index: number) => category?.mainCategory && setSelectedCategorySlug && (
          <div
            key={index}
            onClick={async () => 
            {
              await setSelectedCategorySlug(slugFormatter(category?.mainCategory ?? ""));
            }}>
            <CategoryTab
              {...category}
              itemsNumber={category?.casesPerCategory}
              selected={selectedCategorySlug === slugFormatter(category?.mainCategory)}
              variant={variant}
              // selected={isCategorySelected(category)}
            />
          </div>
        ))}
      </div>
      {/* this can be a helper or a provider with global state passed to the cases list for filters */}
      <div css={styles.filtersArea}>
        {filters.length > 0 && <FiltersButton title="Filters"/>}
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
