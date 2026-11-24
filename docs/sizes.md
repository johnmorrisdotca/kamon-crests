# Sizes

What a page pays for each crest. A crest's module is its SVG and a line of code; most are 1 to 4 KB. The budget for a
crest is 6 KB and the ceiling is 16 KB; the crests over the budget are listed here with
the reason, and a test holds this list to the data. Written by `pnpm data`; do not edit it by hand.

## Over the budget

| Crest | Bytes | Why |
| --- | --- | --- |
| `maru-ni-mitsu-gashiwa` | 7714 | scalloped leaves with fine veins cut out: many curves |
| `maru-ni-mitsuba-aoi` | 12200 | scalloped leaves with fine veins cut out: many curves |
| `mitsu-gashiwa` | 7514 | scalloped leaves with fine veins cut out: many curves |
| `mitsuba-aoi` | 12100 | scalloped leaves with fine veins cut out: many curves |
| `gosan-no-kiri` | 13796 | scalloped leaves with fine veins cut out: many curves |
| `goshichi-no-kiri` | 14850 | scalloped leaves with fine veins cut out: many curves |
| `maru-ni-gosan-no-kiri` | 14175 | scalloped leaves with fine veins cut out: many curves |

## Worth knowing

- The main entry carries no crest: a page pays for the crests it imports, and for no others.
- The animation's data (`/steps/<id>`) is a separate module, loaded only when a crest is animated.
