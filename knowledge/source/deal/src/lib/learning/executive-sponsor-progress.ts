import { useCallback, useEffect, useState } from "react";
import type { CapabilityId, Confidence, ModuleId } from "./executive-sponsor-modules";

export type Attempt = {
  correct: Record<CapabilityId, boolean>;
  confidence: Partial<Record<CapabilityId, Confidence>>;
};

export type ESProgress = {
  started: ModuleId[];
  completed: ModuleId[];
  diagnostic?: Attempt;
  capstoneFirst?: Attempt;
  capstoneLatest?: Attempt;
  pathwayComplete: boolean;
};

const KEY = "absa-learning-executive-sponsor-v2";
const EMPTY: ESProgress = { started: [], completed: [], pathwayComplete: false };
const EVENT = "absa-es-progress";

function read(): ESProgress {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function useESProgress() {
  const [progress, setProgress] = useState<ESProgress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(read());
    setReady(true);
    const sync = () => setProgress(read());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const update = useCallback((fn: (p: ESProgress) => ESProgress) => {
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

export const addUnique = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr : [...arr, v]);

export function moduleStatus(p: ESProgress, id: ModuleId) {
  if (p.completed.includes(id)) return "Complete" as const;
  if (p.started.includes(id)) return "In progress" as const;
  return "Not started" as const;
}
