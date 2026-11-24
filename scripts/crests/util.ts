// Small helpers shared by the crest definitions.
import type { CrestDef, FamilyUse } from "./types.ts";

export const defineCrest = (def: CrestDef): CrestDef => def;

/** A family or clan: English, Japanese, and the Japanese's reading. */
export const fam = (en: string, ja: string, reading?: string): FamilyUse => ({ en, ja, ...(reading === undefined ? {} : { reading }) });
