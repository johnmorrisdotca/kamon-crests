/** The common interface of the small geometric parts used to assemble crests. */
import type { Builder } from "../../construct/builder.ts";
import type { V } from "../../construct/compass.ts";

export interface PartOptions {
  /** The existing crest motif that owns the ink in the parts view. */
  motif: string;
  /** Leave this much paper around the part inside a layerParts scope, in crest units. */
  keyline?: number;
}

interface Bilingual {
  en: string;
  ja: string;
}

interface Cell {
  frame: number;
  page: "L" | "R";
  row: number;
  col: number;
  label: string;
}

type Build<Options extends PartOptions> = (c: Builder, centre: V, turn: number, size: number, options: Options) => void;

interface PartMetadata {
  id: string;
  name: Bilingual;
  description: Bilingual;
  families: readonly string[];
  sources: readonly Cell[];
  stock?: boolean;
}

interface PartDefinition<Options extends PartOptions> extends PartMetadata {
  sampleSize: number;
  sampleOptions: Options;
  build: Build<Options>;
}

export interface PartPreview extends PartMetadata {
  sample(c: Builder): void;
}

export interface LibraryPart<Options extends PartOptions> extends PartPreview {
  build: Build<Options>;
}

const used = new WeakMap<Builder, Set<string>>();

/** The distinct library parts that have added ink to this construction. */
export const partsUsedBy = (c: Builder): ReadonlySet<string> => used.get(c) ?? new Set();

/**
 * The centre is measured from the middle of the page, x right and y up. The
 * turn is clockwise from the upright part. Each part states its size unit.
 */
export function definePart<Options extends PartOptions>(definition: PartDefinition<Options>): LibraryPart<Options> {
  const { build, sampleSize, sampleOptions, ...metadata } = definition;

  return {
    ...metadata,
    build(c, centre, turn, size, options) {
      if (!Number.isFinite(size) || size <= 0) throw new Error(`${metadata.id}: size must be positive and finite`);
      build(c, centre, turn, size, options);
      const ids = used.get(c) ?? new Set<string>();
      ids.add(metadata.id);
      used.set(c, ids);
    },
    sample(c) {
      build(c, [0, 0], 0, sampleSize, sampleOptions);
    },
  };
}
