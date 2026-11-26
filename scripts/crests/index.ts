// Every crest, in the order of the catalogue: by family of motif, plain shapes first.
import type { CrestDef } from "./types.ts";
import * as geometric from "./geometric.ts";
import * as flowers from "./flowers.ts";
import * as kiri from "./kiri.ts";
import * as leaves from "./leaves.ts";
import * as birds from "./birds.ts";
import * as natural from "./natural.ts";
import * as karahana from "./karahana.ts";
import * as mokko from "./mokko.ts";
import * as objects from "./objects.ts";
import * as plainForms from "./plain-forms.ts";
import * as arms from "./arms.ts";
import * as shapes from "./shapes.ts";
import * as tomoe from "./tomoe.ts";
import * as tier1 from "./tier1.ts";
import * as kikkoVariants from "./kikko-variants.ts";
import * as variants from "./variants.ts";
import * as msPatterns from "./ms-patterns.ts";

const modules: Record<string, unknown>[] = [geometric, shapes, plainForms, tomoe, flowers, karahana, mokko, leaves, kiri, objects, arms, natural, birds, tier1, kikkoVariants, variants, msPatterns];

export const ALL: CrestDef[] = modules.flatMap((m) => Object.values(m)).filter((v): v is CrestDef => typeof v === "object" && v !== null && "build" in v);
