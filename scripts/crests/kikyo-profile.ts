import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiHitotsuKikyoBuild } from "./drawn/kikyo-profile.ts";
import { kikyoNoChiruEdaBuild } from "./drawn/kikyo-no-chiru-eda.ts";
import { defineCrest } from "./util.ts";

export const maruNiHitotsuKikyo = defineCrest({
  id: "maru-ni-hitotsu-kikyo",
  name: { en: "One balloon flower in a circle", ja: "丸に一つ桔梗" },
  reading: "まるにひとつききょう",
  romaji: "maru ni hitotsu kikyō",
  frame: "ring-medium",
  motifs: [{ motif: "bellflower", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ一ッききやう"],
  construction: {
    en: "A single side-view flower stands inside a ring. Pointed rear petals rise around a short curl. The two front petals fan from a chalice-shaped base, which curves down to a short foot.",
    ja: "輪の中に、横から見た桔梗を一輪立てます。短い巻きのまわりに、先のとがった奥の花びらが立ちます。手前の二枚は杯のような形から広がり、下には短い曲がった足を置きます。",
  },
  measured: "The ring spans approximately 306 pixels. Its two ruled boundaries are about 20 pixels apart where they meet the horizontal centre line, or about 0.065 of the span. The package ring is 16.8 on a span of 192. The flower extends about 177 pixels across, and from 44 to 301 vertically. Its swept foot and broad front cup are retained. The fan of dark lines becomes seven short ruled white rays.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 41,
    place: { en: "right page, first row, fourth column from the right: 丸ニ一ッききやう", ja: "右頁、一段目、右から四列目「丸ニ一ッききやう」" },
    read: "2026-11-26",
    measured: true,
  },
  build: maruNiHitotsuKikyoBuild,
});

export const kikyoNoChiruEda = defineCrest({
  id: "kikyo-no-chiru-eda",
  name: { en: "Bellflower sprig", ja: "桔梗の散る枝" },
  reading: "ききょうのちるえだ",
  romaji: "kikyō no chiru eda",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 3, arrangement: "single" }],
  families: [],
  aliases: ["桔梗のちる枝"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 40,
    place: {
      en: "left page, second row, third column from the right: 桔梗のちる枝",
      ja: "左頁、二段目、右から三列目「桔梗のちる枝」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "The three open bellflowers, the two long-stalked buds and the three shorter tips follow the printed cell. The three cups and all five buds reuse their own shared outline.",
  construction: {
    en: "Set three solid bellflower cups at different sizes and turns. Cut the rays and stalk seam in one paper width. Five buds sit on the tapering branches.",
    ja: "墨で描いた桔梗を、大きさと向きを変えて三つ置きます。花の筋と枝のすき間を同じ幅で切り、先細りの枝に蕾を五つ置きます。",
  },
  placementBuild: { module: new URL("./drawn/kikyo-no-chiru-eda.ts", import.meta.url), export: "kikyoNoChiruEdaBuild" },
  build: kikyoNoChiruEdaBuild,
});
