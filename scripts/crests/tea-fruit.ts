import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/tea-fruit.ts";
import { defineCrest } from "./util.ts";

export const mukoChaNoMi = defineCrest({
  id: "muko-cha-no-mi",
  name: { en: "Front-facing tea fruit", ja: "向こう茶の実" },
  reading: "むこうちゃのみ",
  romaji: "muko cha no mi",
  frame: "none",
  motifs: [{ motif: "tea-fruit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["むかふ茶のみ"],
  construction: {
    en: "Three pointed leaves show behind a round tea fruit. Each has a straight white vein. Six short rays extend from the small round mark on the face of the fruit.",
    ja: "丸い茶の実の後ろに先のとがった葉を三枚置き、それぞれにまっすぐな白い筋を入れます。実の表の小さな丸からは短い線を六本伸ばします。",
  },
  measured: "The printed fruit is about 160 pixels across and sits over three leaves on a triangular layout. The drawing gives the leaves equal turns, makes the central fruit somewhat broader and opens a white clearance around it.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, second row, third column from the right: むかふ茶のみ", ja: "左頁、二段目、右から三列目「むかふ茶のみ」" }, read: "2026-11-26", measured: true },
  build: drawn.mukoTeaFruitBuild,
});

export const rokkakuChaNoMi = defineCrest({
  id: "rokkaku-cha-no-mi",
  name: { en: "Hexagonal tea fruit", ja: "六角茶の実" },
  reading: "ろっかくちゃのみ",
  romaji: "rokkaku cha no mi",
  frame: "hexagon",
  motifs: [{ motif: "tea-fruit", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["六角ちやの実"],
  construction: { en: "Three broad curved leaves sweep in from a ruled hexagon. Each has a white vein, and three round fruits sit where the stems meet.", ja: "定規で引いた六角形から、幅広く曲がった葉が三枚内側へ伸びます。葉に白い葉脈を一本ずつ入れ、茎の集まる所に丸い実を三つ置きます。" },
  measured: "The three fruit circles, stem spacing and broad curved leaves come from the labelled cell. The six corners are regularized, and the thin printed outlines are filled in the package's solid-ink style.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "left page, fourth row, fourth column from the right: 六角ちやの実", ja: "左頁、四段目、右から四列目「六角ちやの実」" }, read: "2026-11-27", measured: true },
  build: drawn.rokkakuChaNoMiBuild,
});

export const hitotsuChaNoMi = defineCrest({
  id: "hitotsu-cha-no-mi",
  name: { en: "One tea fruit", ja: "一つ茶の実" },
  reading: "ひとつちゃのみ",
  romaji: "hitotsu cha no mi",
  frame: "none",
  motifs: [{ motif: "tea-fruit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["一ッ茶のみ"],
  construction: {
    en: "Two pointed leaves spread from an upright stem. The fruit above has a rounded cap and three white arches on its face.",
    ja: "立った茎から先のとがった葉を二枚広げます。その上に丸いふくらみのある実を置き、表に三本の白い弧を入れます。",
  },
  measured: "The printed fruit is about 205 pixels wide. The leaves stretch to either side and the stem has a slightly flared foot. The drawing balances the two halves and uses white cuts for the three inked arches.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, fourth row, second column from the right: 一ッ茶のみ", ja: "左頁、四段目、右から二列目「一ッ茶のみ」" }, read: "2026-11-26", measured: true },
  build: drawn.hitotsuTeaFruitBuild,
});

export const itowaNiHitotsuChaNoMi = defineCrest({
  id: "itowa-ni-hitotsu-cha-no-mi",
  name: { en: "One tea fruit in a thin ring", ja: "糸輪に一つ茶の実" },
  reading: "いとわにひとつちゃのみ",
  romaji: "itowa ni hitotsu cha no mi",
  frame: "ring-thread",
  motifs: [{ motif: "tea-fruit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸ワニ一ッ茶のみ"],
  construction: {
    en: "One upright tea fruit and its two leaves stand in a thread ring. Three cuts arch down the fruit and two long veins run across the leaves.",
    ja: "実一つと二枚の葉を糸輪に収めます。実の表には三本の弧の切り込みを、二枚の葉には長い筋を入れます。",
  },
  measured: "The printed plant repeats the single stem and paired pointed leaves within a fine ring. The drawing uses the same upright fruit as the unframed crest and leaves a narrow clearance at the foot and leaf tips.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, first row, third column from the right: 糸ワニ一ッ茶のみ", ja: "左頁、一段目、右から三列目「糸ワニ一ッ茶のみ」" }, read: "2026-11-26", measured: true },
  build: drawn.itowaHitotsuTeaFruitBuild,
});

export const mitsuYaseChaNoMi = defineCrest({
  id: "mitsu-yase-cha-no-mi",
  name: { en: "Thin three tea fruits", ja: "三つ痩せ茶の実" },
  reading: "みつやせちゃのみ",
  romaji: "mitsu yase cha no mi",
  frame: "none",
  motifs: [{ motif: "tea-fruit", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッやせ茶のみ"],
  construction: {
    en: "Three small fruits turn outwards on long stems from a round centre. A pointed veined leaf stands in each space between neighbouring fruits.",
    ja: "丸い中心から長い茎を三本伸ばし、小さな実を外へ向けます。隣り合う実の間には、筋のあるとがった葉を一枚ずつ置きます。",
  },
  measured: "The three printed fruit heads stand apart on long stalks with one pointed leaf between each pair. The drawing keeps those gaps and uses slightly smaller heads, stronger stems and a broader dark central joint.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, fourth row, fourth column from the right: 三ッやせ茶のみ", ja: "左頁、四段目、右から四列目「三ッやせ茶のみ」" }, read: "2026-11-26", measured: true },
  build: drawn.mitsuYaseTeaFruitBuild,
});

export const futowaNiKatamomiChaNoMi = defineCrest({
  id: "futowa-ni-katamomi-cha-no-mi",
  name: { en: "Katamomi tea fruit in a thick ring", ja: "太輪に片もみ茶の実" },
  reading: "ふとわにかたもみちゃのみ",
  romaji: "futowa ni katamomi cha no mi",
  frame: "ring-thick",
  motifs: [{ motif: "tea-fruit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["太ワニ片もみ茶の実"],
  construction: { en: "Six rounded lobes turn around a round centre inside a thick ring. Each pair opens into a long central cut and two shorter folded cuts.", ja: "太輪に収めた丸い中心のまわりに、丸いふくらみを六つ置きます。ふくらみ二つの間を長く白く抜き、それぞれに折れた形の短い白い切り込みを二つずつ入れます。" },
  measured: "The printed ring has an inner radius about seven tenths of its outer radius. Three reflected pairs of lobes meet at a round centre, with a long narrow gap between each pair. The drawing evens the turns and uses the package’s thick ring and white cuts.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, third row, fourth column from the right: 太ワニ片もみ茶の実", ja: "左頁、三段目、右から四列目「太ワニ片もみ茶の実」" }, read: "2026-11-26", measured: true },
  build: drawn.futowaNiKatamomiChaNoMiBuild,
});
