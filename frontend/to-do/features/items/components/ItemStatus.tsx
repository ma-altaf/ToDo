import React from "react";
import { EStatus } from "../services/types";

export default function Status({ status }: { status: EStatus }) {
  const main = () => {
    switch (status) {
      case EStatus.syncing:
        return (
          <div className="size-3 border-2 border-white/25 border-r-white bg-white/10 rounded-full animate-spin"></div>
        );

      case EStatus.blocked:
        return (
          <div className="size-3 border-2 border-red-500 bg-red-500/10 rounded-full animate-spin"></div>
        );

      case EStatus.completed:
        return (
          <div className="size-3 border-2 border-green-500 bg-green-500/10 rounded-full"></div>
        );

      case EStatus.todo:
        return (
          <div className="size-3 border-2 border-white bg-white/10 rounded-full"></div>
        );

      default:
        return <p className="text-xs">?</p>;
    }
  };
  return (
    <>
      <div onClick={() => console.log("Todo: Status change")}>{main()}</div>
    </>
  );
}
