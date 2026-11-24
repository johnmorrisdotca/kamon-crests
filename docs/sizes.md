# Sizes

What a page pays for each crest. A crest's module is its SVG and a line of code; most are 1 to 4 KB. The budget for a
crest is 6 KB and the ceiling is 24 KB; the crests over the budget are listed here with
the reason, and a test holds this list to the data. Written by `pnpm data`; do not edit it by hand.

## Over the budget

| Crest | Bytes | Why |
| --- | --- | --- |
| `maru-ni-mitsu-gashiwa` | 8302 | scalloped leaves with fine veins cut out: many curves |
| `maru-ni-mitsuba-aoi` | 9579 | leaves of many small cells between their veins: many arcs |
| `mitsu-gashiwa` | 8307 | scalloped leaves with fine veins cut out: many curves |
| `mitsuba-aoi` | 9348 | leaves of many small cells between their veins: many arcs |
| `gosan-no-kiri` | 6164 | scalloped leaves with fine veins cut out: many curves |
| `goshichi-no-kiri` | 6986 | scalloped leaves with fine veins cut out: many curves |
| `maru-ni-gosan-no-kiri` | 6267 | scalloped leaves with fine veins cut out: many curves |
| `agehacho` | 10774 | many fine details |
| `fuji-no-maru` | 13555 | many fine details |
| `maru-ni-agehacho` | 10874 | many fine details |
| `maru-ni-sagari-fuji` | 16276 | many fine details |
| `maru-ni-tachibana` | 14801 | many fine details |
| `sagari-fuji` | 16130 | many fine details |
| `sasa-rindo` | 13599 | many fine details |
| `tachibana` | 14851 | many fine details |

## Worth knowing

- The main entry carries no crest: a page pays for the crests it imports, and for no others.
- The animation's data (`/steps/<id>`) is a separate module, loaded only when a crest is animated.
- `/load` is the table of every crest's two loaders, so it grows about 155 bytes with each crest, and a flat limit would fail on every new crest. Its budget is counted by the crest: 3.5 KB for its own code and 140 bytes a crest. That still catches a loader that grows per crest.
- `/names` is the table of every crest's id and its two names, so it grows about 64 bytes with each crest (a short name about 35, a long framed one about 90), and its flat 6 KB limit would have failed near 95 crests. Its budget is counted by the crest too: 0.5 KB for its own code and 72 bytes a crest. That still catches a table that gains a third string per crest.
