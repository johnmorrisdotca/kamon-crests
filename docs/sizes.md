# Sizes

What a page pays for each crest. A crest's module is its SVG and a line of code; most are 1 to 4 KB. The budget for a
crest is 6 KB and the ceiling is 24 KB; the crests over the budget are listed here with
the reason, and a test holds this list to the data. Written by `pnpm data`; do not edit it by hand.

## Over the budget

| Crest | Bytes | Why |
| --- | --- | --- |
| `mitsuba-aoi` | 11356 | leaves of many small cells between their veins: many arcs |
| `maru-ni-mitsuba-aoi` | 11599 | leaves of many small cells between their veins: many arcs |
| `tachi-aoi` | 11506 | leaves of many small cells between their veins: many arcs |
| `maru-ni-tachi-aoi` | 11658 | leaves of many small cells between their veins: many arcs |
| `muko-neji-ume` | 8182 | many fine details |
| `mitsu-yose-ura-ume` | 6382 | many fine details |
| `yae-muko-ume` | 7417 | many fine details |
| `mitsu-gashiwa` | 8307 | scalloped leaves with fine veins cut out: many curves |
| `maru-ni-mitsu-gashiwa` | 8302 | scalloped leaves with fine veins cut out: many curves |
| `kokonoe-giku` | 6874 | many fine details |
| `mitsu-kiku-bishi` | 6728 | many fine details |
| `goshichi-no-kiri` | 7180 | scalloped leaves with fine veins cut out: many curves |
| `tachibana` | 14851 | many fine details |
| `maru-ni-tachibana` | 14801 | many fine details |
| `sagari-fuji` | 6560 | many fine details |
| `maru-ni-sagari-fuji` | 6654 | many fine details |
| `agari-fuji` | 6390 | many fine details |
| `fuji-no-maru` | 13555 | many fine details |
| `naito-fuji` | 7839 | many fine details |
| `okubo-fuji` | 8000 | many fine details |
| `sasa-rindo` | 13599 | many fine details |
| `mitsu-kumiawase-itayagai` | 12449 | many fine details |
| `mukai-itayagai` | 9153 | many fine details |
| `yotsu-itayagai` | 11829 | many fine details |
| `agehacho` | 9429 | many fine details |
| `maru-ni-agehacho` | 11579 | many fine details |
| `tsuru-no-maru` | 15852 | many fine details |
| `yatsu-yaguruma` | 7033 | many fine details |

## Worth knowing

- The main entry carries no crest: a page pays for the crests it imports, and for no others.
- The animation's data (`/steps/<id>`) is a separate module, loaded only when a crest is animated.
- `/load` is the table of every crest's two loaders, so it grows about 155 bytes with each crest, and a flat limit would fail on every new crest. Its budget is counted by the crest: 3.5 KB for its own code and 140 bytes a crest. That still catches a loader that grows per crest.
- `/animate` was held to 25 KB (it was 24.0 KB) and is now held to 36 KB (it is 35.1 KB); the element was held to 12 KB (it was 12.0 KB) and is now held to 14 KB (it is 13.6 KB). Three switches of the animation account for it, and nothing else grew: the widths key (its rows, laid out in columns for a crest of many widths, bold while the compass is set to that width, and the element's wider box to hold it), the pen's ink (the length of each outline, the pace of each trace and thickening, the heavy second outline) and every place built in full (`fullBuilt`, which writes each place's circles and lines where they stand, and the place's caption). Each budget is the built file's size plus under a kilobyte, so a fourth switch would have to ask again.
- `/animate` is now held to 37 KB (it is 36.5 KB): the guides' flash before they are rubbed out (a wider, full-strength stop in each guide's keyframes and one for their group) took it past 36 KB.
- `/animate` is now held to 38 KB (it is 37.3 KB): the widths key became a ruler (a tick and a number for every width, the numbers set out in two rows where they fit, and the width of each arc the pen inks marked on it) and took it past 37 KB.
- `/animate` is now held to 39 KB (it is 38.1 KB): a step that only repeats an earlier step's shape (outlined, thickened or filled again at another place) now plays twice as fast, and finding those steps took it past 38 KB.
- `/animate` is now held to 42 KB (it is 40.6 KB): a browser starts a path's dashes again at each of its subpaths, so a ring or a shape with a hole was inked round all its subpaths at once, ahead of the compass arm; each subpath is now drawn as its own outline in its share of the time, which took it past 39 KB.
- `/animate` is now held to 45 KB (it is 43.9 KB) and the element to 15 KB (it is 14.7 KB): a looping crest can leave before it is drawn again, by one of six exits (fade, scatter, spin, twirl, fall, close), each part in a group of its own; the element picks one at random each time round.
- `/animate` is now held to 46 KB (it is 45.2 KB): beside the crest the widths ruler stands upright, with its numbers in two columns, which took it past 45 KB.
- The element is now held to 17 KB (it is 16.4 KB): `invert="on"` cuts the crest out of a disc of its colour, which took it past 15 KB.
- The manifest is held to 4 KB and 800 bytes a crest, down from 1,350: a record no longer carries its `construction` text (English and Japanese, 54% of the records' field data), which now loads with the crest's steps through `crestConstruction(id)`, so no page that lists, searches or sorts the crests pays for it. The manifest fell from 164,515 to 96,371 bytes, about 775 bytes a crest, so the 800 leaves about 3% of headroom.
- A crest's `/steps/<id>` module is held to 50 KB, up from 48 KB: it now also holds the crest's construction text, up to about 1.4 KB, and the largest (`agehacho`) went from about 48.6 KB to 50.0 KB. The text rides in the steps module, not in a chunk of its own, because the card already loads the steps, and a second table of loaders would have added to `/load` for every crest.
- `/names` is the table of every crest's id and its two names, so it grows about 64 bytes with each crest (a short name about 35, a long framed one about 90), and its flat 6 KB limit would have failed near 95 crests. Its budget is counted by the crest too: 0.5 KB for its own code and 72 bytes a crest. That still catches a table that gains a third string per crest.
- The main entry holds every crest's id, so it grows about 18 bytes with each crest, and its flat 6 KB limit was reached at 225 crests. It is now held to 2.5 KB and 20 bytes a crest (it is 6.0 KB at 225 crests); it still carries no crest.
