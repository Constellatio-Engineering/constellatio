/* eslint-disable max-lines */
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { ArticleOverviewPageProps } from "@/pages/dictionary";
import { appPaths } from "@/utils/paths";

import { boolean } from "drizzle-orm/pg-core";
import {
  castDraft, castImmutable, createDraft, type Immutable, produce, enableMapSet
} from "immer";
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

function createOverviewFiltersStore<FilterKey extends FilterableArticleAttributes | FilterableCaseAttributes>(
  initialFilters: { [K in FilterKey]-?: FilterOption[] },
  querystringOptions: QueryStringOptions<CommonFiltersSlice<FilterKey>>
)
{
  type Store = CommonFiltersSlice<FilterKey>;

  return createStore<Store>()(
    querystring(
      immer(
        (set, get) =>
        {
          const filters: Store["filters"] = new Map();

          const filterKeys = Object.keys(initialFilters) as Array<keyof typeof initialFilters>;

          filterKeys.forEach(key =>
          {
            filters.set(key, {
              clearFilters: () =>
              {
                get().clearFilters(key);
              },
              filterOptions: initialFilters[key],
              toggleFilter: (filter) =>
              {
                get().toggleFilter(key, filter);
              },
            });
          });

          return ({
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
              console.warn("clearInvalidFilters is not implemented yet");

              /* set((state) =>
              {
                const filterKeys = Object.keys(state.filters) as Array<keyof typeof state.filters>;

                let hasChanges = false;

                const updatedFilters = filterKeys.reduce((acc, filterKey) =>
                {
                  const validFilters = state.filters[filterKey].filterOptions.filter(filterOption =>
                    currentlyValidFilterOptions[filterKey]?.some(validFilterOption =>
                      validFilterOption.value === filterOption.value
                    )
                  );

                  if(validFilters.length !== state.filters[filterKey].filterOptions.length)
                  {
                    hasChanges = true;
                  }

                  const test: Partial<typeof state.filters> = {
                    ...acc,
                    [filterKey]: {
                      ...acc[filterKey],
                      filterOptions: 2,
                    }
                  };

                  return test;
                }, {} as Partial<typeof state.filters>);

                const result = updatedFilters as Store["filters"];

                // Only update state if there are actual changes
                return hasChanges ? { filters: result } : state;
              });*/
            },
            closeDrawer: () => set({ isDrawerOpened: false }),
            filters,
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
          });
        }
      ),
      querystringOptions
    )
  );
}

export const useCasesOverviewFiltersStore = createOverviewFiltersStore({
  legalArea: [],
  progressStateFilterable: [],
  tags: [],
  topic: [],
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

export type CasesOverviewFiltersStore = CommonFiltersSlice<FilterableCaseAttributes>;
export type ArticlesOverviewFiltersStore = CommonFiltersSlice<FilterableArticleAttributes>;
export type CommonOverviewFiltersStore = CasesOverviewFiltersStore | ArticlesOverviewFiltersStore;
