"use client";

import { createContext, Dispatch, SetStateAction, use, useState } from "react";
import { TToDoItem } from "../services/types";

const todoContext = createContext<
  [TToDoItem[], Dispatch<SetStateAction<TToDoItem[]>>] | undefined
>(undefined);

export default function TodoContextProvider({
  children,
  todosPromise,
}: {
  children: React.ReactNode;
  todosPromise: Promise<TToDoItem[]>;
}) {
  const todosState = useState(use(todosPromise));

  return (
    <todoContext.Provider value={todosState}>{children}</todoContext.Provider>
  );
}

export function useTodosContext() {
  const context = use(todoContext);
  if (!context) {
    throw new Error("useEventContext must be within a TodoContextProvider");
  }
  return context;
}
