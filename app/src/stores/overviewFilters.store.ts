/* eslint-disable max-lines */
import type { AllCases } from "@/services/content/getAllCases";

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

type Filter = {
  filteredOptions: FilterOption[];
  key: keyof AllCases[number];
};

export interface CommonFiltersSlice
{
  clearAllFilters: () => void;
  clearFilteredLegalAreas: () => void;
  clearFilteredTags: () => void;
  clearFilteredTopics: () => void;
  clearInvalidFilters: (args: {
    uniqueLegalAreas: string[];
    uniqueTags: string[];
    uniqueTopics: string[];
  }) => void;
  closeDrawer: () => void;
  filters: Filter[];
  getTotalFiltersCount: () => number;
  isDrawerOpened: boolean;
  openDrawer: () => void;
  setIsDrawerOpened: (isDrawerOpened: boolean) => void;
  toggleLegalArea: (legalArea: FilterOption) => void;
  toggleTag: (tag: FilterOption) => void;
  toggleTopic: (topic: FilterOption) => void;
}

const createCommonFiltersSlice: StateCreator<
CommonFiltersSlice,
[["zustand/immer", never]],
[],
CommonFiltersSlice
> = (set, get) => ({
  clearAllFilters: () => set({
    filteredLegalAreas: [],
    filteredTags: [],
    filteredTopics: [] 
  }),
  clearFilteredLegalAreas: () => set({ filteredLegalAreas: [] }),
  clearFilteredTags: () => set({ filteredTags: [] }),
  clearFilteredTopics: () => set({ filteredTopics: [] }),
  clearInvalidFilters: ({ uniqueLegalAreas, uniqueTags, uniqueTopics }) =>
  {
    set((state) =>
    {
      state.filteredLegalAreas = state.filteredLegalAreas.filter(legalArea => uniqueLegalAreas.find(legalAreaId => legalAreaId === legalArea.id));
      state.filteredTags = state.filteredTags.filter(tag => uniqueTags.find(tagId => tagId === tag.id));
      state.filteredTopics = state.filteredTopics.filter(topic => uniqueTopics.find(topicId => topicId === topic.id));
    });
  },
  closeDrawer: () => set({ isDrawerOpened: false }),
  filteredLegalAreas: [],
  filteredTags: [],
  filteredTopics: [],
  getTotalFiltersCount: () =>
  {
    const { filteredLegalAreas, filteredTags, filteredTopics } = get();
    return filteredLegalAreas.length + filteredTags.length + filteredTopics.length;
  },
  isDrawerOpened: true,
  openDrawer: () => set({ isDrawerOpened: true }), 
  setIsDrawerOpened: (isDrawerOpened) => set({ isDrawerOpened }),
  toggleLegalArea: (legalArea) =>
  {
    set((state) => 
    {
      const index = state.filteredLegalAreas.findIndex(l => l.id === legalArea.id);

      if(index === -1) 
      {
        state.filteredLegalAreas.push(legalArea);
      }
      else 
      {
        state.filteredLegalAreas.splice(index, 1);
      }
    });
  },
  toggleTag: (tag) =>
  {
    set((state) => 
    {
      const index = state.filteredTags.findIndex(t => t.id === tag.id);

      if(index === -1) 
      {
        state.filteredTags.push(tag);
      }
      else 
      {
        state.filteredTags.splice(index, 1);
      }
    });
  },
  toggleTopic: (topic) =>
  {
    set((state) => 
    {
      const index = state.filteredTopics.findIndex(t => t.id === topic.id);

      if(index === -1) 
      {
        state.filteredTopics.push(topic);
      }
      else 
      {
        state.filteredTopics.splice(index, 1);
      }
    });
  },
});

interface StatusFiltersSlice
{
  clearAllFilters: () => void;
  clearFilteredStatuses: () => void;
  filteredStatuses: StatusFilterOption[];
  getTotalFiltersCount: () => number;
  toggleStatus: (status: StatusFilterOption) => void;
}

const createStatusFiltersSlice: StateCreator<
StatusFiltersSlice & CommonFiltersSlice,
[["zustand/immer", never]],
[],
StatusFiltersSlice
> = (set, get) => ({
  clearAllFilters: () => set({
    filteredLegalAreas: [],
    filteredStatuses: [],
    filteredTags: [],
    filteredTopics: []
  }),
  clearFilteredStatuses: () => set({ filteredStatuses: [] }),
  filteredStatuses: [],
  getTotalFiltersCount: () =>
  {
    const {
      filteredLegalAreas,
      filteredStatuses,
      filteredTags,
      filteredTopics
    } = get();
    return filteredLegalAreas.length + filteredTags.length + filteredTopics.length + filteredStatuses.length;
  },
  toggleStatus: (status) => 
  {
    set((state) => 
    {
      const index = state.filteredStatuses.findIndex(s => s.id === status.id);

      if(index === -1) 
      {
        state.filteredStatuses.push(status);
      }
      else 
      {
        state.filteredStatuses.splice(index, 1);
      }
    });
  },
});

export type CasesOverviewFiltersStore = CommonFiltersSlice & StatusFiltersSlice;

export const useCasesOverviewFiltersStore = create<CasesOverviewFiltersStore>()(
  immer((...a) => ({
    ...createCommonFiltersSlice(...a),
    ...createStatusFiltersSlice(...a),
  }))
);

export type ArticlesOverviewFiltersStore = CommonFiltersSlice;

export const useArticlesOverviewFiltersStore = create<CommonFiltersSlice>()(
  immer((...a) => ({
    ...createCommonFiltersSlice(...a),
  }))
);

