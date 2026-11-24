# Changelog

All notable changes to this project are written here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0-alpha.1] - 2026-11-24

A preview on npm under the `next` tag: the 61 crests, their parts, search, construction counts and Complexity ranking, the drawing animation with its player, and the parts isolation. The drawings are still being refined (see docs/construction-rules.md); install with `npm i @johnmorrisdotca/kamon-crests@next`.

### Added

- **One part alone.** `<kamon-crest>` has `isolate(part, show?)` and `clear()`, and `/animate` has `isolated(construction, part, show?)`: one part's steps, with the rest of the crest faint in `stepSvg` and `animatedSvg`. Every shape and guide of a construction says its `part` and its `unit` (0 for the unit that is drawn, 1 and up for each place it is turned to).
- **Complexity.** A crest's score is its circles, ruled lines and arcs together (`stats.score`), with the steps to break a tie. `rankCrests({ by, order })` ranks crests by it or by any count, and the demo has a Complexity tab (複雑さ): every crest from the simplest to the most complex with its counts under it, ranked by any count, narrowed by the parts chips, each opening its card and its drawing.
- **Counts for every crest.** Each record has `stats`, counted from the crest's construction and never typed: the circles struck, the lines ruled, the arcs inked, the steps, the distinct compass widths, the fills and the symmetry (how many turns, and whether it has a mirror line). The demo's card says them in English and Japanese (円 12・直線 6・手順 23・コンパス幅 3種). `findCrests()` takes any count exactly or as a range (`{ circles: 5 }`, `{ circles: { min: 10 } }`) and sorts by one, or by `strokes` (circles, lines and arcs together), as kanji are ordered by 画数. See [parts and search](docs/guides/parts-and-search.md).
- **Pause, step and scrub the drawing.** `<kamon-crest controls>` shows play and pause, step back and forward, a scrubber across the steps and the step's caption, in English or Japanese. The element has `pause()`, `play()` (which goes on from where it was held), `step(n)`, `at` and `paused`, and the events `kamon-play`, `kamon-pause` and `kamon-step`. Space holds or goes on, the arrow keys step. `stepSvg(construction, n)` in `/animate` is the still drawing at a step.

### Changed

- **Crests being redrawn come last in the ranking.** The twelve crests still traced from the crest book say `redrawing: true` in their records. Their arc counts are far more than there is to draw, so `rankCrests()` ranks them among themselves and puts them last (`{ redrawing: true }` ranks them among the rest), and the demo's Complexity tab greys them and marks them "Being redrawn" (描き直し中).
- **The turn strikes every unit's circles.** After the unit is drawn, the `turn` step strikes that unit's circles and lines again at each other place, quickly and one place after another, and only then turns the unit there; `stepSvg` shows them from that step on. Before, only the first unit's guides were ever shown. The finished crests are unchanged. `/animate` may now be up to 16 KB (it is loaded only when a crest is animated).
- **The leaf and flower crests redrawn from a period crest book.** The paulownia (五三桐, 五七桐, 丸に五三桐), the hanging wisteria (下がり藤, 丸に下がり藤), the tachibana (橘, 丸に橘), bamboo grass and gentian (笹竜胆, now the Minamoto form of three gentians over five leaves, without a ring) and the maple (紅葉) are vectorised from 伊呂波分新撰紋帳 (1892, National Diet Library, public domain), cleaned and mirrored exactly; each crest cites the book, the frame and the place (`docs/provenance.md`, `NOTICE.md`).
- **The chrysanthemum** (十六八重表菊, 丸に菊) is struck from the sixteen-division: sixteen petals packed edge to edge with thin white lines between, each ending in a round tip, round a small disc, with the tips of sixteen behind at the rim.
- **The tomoe** (左三つ巴, 右三つ巴, 丸に左三つ巴) is struck from its compass circles: on each of three spokes a head (0.45 of the radius) and a swirl (0.66) that both touch the outer circle at the spoke's end, so the white is three horns, each tail thins to a point on the rim, and the outer edge is a whole circle.
- **The Tokugawa hollyhock** (三つ葉葵, 丸に三つ葉葵) is a compass-and-ruler construction: every edge an arc of a circle or a ruled line, the circles on grid points or placed by touching the ones before. In the ring each leaf's spindle widens into a wedge that joins the ring; without it the spindle ends in a point at the notch.
- **The crossed hawk feathers** (違い鷹の羽, 丸に違い鷹の羽) are redrawn: two ruled feathers with round ends crossed at right angles, a shaft, two bars of three chevrons, and down at the quill.
- **The rabbit** is redrawn as the front-facing rabbit (真向き兎), without a ring: a body of two circles, a pointed back, two lens ears and a round face.
- **The ginkgo** is now the three ginkgo leaves (三つ銀杏, 丸に三つ銀杏; `mitsu-icho`, `maru-ni-mitsu-icho`), after the 1892 crest book; the single leaf (`icho`, `maru-ni-icho`), which matched no recorded crest, is gone.
- **The maple's stalk** is ruled, flaring to a flat cut end as the book draws it.
- **Arcs and ruled lines only.** A curve is an arc of a compass circle struck first, a straight edge is a ruled line, and a white line is the gap left between black fills: no Bézier curve and no stroke in a finished crest. A test holds every crest to it, and names the twelve still to be rebuilt (the paulownias, the wisterias, the tachibana, the bamboo grass and gentian, the butterfly and the ship). Rings are now the black between two circles.
- **Redrawn to this rule and to real references**: the well frame (now stood on its corner, as 井桁 is), the snake's eye, the Takeda lozenges (solid, without eyes), the cross in a circle, the two bars, the wood sorrel (with its stamens), the bellflower, the plum bowl, the mountain cherry (with stamens), the three oak leaves, the water plantain (now the standing form, 立ち沢瀉), the maple, the hemp leaf, the Genji wheel, the two fans, the tortoise shell (one corner up, with its inner line), the crescent, the Oda quince, the seven treasures, the four eyes, the nine luminaries, the basket eye and the linked rings.
- **The Mōri crest** is now 一文字に三つ星: the bar over the three stars, without a ring (it was drawn the other way up, in a ring).
- **Whole circles, then one unit, then the turn.** A guide is a whole compass circle or a ruled line; the `arc` guide type is gone. Every arc of a finished crest lies on a circle the animation strikes in full first, and every straight edge on a line it rules. A repeated unit is laid out and drawn once, and a new `turn` step shows it turned or flipped to its other places (`Shape.turn`, `Shape.flip`). The finished crests are unchanged. A test holds every rebuilt crest to it.
- **The construction is the data.** These crests' guides are the compass circles and ruled lines they are inked from, and the animation strikes them before it draws (`scripts/construct/compass.ts`).
- **Rings** are heavier and their motifs fill them: a medium ring is 16.8 of the 192 (0.087 of the diameter, the median of fifteen real ringed crests), with 3.5 of white inside it.
- **Search** finds a crest by its name as English writes it: "Marunigosan-kiri", "gosan-kiri", "Maru ni Gosan no Kiri" and "Kikkou" all find their crests; and by more common names ("Tokugawa crest", "Imperial Seal of Japan", "Takeda-bishi", "Rokumonsen", "Sanada crest").

- **The demo's card has the player beside its other buttons**: play and pause, a step back and forward and a scrubber next to Draw it, Loop, Guides and the speeds, on by default, with the step's caption while the drawing is held. The same card opens from the Complexity tab.
- **The element is smaller again.** Its controls, and the still drawing of one step, are a file of their own (`dist/element-controls.js`, under 6 KB) that the element loads when `controls` is set or when `step()`, `isolate()`, `clear()`, a control or a key first needs it. The element itself is back under 12 KB.

### Fixed

- **The parts chips show their part alone.** On a crest of one motif and no frame, the demo's Motif, Count and Arrangement chips all named the same shapes, so pressing one changed nothing, and the dimming went to the wrong shapes on a stepped drawing. Each chip now shows its own part: its shapes at full strength, the rest faint, and its own guides. Count shows one of the motif and then the turn; Arrangement shows the lines it is turned about and mirrored in; Frame says "No frame" when there is none. A second press or Esc shows the whole crest. "Draw this part" plays only that part's steps, and "More crests with this part" opens the catalogue narrowed to it.

## [0.1.0] - 2026-11-24

The first version: 61 Japanese family crests as SVG, drawn from their construction, with parts to search by and a construction animation for each.

### Added

- **61 crests**, each its own module (`/crests/<id>`) and each drawn from its compass-and-ruler construction: clan crests (Tokugawa, Takeda, Sanada, Oda, Shimazu, Hojo, Mori, Ashikaga), the paulownia and the chrysanthemum, and the plants, animals, objects and plain shapes the crests are made of.
- **Parts.** A vocabulary of frames, motifs, arrangements and turns, in English and Japanese with readings (`/parts`), and every crest described by it (`/manifest`).
- **Search** by parts, names, readings, houses and present-day users (`/search`).
- **Construction animation** for every crest: the layout guides, each shape traced and filled, the guides rubbed out; pure SVG and CSS; the finished crest at once for a reader who asks for less motion (`/animate`, `/steps/<id>`, `animatedCrest`).
- **`<kamon-crest>`**, the custom element, with `animate`, `speed`, `loop`, `color`, `size`, replay on a click, and events (`/element`, `/element/define`).
- **Present-day users** with their sources, for three crests (`usedBy`).
- The demo, the API reference, the guides in English and Japanese, and the README's pictures.

[Unreleased]: https://github.com/johnmorrisdotca/kamon-crests/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/johnmorrisdotca/kamon-crests/releases/tag/v0.1.0
