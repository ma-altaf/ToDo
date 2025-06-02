"use client";

import { LuListTodo } from "react-icons/lu";
import { useTodosContext } from "./TodoProvider";
import Item from "./Item";

export default function ItemsList() {
  const { todos } = useTodosContext();

  return (
    <ul className="grid grid-flow-row h-full">
      {todos.length > 0 ? (
        todos.map((item, i) => (
          <span key={i}>
            <Item item={item} />
            {i < todos.length && <hr className="w-full my-2 border-white/10" />}
          </span>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-full text-white/45">
          <LuListTodo className="size-1/4 mb-2" />
          <p>No Todos</p>
        </div>
      )}
    </ul>
  );
}
