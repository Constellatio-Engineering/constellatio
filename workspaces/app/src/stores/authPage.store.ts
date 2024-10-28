import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type AuthPageStoreProps = {
  lastEnteredEmail: string;
  lastEnteredPassword: string;
};

const useAuthPageStore = create(
  immer<AuthPageStoreProps>(() => ({
    lastEnteredEmail: "",
    lastEnteredPassword: "",
  }))
);

export default useAuthPageStore;
