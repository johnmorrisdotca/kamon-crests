# Changelog

All notable changes to this project are written here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- **The leaf and flower crests redrawn from a period crest book.** The paulownia (五三桐, 五七桐, 丸に五三桐), the hanging wisteria (下がり藤, 丸に下がり藤), the tachibana (橘, 丸に橘), bamboo grass and gentian (笹竜胆, now the Minamoto form of three gentians over five leaves, without a ring) and the maple (紅葉) are vectorised from 伊呂波分新撰紋帳 (1892, National Diet Library, public domain), cleaned and mirrored exactly; each crest cites the book, the frame and the place (`docs/provenance.md`, `NOTICE.md`).
- **The chrysanthemum** (十六八重表菊, 丸に菊) is struck from the sixteen-division: sixteen petals packed edge to edge with thin white lines between, each ending in a round tip, round a small disc, with the tips of sixteen behind at the rim.
- **The tomoe** (左三つ巴, 右三つ巴, 丸に左三つ巴) is struck from its compass circles: on each of three spokes a head (0.45 of the radius) and a swirl (0.66) that both touch the outer circle at the spoke's end, so the white is three horns, each tail thins to a point on the rim, and the outer edge is a whole circle.
- **The Tokugawa hollyhock** (三つ葉葵, 丸に三つ葉葵) is a compass-and-ruler construction: every edge an arc of a circle or a ruled line, the circles on grid points or placed by touching the ones before. In the ring each leaf's spindle widens into a wedge that joins the ring; without it the spindle ends in a point at the notch.
- **The crossed hawk feathers** (違い鷹の羽, 丸に違い鷹の羽) are redrawn: two ruled feathers with round ends crossed at right angles, a shaft, two bars of three chevrons, and down at the quill.
- **The rabbit** is redrawn as the front-facing rabbit (真向き兎), without a ring: a body of two circles, a pointed back, two lens ears and a round face.
- **The ginkgo** is now the three ginkgo leaves (三つ銀杏, 丸に三つ銀杏; `mitsu-icho`, `maru-ni-mitsu-icho`), after the 1892 crest book; the single leaf (`icho`, `maru-ni-icho`), which matched no recorded crest, is gone.
- **The maple's stalk** is ruled, flaring to a flat cut end as the book draws it.
- **The construction is the data.** These crests' guides are the compass circles and ruled lines they are inked from, and the animation strikes them before it draws (`scripts/construct/compass.ts`).
- **Rings** are heavier and their motifs fill them: a medium ring is 16.8 of the 192 (0.087 of the diameter, the median of fifteen real ringed crests), with 3.5 of white inside it.
- **Search** finds a crest by its name as English writes it: "Marunigosan-kiri", "gosan-kiri", "Maru ni Gosan no Kiri" and "Kikkou" all find their crests; and by more common names ("Tokugawa crest", "Imperial Seal of Japan", "Takeda-bishi", "Rokumonsen", "Sanada crest").

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
