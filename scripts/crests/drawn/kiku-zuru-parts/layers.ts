import type { Builder } from "../../../construct/builder.ts";
import {
  DEG, arcA, carveWhere, disc, inside, mirrored, moved, pieceEnd, pieceStart, rotated,
  seg, thickArc, thickSeg, toPath,
} from "../../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../../construct/compass.ts";

interface Layer {
  motif: string;
  ink: Region[];
  paper: Region[];
}

const pending = new WeakMap<Builder, Layer[]>();

/** Make the part's shapes live in the crest's coordinates before finding overlaps. */
function place(piece: Piece, placing: Placing): Piece {
  const scale = ([x, y]: V): V => [x * placing.k, y * placing.k];
  const marked = placing.mirror ? mirrored(piece) : piece;
  const sized = marked.t === "L"
    ? seg(scale(marked.a), scale(marked.b))
    : arcA(scale(marked.c), marked.r * placing.k, marked.a0, marked.a1);

  return moved(rotated(sized, -(placing.turn ?? 0) * DEG), placing.at ?? [0, 0]);
}

function arcMargin(arc: Extract<Piece, { t: "A" }>, gap: number): Region {
  if (arc.r > gap) return thickArc(arc.c, arc.r, 2 * gap, arc.a0, arc.a1);
  const outside = arcA(arc.c, arc.r + gap, arc.a0, arc.a1);
  return [outside, seg(pieceEnd(outside), arc.c), seg(arc.c, pieceStart(outside))];
}

function paperAround(ink: Region[], gap: number): Region[] {
  if (gap === 0) return [];
  const outside = ink.filter((loop) => !ink.some((other) => other !== loop && inside(other, pieceStart(loop[0]))));
  const borders = outside.flatMap((loop) => loop.flatMap((edge) => [
    edge.t === "L" ? thickSeg(edge.a, edge.b, 2 * gap) : arcMargin(edge, gap),
    disc(pieceEnd(edge), gap),
  ]));

  // Clear the inside too, so a midrib or a highlight stays white over ink.
  return [...outside, ...borders];
}

/** Lay whole parts from back to front. A later part may leave paper around its outline. */
export function layerParts(c: Builder, draw: () => void): void {
  if (pending.has(c)) {
    draw();
    return;
  }
  const layers: Layer[] = [];
  pending.set(c, layers);
  try {
    draw();
  } finally {
    pending.delete(c);
  }

  for (const [index, layer] of layers.entries()) {
    const paper = layers.slice(index + 1).flatMap((foreground) => foreground.paper);
    const ink = paper.length === 0 ? layer.ink : carveWhere(
      [...layer.ink.flat(), ...paper.flat()],
      (p) => layer.ink.filter((loop) => inside(loop, p)).length % 2 === 1 && !paper.some((loop) => inside(loop, p)),
    );
    if (ink.length > 0) c.fill(layer.motif, toPath(ink, { k: 1 }), "evenodd");
  }
}

/** Ink one whole part. Give it a keyline in crest units inside a layerParts scope. */
export function fillPart(c: Builder, motif: string, ink: Region[], placing: Placing, keyline = 0): void {
  if (!Number.isFinite(keyline) || keyline < 0) throw new Error("A part's keyline must be non-negative and finite");
  const layers = pending.get(c);
  if (layers === undefined) {
    if (keyline !== 0) throw new Error("Give a part a keyline inside layerParts()");
    c.fill(motif, toPath(ink, placing), "evenodd");
    return;
  }

  const placed = ink.map((loop) => loop.map((edge) => place(edge, placing)));
  layers.push({ motif, ink: placed, paper: paperAround(placed, keyline) });
}
