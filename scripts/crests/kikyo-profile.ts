import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiHitotsuKikyoBuild } from "./drawn/kikyo-profile.ts";
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
