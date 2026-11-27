import type { BookSource } from "./crests/types.ts";

export function writeBookStates(catalogue: readonly { id: string; no: number; source?: BookSource }[]): void;
