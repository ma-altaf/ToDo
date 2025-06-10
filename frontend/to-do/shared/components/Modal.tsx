import { Dispatch, ReactNode, SetStateAction } from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";

export default function Modal({
  children,
  setIsOpen,
}: {
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <ClientOnlyPortal>
      <div
        onClick={() => setIsOpen(false)}
        className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50"
      >
        {children}
      </div>
    </ClientOnlyPortal>
  );
}
