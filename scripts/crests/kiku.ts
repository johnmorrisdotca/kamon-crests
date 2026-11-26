import { SHINSEN_MONCHO } from "./books.ts";
import { kikuSuiBuild, uraGikuBuild, kikuBishiBuild, jurokuUragikuBuild, yaeUragikuBuild, uraKikuBishiBuild, kokonoeGikuBuild, kokumochiJushiGikuBuild, mitsuKikuBishiBuild, kikuIchiBuild } from "./drawn/kiku.ts";
import { defineCrest } from "./util.ts";

export const kikuSui = defineCrest({
  id: "kiku-sui",
  name: { en: "Chrysanthemum on water", ja: "菊水" },
  reading: "きくすい",
  romaji: "kiku sui",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 9, arrangement: "radial" }, { motif: "wave", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["chrysanthemum above water", "きく水"],
  construction: {
    en: "Half a chrysanthemum rises above the water. The rounded ends touch the ruled sides of each petal. Solid bands of water double back around half circles, with white gaps at the crossings.",
    ja: "水の上に菊の半分を見せます。花びらの先は、花びらの両側に定規で引いた直線に接する円弧で丸くします。水の帯は半円を描いて折り返し、重なるところには白いすき間を空けます。",
  },
  measured: "Frame 39: an upper half-flower with nine visible petals (one at the crown, four to either side) and a small half-disc stands over a much wider panel of water. The water's ruled horizontal bands double back in alternating directions. The two outlines of each stream become the edges of one filled ribbon, including the two inner returns.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, third row, fourth column from the right: きく水", ja: "左頁、三段目、右から四列目「きく水」" }, read: "2026-11-26", measured: true },
  build(c) {
    kikuSuiBuild(c, 79);
  },
});

export const uraGiku = defineCrest({
  id: "ura-giku",
  name: { en: "Chrysanthemum seen from behind", ja: "裏菊" },
  reading: "うらぎく",
  romaji: "ura giku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [],
  aliases: ["reverse chrysanthemum", "うらきく"],
  construction: {
    en: "Sixteen petals have the same reach and rounded tips. A six-point calyx and a short stalk curved on two compass arcs show the flower from behind.",
    ja: "先の丸い花びら十六枚を同じ長さで並べます。六つの角のあるがくと、二本の円弧で曲げた短い柄で、花を裏から見た形にします。",
  },
  measured: "The vertical axis runs between two of the sixteen petals. Fine radial gaps end around the pointed central calyx, with a short stalk curving down from it.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, second row, fourth column from the right: うらきく", ja: "左頁、二段目、右から四列目「うらきく」" }, read: "2026-11-26", measured: true },
  build(c) {
    uraGikuBuild(c, 96);
  },
});

export const kikuBishi = defineCrest({
  id: "kiku-bishi",
  name: { en: "Chrysanthemum lozenge", ja: "菊菱" },
  reading: "きくびし",
  romaji: "kiku bishi",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [],
  aliases: ["lozenge chrysanthemum", "菊びし"],
  construction: {
    en: "Sixteen rounded petals open from a round centre. The horizontal petals reach furthest, and the upper and lower tips stop sooner to make a broad lozenge.",
    ja: "丸い中心から先の丸い花びらを十六枚伸ばします。左右は長く、上下は短くして、横に広い菱形にします。",
  },
  measured: "The sixteen tips mark a lozenge with a width close to four thirds of its height. Symmetry is restored across both axes while retaining the shorter upper and lower petals.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, first row, fourth column from the right: 菊びし", ja: "左頁、一段目、右から四列目「菊びし」" }, read: "2026-11-26", measured: true },
  build(c) {
    kikuBishiBuild(c, 96);
  },
});

export const jurokuUragiku = defineCrest({
  id: "juroku-uragiku",
  name: { en: "Sixteen-petal chrysanthemum from behind", ja: "十六裏菊" },
  reading: "じゅうろくうらぎく",
  romaji: "jūroku uragiku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [],
  aliases: ["十六うら菊"],
  construction: {
    en: "Sixteen round-tipped petals surround a small eight-lobed calyx. The main petals all lie on the same layout circle.",
    ja: "八つのふくらみのある小さながくのまわりに、先の丸い花びらを十六枚、どれも外円まで伸ばして並べます。",
  },
  measured: "Sixteen round-tipped petals surround a small eight-lobed calyx. The main petals all lie on the same layout circle.",
  source: { ...SHINSEN_MONCHO, frame: 40, place: { en: "right page, third row, first column from the right: 十六うら菊", ja: "右頁、三段目、右から一列目「十六うら菊」" }, read: "2026-11-26", measured: true },
  build(c) {
    jurokuUragikuBuild(c, 96);
  },
});

export const yaeUragiku = defineCrest({
  id: "yae-uragiku",
  name: { en: "Double chrysanthemum from behind", ja: "八重裏菊" },
  reading: "やえうらぎく",
  romaji: "yae uragiku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [],
  aliases: ["八重うらきく"],
  construction: {
    en: "Two rows of eight pointed petals spread out around the calyx. Each petal is bounded by two compass arcs, and the back row shows between the front points.",
    ja: "がくのまわりに、先のとがった花びらを八枚ずつ二重に並べます。花びらの両脇は円弧で描き、手前の花びらの間から奥の花びらの先を見せます。",
  },
  measured: "Two rows of eight pointed petals spread out around the calyx. Each petal is bounded by two compass arcs, and the back row shows between the front points.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, fourth row, third column from the right: 八重うらきく", ja: "右頁、四段目、右から三列目「八重うらきく」" }, read: "2026-11-26", measured: true },
  build(c) {
    yaeUragikuBuild(c, 96);
  },
});

export const uraKikuBishi = defineCrest({
  id: "ura-kiku-bishi",
  name: { en: "Lozenge chrysanthemum from behind", ja: "裏菊菱" },
  reading: "うらぎくびし",
  romaji: "ura kiku bishi",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [],
  aliases: ["うらきくひし"],
  construction: {
    en: "Two compass arcs come to a point at each petal tip. The longest petals point sideways, and a curved stalk shows beneath the pointed calyx.",
    ja: "二本の円弧を花びらの先で合わせてとがらせます。左右の花びらを最も長くし、先のとがったがくの下に曲がった柄を置きます。",
  },
  measured: "Two compass arcs come to a point at each petal tip. The longest petals point sideways, and a curved stalk shows beneath the pointed calyx.",
  source: { ...SHINSEN_MONCHO, frame: 40, place: { en: "right page, fourth row, first column from the right: うらきくひし", ja: "右頁、四段目、右から一列目「うらきくひし」" }, read: "2026-11-26", measured: true },
  build(c) {
    uraKikuBishiBuild(c, 96);
  },
});

export const kokonoeGiku = defineCrest({
  id: "kokonoe-giku",
  name: { en: "Layered chrysanthemum", ja: "九重菊" },
  reading: "ここのえぎく",
  romaji: "kokonoe giku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [],
  aliases: ["九重きく"],
  construction: {
    en: "Three visible rows of sixteen rounded petals share the same set of spokes. Small arcs at the tips of the inner rows leave scalloped white seams.",
    ja: "先の丸い花びら十六枚ずつを、同じ放射線に沿って三重に並べます。内側の花びらの先に沿って小さな円弧を描き、白いすき間をあけます。",
  },
  measured: "Three visible rows of sixteen rounded petals share the same set of spokes. Small arcs at the tips of the inner rows leave scalloped white seams.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, second row, second column from the right: 九重きく", ja: "左頁、二段目、右から二列目「九重きく」" }, read: "2026-11-26", measured: true },
  build(c) {
    kokonoeGikuBuild(c, 96);
  },
});


export const kokumochiJushiGiku = defineCrest({
  id: "kokumochi-jushi-giku",
  name: { en: "Fourteen-petal chrysanthemum on a black disc", ja: "石持ち十四菊" },
  reading: "こくもちじゅうしぎく",
  romaji: "kokumochi jūshi giku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 14, arrangement: "radial" }, { motif: "black-disc", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["石持十四菊"],
  construction: {
    en: "Fourteen rounded petals are cut out of a black disc. A small dot sits within a round white centre.",
    ja: "黒い円から先の丸い花びらを十四枚、白く抜きます。丸い白地の中心に小さな点を置きます。",
  },
  measured: "Fourteen rounded petals are cut out of a black disc. A small dot sits within a round white centre.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, fourth row, second column from the right: 石持十四菊", ja: "左頁、四段目、右から二列目「石持十四菊」" }, read: "2026-11-26", measured: true },
  build(c) {
    kokumochiJushiGikuBuild(c);
  },
});

export const mitsuKikuBishi = defineCrest({
  id: "mitsu-kiku-bishi",
  name: { en: "Three chrysanthemum lozenges", ja: "三つ菊菱" },
  reading: "みつきくびし",
  romaji: "mitsu kiku bishi",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッきくひし"],
  construction: {
    en: "Three flower lozenges fit together on a triangle. Each one has sixteen rounded petals, with a round centre and the longest petals on its broad axis.",
    ja: "菱形の菊を三つ、三角形を作るように組み合わせます。それぞれ丸い中心を先の丸い花びら十六枚で囲み、菱の長い軸に沿う花びらを最も長くします。",
  },
  measured: "Three flower lozenges fit together on a triangle. Each one has sixteen rounded petals, with a round centre and the longest petals on its broad axis.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, fourth row, third column from the right: 三ッきくひし", ja: "左頁、四段目、右から三列目「三ッきくひし」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuKikuBishiBuild(c, 92);
  },
});

export const kikuIchi = defineCrest({
  id: "kiku-ichi",
  name: { en: "Chrysanthemum and bar", ja: "菊一" },
  reading: "きくいち",
  romaji: "kiku ichi",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 9, arrangement: "radial" }, { motif: "bar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["きく一"],
  construction: {
    en: "Nine rounded petals form the top half of a chrysanthemum. Below is a horizontal brushstroke with slightly flared ends and small corner arcs.",
    ja: "先の丸い花びら九枚で菊の上半分を作ります。その下に、両端が少し広がる横一文字を置きます。",
  },
  measured: "Nine rounded petals form the top half of a chrysanthemum. Below is a horizontal brushstroke with slightly flared ends and small corner arcs.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, second row, third column from the right: きく一", ja: "左頁、二段目、右から三列目「きく一」" }, read: "2026-11-26", measured: true },
  build(c) {
    kikuIchiBuild(c);
  },
});
