import { R } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { hanagataIzutsuBuild } from "./drawn/families.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";
const PART = "well-frame";

export const hanagataIzutsu = defineCrest({
  id: "hanagata-izutsu",
  name: { en: "Flower-shaped well curb", ja: "花形井筒" },
  reading: "はながたいづつ",
  romaji: "hanagata izutsu",
  frame: "none",
  motifs: [{ motif: PART, count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花形いづつ"],
  construction: {
    en: "Upright and diagonal well rails alternate around an octagonal opening. Four pairs of squared ends project between the crossed rails, giving the well its flower-shaped outline.",
    ja: "縦横と斜めの井筒の材を八角形の穴の周りに組みます。交わる材の間から角ばった端が二つずつ四か所に出て、花形の外縁になります。",
  },
  measured: "One set of rails turns half a right angle from the other. The regular opening and the squared ends follow the straight edges of the printed flower shape.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, first row, second column from the right: 花形いづつ", ja: "右頁、一段目、右から二列目「花形いづつ」" }, read: READ, measured: true },
  build(c) {
    hanagataIzutsuBuild(c, PART, R);
  },
});
