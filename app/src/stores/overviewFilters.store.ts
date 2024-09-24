import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

// we cannot reuse the CaseProgressState type here because it does differentiate "in-progress" in two sub-states
export const statusesFilterOptions = [
  {
    id: "open",
    label: "Offen"
  },
  {
    id: "in-progress",
    label: "In Bearbeitung"
  },
  {
    id: "completed",
    label: "Abgeschlossen"
  },
] as const;

type StatusFilterOption = typeof statusesFilterOptions[number]["id"];

export interface CommonFiltersSlice
{
  clearFilteredLegalAreas: () => void;
  clearFilteredTags: () => void;
  clearFilteredTopics: () => void;
  clearInvalidFilters: (args: {
    uniqueLegalAreas: string[];
    uniqueTags: string[];
    uniqueTopics: string[];
  }) => void;
  closeDrawer: () => void;
  filteredLegalAreas: string[];
  filteredTags: string[];
  filteredTopics: string[];
  isDrawerOpened: boolean;
  openDrawer: () => void;
  setIsDrawerOpened: (isDrawerOpened: boolean) => void;
  toggleLegalArea: (legalAreaId: string) => void;
  toggleTag: (tagId: string) => void;
  toggleTopic: (topicId: string) => void;
}

const createCommonFiltersSlice: StateCreator<
CommonFiltersSlice,
[["zustand/immer", never]],
[],
CommonFiltersSlice
> = (set) => ({
  clearFilteredLegalAreas: () => set({ filteredLegalAreas: [] }),
  clearFilteredTags: () => set({ filteredTags: [] }),
  clearFilteredTopics: () => set({ filteredTopics: [] }),
  clearInvalidFilters: ({ uniqueLegalAreas, uniqueTags, uniqueTopics }) =>
  {
    set((state) =>
    {
      state.filteredLegalAreas = state.filteredLegalAreas.filter(legalAreaId => uniqueLegalAreas.includes(legalAreaId));
      state.filteredTags = state.filteredTags.filter(tagId => uniqueTags.includes(tagId));
      state.filteredTopics = state.filteredTopics.filter(topicId => uniqueTopics.includes(topicId));
    });
  },
  closeDrawer: () => set({ isDrawerOpened: false }),
  filteredLegalAreas: [],
  filteredTags: [],
  filteredTopics: [],
  isDrawerOpened: true,
  openDrawer: () => set({ isDrawerOpened: true }),
  setIsDrawerOpened: (isDrawerOpened) => set({ isDrawerOpened }),
  toggleLegalArea: (legalAreaId) =>
  {
    set((state) => 
    {
      const index = state.filteredLegalAreas.indexOf(legalAreaId);
      if(index === -1) 
      {
        state.filteredLegalAreas.push(legalAreaId);
      }
      else 
      {
        state.filteredLegalAreas.splice(index, 1);
      }
    });
  },
  toggleTag: (tagId) => 
  {
    set((state) => 
    {
      const index = state.filteredTags.indexOf(tagId);
      if(index === -1) 
      {
        state.filteredTags.push(tagId);
      }
      else 
      {
        state.filteredTags.splice(index, 1);
      }
    });
  },
  toggleTopic: (topicId) => 
  {
    set((state) => 
    {
      const index = state.filteredTopics.indexOf(topicId);
      if(index === -1) 
      {
        state.filteredTopics.push(topicId);
      }
      else 
      {
        state.filteredTopics.splice(index, 1);
      }
    });
  },
});

export interface StatusFiltersSlice
{
  clearFilteredStatuses: () => void;
  filteredStatuses: StatusFilterOption[];
  toggleStatus: (status: StatusFilterOption) => void;
}

const createStatusFiltersSlice: StateCreator<
StatusFiltersSlice & CommonFiltersSlice,
[["zustand/immer", never]],
[],
StatusFiltersSlice
> = (set) => ({
  clearFilteredStatuses: () => set({ filteredStatuses: [] }),
  filteredStatuses: [],
  toggleStatus: (status) => 
  {
    set((state) => 
    {
      const index = state.filteredStatuses.indexOf(status);
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

