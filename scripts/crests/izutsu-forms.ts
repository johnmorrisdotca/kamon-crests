import { R } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { hanagataIzutsuBuild, izutsuBuild } from "./drawn/families.ts";
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

export const sumitateIzutsu = defineCrest({
  id: "sumitate-izutsu",
  name: { en: "Well curb on point", ja: "隅立て井筒" },
  reading: "すみたていづつ",
  romaji: "sumitate izutsu",
  frame: "none",
  motifs: [{ motif: PART, count: 1, arrangement: "single" }],
  families: [],
  aliases: ["角立いづつ"],
  construction: {
    en: "Four broad rails form a well curb turned onto one corner. The inner hole is square and each pair of projecting ends is cut with the same straight edges.",
    ja: "幅のある材を四本組み、井筒を隅で立てます。中央の穴は正方形で、外へ出る材の端は対になるよう直線でそろえます。",
  },
  measured: "The axis through the opening and a pair of opposite projecting ends turns 45 degrees from the square form. The small opening retains the relative size of the printed well curb.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, third row, first column from the right: 角立いづつ", ja: "右頁、三段目、右から一列目「角立いづつ」" }, read: READ, measured: true },
  build(c) {
    izutsuBuild(c, PART, R, { turn: 45 });
  },
});

export const sumitateHosoIzutsu = defineCrest({
  id: "sumitate-hoso-izutsu",
  name: { en: "Thin well curb on point", ja: "隅立て細井筒" },
  reading: "すみたてほそいづつ",
  romaji: "sumitate hoso izutsu",
  frame: "none",
  motifs: [{ motif: PART, count: 1, arrangement: "single" }],
  families: [],
  aliases: ["角立細いづつ"],
  construction: {
    en: "Four narrow rails stand on the corner of a square. The space inside covers about half the width of the whole drawing, and the rail ends project well past their crossings.",
    ja: "細い材を四本組み、正方形の隅で立てます。中の穴は全体の幅の約半分を占め、材の端は交わるところから外へ出ます。",
  },
  measured: "The four rails keep the same rule as the broad curb on point but narrow to half its rail width, matching the large opening in the original.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, fourth row, first column from the right: 角立細いづつ", ja: "右頁、四段目、右から一列目「角立細いづつ」" }, read: READ, measured: true },
  build(c) {
    izutsuBuild(c, PART, R, { turn: 45, inner: 42, outer: 69 });
  },
});
