/* eslint-disable max-lines */
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";

import { produce } from "immer";
import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export type FilterOption = {
  readonly lable: string;
  readonly value: string | number | boolean;
};

// we cannot reuse the CaseProgressState type here because it does differentiate "in-progress" in two sub-states
export const statusesFilterOptions = [
  {
    lable: "Offen",
    value: "open"
  },
  {
    lable: "In Bearbeitung",
    value: "in-progress"
  },
  {
    lable: "Abgeschlossen",
    value: "completed"
  },
] as const satisfies readonly FilterOption[];

type StatusFilterOption = typeof statusesFilterOptions[number];

export type FilterableArticleAttributes = keyof Pick<GetArticlesOverviewPagePropsResult["items"][number], "legalArea" | "tags" | "topic">;
export type FilterableCaseAttributes = keyof Pick<CaseOverviewPageProps["items"][number], "legalArea" | "tags" | "topic" | "progressState">;

export interface CommonFiltersSlice<FilterKey extends string>
{
  clearAllFilters: () => void;
  clearFilters: (key: FilterKey) => void;
  clearInvalidFilters: () => void;
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
  return createStore<CommonFiltersSlice<FilterKey>>()((set, get) =>
  {
    return ({
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
      clearInvalidFilters: () =>
      {
        // TODO
        window.alert("clearInvalidFilters is not implemented yet");
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
      isDrawerOpened: true,
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

          const newFilter = { ...currentFilter };

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

          /* return ({
            filters: {
              ...state.filters,
              [key]: produce(currentFilter, draft =>
              {
                if(filterIndex === -1)
                {
                  draft.push(filter);
                }
                else
                {
                  draft.splice(filterIndex, 1);
                }
              })
            }
          });*/
        });
      },
    });
  });
}

export const useCasesOverviewFiltersStore = createOverviewFiltersStore({
  legalArea: [],
  progressState: [],
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
