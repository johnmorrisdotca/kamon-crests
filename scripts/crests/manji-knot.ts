// The knotted manji in a thread ring, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { itowaNiMusubiManjiBuild } from "./drawn/manji-knot.ts";
import { MANJI_NOTE } from "./plain-forms.ts";
import { defineCrest } from "./util.ts";

export const itowaNiMusubiManji = defineCrest({
  id: "itowa-ni-musubi-manji",
  name: { en: "Knotted manji in a thread ring", ja: "糸輪に結び万字" },
  reading: "いとわにむすびまんじ",
  romaji: "itowa ni musubi manji",
  frame: "ring-thread",
  motifs: [{ motif: "manji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸輪に結び卍", "糸に結まんじ", "knotted manji"],
  note: MANJI_NOTE,
  construction: {
    en: "One broad band is knotted into four round loops, a quarter turn apart inside a thread ring. Each loop is a circle, and the four circles overlap about the middle. Each loop lies over the next one clockwise, so its edge shows there as a narrow paper line, from the notch between the two loops as far as the next loop's eye. The eye is the small opening of the loop: the part of a small circle that lies outside the upper loop's edge, so it is round on one side and follows that edge on the other. A narrow space is left between the loops and the ring, as in the print.",
    ja: "幅の広い一本の帯を結んで丸い輪を四つ作り、糸輪の中に4分の1回転ずつ離して置きます。輪はどれも円で、四つの円は中央で重なります。どの輪も時計回りで次の輪の上に重なり、その縁が細い白い線になります。線は二つの輪の間の切れ込みから、次の輪の目まで引きます。目は輪の小さな穴で、小さな円のうち上の輪の縁より外にある部分です。片側は丸く、もう片側は上の輪の縁に沿います。輪と糸輪の間には、版の通りに細いすき間を空けます。",
  },
  measured: "Frame 30, with the ring's outer radius as 100: the four loops are circles of radius about 49, with their centres about 36 from the middle (30 to 40 in the print, which is a little wider than tall). The eyes are about 20 across and stand at the loops' centres. The edge of each loop runs on over the next loop to that loop's eye and along one side of it. The loops reach about 0.885 of the ring's outer radius. The ring is a double line about 6 apart, drawn as the package's thread ring.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "right page, third row, first column from the right: 糸に結まんじ", ja: "右頁、三段目、右から一列目「糸に結まんじ」" }, read: "2026-11-28", measured: true },
  build: itowaNiMusubiManjiBuild,
});
