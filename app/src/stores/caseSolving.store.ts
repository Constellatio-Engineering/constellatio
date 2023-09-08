import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ICaseSolvingStore 
{
  gamesIndexes: number[];
  getNextGameIndex: () => void;
  hasCaseSolvingStarted: boolean;
  isLastGame: boolean;
  latestGameIndex: number ;
  setGamesIndexes: (gamesIndexes: number[]) => void;
  setHasCaseSolvingStarted: (hasCaseSolvingStarted: boolean) => void;
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
  }))
);

export default useCaseSolvingStore;
