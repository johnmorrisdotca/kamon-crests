import { arcA, mirrored, onCircle, reversedRun, rotated, seg } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

export interface VineForkOptions extends PartOptions {
  /** Band width divided by length. Defaults to .065. */
  width?: number;
  /** The ruled stem's share of the length, before the two arms part. Defaults to .74. */
  stem?: number;
}

const DEG = Math.PI / 180;
// The arm leaves the stem along its tangent, and each tighter circle starts on the normal the last one ended on.
const BEND = 30;
const CURL = 8.8;
const TIP = 5.6;
const FORK = 2.8;
const TO_CURL = 34 * DEG;
const TO_TIP = 165 * DEG;
const TO_END = 320 * DEG;
// How far the curl's outer edge stands beyond the end of the stem, less half the band.
const HEAD = (BEND - CURL) * Math.sin(TO_CURL) + CURL;

const normal = (turn: number): number => turn - Math.PI / 2;
const within = (previous: Circle, turn: number, r: number): Circle => ({ c: onCircle(previous.c, previous.r - r, normal(turn)), r });

/** The fork before placement: the root at y = −.5, the outer edge of the curls at y = .5. */
export function vineForkOutline(width: number, stem: number): Region {
  if (!Number.isFinite(width) || width < .03 || width > .12 || !Number.isFinite(stem) || stem < .2 || stem > .85) {
    throw new Error("vine-fork: width must be between .03 and .12 and stem between .2 and .85 of the length");
  }
  // The curls keep one shape. The stem and the band are the shares of the whole length asked for.
  const length = HEAD / (1 - stem - width / 2);
  const half = width * length / 2;
  const run = stem * length;
  const bend: Circle = { c: [run, BEND], r: BEND };
  const curl = within(bend, TO_CURL, CURL);
  const tip = within(curl, TO_TIP, TIP);
  const end = onCircle(tip.c, tip.r, normal(TO_END));
  const fork = FORK * half / 2.9;
  const forkX = run + Math.sqrt((BEND + half + fork) ** 2 - BEND ** 2);
  const forkTurn = Math.atan2(forkX - run, BEND);
  const arm: Region = [
    seg([0, half], [run, half]),
    arcA(bend.c, bend.r - half, normal(0), normal(TO_CURL)),
    arcA(curl.c, curl.r - half, normal(TO_CURL), normal(TO_TIP)),
    arcA(tip.c, tip.r - half, normal(TO_TIP), normal(TO_END)),
    arcA(end, half, normal(TO_END) + Math.PI, normal(TO_END)),
    arcA(tip.c, tip.r + half, normal(TO_END), normal(TO_TIP)),
    arcA(curl.c, curl.r + half, normal(TO_TIP), normal(TO_CURL)),
    arcA(bend.c, bend.r + half, normal(TO_CURL), normal(forkTurn)),
  ];
  const outline: Region = [
    ...arm,
    arcA([forkX, 0], fork, normal(forkTurn) + Math.PI, Math.PI - normal(forkTurn)),
    ...reversedRun(arm.map((piece) => rotated(mirrored(piece), Math.PI))),
    seg([0, -half], [0, half]),
  ];
  const shrink = ([x, y]: V): V => [x / length, y / length - .5];

  return outline.map((piece) => {
    const upright = rotated(piece, Math.PI / 2);

    return upright.t === "L" ? seg(shrink(upright.a), shrink(upright.b)) : arcA(shrink(upright.c), upright.r / length, upright.a0, upright.a1);
  });
}

/** Size is the length from the root of the stem to the outer edge of the curls. */
export const vineFork = definePart<VineForkOptions>({
  id: "vine-fork",
  name: { en: "Forked vine", ja: "二股の蔓" },
  description: {
    en: "A ruled stem of even width parts into two matching arms. Each arm rolls back through three tangent circles to a round end.",
    ja: "幅のそろった直線の茎が左右同じ形の二本に分かれ、それぞれ接する三つの円に沿って巻き戻り、丸い先で終わります。",
  },
  families: ["karahana", "hanabishi"],
  sources: [
    { frame: 18, page: "L", row: 4, col: 1, label: "つる唐花" },
    { frame: 8, page: "L", row: 4, col: 2, label: "四方つる花びし" },
  ],
  sampleSize: 150,
  sampleOptions: { motif: "karahana" },
  build(c, centre, turn, size, { motif, keyline, width = .065, stem = .74 }) {
    fillPart(c, motif, [vineForkOutline(width, stem)], { k: size, at: centre, turn }, keyline);
  },
});

export default vineFork;
