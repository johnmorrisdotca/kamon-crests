# Changelog

All notable changes to this project are written here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

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
