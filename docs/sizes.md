# Sizes

What a page pays for each crest. A crest's module is its SVG and a line of code; most are 1 to 4 KB. The budget for a
crest is 6 KB and the ceiling is 24 KB; the crests over the budget are listed here with
the reason, and a test holds this list to the data. Written by `pnpm data`; do not edit it by hand.

## Over the budget

| Crest | Bytes | Why |
| --- | --- | --- |
| `maru-ni-mitsu-gashiwa` | 14418 | scalloped leaves with fine veins cut out: many curves |
| `maru-ni-mitsuba-aoi` | 21594 | scalloped leaves with fine veins cut out: many curves |
| `mitsu-gashiwa` | 14357 | scalloped leaves with fine veins cut out: many curves |
| `mitsuba-aoi` | 21448 | scalloped leaves with fine veins cut out: many curves |
| `momiji` | 11066 | many fine details |
| `gosan-no-kiri` | 16287 | scalloped leaves with fine veins cut out: many curves |
| `goshichi-no-kiri` | 23424 | scalloped leaves with fine veins cut out: many curves |
| `maru-ni-gosan-no-kiri` | 16312 | scalloped leaves with fine veins cut out: many curves |
| `fuji-no-maru` | 13555 | many fine details |
| `maru-ni-sagari-fuji` | 16267 | many fine details |
| `maru-ni-tachibana` | 14792 | many fine details |
| `sagari-fuji` | 16130 | many fine details |
| `sasa-rindo` | 13599 | many fine details |
| `tachibana` | 14851 | many fine details |

## Worth knowing

- The main entry carries no crest: a page pays for the crests it imports, and for no others.
- The animation's data (`/steps/<id>`) is a separate module, loaded only when a crest is animated.
