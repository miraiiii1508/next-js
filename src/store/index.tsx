import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalState {
  expendedPlayer: boolean;
  setExpendedPlayer: (expended: boolean) => void;

}

const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        expendedPlayer: false,
        setExpendedPlayer: (expended) => set({ expendedPlayer: expended }),

      }),
      {
        name: "global-storage",
        partialize: (state) => ({ expendedPlayer: state.expendedPlayer }), 
      }
    )
  )
);

export default useGlobalStore;
