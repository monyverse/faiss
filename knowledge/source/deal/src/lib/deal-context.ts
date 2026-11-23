import { useCallback, useEffect, useState } from "react";

/** The user's current deal selection, kept in the browser so it follows them between pages. */
export type DealContext = { archetypeId: string | null; stageId: string | null };

const KEY = "absa-hub-deal-context-v1";
const EVENT = "absa-hub-deal-context";

function read(): DealContext {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const v = JSON.parse(raw) as Partial<DealContext>;
      return { archetypeId: v.archetypeId ?? null, stageId: v.stageId ?? null };
    }
  } catch {
    /* ignore */
  }
  return { archetypeId: null, stageId: null };
}

export function writeDealContext(next: Partial<DealContext>) {
  if (typeof window === "undefined") return;
  const merged = { ...read(), ...next };
  window.localStorage.setItem(KEY, JSON.stringify(merged));
  window.dispatchEvent(new Event(EVENT));
}

export function useDealContext() {
  const [ctx, setCtx] = useState<DealContext>({ archetypeId: null, stageId: null });
  useEffect(() => {
    const sync = () => setCtx(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const set = useCallback((next: Partial<DealContext>) => writeDealContext(next), []);
  return { ...ctx, set };
}
