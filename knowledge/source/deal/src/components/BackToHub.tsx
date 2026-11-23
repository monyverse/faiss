import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/** Compact link back to the Capability Hub homepage, shown at the top of a page. */
export function BackToHub({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-maroon ${className}`}
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back to the M&amp;A Capability Hub
    </Link>
  );
}
