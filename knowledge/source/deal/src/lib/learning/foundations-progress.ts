import { useCallback, useEffect, useState } from "react";

export type FoundationsProgress = {
  started: string[];
  completed: string[];
  /** Ranked question ids chosen in the opening scenario. */
  opening?: string[];
  /** Closing scenario answers: decision index -> option index (original order). */
  closing?: Record<number, number>;
  diagnosticPassed?: boolean;
  pathwayComplete: boolean;
};

const KEY = "absa-learning-foundations-v1";
const EVENT = "absa-foundations-progress";
const EMPTY: FoundationsProgress = { started: [], completed: [], pathwayComplete: false };

function read(): FoundationsProgress {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function useFoundationsProgress() {
  const [progress, setProgress] = useState<FoundationsProgress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(read());
    setReady(true);
    const sync = () => setProgress(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (p: FoundationsProgress) => FoundationsProgress) => {
    const next = fn(read());
    window.localStorage.setItem(KEY, JSON.stringify(next));
    setProgress(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const reset = useCallback(() => {
    window.localStorage.removeItem(KEY);
    setProgress(EMPTY);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { progress, ready, update, reset };
}

export const addOnce = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr : [...arr, v]);
