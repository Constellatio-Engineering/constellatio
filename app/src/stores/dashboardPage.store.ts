import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type DashbardPageProps = {
  isBadgesDrawerOpened: boolean;
  setIsBadgesDrawerOpened: (isBadgesDrawerOpened: boolean) => void;
};

const useDashboardPageStore = create(immer<DashbardPageProps>((set) => (
  {
    isBadgesDrawerOpened: false,
    setIsBadgesDrawerOpened: (isBadgesDrawerOpened: boolean) => 
    {
      set((state) => 
      {
        state.isBadgesDrawerOpened = isBadgesDrawerOpened;
      });
    },
  }))
);

export default useDashboardPageStore;
