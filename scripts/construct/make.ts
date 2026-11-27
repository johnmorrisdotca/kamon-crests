// Runs a crest's definition and returns its construction: guides, shapes, and the steps that draw them.
import { stepsOf } from "../../src/render.ts";
import type { Construction } from "../../src/render.ts";
import type { CrestDef } from "../crests/types.ts";
import { partsUsedBy } from "../crests/library/part.ts";
import { Builder } from "./builder.ts";

export const make = (def: CrestDef, captureParts?: (parts: ReadonlySet<string>) => void): Construction => {
  const builder = new Builder();
  def.build(builder);
  captureParts?.(partsUsedBy(builder));

  const guides = builder.laidOut();

  return { guides, shapes: builder.shapes, steps: stepsOf(guides, builder.shapes) };
};
