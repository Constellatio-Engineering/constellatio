import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type CaseStepIndexProps = 0 | 1 | 2;

interface ICaseSolvingStore 
{
  caseStepIndex: CaseStepIndexProps;
  gamesIndexes: number[];
  getNextGameIndex: () => void;
  hasCaseSolvingStarted: boolean | undefined;
  isLastGame: boolean;
  isStepCompleted: boolean;
  latestGameIndex: number;
  setCaseStepIndex: (caseStepIndex: CaseStepIndexProps) => void;
  setGamesIndexes: (gamesIndexes: number[]) => void;
  setHasCaseSolvingStarted: (hasCaseSolvingStarted: boolean) => void;
  setIsStepCompleted: (isCompleted: boolean) => void;
  setShowStepTwoModal: (showStepTwoModal: boolean) => void;
  setSolution: (solution: string) => void;
  showStepTwoModal: boolean;
  solution: string;
}

const useCaseSolvingStore = create(
  immer<ICaseSolvingStore>((set, get) => ({
    caseStepIndex: 0,
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
    hasCaseSolvingStarted: undefined,
    isLastGame: false,
    isStepCompleted: false,
    latestGameIndex: 0,
    setCaseStepIndex: (caseStepIndex) => 
    {
      set((state) => 
      {
        state.caseStepIndex = caseStepIndex;
      });
    },
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
    setSolution: (solution) =>
    {
      set((state) => 
      {
        state.solution = solution;
      });
    },
    showStepTwoModal: false,
    solution: ""
  }))
);

export default useCaseSolvingStore;
