"use client";

import React, { useState } from "react";
import { EStatus, TToDoItem } from "../services/types";
import StatusInner from "./StatusInner";
import UpdateStatus from "./UpdateStatus";

export default function Status({
  status,
  item,
}: {
  status: EStatus;
  item: TToDoItem;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative">
      <div onClick={() => item.status != EStatus.syncing && setIsOpen(true)}>
        <StatusInner status={status} />
      </div>

      {isOpen && <UpdateStatus item={item} setIsOpen={setIsOpen} />}
    </span>
  );
}
