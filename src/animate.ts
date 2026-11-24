// The entry @johnmorrisdotca/kamon-crests/animate: the construction animation, for a site that draws a crest's steps
// itself or wants the SVG of the animation as a string. Pure functions on strings; the animation is SVG and CSS, no script.

import { term } from "./parts.js";
import { animatedSvg, durationOf, staticSvg, stepSvg, stepsOf, stepTimes } from "./render";
import type { AnimateOptions, Construction, Guide, Shape, Step } from "./render";

/**
 * The words that say what a step does, for a caption under the drawing: "Strike a circle", "Draw the paulownia".
 *
 * @param step - One of a construction's `steps`.
 * @param construction - The construction it belongs to.
 * @param lang - `en` or `ja`; English when left out.
 * @returns A short sentence.
 *
 * @example
 * ```ts
 * import { stepCaption } from "@johnmorrisdotca/kamon-crests/animate";
 * import { crestSteps } from "@johnmorrisdotca/kamon-crests/load";
 *
 * const construction = await crestSteps("maru-ni-juji");
 * console.log(construction && stepCaption(construction.steps[0], construction, "en")); // "Strike a circle with the compass"
 * ```
 */
export const stepCaption = (step: Step, construction: Construction, lang: "en" | "ja" = "en"): string => {
  const ja = lang === "ja";
  if (step.op === "guide") {
    const type = construction.guides[step.guide]?.type;

    return type === "circle" ? (ja ? "コンパスで円を描く" : "Strike a circle with the compass") : ja ? "定規で線を引く" : "Rule a line";
  }
  if (step.op === "fade") return ja ? "補助線を消す" : "Rub out the guides";
  if (step.op === "turn") {
    return step.shapes.every((i) => construction.shapes[i]?.flip === true && construction.shapes[i].turn === 0)
      ? ja ? "反対側にも、同じ円と線を描いて作る" : "Build its mirror on the other side: the same circles and lines, then the ink"
      : ja ? "ほかの位置にも時計回りに一つずつ、同じ円と線を描いて作る" : "Build it at each other place, clockwise: the same circles and lines, then the ink";
  }
  const named = step.part === "frame" ? { en: "frame", ja: "枠" } : term(step.part);

  return ja ? `${named?.ja ?? step.part}を描く` : `Draw the ${named?.en.toLowerCase() ?? step.part}`;
};

/**
 * The step a given time into the animation is at.
 *
 * @param construction - A construction.
 * @param seconds - Seconds from the start, at speed 1.
 * @returns The index of the step that has begun most recently, or -1 before the first.
 *
 * @example
 * ```ts
 * import { stepAt } from "@johnmorrisdotca/kamon-crests/animate";
 * import { crestSteps } from "@johnmorrisdotca/kamon-crests/load";
 *
 * const construction = await crestSteps("janome");
 * console.log(construction && stepAt(construction, 0));   // -1
 * console.log(construction && stepAt(construction, 99));  // the last step
 * ```
 */
export const stepAt = (construction: Construction, seconds: number): number => {
  const times = stepTimes(construction);
  let at = -1;
  for (let i = 0; i < times.length; i += 1) if (times[i] <= seconds) at = i;

  return at;
};

/**
 * One part of a crest shown alone: the same construction with only that part's steps, so that drawing it (`stepSvg`,
 * `animatedSvg`) strikes that part's guides and draws that part's shapes, the unit first and then its turn, and leaves the rest
 * of the crest faint. `rest` is the step to hold it at: everything of the part drawn and its guides still there.
 *
 * - `count` rests on one of the motif (the unit, and its other half where it is flipped over), before the step that turns it to its other places.
 * - `arrangement` strikes, in place of the part's own guides, the lines of its arrangement: a spoke for each place the unit is turned to, and the mirror line of each flip.
 *
 * A part with no shape (the frame of a crest that has none) has no steps, and the whole crest is faint.
 *
 * @param construction - A crest's construction (`crestSteps()` loads it).
 * @param part - "frame", or a motif's id.
 * @param show - `count` or `arrangement`, for that side of a motif; left out, the part as it is.
 * @returns A new construction; the one given is not changed.
 *
 * @example
 * ```ts
 * import { isolated, stepSvg } from "@johnmorrisdotca/kamon-crests/animate";
 * import construction from "@johnmorrisdotca/kamon-crests/steps/maru-ni-juji";
 *
 * const cross = isolated(construction, "cross");
 * console.log(cross.steps.length < construction.steps.length);            // true: the ring's steps are left out
 * console.log(stepSvg(cross, cross.rest ?? 0).includes('opacity=".12"')); // true: the ring is there, faint
 * ```
 */
export const isolated = (construction: Construction, part: string, show?: "count" | "arrangement"): Construction => {
  const guides = [...construction.guides];
  const axes = show === "arrangement";
  const mine = construction.shapes.map((shape) => shape.part === part);
  if (axes) {
    const at = (deg: number): string => `${Math.round(10000 + 9600 * Math.sin((deg * Math.PI) / 180)) / 100} ${Math.round(10000 - 9600 * Math.cos((deg * Math.PI) / 180)) / 100}`;
    const turned = construction.shapes.filter((shape, i) => mine[i] && shape.turn !== undefined);
    // A spoke for the unit and for each place it is turned to; a flip's mirror line is half its turn round from upright.
    const lines = turned.flatMap((shape) => (shape.flip === true ? [`M${at(shape.turn! / 2)}L${at(shape.turn! / 2 + 180)}`] : [`M100 100L${at(0)}`, `M100 100L${at(shape.turn!)}`]));
    // An axis is no unit's guide: a turn does not strike it again.
    for (const d of new Set(lines)) guides.push({ type: "line", d, part });
  }
  const steps: Step[] = guides.flatMap((guide, i) => (guide.part === part && i < construction.guides.length !== axes ? [{ op: "guide" as const, guide: i }] : []));
  let rest = -1;
  for (const step of construction.steps) {
    if (step.op !== "draw" && step.op !== "turn") continue;
    const shapes = step.shapes.filter((i) => mine[i]);
    // A turn is two steps here: the flip that makes one whole of the motif, then the turn to its other places.
    const whole = step.op === "turn" ? shapes.filter((i) => construction.shapes[i].turn === 0) : shapes;
    const others = shapes.filter((i) => !whole.includes(i));
    if (whole.length > 0) steps.push({ ...step, shapes: whole });
    if (others.length > 0 && rest < 0 && show === "count") rest = steps.length - 1;
    if (others.length > 0) steps.push({ op: "turn", shapes: others });
  }
  if (rest < 0) rest = steps.length - 1;
  if (steps.some((step) => step.op === "guide")) steps.push({ op: "fade" });

  return { guides, shapes: construction.shapes, steps, rest };
};

export { animatedSvg, durationOf, staticSvg, stepSvg, stepsOf, stepTimes };
export type { AnimateOptions, Construction, Guide, Shape, Step };
