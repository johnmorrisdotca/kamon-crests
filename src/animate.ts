// The entry @johnmorrisdotca/kamon-crests/animate: the construction animation, for a site that draws a crest's steps
// itself or wants the SVG of the animation as a string. Pure functions on strings; the animation is SVG and CSS, no script.

import { term } from "./parts.js";
import { animatedSvg, durationOf, staticSvg, stepsOf, stepTimes } from "./render";
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

    return type === "circle" ? (ja ? "コンパスで円を描く" : "Strike a circle with the compass") : type === "line" ? (ja ? "定規で線を引く" : "Rule a line") : ja ? "コンパスで円弧を描く" : "Strike an arc";
  }
  if (step.op === "fade") return ja ? "補助線を消す" : "Rub out the guides";
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

export { animatedSvg, durationOf, staticSvg, stepsOf, stepTimes };
export type { AnimateOptions, Construction, Guide, Shape, Step };
