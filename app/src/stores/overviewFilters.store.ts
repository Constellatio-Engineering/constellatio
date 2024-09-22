import { type CaseProgress } from "@/db/schema";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type CaseProgressState = CaseProgress["progressState"];

type OverviewFiltersStoreProps = {
  closeDrawer: () => void;
  filteredStatuses: CaseProgressState[];
  filteredTopics: string[];
  isDrawerOpened: boolean;
  openDrawer: () => void;
  setIsDrawerOpened: (isDrawerOpened: boolean) => void;
  toggleStatus: (status: CaseProgressState) => void;
  toggleTopic: (topicId: string) => void;
};

export const useOverviewFiltersStore = create(
  immer<OverviewFiltersStoreProps>((set) => ({
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
