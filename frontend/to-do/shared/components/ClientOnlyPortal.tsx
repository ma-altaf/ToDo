"use client";

import { useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ClientOnlyPortal({
  children,
}: {
  children: ReactNode;
}) {
  const portalRef = useRef<HTMLElement>(document.getElementById("portal"));

  return portalRef.current && createPortal(children, portalRef.current);
}
