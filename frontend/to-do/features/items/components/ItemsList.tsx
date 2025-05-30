"use client";

import { useTodosContext } from "./TodoProvider";

export default function ItemsList() {
  const { todos } = useTodosContext();

  return (
    <ul className="grid grid-flow-row gap-2 h-full">
      {todos.length > 0 ? (
        todos.map(({ id, title, description, deadline }) => (
          <li className="border-l-2 p-2" key={id}>
            <p>{title}</p>
            <p>{description}</p>
            <p>{deadline}</p>
            <p>{id}</p>
          </li>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">No Todos!</div>
      )}
    </ul>
  );
}
