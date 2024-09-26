/* eslint-disable max-lines */
import { type OverviewPageProps } from "@/components/pages/OverviewPage/OverviewPage";
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import { type Prettify } from "@/utils/types";

import { create, type StateCreator } from "zustand";
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

type FilterableArticleAttributes = keyof Pick<GetArticlesOverviewPagePropsResult["items"][number], "legalArea" | "tags" | "topic">;
type FilterableCaseAttributes = keyof Pick<CaseOverviewPageProps["items"][number], "legalArea" | "tags" | "topic" | "progressState">;

export interface CommonFiltersSlice
{
  clearAllFilters: () => void;
  clearFilters: (key: keyof this["filters"]) => void;
  clearInvalidFilters: (args: {
    uniqueLegalAreas: string[];
    uniqueTags: string[];
    uniqueTopics: string[];
  }) => void;
  closeDrawer: () => void;
  filters: {
    [K in FilterableArticleAttributes]: FilterOption[];
  };
  getTotalFiltersCount: () => number;
  isDrawerOpened: boolean;
  openDrawer: () => void;
  setIsDrawerOpened: (isDrawerOpened: boolean) => void;
  toggleFilter: (key: keyof this["filters"], filter: FilterOption) => void;
}

const createCommonFiltersSlice: StateCreator<
CommonFiltersSlice,
[["zustand/immer", never]],
[],
CommonFiltersSlice
> = (set, get) => ({
  /* clearAllFilters: () => set({
    filters: {
      legalArea: [],
      tags: [],
      topic: [],
    },
  }),*/
  clearAllFilters: () => set(state =>
  {
    /* for(const key in state.filters)
    {
      if(Object.prototype.hasOwnProperty.call(state.filters, key))
      {
        // @ts-expect-error Typescript is not smart enough to know that the key is a key of state.filters
        state.filters[key] = [];
      }
    }*/

    Object.keys(state.filters).forEach(key => state.filters[key as keyof CommonFiltersSlice["filters"]] = []);
  }),
  clearFilters: (key) => set(state => state.filters[key] = []),
  clearInvalidFilters: ({ uniqueLegalAreas, uniqueTags, uniqueTopics }) =>
  {
    set((state) =>
    {
      state.filters.legalArea = state.filters.legalArea.filter(legalArea => uniqueLegalAreas.find(legalAreaId => legalAreaId === legalArea.id));
      state.filters.tags = state.filters.tags.filter(tag => uniqueTags.find(tagId => tagId === tag.id));
      state.filters.topic = state.filters.topic.filter(topic => uniqueTopics.find(topicId => topicId === topic.id));
    });
  },
  closeDrawer: () => set({ isDrawerOpened: false }),
  filters: {
    legalArea: [],
    tags: [],
    topic: [],
  },
  getTotalFiltersCount: () => Object.values(get().filters).reduce((acc, curr) => acc + curr.length, 0),
  isDrawerOpened: true,
  openDrawer: () => set({ isDrawerOpened: true }), 
  setIsDrawerOpened: (isDrawerOpened) => set({ isDrawerOpened }),
  toggleFilter: (key, filter) =>
  {
    set((state) =>
    {
      const { filters } = state; 
      const filterIndex = filters[key].findIndex(f => f.id === filter.id);

      if(filterIndex === -1)
      {
        filters[key].push(filter);
      }
      else
      {
        filters[key].splice(filterIndex, 1);
      }
    });
  },
});

interface StatusFiltersSlice
{
  clearAllFilters: () => void;                             
  clearFilteredStatuses: () => void;
  filters: {
    [K in FilterableCaseAttributes]: FilterOption[];
  };
  // toggleFilter: (key: FilterableCaseAttributes, filter: FilterOption) => void;
}

const createStatusFiltersSlice: StateCreator<
StatusFiltersSlice & CommonFiltersSlice,
[["zustand/immer", never]],
[],
StatusFiltersSlice
> = (set) => ({
  clearAllFilters: () => set({
    filters: {
      legalArea: [],
      progressState: [], 
      tags: [],
      topic: [],
    },
  }),
  clearFilteredStatuses: () => set(state => state.filters.progressState = []),
  filters: {
    legalArea: [],
    progressState: [],
    tags: [],
    topic: [],
  },
  /* toggleFilter: (key, filter) =>
  {
    set((state) =>
    {
      const { filters } = state;
      const filterIndex = filters[key].findIndex(f => f.id === filter.id);

      if(filterIndex === -1)
      {
        filters[key].push(filter);
      }
      else
      {
        filters[key].splice(filterIndex, 1);
      }
    });
  },*/
});

export type CasesOverviewFiltersStore = CommonFiltersSlice;
// export type CasesOverviewFiltersStore = CommonFiltersSlice & StatusFiltersSlice;

export const useCasesOverviewFiltersStore = create<CasesOverviewFiltersStore>()(
  immer((...a) => ({
    ...createCommonFiltersSlice(...a),
    // ...createStatusFiltersSlice(...a),
  }))
);

export type ArticlesOverviewFiltersStore = CommonFiltersSlice;

export const useArticlesOverviewFiltersStore = create<ArticlesOverviewFiltersStore>()(
  immer((...a) => ({
    ...createCommonFiltersSlice(...a),
  }))
);

