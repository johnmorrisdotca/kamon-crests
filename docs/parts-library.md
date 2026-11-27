# Parts library

Small compass-and-ruler constructions for assembling book crests. Written by `pnpm data`. Make changes in `scripts/crests/library/`.

The library has 6 geometric parts. 1 crests use them.

Call a part's `build(c, centre, turn, size, options)` method with the centre measured from the middle of the crest, x right and y up. The turn is clockwise from upright. Set `options.motif` to the crest's existing motif. Size is the radius for a berry, the tip-to-tip length for a leaf and the base-to-tip length for a branch. See each part's source file for its remaining options.

Use one `options.paper` width for every cut line in a crest. The default hairline is 1.15 units on the 200-unit page, independent of the part's size. A leaf midrib stops short of the tips by default. Set `midrib: "full"` to carry it to both tips.

Build overlapping parts from back to front inside `layerParts(c, draw)`. Each part in that scope inks through `fillPart`. Set a foreground part's `options.keyline` to the width of paper its outline should leave, in crest units.

| Drawing | Part | Construction | Crest families | 1892 book cell | Crests using it |
| --- | --- | --- | --- | --- | --- |
| <img src="parts-library/berry.svg" alt="Berry" width="88" height="88"> | `berry` · Berry · 実 | A round berry with a short white arc near its upper left. 丸い実の左上に、細く短い白い弧を一本入れます。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | Stock |
| <img src="parts-library/branch-taper.svg" alt="Tapering branch" width="88" height="88"> | `branch-taper` · Tapering branch · 先細りの枝 | Two bowed arcs taper from a broad base to one pointed tip. 二本の弧で枝を描き、広い根元から先へ向けて細くします。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | Stock |
| <img src="parts-library/bud-round.svg" alt="Round bud" width="88" height="88"> | `bud-round` · Round bud · 丸いつぼみ | A round bud on a thin stalk, with curved white seams between its closed sepals. 細い茎の先に丸いつぼみを置き、閉じたがくの間に細い白い弧を入れます。 | kiku | [40 R4 C2 きく鶴](https://dl.ndl.go.jp/pid/780550) | 1 · 菊鶴 (`kiku-zuru`) |
| <img src="parts-library/leaf-lens.svg" alt="Lens leaf" width="88" height="88"> | `leaf-lens` · Lens leaf · レンズ形の葉 | Two arcs meet at the tips of the leaf, with a white midrib between them. 二本の弧が葉の先で合い、中央に白い葉脈を残します。 | nanten | [23 L4 C4 枝なんてん](https://dl.ndl.go.jp/pid/780550) | Stock |
| <img src="parts-library/petal.svg" alt="Flower petal" width="88" height="88"> | `petal` · Flower petal · 花びら | Two ruled sides meet a round cap or tangent shoulders with a pointed tip. 定規で引いた両側から、丸い先、または丸い肩を通ってとがった先へつなぎます。 | ume, kikyo | [24 L2 C4 八重むめ](https://dl.ndl.go.jp/pid/780550), [40 R1 C4 土岐ききやう](https://dl.ndl.go.jp/pid/780550) | Stock |
| <img src="parts-library/twig-fork.svg" alt="Forked twig" width="88" height="88"> | `twig-fork` · Forked twig · 先の分かれた小枝 | A ruled stem divides into two matching side prongs and an optional upright prong. 定規で引いた茎を左右同じ形の枝に分けます。中央にも一本置けます。 | sasa, yukiwa | [38 R2 C1 笹くるま](https://dl.ndl.go.jp/pid/780550), [41 L4 C2 つららゆきワ](https://dl.ndl.go.jp/pid/780550) | Stock |
