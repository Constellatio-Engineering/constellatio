import { enableMapSet } from "immer";
import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

enableMapSet();

type Todo = {
  id: string;
  title: string;
};

export const todo1: Todo = {
  id: "1",
  title: "Todo 1",
};

export const todo2: Todo = {
  id: "2",
  title: "Todo 2",
};

export const todo3: Todo = {
  id: "3",
  title: "Todo 3",
};

const getUrlSearch = () => 
{
  return window.location.search.slice(1);
};

interface TodosStore
{
  /* todos: Map<"private" | "public", {
    todos: Todo[];
  }>*/
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
}

type PersistentStoreProps = Pick<TodosStore, "todos">;

const persistentStorage: StateStorage = {
  getItem: (key) =>
  {
    console.log("getting item", key);

    if(typeof window === "undefined")
    {
      return null;
    }

    let storedValue: string | null;

    if(getUrlSearch())
    {
      const searchParams = new URLSearchParams(getUrlSearch());
      storedValue = searchParams.get(key);
    }
    else
    {
      storedValue = localStorage?.getItem(key);
    }

    if(storedValue == null)
    {
      return null;
    }

    return JSON.parse(storedValue) as string;
  },
  removeItem: (key) =>
  {
    const searchParams = new URLSearchParams(getUrlSearch());
    searchParams.delete(key);
    window.location.search = searchParams.toString();
  },
  setItem: (key, newValue) =>
  {
    /* if(window.location.pathname === "/test")
    {
      const searchParams = new URLSearchParams(getUrlSearch());
      searchParams.set(key, JSON.stringify(newValue));
      window.history.replaceState(null, "", `?${searchParams.toString()}`);
    }*/

    const searchParams = new URLSearchParams(getUrlSearch());
    searchParams.set(key, JSON.stringify(newValue));
    window.history.replaceState(null, "", `?${searchParams.toString()}`);
    localStorage.setItem(key, JSON.stringify(newValue));
  },
};

const storeName = "todos-store";

export const useTodosStore = create(
  persist(
    immer<TodosStore>((set) =>
    {
      return ({
        todos: [],
        toggleTodo: (todo) => set((state) =>
        {
          const { todos } = state;

          const todoIndex = todos.findIndex(t => t.id === todo.id);
          const isTodoAlreadyAdded = todoIndex !== -1;

          if(isTodoAlreadyAdded)
          {
            todos.splice(todoIndex, 1);
          }
          else
          {
            todos.push(todo);
          }
        }),
      });
    }),
    {
      name: storeName,
      partialize: (state) => ({ todos: state.todos }),
      storage: createJSONStorage<PersistentStoreProps>(() => persistentStorage),
    }
  )
);
