// Every crest, in the order of the catalogue: by family of motif, plain shapes first.
import type { CrestDef } from "./types.ts";
import * as geometric from "./geometric.ts";
import * as flowers from "./flowers.ts";
import * as kiri from "./kiri.ts";
import * as leaves from "./leaves.ts";
import * as natural from "./natural.ts";
import * as objects from "./objects.ts";
import * as tomoe from "./tomoe.ts";

const modules: Record<string, unknown>[] = [geometric, tomoe, flowers, leaves, kiri, objects, natural];

export const ALL: CrestDef[] = modules.flatMap((m) => Object.values(m)).filter((v): v is CrestDef => typeof v === "object" && v !== null && "build" in v);
