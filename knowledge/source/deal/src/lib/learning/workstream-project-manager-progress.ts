import { useCallback, useEffect, useState } from "react";
import type { CapabilityId, Confidence, ModuleId } from "./workstream-project-manager-modules";

export type Attempt = {
  correct: Record<CapabilityId, boolean>;
  confidence: Partial<Record<CapabilityId, Confidence>>;
};

export type WPMProgress = {
  started: ModuleId[];
  completed: ModuleId[];
  diagnostic?: Attempt;
  capstoneFirst?: Attempt;
  capstoneLatest?: Attempt;
  pathwayComplete: boolean;
};

const KEY = "absa-learning-workstream-pm-v2";
const EMPTY: WPMProgress = { started: [], completed: [], pathwayComplete: false };
const EVENT = "absa-wpm-progress";

function read(): WPMProgress {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function useWPMProgress() {
  const [progress, setProgress] = useState<WPMProgress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(read());
    setReady(true);
    const sync = () => setProgress(read());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const update = useCallback((fn: (p: WPMProgress) => WPMProgress) => {
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

export function moduleStatus(p: WPMProgress, id: ModuleId) {
  if (p.completed.includes(id)) return "Complete" as const;
  if (p.started.includes(id)) return "In progress" as const;
  return "Not started" as const;
}
