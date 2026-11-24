# Sizes

What a page pays for each crest. A crest's module is its SVG and a line of code; most are 1 to 4 KB. The budget for a
crest is 6 KB and the ceiling is 24 KB; the crests over the budget are listed here with
the reason, and a test holds this list to the data. Written by `pnpm data`; do not edit it by hand.

## Over the budget

| Crest | Bytes | Why |
| --- | --- | --- |
| `mitsuba-aoi` | 9348 | leaves of many small cells between their veins: many arcs |
| `maru-ni-mitsuba-aoi` | 9579 | leaves of many small cells between their veins: many arcs |
| `mitsu-gashiwa` | 8307 | scalloped leaves with fine veins cut out: many curves |
| `maru-ni-mitsu-gashiwa` | 8302 | scalloped leaves with fine veins cut out: many curves |
| `gosan-no-kiri` | 6164 | scalloped leaves with fine veins cut out: many curves |
| `goshichi-no-kiri` | 6986 | scalloped leaves with fine veins cut out: many curves |
| `maru-ni-gosan-no-kiri` | 6267 | scalloped leaves with fine veins cut out: many curves |
| `tachibana` | 14851 | many fine details |
| `maru-ni-tachibana` | 14801 | many fine details |
| `sagari-fuji` | 16130 | many fine details |
| `maru-ni-sagari-fuji` | 16276 | many fine details |
| `fuji-no-maru` | 13555 | many fine details |
| `sasa-rindo` | 13599 | many fine details |
| `agehacho` | 10774 | many fine details |
| `maru-ni-agehacho` | 10874 | many fine details |

## Worth knowing

- The main entry carries no crest: a page pays for the crests it imports, and for no others.
- The animation's data (`/steps/<id>`) is a separate module, loaded only when a crest is animated.
- `/load` is the table of every crest's two loaders, so it grows about 155 bytes with each crest, and a flat limit would fail on every new crest. Its budget is counted by the crest: 3.5 KB for its own code and 140 bytes a crest. That still catches a loader that grows per crest.
- `/animate` was held to 25 KB (it was 24.0 KB) and is now held to 36 KB (it is 35.1 KB); the element was held to 12 KB (it was 12.0 KB) and is now held to 14 KB (it is 13.6 KB). Three switches of the animation account for it, and nothing else grew: the widths key (its one row, the line growing to each width the compass is set to, and the element's wider box to hold it), the pen's ink (the length of each outline, the pace of each trace and thickening, the heavy second outline) and every place built in full (`fullBuilt`, which writes each place's circles and lines where they stand, and the place's caption). Each budget is the built file's size plus under a kilobyte, so a fourth switch would have to ask again.
- The manifest is held to 4 KB and 1,350 bytes a crest, up from 1,200: a record now carries its place in the books' order (`no`, `family`, `familyReading`, `base`, `variantKind` and `variantRank`, about 125 bytes), and the manifest the table of the 50 families and the 7 chapters (about 45 bytes a crest). It stood at 1,171 bytes a crest and is now 1,320. The reason is the new fields and nothing else; each crest's own SVG budget is unchanged.
- `/names` is the table of every crest's id and its two names, so it grows about 64 bytes with each crest (a short name about 35, a long framed one about 90), and its flat 6 KB limit would have failed near 95 crests. Its budget is counted by the crest too: 0.5 KB for its own code and 72 bytes a crest. That still catches a table that gains a third string per crest.
