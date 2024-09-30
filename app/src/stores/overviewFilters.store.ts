/* eslint-disable max-lines */
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import { appPaths } from "@/utils/paths";

import { createStore } from "zustand";
import { querystring } from "zustand-querystring";

export type FilterOption = {
  readonly label: string;
  readonly value: string | number;
};

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

type FilterableArticleAttributes = keyof Pick<GetArticlesOverviewPagePropsResult["items"][number], "legalArea" | "tags" | "topic">;
type FilterableCaseAttributes = keyof Pick<CaseOverviewPageProps["items"][number], "legalArea" | "tags" | "topic" | "progressStateFilterable">;

interface CommonFiltersSlice<FilterKey extends string>
{
  clearAllFilters: () => void;
  clearFilters: (key: FilterKey) => void;
  clearInvalidFilters: (currentlyValidFilterOptions: {
    [K in FilterKey]-?: FilterOption[];
  }) => void;
  closeDrawer: () => void;
  filters: {
    [K in FilterKey]-?: FilterOption[];
  };
  getTotalFiltersCount: () => number;
  isDrawerOpened: boolean;
  openDrawer: () => void;
  setIsDrawerOpened: (isDrawerOpened: boolean) => void;
  toggleFilter: (key: FilterKey, filter: FilterOption) => void;
}

// Caution: Because of the complex type of 'filters', we cannot use immer for this store because the type inference breaks

function createOverviewFiltersStore<FilterKey extends FilterableArticleAttributes | FilterableCaseAttributes>(filters: {
  [K in FilterKey]-?: FilterOption[];
})
{
  return createStore<CommonFiltersSlice<FilterKey>>()(

    querystring(
      (set, get) => ({
        clearAllFilters: () =>
        {
          set((state) => ({
            filters: Object.keys(state.filters).reduce((acc, key) => ({
              ...acc,
              [key]: []
            }), {} as typeof state.filters)
          }));
        },
        clearFilters: (key) =>
        {
          set((state) => ({
            filters: {
              ...state.filters,
              [key]: []
            }
          }));
        },
        clearInvalidFilters: (currentlyValidFilterOptions) =>
        {
          set((state) =>
          {
            const filterKeys = Object.keys(state.filters) as Array<keyof typeof state.filters>;

            let hasChanges = false;

            const updatedFilters = filterKeys.reduce((acc, filterKey) =>
            {
              const validFilters = state.filters[filterKey].filter(filterOption =>
                currentlyValidFilterOptions[filterKey]?.some(validFilterOption =>
                  validFilterOption.value === filterOption.value
                )
              );

              if(validFilters.length !== state.filters[filterKey].length)
              {
                hasChanges = true;
              }

              return {
                ...acc,
                [filterKey]: validFilters
              };
            }, {} as typeof state.filters);

            // Only update state if there are actual changes
            return hasChanges ? { filters: updatedFilters } : state;
          });
        },
        closeDrawer: () => set({ isDrawerOpened: false }),
        filters,
        getTotalFiltersCount: () =>
        {
          const { filters } = get();
          let count = 0;

          for(const key in filters)
          {
            if(Object.hasOwn(filters, key))
            {
              count += filters[key].length;
            }
          }

          return count;
        },
        isDrawerOpened: false,
        openDrawer: () => set({ isDrawerOpened: true }),
        setIsDrawerOpened: (isDrawerOpened) => set({ isDrawerOpened }),
        toggleFilter: (key, filter) =>
        {
          set((state) =>
          {
            const { filters } = state;

            const currentFilter = filters[key];

            if(currentFilter == null)
            {
              return state;
            }

            const filterIndex = currentFilter.findIndex(f => f.value === filter.value);
            const isFilterAlreadyAdded = filterIndex !== -1;
            const newFilter = [...currentFilter];

            if(isFilterAlreadyAdded)
            {
              newFilter.splice(filterIndex, 1);
            }
            else
            {
              newFilter.push(filter);
            }

            return ({
              filters: {
                ...state.filters,
                [key]: newFilter
              }
            });
          });
        },
      }), {
        select(pathname)
        {
          // only sync filters to query params if we are on the cases overview page
          return {
            filters: pathname === appPaths.cases,
            key: "filters",
          };
        }
      }
    )
  );
}

export const useCasesOverviewFiltersStore = createOverviewFiltersStore({
  legalArea: [],
  progressStateFilterable: [],
  tags: [],
  topic: [],
});

export const useArticlesOverviewFiltersStore = createOverviewFiltersStore({
  legalArea: [],
  tags: [],
  topic: [],
});

export type CasesOverviewFiltersStore = CommonFiltersSlice<FilterableCaseAttributes>;
export type ArticlesOverviewFiltersStore = CommonFiltersSlice<FilterableArticleAttributes>;
export type CommonOverviewFiltersStore = CasesOverviewFiltersStore | ArticlesOverviewFiltersStore;
