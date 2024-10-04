import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { querystring } from "./zustand-querystring/src/index";
// import { querystring } from "zustand-querystring";

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

interface TodosStore
{
  todos: Map<"priv" | "pub", {
    todos: Todo[];
  }>;
  // todos: Todo[];
  toggleTodo: (type: "priv" | "pub", todo: Todo) => void;
}

export const useTodosStore = create(
  querystring(
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
      key: "todos-store-new",
      select: (pathname) => ({
        todos: pathname === "/test",
      }),
    }
  )
);
