"use client";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn btn-primary btn-sm gap-2"
    >
      <Printer className="w-3.5 h-3.5" />
      Print / Save PDF
    </button>
  );
}
