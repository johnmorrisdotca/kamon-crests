// Runs a crest's definition and returns its construction: guides, shapes, and the steps that draw them.
import { stepsOf } from "../../src/render.ts";
import type { Construction } from "../../src/render.ts";
import type { CrestDef } from "../crests/types.ts";
import { Builder } from "./builder.ts";

export const make = (def: CrestDef): Construction => {
  const builder = new Builder();
  def.build(builder);

  const guides = builder.laidOut();

  return { guides, shapes: builder.shapes, steps: stepsOf(guides, builder.shapes) };
};
