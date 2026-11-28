import { SHINSEN_MONCHO } from "./books.ts";
import { chuwaNiHitotsuIkariBuild } from "./drawn/ikari.ts";
import { mitsuTsunaIkariBuild } from "./drawn/mitsu-tsuna-ikari.ts";
import { defineCrest } from "./util.ts";

export const chuwaNiHitotsuIkari = defineCrest({
  id: "chuwa-ni-hitotsu-ikari",
  name: { en: "Anchor in a ring", ja: "中輪に一つ錨" },
  reading: "ちゅうわにひとついかり",
  romaji: "chūwa ni hitotsu ikari",
  frame: "ring-thin",
  motifs: [{ motif: "anchor", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中ワニ一ッいかり", "中輪に一つ碇"],
  construction: {
    en: "Two pairs of curved flukes spread from the top of an upright shank. An open round eye sits below them, and a thin ring encloses the anchor.",
    ja: "縦の柄の上部から、弧を描く爪を左右一対ずつ上下二段に広げます。柄の下端に白く抜いた丸い環をつけ、錨を細い輪で囲みます。",
  },
  measured: "With the ring radius set to 96, the print's upper and lower flukes reach about 68 and 73 units sideways. The upper pair uses arcs of radius 45 and 47.5, with right-hand centres near (37, 2) and (53, -10). The lower pair uses radii 39 and 51 at (38, -22) and (44, -47). The stem is about 14 units wide, and the eye is about 55 below the centre, with radii 17.5 and 9.5. The printed ring is about 6 units thick, so the catalogue's thin ring is used. The two pairs and the eye are aligned on one upright.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "right page, third row, fourth column from the right: 中ワニ一ッいかり", ja: "右頁、三段目、右から四列目「中ワニ一ッいかり」" }, read: "2026-11-27", measured: true },
  build: chuwaNiHitotsuIkariBuild,
});

export const mitsuTsunaIkari = defineCrest({
  id: "mitsu-tsuna-ikari",
  name: { en: "Three anchors with rope", ja: "三つ綱錨" },
  reading: "みつつないかり",
  romaji: "mitsu tsuna ikari",
  frame: "none",
  motifs: [{ motif: "anchor", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッつないかり"],
  construction: {
    en: "Turn three identical anchors around the twisted rope. Their eyes attach to the rope and the paired hooked flukes leave open paper between the anchors.",
    ja: "撚り綱に環をつけ、同じ錨を三つ回して並べます。曲がる爪を二対ずつ置き、錨の間に白を残します。",
  },
  measured: "The labelled rope circle is about 304 pixels across, with three eyes set along its inside edge. The working rope has a 92-unit centreline radius and 84 identical cuts. The three eyes and anchors take exact one-third turns.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "right page, second row, fourth column from the right: 三ッつないかり", ja: "右頁、二段目、右から四列目「三ッつないかり」" }, read: "2026-11-28", measured: true },
  build: mitsuTsunaIkariBuild,
});
