"use client";

import {
  Dispatch,
  SetStateAction,
  startTransition,
  useRef,
  useState,
} from "react";
import { useTodosContext } from "./TodoProvider";
import { addItem } from "../services/main";

export default function ItemsHeader() {
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  return (
    <div className="w-full mb-2 flex flex-row justify-end">
      {isAddItemOpen ? (
        <AddNewItem setIsAddItemOpen={setIsAddItemOpen} />
      ) : (
        <button
          className="px-3 py-1 rounded-md bg-white/10 flex items-center"
          onClick={() => setIsAddItemOpen(true)}
        >
          Add ToDo
        </button>
      )}
    </div>
  );
}

function AddNewItem({
  setIsAddItemOpen,
}: {
  setIsAddItemOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { dispatch, setDbTodos } = useTodosContext();
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const deadlineRef = useRef(new Date());

  const [warning, setWarning] = useState("");

  function submit(title: string, description: string, deadline: Date) {
    if (title.trim().length == 0) return setWarning("Title is required.");
    deadline.setSeconds(0);
    startTransition(() => {
      dispatch({
        type: "add",
        data: { title, description, deadline: deadline.toISOString() },
      });
    });

    startTransition(async () => {
      const res = await addItem({
        title,
        description,
        deadline: deadline.toISOString(),
      });

      setDbTodos((prev) => [res, ...prev]);
    });

    setIsAddItemOpen(false);
  }

  return (
    <div className="w-full rounded-md border-2 border-white/10 flex flex-col p-2">
      <label htmlFor="title">Title:</label>
      <input
        className="py-1 px-2 mb-2 w-full rounded-md bg-white/5"
        id="title"
        type="text"
        onChange={(e) => (titleRef.current = e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        className="py-1 px-2 mb-2 rounded-md bg-white/5"
        rows={3}
        id="description"
        onChange={(e) => (descriptionRef.current = e.target.value)}
      />

      <p>Deadline:</p>
      <span className="flex flex-col md:flex-row justify-center items-center mb-2">
        <label
          htmlFor="deadline-date"
          className="w-full flex flex-row justify-center items-center"
        >
          Date:
          <input
            className="py-1 px-2 ml-1 w-full rounded-md bg-white/5"
            id="deadline-date"
            type="date"
            defaultValue={deadlineRef.current.toLocaleDateString("en-ca")}
            onChange={(e) => {
              if (!e.target.valueAsDate) return;

              deadlineRef.current.setDate(e.target.valueAsDate.getDate() + 1);
              deadlineRef.current.setMonth(e.target.valueAsDate.getMonth());
              deadlineRef.current.setFullYear(
                e.target.valueAsDate.getFullYear()
              );
            }}
          />
        </label>

        <hr className="size-5 border-0" />

        <label
          htmlFor="deadline-time"
          className="w-full flex flex-row justify-center items-center"
        >
          Time:
          <input
            className="py-1 px-2 ml-1 w-full rounded-md bg-white/5"
            id="deadline-time"
            type="time"
            defaultValue={deadlineRef.current.toLocaleTimeString("it-IT", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            onChange={(e) => {
              if (!e.target.valueAsDate) return;

              deadlineRef.current.setHours(e.target.valueAsDate.getHours() + 1);
              deadlineRef.current.setMinutes(e.target.valueAsDate.getMinutes());
            }}
          />
        </label>
      </span>

      {warning && (
        <div className="py-1 px-2 mb-2 rounded-md text-amber-500 bg-amber-500/10">
          {warning}
        </div>
      )}

      <span className="w-full flex flex-row justify-end">
        <button
          className="py-1 px-3 mr-2 rounded-md w-fit"
          onClick={() => setIsAddItemOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 rounded-md bg-white/10 w-fit"
          onClick={() =>
            submit(
              titleRef.current,
              descriptionRef.current,
              deadlineRef.current
            )
          }
        >
          Submit
        </button>
      </span>
    </div>
  );
}
