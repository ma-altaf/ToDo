"use client";

import { TToDoItem } from "../services/types";
import Status from "./ItemStatus";

export default function Item({ item }: { item: TToDoItem }) {
  const { deadline, title, description, status } = item;

  const deadlineDate = new Date(deadline);

  return (
    <li className="w-full p-2 flex flex-row">
      <span className="w-full">
        <p className="text-xl font-bold">{title}</p>
        <p className="pb-2">{description}</p>
        <div
          suppressHydrationWarning
          className={`px-1.5 flex flex-row items-center rounded-md w-fit ${
            deadlineDate.getTime() < new Date().getTime()
              ? "bg-red-500/10 text-red-500"
              : "bg-white/10"
          }`}
        >
          {deadlineDate.toLocaleDateString()}
          <hr className="border-2 mx-2 rounded-full" />
          {deadlineDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h24",
          })}
        </div>
      </span>
      <Status status={status} />
    </li>
  );
}
