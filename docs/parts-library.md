# Parts library

Small compass-and-ruler constructions for assembling book crests. Written by `pnpm data`. Make changes in `scripts/crests/library/`.

The library has 4 geometric parts. 0 crests use them.

Call a part's `build(c, centre, turn, size, options)` method with the centre measured from the middle of the crest, x right and y up. The turn is clockwise from upright. Set `options.motif` to the crest's existing motif. Size is the radius for a berry, the tip-to-tip length for a leaf and the base-to-tip length for a branch. See each part's source file for its remaining options.

Use one `options.paper` width for every cut line in a crest. The default hairline is 1.15 units on the 200-unit page, independent of the part's size. A leaf midrib stops short of the tips by default. Set `midrib: "full"` to carry it to both tips.

Build overlapping parts from back to front inside `layerParts(c, draw)`. Each part in that scope inks through `fillPart`. Set a foreground part's `options.keyline` to the width of paper its outline should leave, in crest units.

| Drawing | Part | Construction | Crest families | 1892 book cell | Crests using it |
| --- | --- | --- | --- | --- | --- |
| <img src="parts-library/bamboo-joint.svg" alt="Curved bamboo joint" width="88" height="88"> | `bamboo-joint` · Curved bamboo joint · 弧を描く竹の節 | A solid curved collar ends in two semicircles and stands clear of the stalk above and below. 弧を描く節の両端を半円に丸め、上下の幹とのあいだに白いすき間を残します。 | take | [37 L3 C2 二本竹](https://dl.ndl.go.jp/pid/780550) | Stock |
| <img src="parts-library/berry.svg" alt="Berry" width="88" height="88"> | `berry` · Berry · 実 | A round berry with a short white arc near its upper left. 丸い実の左上に、細く短い白い弧を一本入れます。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | Stock |
| <img src="parts-library/branch-taper.svg" alt="Tapering branch" width="88" height="88"> | `branch-taper` · Tapering branch · 先細りの枝 | Two bowed arcs taper from a broad base to one pointed tip. 二本の弧で枝を描き、広い根元から先へ向けて細くします。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | Stock |
| <img src="parts-library/leaf-lens.svg" alt="Lens leaf" width="88" height="88"> | `leaf-lens` · Lens leaf · レンズ形の葉 | Two arcs meet at the tips of the leaf, with a white midrib between them. 二本の弧が葉の先で合い、中央に白い葉脈を残します。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | Stock |
