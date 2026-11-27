import { bowedArc, carve, disc } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow: number];
const points: readonly Mark[] = [
  [135, 215, 4], [158, 212, 5], [171, 226, 4], [167, 240, 4],
  [151, 247, 3], [145, 258, 4], [132, 255, 4], [130, 243, 3], [138, 232, 2],
];
const p = (x: number, y: number): V => [(x - 157) * .61, (234 - y) * .61];
const outline: Region = points.map(([x, y, bow], index) => {
  const [u, v] = points[(index + 1) % points.length];
  return bowedArc(p(x, y), p(u, v), bow * .61);
});
const height = (258 - 212) * .61;
const eye: V = [0, 0];
const eyeRadius = 3.45;
const face = carve([outline], [disc(eye, eyeRadius)]);

/** Place the ringed eye. Size is the height from the crown to the lower curve. */
export const swallowtailHead = definePart<PartOptions>({
  id: "swallowtail-head",
  name: { en: "Swallowtail head", ja: "揚羽蝶の頭" },
  description: {
    en: "A rounded profile with a ringed eye and a curved lower edge.",
    ja: "丸い横顔に輪の目を置き、下の縁を曲げます。",
  },
  families: ["cho"],
  sources: [{ frame: 28, page: "R", row: 4, col: 3, label: "うりニあげは蝶" }],
  stock: true,
  sampleSize: 76,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, keyline, paper = PAPER }) {
    const k = size / height;
    const pupil = eyeRadius - paper / k;
    if (pupil <= 0) throw new Error("swallowtail-head: the paper is too wide for the eye");
    fillPart(c, motif, [...face, disc(eye, pupil)], { k, at: centre, turn }, keyline);
  },
});

export default swallowtailHead;
