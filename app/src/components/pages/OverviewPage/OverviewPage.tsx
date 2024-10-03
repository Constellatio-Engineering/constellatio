/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { FiltersList } from "@/components/Icons/FiltersList";
import { Trash } from "@/components/Icons/Trash";
import FilterTag from "@/components/molecules/filterTag/FilterTag";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import { LegalAreaBlock } from "@/components/pages/OverviewPage/legalAreaBlock/LegalAreaBlock";
import { ArticlesOverviewFiltersDrawer, CasesOverviewFiltersDrawer } from "@/components/pages/OverviewPage/overviewFiltersDrawer/OverviewFiltersDrawer";
import { getItemsMatchingTheFilters, getLegalAreasWithItems } from "@/components/pages/OverviewPage/OverviewPage.utils";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import { type CaseOverviewPageProps } from "@/pages/cases";
import { type ArticleOverviewPageProps } from "@/pages/dictionary";
import { type ArticlesOverviewFiltersStore, type CasesOverviewFiltersStore, type CommonOverviewFiltersStore, } from "@/stores/overviewFilters.store";

import { Title } from "@mantine/core";
import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent, useDeferredValue, useMemo } from "react";

import * as styles from "./OverviewPage.styles";
import ErrorPage from "../errorPage/ErrorPage";

type CommonFiltersStoreProps = Pick<CommonOverviewFiltersStore, "clearAllFilters" | "openDrawer"> & {
  readonly totalFiltersCount: number;
};

export type ArticlesPageProps = ArticleOverviewPageProps & {
  readonly filter: CommonFiltersStoreProps & Pick<ArticlesOverviewFiltersStore, "filters">;
};

export type CasesPageProps = CaseOverviewPageProps & {
  readonly filter: CommonFiltersStoreProps & Pick<CasesOverviewFiltersStore, "filters">;
};

export type OverviewPageProps = (ArticlesPageProps | CasesPageProps) & {
  // This is a workaround.
  // The correct type would be Array<CaseOverviewPageProps["items"][number] | ArticleWithNextAndPreviousArticleId[],
  // but TypeScript is not smart enough to infer this with the array.filter method
  // eslint-disable-next-line react/no-unused-prop-types
  readonly items: Array<CaseOverviewPageProps["items"][number] | ArticleOverviewPageProps["items"][number]>;
};

type OverviewPageContentProps = OverviewPageProps & {
  readonly initialCategorySlug: string;
};

const OverviewPageContent: FunctionComponent<OverviewPageContentProps> = ({
  allMainCategories,
  filter,
  initialCategorySlug,
  items: _items,
  variant
}) =>
{
  const {
    clearAllFilters,
    filters,
    openDrawer,
    totalFiltersCount
  } = filter;

  const [selectedCategorySlug, setSelectedCategorySlug] = useQueryState("category", parseAsString.withDefault(initialCategorySlug));
  const allItemsOfSelectedCategory = useMemo(
    () => _items.filter((item) => item.mainCategoryField?.[0]?.slug === selectedCategorySlug),
    [_items, selectedCategorySlug]
  );
  const _filteredItems = useMemo(
    () => getItemsMatchingTheFilters(allItemsOfSelectedCategory, filters),
    [filters, allItemsOfSelectedCategory]
  );
  const filteredItems = useDeferredValue(_filteredItems);
  const isCategoryEmpty = allItemsOfSelectedCategory.length <= 0;

  const legalAreasWithItems = useMemo(
    () => getLegalAreasWithItems(filteredItems),
    [filteredItems]
  );

  return (
    <>
      {variant === "case" ? (
        <CasesOverviewFiltersDrawer
          variant={variant}
          items={allItemsOfSelectedCategory as CasesPageProps["items"]}
        />
      ) : (
        <ArticlesOverviewFiltersDrawer
          variant={variant}
          items={allItemsOfSelectedCategory as ArticlesPageProps["items"]}
        />
      )}
      <div css={styles.Page}>
        {allMainCategories && (
          <OverviewHeader
            variant={variant}
            selectedCategorySlug={selectedCategorySlug}
            setSelectedCategorySlug={setSelectedCategorySlug}
            height={480}
            contentWrapperStylesOverrides={styles.headerContent}
            categories={allMainCategories}
            title={variant === "case" ? "Fälle" : "Lexikon"}
          />
        )}
        <div css={styles.ListWrapper}>
          <ContentWrapper>
            <div css={styles.filtersWrapper}>
              <div css={styles.filtersButtonWrapper}>
                <Button<"button">
                  styleType={"secondarySimple"}
                  onClick={openDrawer}
                  leftIcon={<FiltersList/>}>
                  Filter
                  {totalFiltersCount > 0 && (
                    <span css={styles.filtersCount}>({totalFiltersCount})</span>
                  )}
                </Button>
              </div>
              <div css={styles.activeFiltersChips}>
                {Array.from(filter.filters.values()).map((f) => (
                  <>
                    {f.filterOptions.map((filterOption) => (
                      <FilterTag
                        key={filterOption.value}
                        onClick={() => f.toggleFilter(filterOption)}
                        title={filterOption.label}
                      />
                    ))}
                  </>
                ))}
              </div>
              <div css={styles.clearFiltersButtonWrapper}>
                <LinkButton
                  disabled={totalFiltersCount === 0}
                  title="Alle zurücksetzen"
                  icon={<Trash/>}
                  onClick={clearAllFilters}
                />
              </div>
            </div>
            {legalAreasWithItems.map(({ items, legalArea }) => (
              <LegalAreaBlock
                key={legalArea.id}
                legalArea={legalArea}
                items={items}
                variant={variant}
              />
            ))}
          </ContentWrapper>
        </div>
        <ContentWrapper>
          {totalFiltersCount > 0 && filteredItems.length === 0 && (
            <div css={styles.noResultsWrapper}>
              <Title order={3}>Keine Ergebnisse</Title>
              <BodyText styleType="body-01-regular">
                Für deine Filter wurden leider keine Ergebnisse gefunden.
                Bitte ändere deine Filter.
              </BodyText>
              <Button<"button"> styleType={"primary"} onClick={clearAllFilters}>
                Filter zurücksetzen
              </Button>
            </div>
          )}
          {isCategoryEmpty && (
            <EmptyStateCard
              title={`Das Angebot von Constellatio wird ständig erweitert. In Kürze findest du hier ${
                variant === "case"
                  ? "interaktive Fälle"
                  : "verlinkte Lexikon-Artikel mit eingängigen Visualisierungen"
              }`}
              text=""
              variant="For-large-areas"
            />
          )}
        </ContentWrapper>
      </div>
    </>
  );
};

const OverviewPage: FunctionComponent<OverviewPageProps> = (props) =>
{
  const { allMainCategories } = props;

  if(!allMainCategories || allMainCategories.length === 0)
  {
    return <ErrorPage error="Categories not found"/>;
  }

  const initialCategorySlug = allMainCategories[0]!.slug;

  if(!initialCategorySlug)
  {
    return <ErrorPage error="Initial category has no slug"/>;
  }

  return (
    <UseQueryStateWrapper>
      <OverviewPageContent {...props} initialCategorySlug={initialCategorySlug}/>
    </UseQueryStateWrapper>
  );
};

export default OverviewPage;
