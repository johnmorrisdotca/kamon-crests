# Parts library

Small compass-and-ruler constructions for assembling book crests. Written by `pnpm data`. Make changes in `scripts/crests/library/`.

The library has 4 geometric parts. 1 crests use them.

Call a part's `build(c, centre, turn, size, options)` method with the centre measured from the middle of the crest, x right and y up. The turn is clockwise from upright. Set `options.motif` to the crest's existing motif. Size is the radius for a berry, the tip-to-tip length for a leaf and the base-to-tip length for a branch. See each part's source file for its remaining options.

Use one `options.paper` width for every cut line in a crest. The default hairline is 1.15 units on the 200-unit page, independent of the part's size. A leaf midrib stops short of the tips by default. Set `midrib: "full"` to carry it to both tips.

Build overlapping parts from back to front inside `layerParts(c, draw)`. Each part in that scope inks through `fillPart`. Set a foreground part's `options.keyline` to the width of paper its outline should leave, in crest units.

| Drawing | Part | Construction | Crest families | 1892 book cell | Crests using it |
| --- | --- | --- | --- | --- | --- |
| <img src="parts-library/berry.svg" alt="Berry" width="88" height="88"> | `berry` · Berry · 実 | A round berry with a short white arc, an open centre or an eye. 丸い実に、短い白い弧、丸い空き、または目を入れます。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | 1 · 枝南天 (`eda-nanten`) |
| <img src="parts-library/branch-spine.svg" alt="Bent branch stem" width="88" height="88"> | `branch-spine` · Bent branch stem · 曲がった枝の軸 | Tangent compass arcs carry a stem of even width through the placement points. なめらかにつないだ弧で、幅のそろった軸を描きます。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | 1 · 枝南天 (`eda-nanten`) |
| <img src="parts-library/branch-taper.svg" alt="Tapering branch" width="88" height="88"> | `branch-taper` · Tapering branch · 先細りの枝 | Two bowed arcs taper from a broad base to one pointed tip. 二本の弧で枝を描き、広い根元から先へ向けて細くします。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | 1 · 枝南天 (`eda-nanten`) |
| <img src="parts-library/leaf-lens.svg" alt="Lens leaf" width="88" height="88"> | `leaf-lens` · Lens leaf · レンズ形の葉 | Two arcs meet at the tips of the leaf, with a white midrib between them. 二本の弧が葉の先で合い、中央に白い葉脈を残します。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | 1 · 枝南天 (`eda-nanten`) |
