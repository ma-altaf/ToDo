"use client";

import Modal from "@/shared/components/Modal";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useRef,
  useState,
} from "react";
import { TToDoItem } from "../services/types";
import { useTodosContext } from "./TodoProvider";
import { deleteItemById, updateItemById } from "../services/main";
import { dateFromISO } from "@/shared/services/utils";

export default function UpdateItemModal({
  data,
  setIsOpen,
}: {
  data: TToDoItem;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { dispatch, setDbTodos } = useTodosContext();
  const titleRef = useRef(data.title);
  const descriptionRef = useRef(data.description || "");
  const deadlineRef = useRef(dateFromISO(data.deadline));

  const [warning, setWarning] = useState("");

  function submit(title: string, description: string, deadline: Date) {
    if (title.trim().length == 0) return setWarning("Title is required.");
    deadline.setSeconds(0);

    startTransition(() => {
      dispatch({
        type: "update",
        id: data.id,
        data: { title, description, deadline: deadline.toISOString() },
      });
    });

    startTransition(async () => {
      const res = await updateItemById(data.id, {
        title,
        description,
        deadline: deadline.toISOString(),
        status: data.status,
      });

      if (!res) return;

      setDbTodos((prev) =>
        prev.map((item) => {
          if (item.id == res.id) return res;

          return item;
        })
      );
    });

    setIsOpen(false);
  }

  function deleteItem(id: string) {
    startTransition(() =>
      dispatch({
        type: "delete",
        id,
      })
    );

    startTransition(async () => {
      try {
        await deleteItemById(id);

        setDbTodos((prev) => prev.filter((item) => item.id != id));
        setIsOpen(false);
      } catch {
        setWarning("failed to delete.");
      }
    });
  }

  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="w-full rounded-md border-2 border-white/10 flex flex-col p-2">
        <label htmlFor="title">Title:</label>
        <input
          className="py-1 px-2 mb-2 w-full rounded-md bg-white/5"
          id="title"
          type="text"
          defaultValue={titleRef.current}
          onChange={(e) => (titleRef.current = e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          className="py-1 px-2 mb-2 rounded-md bg-white/5"
          rows={3}
          id="description"
          defaultValue={descriptionRef.current}
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

                const timeOffset = e.target.valueAsDate.getTimezoneOffset();

                deadlineRef.current.setHours(
                  e.target.valueAsDate.getHours() + timeOffset / 60
                );
                deadlineRef.current.setMinutes(
                  e.target.valueAsDate.getMinutes()
                );
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
            className="px-3 py-1 rounded-md bg-red-500/10 text-red-500 w-fit mr-auto"
            onClick={() => deleteItem(data.id)}
          >
            Delete
          </button>
          <button
            className="py-1 px-3 mr-2 rounded-md w-fit"
            onClick={() => setIsOpen(false)}
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
    </Modal>
  );
}
