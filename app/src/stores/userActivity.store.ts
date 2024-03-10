import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type UserActivityStoreProps = {
  activityState: "active" | "inactive";
  setUserIsActive: () => void;
  setUserIsInactive: () => void;
};

export const useUserActivityStore = create(
  immer<UserActivityStoreProps>((set) => ({
    activityState: "active",
    setUserIsActive: () =>
    {
      set((state) => 
      {
        state.activityState = "active";
      });
    },
    setUserIsInactive: () => 
    {
      set((state) => 
      {
        state.activityState = "inactive";
      });
    },
  }))
);
