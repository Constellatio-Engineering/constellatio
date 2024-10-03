/* eslint-disable max-lines */
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { ArticleOverviewPageProps } from "@/pages/dictionary";
import { areArraysEqualByKey } from "@/utils/array";
import { getIsValidKey } from "@/utils/object";
import { appPaths } from "@/utils/paths";

import { castDraft, enableMapSet } from "immer";
import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { querystring, type QueryStringOptions } from "zustand-querystring";

export type FilterOption = {
  readonly label: string;
  readonly value: string | number;
};

enableMapSet();

// we cannot reuse the CaseProgressState type here because it does differentiate "in-progress" in two sub-states
export const statusesFilterOptions = [
  {
    label: "Offen",
    value: "open"
  },
  {
    label: "In Bearbeitung",
    value: "in-progress"
  },
  {
    label: "Abgeschlossen",
    value: "completed"
  },
] as const satisfies readonly FilterOption[];

export type StatusFilterOption = typeof statusesFilterOptions[number];

export const wasSeenFilterOptions = [
  {
    label: "Nicht gesehen",
    value: "not-seen"
  },
  {
    label: "Gesehen",
    value: "seen"
  },
] as const satisfies readonly FilterOption[];

export type WasSeenFilterOption = typeof wasSeenFilterOptions[number];

type FilterableArticleAttributes = keyof Pick<ArticleOverviewPageProps["items"][number], "legalArea" | "tags" | "topic" | "wasSeenFilterable">;
type FilterableCaseAttributes = keyof Pick<CaseOverviewPageProps["items"][number], "legalArea" | "tags" | "topic" | "progressStateFilterable">;
export type FilterableAttributes = FilterableArticleAttributes | FilterableCaseAttributes;

interface CommonFiltersSlice<FilterKey extends string>
{
  clearAllFilters: () => void;
  clearFilters: (key: FilterKey) => void;
  clearInvalidFilters: (currentlyValidFilterOptions: {
    [K in FilterKey]-?: FilterOption[];
  }) => void;
  closeDrawer: () => void;
  filters: Map<FilterKey, {
    clearFilters: () => void;
    filterOptions: FilterOption[];
    toggleFilter: (filter: FilterOption) => void;
  }>;
  getTotalFiltersCount: () => number;
  isDrawerOpened: boolean;
  openDrawer: () => void;
  setIsDrawerOpened: (isDrawerOpened: boolean) => void;
  toggleFilter: (key: FilterKey, filter: FilterOption) => void;
}

function createOverviewFiltersStore<FilterKey extends FilterableAttributes>(
  initialFilters: { [K in FilterKey]-?: FilterOption[] },
  querystringOptions: QueryStringOptions<CommonFiltersSlice<FilterKey>>
)
{
  type Store = CommonFiltersSlice<FilterKey>;
  const filterKeys = Object.keys(initialFilters) as Array<keyof typeof initialFilters>;

  return createStore<Store>()(
    querystring(
      immer(
        (set, get) => ({
          clearAllFilters: () =>
          {
            set((state) =>
            {
              for(const key of state.filters.keys())
              {
                state.filters.get(key)!.filterOptions = [];
              }
            });
          },
          clearFilters: (key) =>
          {
            set((state) =>
            {
              state.filters.get(castDraft(key))!.filterOptions = [];
            });
          },
          clearInvalidFilters: (currentlyValidFilterOptions) =>
          {
            set((state) =>
            {
              for(const key of state.filters.keys())
              {
                const activeFilterOptions = state.filters.get(key)!.filterOptions;
                const validFilterOptions = activeFilterOptions.filter(filterOption =>
                {
                  if(!getIsValidKey(currentlyValidFilterOptions, key))
                  {
                    return false;
                  }

                  return currentlyValidFilterOptions[key]?.some(validFilterOption => validFilterOption.value === filterOption.value);
                });

                if(areArraysEqualByKey(activeFilterOptions, validFilterOptions, "value"))
                {
                  continue;
                }

                state.filters.get(key)!.filterOptions = validFilterOptions;
              }
            });
          },
          closeDrawer: () => set({ isDrawerOpened: false }),
          filters: new Map(
            filterKeys.map(key => [
              key,
              {
                clearFilters: () => get().clearFilters(key),
                filterOptions: initialFilters[key],
                toggleFilter: (filter) => get().toggleFilter(key, filter),
              }
            ])
          ),
          getTotalFiltersCount: () => Array
            .from(get().filters.values())
            .reduce((count, f) => count + f.filterOptions.length, 0),
          isDrawerOpened: false,
          openDrawer: () => set({ isDrawerOpened: true }),
          setIsDrawerOpened: (isDrawerOpened) => set({ isDrawerOpened }),
          toggleFilter: (key, filter) =>
          {
            set((state) =>
            {
              const { filters } = state;

              const currentFilter = filters.get(castDraft(key));

              if(currentFilter == null)
              {
                return;
              }

              const filterIndex = currentFilter.filterOptions.findIndex(f => f.value === filter.value);
              const isFilterAlreadyAdded = filterIndex !== -1;

              if(isFilterAlreadyAdded)
              {
                currentFilter.filterOptions.splice(filterIndex, 1);
              }
              else
              {
                currentFilter.filterOptions.push(filter);
              }
            });
          },
        })
      ),
      querystringOptions
    )
  );
}

// disable the sorting rule because we want to keep the order of the filters as this is the order in which they are displayed in the drawer
/* eslint-disable sort-keys-fix/sort-keys-fix */
export const useCasesOverviewFiltersStore = createOverviewFiltersStore({
  progressStateFilterable: [],
  legalArea: [],
  topic: [],
  tags: [],
}, {
  key: "cases-filters",
  select: (pathname) => ({
    // only sync filters to query params if we are on the cases overview page
    filters: pathname === appPaths.cases,
  })
});

export const useArticlesOverviewFiltersStore = createOverviewFiltersStore({
  legalArea: [],
  tags: [],
  topic: [],
  wasSeenFilterable: [],
}, {
  key: "articles-filters",
  select: (pathname) => ({
    // only sync filters to query params if we are on the articles overview page
    filters: pathname === appPaths.dictionary,
  })
});
/* eslint-enable sort-keys-fix/sort-keys-fix */

export type CasesOverviewFiltersStore = CommonFiltersSlice<FilterableCaseAttributes>;
export type ArticlesOverviewFiltersStore = CommonFiltersSlice<FilterableArticleAttributes>;
export type CommonOverviewFiltersStore = CasesOverviewFiltersStore | ArticlesOverviewFiltersStore;
