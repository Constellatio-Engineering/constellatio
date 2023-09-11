import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ICaseSolvingStore 
{
  gamesIndexes: number[];
  getNextGameIndex: () => void;
  hasCaseSolvingStarted: boolean;
  isLastGame: boolean;
  isStepCompleted: boolean;
  latestGameIndex: number ;
  setGamesIndexes: (gamesIndexes: number[]) => void;
  setHasCaseSolvingStarted: (hasCaseSolvingStarted: boolean) => void;
  setIsStepCompleted: (isCompleted: boolean) => void;
  setShowStepTwoModal: (showStepTwoModal: boolean) => void;
  showStepTwoModal: boolean;
  solution: string;
  setSolution: (solution: string) => void;
}

const useCaseSolvingStore = create(
  immer<ICaseSolvingStore>((set, get) => ({
    gamesIndexes: [],
    getNextGameIndex: () => 
    {
      set((state) => 
      {
        const currentGameIndex = get().gamesIndexes.indexOf(get().latestGameIndex);
        const gamesIndexes = get().gamesIndexes.length - 1;
        if(currentGameIndex < gamesIndexes) 
        {
          const nextGameIndex = get().gamesIndexes[currentGameIndex + 1];
          if(nextGameIndex !== undefined) 
          {
            state.latestGameIndex = nextGameIndex;
          } 
        }
        else if(currentGameIndex !== -1 && currentGameIndex === get().gamesIndexes.length - 1) 
        {
          state.isLastGame = true;
        }
      });
    },
    hasCaseSolvingStarted: false,
    isLastGame: false,
    isStepCompleted: false,
    latestGameIndex: 0,
    setGamesIndexes: (gamesIndexes) => 
    {
      set((state) => 
      {
        state.gamesIndexes = gamesIndexes;
      });
    },
    setHasCaseSolvingStarted: (hasCaseSolvingStarted) => 
    {
      set((state) => 
      {
        state.hasCaseSolvingStarted = hasCaseSolvingStarted;
      });
    },
    setIsStepCompleted(isCompleted) 
    {
      set((state) => 
      {
        state.isStepCompleted = isCompleted;
      });
    },
    setShowStepTwoModal: (showStepTwoModal) =>
    {
      set((state) => 
      {
        state.showStepTwoModal = showStepTwoModal;
      });
    },
    showStepTwoModal: false,
    solution: "",
    setSolution: (solution) =>
    {
      set((state) => 
      {
        state.solution = solution;
      });
    }

  }))
);

export default useCaseSolvingStore;
