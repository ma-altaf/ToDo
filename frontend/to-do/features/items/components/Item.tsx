"use client";

import { dateFromISO } from "@/shared/services/utils";
import { TToDoItem } from "../services/types";
import Status from "./ItemStatus";
import { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import UpdateItemModal from "./UpdateItemModal";

export default function Item({ item }: { item: TToDoItem }) {
  const { deadline, title, description, status } = item;
  const [isOpen, setIsOpen] = useState(false);

  const deadlineDate = dateFromISO(deadline);

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
          {deadlineDate.toLocaleDateString("en-ca")}
          <hr className="border-2 mx-2 rounded-full" />
          {deadlineDate.toLocaleTimeString("en-ca", {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
          })}
        </div>
      </span>

      <span className="flex flex-row justify-center items-center h-fit">
        <button
          className="rounded-md p-1 bg-white/10 size-fit mr-2"
          onClick={() => setIsOpen(true)}
        >
          <BiSolidEditAlt />
        </button>

        <Status status={status} />
      </span>

      {isOpen && <UpdateItemModal data={item} setIsOpen={setIsOpen} />}
    </li>
  );
}
