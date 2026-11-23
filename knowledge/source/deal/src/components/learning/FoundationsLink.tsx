import { Link } from "@tanstack/react-router";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { useFoundationsProgress } from "@/lib/learning/foundations-progress";

/** Thin strip shown on every role pathway linking back to the shared M&A Foundations pathway. */
export function FoundationsLink() {
  const { progress, ready } = useFoundationsProgress();
  const done = ready && progress.pathwayComplete;
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2 text-xs sm:px-6">
        <span aria-hidden>
          {done ? <CheckCircle2 className="h-4 w-4 text-maroon" /> : <GraduationCap className="h-4 w-4 text-maroon" />}
        </span>
        <span key={done ? "d" : "n"} className="text-muted-foreground">
          {done ? "M&A Foundations complete." : "New to M&A? Start with the shared M&A Foundations pathway."}
        </span>
        <Link to="/learning/foundations" className="font-medium text-maroon hover:underline">
          <span key={done ? "r" : "o"}>{done ? "Review" : "Open M&A Foundations"}</span>
        </Link>
      </div>
    </div>
  );
}
