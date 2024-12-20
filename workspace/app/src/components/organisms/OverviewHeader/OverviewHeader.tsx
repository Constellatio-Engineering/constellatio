import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { OverlayLines } from "@/components/Icons/bg-layer";
import { Trash } from "@/components/Icons/Trash";

import { type GetOverviewPagePropsResult } from "@constellatio/cms/content/getOverviewPageProps";
import type { Maybe, Scalars } from "@constellatio/cms/generated-types";
import { type SerializedStyles } from "@emotion/react";
import { Title } from "@mantine/core";
import { type FunctionComponent, useState } from "react";

import * as styles from "./OverviewHeader.styles";
import { LinkButton } from "../../atoms/LinkButton/LinkButton";
import CategoryTab from "../../molecules/categoryTab/CategoryTab";
import FiltersButton from "../../molecules/filtersButton/FiltersButton";
import FilterTag from "../../molecules/filterTag/FilterTag";

export interface ICasesOverviewHeaderProps
{
  readonly categories?: GetOverviewPagePropsResult["allMainCategories"];
  readonly contentWrapperStylesOverrides?: SerializedStyles;
  readonly height?: number;
  readonly selectedCategorySlug?: string;
  readonly setSelectedCategorySlug?: (slug: string) => Promise<URLSearchParams>;
  readonly title?: Maybe<Scalars["String"]["output"]>;
  readonly variant: "case" | "dictionary" | "red";
}

const OverviewHeader: FunctionComponent<ICasesOverviewHeaderProps> = ({
  categories,
  contentWrapperStylesOverrides,
  height = 400,
  selectedCategorySlug,
  setSelectedCategorySlug,
  title,
  variant
}) => 
{
  const [filters, setFilters] = useState<string[]>([]);
  return (
    <div css={styles.contentHeader({ height, variant })} className="header">
      <div id="overlay-lines">
        <OverlayLines/>
      </div>
      <ContentWrapper stylesOverrides={[styles.headerContentWrapper, contentWrapperStylesOverrides]}>
        <Title order={1} css={styles.title({ variant })}>{title}</Title>
        <div css={styles.categoriesButtons}>
          {categories?.filter(Boolean).map((category) => category?.slug && setSelectedCategorySlug && (
            <div
              key={category.id}
              onClick={async () =>
              {
                if(!category.slug)
                {
                  console.error("Category slug is undefined");
                  return;
                }

                await setSelectedCategorySlug(category.slug);
              }}>
              <CategoryTab
                {...category}
                itemsNumber={category?.itemsPerCategory}
                selected={selectedCategorySlug === category.slug}
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
      </ContentWrapper>
    </div>
  );
};

export default OverviewHeader;
