import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type DrawerOpenedState = {
  isDrawerOpened: true;
  selectedBadgeId: string | null;
};

type DrawerClosedState = {
  isDrawerOpened: false;
};

type DashboardPageStoreProps = {
  closeDrawer: () => void;
  drawerState: DrawerOpenedState | DrawerClosedState;
  openDrawer: (params: {
    selectedBadgeId: string | null;
  }) => void;
};

const useDashboardPageStore = create(
  immer<DashboardPageStoreProps>((set) => ({
    closeDrawer: () =>
    {
      set((state) =>
      {
        state.drawerState = {
          isDrawerOpened: false
        };
      });
    },
    drawerState: {
      isDrawerOpened: false
    },
    openDrawer: ({ selectedBadgeId }) =>
    {
      set((state) =>
      {
        state.drawerState = {
          isDrawerOpened: true,
          selectedBadgeId
        };
      });
    },
  }))
);

export default useDashboardPageStore;
