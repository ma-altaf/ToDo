"use client";

import { useTodosContext } from "./TodoProvider";

export default function ItemsList() {
  const [todos] = useTodosContext();
  return (
    <ul className="grid grid-flow-row gap-2">
      {todos.map(({ id, title, description }) => (
        <li className="border-l-2 p-2" key={id}>
          <p>{title}</p>
          <p>{description}</p>
        </li>
      ))}
    </ul>
  );
}
