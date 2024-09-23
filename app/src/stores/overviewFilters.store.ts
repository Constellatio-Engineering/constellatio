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
  clearFilteredStatuses: () => void;
  clearFilteredTopics: () => void;
  closeDrawer: () => void;
  filteredStatuses: StatusFilterOption[];
  filteredTopics: string[];
  isDrawerOpened: boolean;
  openDrawer: () => void;
  setIsDrawerOpened: (isDrawerOpened: boolean) => void;
  toggleStatus: (status: StatusFilterOption) => void;
  toggleTopic: (topicId: string) => void;
};

export const useOverviewFiltersStore = create(
  immer<OverviewFiltersStoreProps>((set) => ({
    clearFilteredStatuses: () => set({ filteredStatuses: [] }),
    clearFilteredTopics: () => set({ filteredTopics: [] }),
    closeDrawer: () => set({ isDrawerOpened: false }),
    filteredStatuses: [],
    filteredTopics: [],
    isDrawerOpened: true,
    openDrawer: () => set({ isDrawerOpened: true }),
    setIsDrawerOpened: (isDrawerOpened) => set({ isDrawerOpened }),
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
