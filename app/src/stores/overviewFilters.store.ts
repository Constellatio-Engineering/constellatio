import { create } from "zustand";
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

type OverviewFiltersStoreProps = {
  clearFilteredLegalAreas: () => void;
  clearFilteredStatuses: () => void;
  clearFilteredTags: () => void;
  clearFilteredTopics: () => void;
  closeDrawer: () => void;
  filteredLegalAreas: string[];
  filteredStatuses: StatusFilterOption[];
  filteredTags: string[];
  filteredTopics: string[];
  isDrawerOpened: boolean;
  openDrawer: () => void;
  setIsDrawerOpened: (isDrawerOpened: boolean) => void;
  toggleLegalArea: (legalAreaId: string) => void;
  toggleStatus: (status: StatusFilterOption) => void;
  toggleTag: (tagId: string) => void;
  toggleTopic: (topicId: string) => void;
};

export const useOverviewFiltersStore = create(
  immer<OverviewFiltersStoreProps>((set) => ({
    clearFilteredLegalAreas: () => set({ filteredLegalAreas: [] }),
    clearFilteredStatuses: () => set({ filteredStatuses: [] }),
    clearFilteredTags: () => set({ filteredTags: [] }),
    clearFilteredTopics: () => set({ filteredTopics: [] }),
    closeDrawer: () => set({ isDrawerOpened: false }),
    filteredLegalAreas: [],
    filteredStatuses: [],
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
          state.filteredLegalAreas = state.filteredLegalAreas.concat(legalAreaId);
        }
        else
        {
          state.filteredLegalAreas = state.filteredLegalAreas.filter((_, i) => i !== index);
        }
      });
    },
    toggleStatus: (status) =>
    {
      set((state) =>
      {
        const index = state.filteredStatuses.indexOf(status);

        if(index === -1)
        {
          state.filteredStatuses = state.filteredStatuses.concat(status);
        }
        else
        {
          state.filteredStatuses = state.filteredStatuses.filter((_, i) => i !== index);
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
          state.filteredTags = state.filteredTags.concat(tagId);
        }
        else
        {
          state.filteredTags = state.filteredTags.filter((_, i) => i !== index);
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
          state.filteredTopics = state.filteredTopics.concat(topicId);
        }
        else
        {
          state.filteredTopics = state.filteredTopics.filter((_, i) => i !== index);
        }
      });
    },
  }))
);
