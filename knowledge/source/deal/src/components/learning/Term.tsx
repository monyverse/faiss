import type { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * Inline specialist term with a short definition.
 * Opens on tap/click (mobile-friendly) and is keyboard accessible.
 */
export function Term({ children, def }: { children: ReactNode; def: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="cursor-help border-b border-dotted border-maroon/60 font-inherit text-inherit hover:text-maroon focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon/40"
          aria-label={`${typeof children === "string" ? children : "Term"}: definition`}
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs p-3 text-sm leading-snug" side="top">
        {def}
      </PopoverContent>
    </Popover>
  );
}
