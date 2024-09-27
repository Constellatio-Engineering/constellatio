/* eslint-disable max-lines */
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";

import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export type FilterOption = {
  readonly id: string;
  readonly title: string;
};

// we cannot reuse the CaseProgressState type here because it does differentiate "in-progress" in two sub-states
export const statusesFilterOptions = [
  {
    id: "open",
    title: "Offen"
  },
  {
    id: "in-progress",
    title: "In Bearbeitung"
  },
  {
    id: "completed",
    title: "Abgeschlossen"
  },
] as const;

type StatusFilterOption = typeof statusesFilterOptions[number];

export type FilterableArticleAttributes = keyof Pick<GetArticlesOverviewPagePropsResult["items"][number], "legalArea" | "tags" | "topic">;
export type FilterableCaseAttributes = keyof Pick<CaseOverviewPageProps["items"][number], "legalArea" | "tags" | "topic" | "progressState">;

export interface CommonFiltersSlice<FilterKey extends string>
{
  clearAllFilters: () => void;
  clearFilters: (key: FilterKey) => void;
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

function createOverviewFiltersStore<FilterKey extends FilterableArticleAttributes | FilterableCaseAttributes>(filters: {
  [K in FilterKey]-?: FilterOption[]; 
})
{
  return createStore<CommonFiltersSlice<FilterKey>>()(
    immer((set, get) =>
    {
      return ({
        clearAllFilters: () =>
        {
          set(state =>
          {
            Object.keys(state.filters).forEach(key => state.filters[key] = []);
          });
        },
        clearFilters: (key) =>
        {
          set(state =>
          {
            state.filters[key] = [];
          });
        },
        closeDrawer: () => set({ isDrawerOpened: false }),
        filters,
        getTotalFiltersCount: () =>
        {
          return 0;
          // return Object.values(get().filters).reduce((acc, curr) => acc + curr.length, 0);
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
              return;
            }

            const filterIndex = currentFilter.findIndex(f => f.id === filter.id);

            if(filterIndex === -1)
            {
              currentFilter.push(filter);
            }
            else
            {
              currentFilter.splice(filterIndex, 1);
            }
          });
        },
      });
    }));
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
