// Every crest, in the order of the catalogue: by family of motif, plain shapes first.
import type { CrestDef } from "./types.ts";
import * as geometric from "./geometric.ts";
import * as flowers from "./flowers.ts";
import * as kiri from "./kiri.ts";
import * as leaves from "./leaves.ts";
import * as birds from "./birds.ts";
import * as natural from "./natural.ts";
import * as ume from "./ume.ts";
import * as kiku from "./kiku.ts";
import * as karahana from "./karahana.ts";
import * as mokko from "./mokko.ts";
import * as objects from "./objects.ts";
import * as uchiwa from "./uchiwa.ts";
import * as ogi from "./ogi.ts";
import * as plainForms from "./plain-forms.ts";
import * as arms from "./arms.ts";
import * as shapes from "./shapes.ts";
import * as tomoe from "./tomoe.ts";
import * as tier1 from "./tier1.ts";
import * as kikkoVariants from "./kikko-variants.ts";
import * as greatLeaves from "./great-leaves.ts";
import * as variants from "./variants.ts";
import * as kakuMeyui from "./kaku-meyui.ts";
import * as hikiryo from "./hikiryo.ts";
import * as lattice from "./lattice.ts";
import * as meyui from "./meyui.ts";
import * as inazuma from "./inazuma.ts";
import * as wachigai from "./wachigai.ts";
import * as shippo from "./shippo.ts";
import * as kaku from "./kaku.ts";
import * as yukiwa from "./yukiwa.ts";

import * as kai from "./kai.ts";
import * as iori from "./iori.ts";

import * as fuji from "./fuji.ts";
import * as gaku from "./gaku.ts";

const modules: Record<string, unknown>[] = [geometric, fuji, kai, shapes, plainForms, tomoe, flowers, kiku, ume, karahana, mokko, leaves, kiri, objects, arms, natural, birds, tier1, kikkoVariants, greatLeaves, variants, kakuMeyui, hikiryo, lattice, meyui, ogi, iori, inazuma, uchiwa, gaku, wachigai, shippo, kaku, yukiwa, sakura, kikyo, kikyoKnots];
import * as sakura from "./sakura.ts";

import * as kikyo from "./kikyo.ts";

import * as kikyoKnots from "./kikyo-knots.ts";


export const ALL: CrestDef[] = modules.flatMap((m) => Object.values(m)).filter((v): v is CrestDef => typeof v === "object" && v !== null && "build" in v);
