"use client";

import { useState } from "react";
import AddNewItem from "./AddNewItem";

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
