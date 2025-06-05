"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  use,
  useOptimistic,
  useState,
} from "react";
import { EStatus, TToDoItem, TToDoReducer } from "../services/types";

const todoContext = createContext<
  | {
      todos: TToDoItem[];
      dispatch: (action: TToDoReducer) => void;
      setDbTodos: Dispatch<SetStateAction<TToDoItem[]>>;
    }
  | undefined
>(undefined);

export default function TodoContextProvider({
  children,
  todosPromise,
}: {
  children: React.ReactNode;
  todosPromise: Promise<TToDoItem[]>;
}) {
  const [dbTodos, setDbTodos] = useState(use(todosPromise));

  const [todos, dispatch] = useOptimistic(dbTodos, reducer);

  function reducer(state: TToDoItem[], action: TToDoReducer) {
    switch (action.type) {
      case "add": {
        const { deadline, title, description } = action.data;

        const optTodo: TToDoItem = {
          id: crypto.randomUUID(),
          title,
          description,
          deadline,
          status: EStatus.syncing,
        };

        return [optTodo, ...state];
      }

      case "update": {
        const { deadline, title, description } = action.data;

        const optTodo: TToDoItem = {
          id: action.id,
          title,
          description,
          deadline,
          status: EStatus.syncing,
        };

        state.map((item) => {
          if (item.id == action.id) return optTodo;

          return item;
        });

        return [...state];
      }
      case "delete": {
        return state.filter(({ id }) => action.id != id);
      }
    }
  }

  return (
    <todoContext.Provider value={{ todos, dispatch, setDbTodos }}>
      {children}
    </todoContext.Provider>
  );
}

export function useTodosContext() {
  const context = use(todoContext);
  if (!context) {
    throw new Error("useEventContext must be within a TodoContextProvider");
  }
  return context;
}
