import { mapToObject } from "@/utils/object";

import { enableMapSet } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  todos: Map<"priv" | "pub", {
    todos: Todo[];
  }>;
  toggleTodo: (type: "priv" | "pub", todo: Todo) => void;
}

const storeName = "todos-store";

export const useTodosStore = create(
  persist(
    immer<TodosStore>((set) =>
    {
      return ({
        todos: new Map([
          ["priv", { todos: [] }],
          ["pub", { todos: [] }]
        ]),
        toggleTodo: (type, todo) => set((state) =>
        {
          const { todos } = state;

          const todoIndex = todos.get(type)!.todos.findIndex(t => t.id === todo.id);
          const isTodoAlreadyAdded = todoIndex !== -1;

          if(isTodoAlreadyAdded)
          {
            todos.get(type)!.todos.splice(todoIndex, 1);
          }
          else
          {
            todos.get(type)!.todos.push(todo);
          }
        }),
      });
    }),
    {
      name: storeName,
      storage: {
        getItem: (key) =>
        {
          let storedValue: string | null;

          if(getUrlSearch())
          {
            const searchParams = new URLSearchParams(getUrlSearch());
            storedValue = searchParams.get(key);
          }
          else
          {
            storedValue = localStorage.getItem(key);
          }

          if(storedValue == null)
          {
            return null;
          }

          const itemParsed = JSON.parse(storedValue);

          const item = {
            ...itemParsed,
            state: {
              todos: new Map(Object.entries(itemParsed.state.todos))
            }
          };

          return item;
        },
        removeItem: (key) =>
        {
          const searchParams = new URLSearchParams(getUrlSearch());
          searchParams.delete(key);
          window.location.search = searchParams.toString();
        },
        setItem: (key, item) =>
        {
          const itemParsed = {
            ...item,
            state: {
              todos: mapToObject(item.state.todos)
            }
          };

          const itemStringified = JSON.stringify(itemParsed);
          const searchParams = new URLSearchParams(getUrlSearch());

          searchParams.set(key, itemStringified);
          window.history.replaceState(null, "", `?${searchParams.toString()}`);
          localStorage.setItem(key, itemStringified);
        },
      }
    }
  )
);
