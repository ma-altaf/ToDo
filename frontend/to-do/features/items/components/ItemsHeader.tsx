"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { addItem } from "../services/main";
import { useTodosContext } from "./TodoProvider";

export default function ItemsHeader() {
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  return (
    <div className="w-full p-1 flex flex-row justify-end">
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
  const [, setTodos] = useTodosContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [warning, setWarning] = useState("");

  function submit(title: string, description: string) {
    addItem({ title, description })
      .then((res) => {
        setTodos((prev) => [res, ...prev]);
        setIsAddItemOpen(false);
      })
      .catch((e) => {
        setWarning(e.message);
      });
  }

  return (
    <div className="w-full rounded-md border-2 border-white/10 flex flex-col p-2">
      <label htmlFor="title">Title:</label>
      <input
        className="py-1 px-2 mb-2 w-full rounded-md bg-white/5"
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        className="py-1 px-2 mb-2 rounded-md bg-white/5"
        rows={3}
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

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
          onClick={() => submit(title, description)}
        >
          Submit
        </button>
      </span>
    </div>
  );
}
