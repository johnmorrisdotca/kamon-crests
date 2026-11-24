# Changelog

All notable changes to this project are written here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- **A complexity meter replaces the old score.** `stats.score` was circles, lines and arcs added together. It is now `3 × arcs + 2 × circles + lines + 5 × (compass widths − 1)`, from the corrected counts: an arc is the most careful work, and resetting the compass is the slowest move. `stats.meter` puts it on a fixed scale of 0 to 100 (`round(25 × log10(score))`: 10 is 25, 100 is 50, 1000 is 75), and `stats.grade` is 1 to 5, in bands of the score at round numbers, so a crest's grade never moves as crests are added: Simple under 25, Easy 25 to 99, Moderate 100 to 299, Hard 300 to 999, Master 1000 and over (入門, 初級, 中級, 上級, 達人; the Japanese names are still to be checked by a native reader). `rankCrests()` ranks by the new score, `findCrests({ grade: 4 })` and `findCrests({ meter: { min: 70 } })` search by them, `topCrests(n)` gives the most complex, and `GRADES` names the grades and gives their score bands. `sort: "strokes"` is still circles, lines and arcs together. The demo's Complexity tab shows a meter bar and the grade on each tile, and the card says "Complexity 58 · Moderate"; the crests being redrawn show neither. The reasons are in `docs/guides/complexity.md`, in English and Japanese.

### Fixed

- **A crest's counts are what the animation does.** `stats.circles` and `stats.lines` counted only the first unit's guides: 丸に桔梗 said 10 circles while its animation strikes the petal's circles again at each of the other four places. Every count is now over every place a turn or a mirror builds, like a character's stroke count, and a guide that lands on one already struck counts once (丸に桔梗: 26 circles, 30 lines). `stats.arcs` now joins arcs by the struck circle they are taken from, not by a centre worked out from rounded ends, so a long arc written in pieces is one arc (三つ銀杏: 76, was 110). `stats.score`, the Complexity order and `findCrests` by count follow; the compass widths are still the distinct widths. A test counts each again from the animation's own paths.

## [0.1.0] - 2026-11-24

The first release, after six previews: the two bars of 丸に二つ引両 end at the ring, the demo shows words and never their keys, and the demo's scripts carry a version stamp so a release never mixes with files a browser kept from the last one.

### Changed

- **The rulebook says when a turned place is struck.** `docs/construction-rules.md` said that everything is struck before anything is traced. That holds for the first unit and the layout. A place a turn builds has its circles struck and its lines ruled before its own ink, each place finished, clockwise, before the next; rule 7 and the tests it names now say so, in English and Japanese.

### Fixed

- **丸に二つ引両: the bars end at the ring.** Each bar ran a little past the ring's outer edge and showed as a small black stub on either side. A bar is now the space between its two ruled lines inside the ring's outer circle: its ends are arcs of that circle, and its lines run from edge to edge of it, like every other crest's. Only this crest's drawing changes.
- **The demo shows words, not their keys.** The header's Help button read "help" and the footer's groups read "family_board", "family_cards" and so on: the page's script wrote its own words over the family's header and footer, which have words of their own. It now leaves those two alone. A word the page lacks in Japanese is said in English, never as its key, and a browser test reads every text, label and tip on the page in both languages and fails on a key.
- **The demo never runs the last build's scripts under a new page.** GitHub Pages lets a browser keep each file for ten minutes, so just after a release a new page could load the old script and words: a button read "compass_arm" and the arm was missing. `pnpm site` now stamps every local script and stylesheet address with the build (the commit on Pages, the version otherwise), in the pages and in every module's own imports, and a browser test fails on any address without its stamp.

## [0.1.0-alpha.5] - 2026-11-24

A fifth preview, and the first on npm's `latest` tag (until 0.1.0, each preview is `latest` as well as `next`, so `npm install` gets it rather than the 0.0.1 name placeholder): every line is ruled full length, before anything is traced, and polygons are set out by compass marks.

### Added

- **The compass stepped round a circle.** A hexagon or a triangle is no longer set out with a polygon for a guide. Its circle is struck, then a new `mark` step keeps the compass at that width and steps it round the circle from the top, clockwise, marking six points (`Guide.marks`), and the lines through neighbouring corners are ruled full length; the hexagon is where they cross, and a thin inner hexagon has its own parallel lines. `stepCaption` says "Underdrawing: keep the compass at width 1 and step it round the circle from the top, clockwise, to mark the six corners". The tortoise shell (both), the basket eye, the three scales (both) and the hemp leaf are set out this way, the Takeda lozenge's short corners stand on a struck circle, and no guide is a polygon's outline any more: every guide line is one line.

### Changed

- **Every guide is struck before anything is traced, and every line is ruled full length.** The ruled lines are now part of the underdrawing: the circles by compass width, then the lines (each parallel set together, from the top down), then the trace, the thickening, the fill and the finish. Before, a crest's lines were ruled after its outline had been traced and thickened. Each line runs from edge to edge of the layout circle, which is struck for it even in a crest with no ring, so a bar, a square or a lattice is the space between long lines that cross; a shape of straight edges only is no longer built by a turn, and its lines are all ruled in the underdrawing. `stepCaption` says "Underdrawing: rule the parallel lines, edge to edge, from the top down" or "rule the lines through the centre, edge to edge, clockwise". A crest with ruled lines has more guides and steps than it had (`stats.guides`, `stats.steps`), and a guide line's `d` is a whole chord. New tests hold every inked arc and edge to a circle or a line struck in an earlier step, each edge between two crossings, and every line to the outer circle at both ends. The finished crests are unchanged.
- **一文字に三つ星 is redrawn: its 一 is a brushed stroke, not a box.** The bar was a plain rectangle. It is now the character as the brush writes it, measured from pictures of the Mōri crest and set out again with the compass and the ruler: a ruled top, a wide arc underneath, the left end a circle as large as a disc and cut slantwise above, the right end a smaller circle with a slanting line under it, and the top rising to a point at each end. The three discs stand a little apart, as on the crest, and no longer touch. This is the one finished drawing that changes.
- **`/animate` may now be up to 25 KB** (it was 23): the ruled lines and the stepped marks have their own captions. It is loaded only when a crest is animated.

## [0.1.0-alpha.4] - 2026-11-24

A fourth preview under npm's `next` tag: the compass arm. While a circle is struck or an arc inked, a thin line runs from its bold centre dot to the pen, so every curve shows the compass that drew it.

### Added

- **The compass arm.** While a circle is struck, and while an arc is inked, a thin line runs from that circle's centre to the pen and follows it round, and the centre's dot is bold for as long; the arm is gone when the curve ends. It shows that each arc came from a compass standing on that centre: an arm with no bold dot under it is an arc whose centre the underdrawing never marked. `stepSvg` shows the arm where the step's last curve ended (after a circle is struck, or a trace with an arc in it). It has its own switch, on by default and apart from the others: `compassArm: false` on `animatedSvg` and `stepSvg`, `compass-arm="off"` on `<kamon-crest>` or anything the drawing is in, and Compass arm (コンパスの腕) on the demo's card. "Nothing moves" is about the crest's pieces: the arm is the tool, and is the one thing that turns.

### Changed

- **A shape's outline is traced at an even pace**, so that the compass arm stays on the pen; it eased in and out before.
- **`/animate` may now be up to 23 KB** (it was 20): the arm reads each shape's arcs from its path as it draws. It is loaded only when a crest is animated.

## [0.1.0-alpha.3] - 2026-11-24

A third preview under npm's `next` tag: the twelve crests still traced from the crest book no longer show made-up steps, and the demo's card has sizes and a full-window view. The ruled lines of the other crests are still being moved into the underdrawing (the next preview).

### Added

- **The demo's card draws at three sizes and in the whole window.** S, M and L under the drawing (300, 480 and 640 pixels; on a phone L is the screen's width), kept for the session, and a Full screen button that fills the window with the drawing, its player and its caption until Esc. The drawing is the same SVG at every size.

### Changed

- **A crest still being redrawn shows no steps.** The twelve crests still traced from the crest book (`redrawing: true`) had steps that struck a few circles and then inked a traced outline no circle gave. Their constructions now say `redrawing: true` and hold no guides and no steps, so `animatedSvg`, `stepSvg` and `<kamon-crest animate>` give the finished crest. The demo's card shows it finished with the note "Being redrawn as a compass construction" in place of the player, and says "being redrawn" in place of the counts.

### Fixed

- **The demo's PNG size no longer touches its Download button.** The card's row of downloads has a gap and wraps on a narrow card, and a browser test holds every control on the card clear of the others at 1280 and at 390 wide.

## [0.1.0-alpha.2] - 2026-11-24

A second preview under npm's `next` tag: the drawing now plays in the craftsman's six phases, turns go round clockwise one place at a time, and nothing moves. The final crest drawings are the same as in 0.1.0-alpha.1.

### Added

- **The craftsman's six phases.** The construction plays as a crest painter works: the underdrawing by compass width (each run of circles after a `centres` step that marks their centres with a dot and the width's number), `trace` only what is needed, `thicken` the outline, rule the straight lines, fill, and the finish. `stepCaption` names the phase and the width, in English and Japanese ("Underdrawing: set the compass to width 2, put its point on 2, strike the circle"; "strike the gap circles" where one piece passes under another). Each circle of a construction says its centre (`at`) and its width's number (`width`), the widths numbered from the smallest. The steps of a crest are more than they were, so `stats.steps` is higher.
- **Centres, Widths and Fill switches.** `animatedSvg` and `stepSvg` take `centres`, `widths` and `fill` (`false` leaves each out), and the same three are attributes (`off`) on `<kamon-crest>`. With the fill off the crest is line art, each shape's own outline; `staticSvg(construction, { fill: false })` is the finished crest that way. The demo's card has the three switches beside Guides, kept for the session, and its downloads follow the Fill switch. `/animate` may now be up to 20 KB.

### Changed

- **Crests being redrawn come last in the ranking.** The twelve crests still traced from the crest book say `redrawing: true` in their records. Their arc counts are far more than there is to draw, so `rankCrests()` ranks them among themselves and puts them last (`{ redrawing: true }` ranks them among the rest), and the demo's Complexity tab greys them and marks them "Being redrawn" (描き直し中).
- **The turn strikes every unit's circles, clockwise.** After the unit is drawn, the `turn` step goes round its other places clockwise, one at a time: the unit's circles and lines are struck there, then the unit is inked there (it no longer fans out from the unit); `stepSvg` shows them from that step on. Before, only the first unit's guides were ever shown. Every guide circle is now written, and struck, clockwise from its top; a part's circles come by compass width, the smallest first, and its ruled lines after them, from the centre outwards. The plum's middle blocks are bound by three struck circles. A new test counts ruled lines that stand on nothing struck before them, and lists the forty crests that still have some. The finished crests are unchanged. `/animate` may now be up to 16 KB (it is loaded only when a crest is animated).
- **Nothing moves.** A mirror or a turn is built in its place, never shown as a flip or a slide; a test fails on any animated transform.

## [0.1.0-alpha.1] - 2026-11-24

A preview on npm under the `next` tag: the 61 crests, their parts, search, construction counts and Complexity ranking, the drawing animation with its player, and the parts isolation. The drawings are still being refined (see docs/construction-rules.md); install with `npm i @johnmorrisdotca/kamon-crests@next`.

### Added

- **One part alone.** `<kamon-crest>` has `isolate(part, show?)` and `clear()`, and `/animate` has `isolated(construction, part, show?)`: one part's steps, with the rest of the crest faint in `stepSvg` and `animatedSvg`. Every shape and guide of a construction says its `part` and its `unit` (0 for the unit that is drawn, 1 and up for each place it is turned to).
- **Complexity.** A crest's score is its circles, ruled lines and arcs together (`stats.score`), with the steps to break a tie. `rankCrests({ by, order })` ranks crests by it or by any count, and the demo has a Complexity tab (複雑さ): every crest from the simplest to the most complex with its counts under it, ranked by any count, narrowed by the parts chips, each opening its card and its drawing.
- **Counts for every crest.** Each record has `stats`, counted from the crest's construction and never typed: the circles struck, the lines ruled, the arcs inked, the steps, the distinct compass widths, the fills and the symmetry (how many turns, and whether it has a mirror line). The demo's card says them in English and Japanese (円 12・直線 6・手順 23・コンパス幅 3種). `findCrests()` takes any count exactly or as a range (`{ circles: 5 }`, `{ circles: { min: 10 } }`) and sorts by one, or by `strokes` (circles, lines and arcs together), as kanji are ordered by 画数. See [parts and search](docs/guides/parts-and-search.md).
- **Pause, step and scrub the drawing.** `<kamon-crest controls>` shows play and pause, step back and forward, a scrubber across the steps and the step's caption, in English or Japanese. The element has `pause()`, `play()` (which goes on from where it was held), `step(n)`, `at` and `paused`, and the events `kamon-play`, `kamon-pause` and `kamon-step`. Space holds or goes on, the arrow keys step. `stepSvg(construction, n)` in `/animate` is the still drawing at a step.

### Changed

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
