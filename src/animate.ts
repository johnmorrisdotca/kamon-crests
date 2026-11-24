// The entry @johnmorrisdotca/kamon-crests/animate: the construction animation, for a site that draws a crest's steps
// itself or wants the SVG of the animation as a string. Pure functions on strings; the animation is SVG and CSS, no script.

import { term } from "./parts.js";
import { animatedSvg, durationOf, staticSvg, stepSvg, stepsOf, stepTimes } from "./render";
import type { AnimateOptions, Construction, Guide, Shape, Step } from "./render";

/**
 * The words that say what a step does, for a caption under the drawing, naming the phase it belongs to: the underdrawing
 * ("Underdrawing: set the compass to width 2, put its point on 2, strike the circle", "Underdrawing: rule the parallel lines, edge
 * to edge, from the top down"), "Trace only what is needed", "Thicken the outline", "Fill the wood sorrel", "Finished: rub out the
 * underdrawing".
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
 * console.log(construction && stepCaption(construction.steps[1], construction, "en")); // "Underdrawing: set the compass to width 1, put its point on 1, strike the circle"
 * ```
 */
export const stepCaption = (step: Step, construction: Construction, lang: "en" | "ja" = "en"): string => {
  const ja = lang === "ja";
  const named = (part: string): string => {
    const name = part === "frame" ? { en: "frame", ja: "枠" } : term(part);

    return ja ? (name?.ja ?? part) : (name?.en.toLowerCase() ?? part);
  };
  const under = ja ? "下書き：" : "Underdrawing: ";
  if (step.op === "centres") {
    const width = construction.guides[step.guides[0]]?.width;

    return under + (ja ? `幅${width}の円の中心に印をつける` : `mark the ${step.guides.length === 1 ? "centre" : "centres"} for width ${width}`);
  }
  if (step.op === "mark") {
    const width = construction.guides[step.guide]?.width;

    return under + (ja ? `コンパスを幅${width}のまま、円の上をいちばん上から時計回りに進めて、六つの角に印をつける` : `keep the compass at width ${width} and step it round the circle from the top, clockwise, to mark the six corners`);
  }
  if (step.op === "guide") {
    const guide = construction.guides[step.guide];
    if (guide?.type !== "circle") {
      // A line through the centre is one of a round of them; any other is one of a set of parallels.
      const [x, y, dx, dy = 0] = (guide?.d.match(/-?[\d.]+/g) ?? []).map(Number);
      const across = /h/.test(guide?.d ?? "") ? [dx, 0] : /v/.test(guide?.d ?? "") ? [0, dx] : [dx, dy];
      const centred = Math.abs((x - 100) * across[1] - (y - 100) * across[0]) < 0.05 * Math.hypot(across[0], across[1]);

      return under + (centred ? (ja ? "定規で、中心を通る直線を端から端まで、時計回りに引く" : "rule the lines through the centre, edge to edge, clockwise") : ja ? "定規で、平行な直線を端から端まで、上から順に引く" : "rule the parallel lines, edge to edge, from the top down");
    }
    if (guide.width === undefined) return under + (ja ? "コンパスで円を描く" : "strike a circle with the compass");
    if (guide.gap === true) return under + (ja ? `重なりのすき間の円を描く（コンパスは幅${guide.width}、針は${guide.width}の印）` : `strike the gap circles, where one piece passes under another (compass at width ${guide.width}, its point on ${guide.width})`);

    return under + (ja ? `コンパスを幅${guide.width}に合わせ、${guide.width}の印に針を置いて、円を描く` : `set the compass to width ${guide.width}, put its point on ${guide.width}, strike the circle`);
  }
  if (step.op === "trace") return ja ? `必要な部分だけなぞる：${named(construction.shapes[step.shapes[0]]?.part ?? "")}` : `Trace only what is needed: the ${named(construction.shapes[step.shapes[0]]?.part ?? "")}`;
  if (step.op === "thicken") return ja ? "線を太くする" : "Thicken the outline";
  if (step.op === "fade") return ja ? "仕上げ：下書きを消す" : "Finished: rub out the underdrawing";
  if (step.op === "turn") {
    return step.shapes.every((i) => construction.shapes[i]?.flip === true && construction.shapes[i].turn === 0)
      ? ja ? "反対側にも、同じ円と線を描いて作る" : "Build its mirror on the other side: the same circles and lines, then the ink"
      : ja ? "ほかの位置にも時計回りに一つずつ、同じ円と線を描いて作る" : "Build it at each other place, clockwise: the same circles and lines, then the ink";
  }

  return ja ? `色を塗る：${named(step.part)}` : `Fill the ${named(step.part)}`;
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
  const steps: Step[] = [];
  const own = (i: number): boolean => guides[i].part === part && !axes;
  // The lines of an arrangement are ruled where the part's own lines would be: before the first trace.
  let ruled = !axes;
  let rest = -1;
  for (const step of construction.steps) {
    if ((step.op === "guide" || step.op === "mark") && own(step.guide)) steps.push(step);
    if (step.op === "centres" && step.guides.some(own)) steps.push({ ...step, guides: step.guides.filter(own) });
    if ((step.op === "trace" || step.op === "thicken") && step.shapes.some((i) => mine[i])) {
      if (!ruled) for (let i = construction.guides.length; i < guides.length; i += 1) steps.push({ op: "guide", guide: i });
      ruled = true;
      steps.push({ ...step, shapes: step.shapes.filter((i) => mine[i]) });
    }
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
