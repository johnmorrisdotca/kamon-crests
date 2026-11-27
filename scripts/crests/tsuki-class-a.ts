import { disc, thickSeg, toPath, type V } from "../construct/compass.ts";
import { R, circle } from "../construct/geo.ts";
import { mikazukiBuild } from "./drawn/plain.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const futsukaZukiMitsuBoshi = defineCrest({
  id: "futsuka-zuki-mitsu-boshi",
  name: { en: "Second-day crescent and three stars", ja: "二日月三つ星" },
  reading: "ふつかづきみつぼし",
  romaji: "futsuka zuki mitsu boshi",
  frame: "none",
  motifs: [
    { motif: "crescent", count: 1, arrangement: "single" },
    { motif: "star", count: 3, arrangement: "triangle" },
  ],
  families: [],
  aliases: ["二日月三ッ星"],
  source: cell(23, "right page, row 1, third column from the right: 二日月三ッ星", "右頁、一段目、右から三列目「二日月三ッ星」"),
  measured: "The horns point to the upper right and the lower left. Three equal stars lie inside the open side, with two ruled links meeting at the upper-left star.",
  construction: {
    en: "Strike the crescent with its horns opening across the upper-left side. Join three star discs with two narrow ruled bars meeting at one disc.",
    ja: "左上を開いた二日月を打ち、その内側に星を三つ置きます。うち一つを支点にして、二本の細い直線で星をつなぎます。",
  },
  build(c) {
    mikazukiBuild(c, "crescent", R, { cutAngle: 125, cutOffset: 21.5, cutRadius: 94.8 });
    const dots: V[] = [[-42, 61], [22, 58], [-65, -4]];
    c.group(() => {
      for (const at of [dots[1], dots[2]]) {
        c.fill("star", toPath([thickSeg(dots[0], at, 4.9)], { k: 1 }));
      }
      for (const at of dots) c.fill("star", toPath([disc(at, 13.3)], { k: 1 }));
    });
  },
});

export const tsukiHoshi = defineCrest({
  id: "tsuki-hoshi",
  name: { en: "Crescent and star", ja: "月星" },
  reading: "つきほし",
  romaji: "tsuki hoshi",
  frame: "none",
  motifs: [
    { motif: "crescent", count: 1, arrangement: "single" },
    { motif: "star", count: 1, arrangement: "single" },
  ],
  families: [],
  aliases: ["月ほし"],
  source: cell(23, "right page, row 4, second column from the right: 月ほし", "右頁、四段目、右から二列目「月ほし」"),
  measured: "A single round star stands high toward the left, between the crescent horns. The crescent uses the package's existing compass construction.",
  construction: {
    en: "Strike the crescent, then a single star disc high on the left between its horns.",
    ja: "三日月を打ち、その両端の間の左上に星を一つ打ちます。",
  },
  build(c) {
    mikazukiBuild(c, "crescent", R);
    c.fill("star", circle([57, 32], 15.4));
  },
});
