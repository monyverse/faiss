import { createServerFn } from "@tanstack/react-start";

import { readRuntimeConfig } from "../server/runtime-config";

export type { RuntimeConfig } from "../server/runtime-config";

/** Runs on the server; the root route loads it so the config arrives inside the first HTML. */
export const getRuntimeConfig = createServerFn({ method: "GET" }).handler(() => readRuntimeConfig());
