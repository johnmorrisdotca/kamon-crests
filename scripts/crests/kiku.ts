import { kikuEdaMaruBuild } from "./drawn/kiku-eda-maru.ts";
import { shitabaGikuBuild } from "./drawn/shitaba-giku.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiFutatsuWariKikuBuild, kikuSuiBuild, uraGikuBuild, kikuBishiBuild, jurokuUragikuBuild, yaeUragikuBuild, uraKikuBishiBuild, kokonoeGikuBuild, kokumochiJushiGikuBuild, mitsuKikuBishiBuild, kikuIchiBuild, mitsuWariGikuBuild, kikuGurumaBuild, kaburoYaeGikuBuild } from "./drawn/kiku.ts";
import { defineCrest } from "./util.ts";
import { ouchiKikuGurumaBuild } from "./drawn/kiku-ouchi.ts";
import { hatsukiKikuGurumaBuild } from "./drawn/kiku-leaf-wheel.ts";
import { mitsubaUraHonGikuBuild } from "./drawn/kiku-reverse-leaves.ts";
import { kikuZuruBuild } from "./drawn/kiku-zuru.ts";

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
    ja: "先の丸い花びら九枚で菊の上半分を作ります。その下に、両端が少し広がり、角に小さな弧のある横一文字を置きます。",
  },
  measured: "Nine rounded petals form the top half of a chrysanthemum. Below is a horizontal brushstroke with slightly flared ends and small corner arcs.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, second row, third column from the right: きく一", ja: "左頁、二段目、右から三列目「きく一」" }, read: "2026-11-26", measured: true },
  build(c) {
    kikuIchiBuild(c);
  },
});

export const mitsuWariGiku = defineCrest({
  id: "mitsu-wari-giku",
  name: { en: "Three split chrysanthemums", ja: "三つ割り菊" },
  reading: "みつわりぎく",
  romaji: "mitsu wari giku",
  frame: "ring-thin",
  motifs: [{ motif: "chrysanthemum", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッわりきく"],
  construction: {
    en: "Three half flowers turn inwards from the rim. Each has seven rounded petals and a half-disc at the foot.",
    ja: "輪の縁から菊の半分を三つ、内側へ向けます。それぞれ先の丸い花びら七枚と根元の半円で作ります。",
  },
  measured: "Three half flowers turn inwards from the rim. Each has seven rounded petals and a half-disc at the foot.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, fourth row, second column from the right: 三ッわりきく", ja: "右頁、四段目、右から二列目「三ッわりきく」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuWariGikuBuild(c);
  },
});

export const kikuGuruma = defineCrest({
  id: "kiku-guruma",
  name: { en: "Chrysanthemum wheel", ja: "菊車" },
  reading: "きくぐるま",
  romaji: "kiku guruma",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [],
  aliases: ["きくぐるま"],
  construction: {
    en: "Sixteen pointed leaves with slightly tilted axes turn in the same direction about a round centre. A shallow arc on either side of each axis joins the base and tip. The inner halves overlap, with a short white seam between them.",
    ja: "丸い中心のまわりに、先のとがった花びらを十六枚、同じ向きに少し傾けて並べます。軸はほぼまっすぐな線で、その両側に、根元と先を結ぶ浅い弧を引きます。内側の半分は重なり合い、そのあいだに短い白い線が入ります。",
  },
  measured: "Sixteen pointed leaves with slightly tilted axes turn in the same direction about a round centre. A shallow arc on either side of each axis joins the base and tip. The inner halves overlap, with a short white seam between them.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, third row, third column from the right: きくぐるま", ja: "右頁、三段目、右から三列目「きくぐるま」" }, read: "2026-11-26", measured: true },
  build(c) {
    kikuGurumaBuild(c, 90);
  },
});

export const maruNiFutatsuWariKiku= defineCrest({
  id: "maru-ni-futatsu-wari-kiku",
  name: { en: "Two half chrysanthemums in a circle", ja: "丸に二つ割り菊" },
  reading: "まるにふたつわりぎく",
  romaji: "maru ni futatsu wari-giku",
  frame: "ring-medium",
  motifs: [{ motif: "chrysanthemum", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["丸ニ二ッワリきく"],
  construction: {
    en: "Set two nine-petal half chrysanthemums on parallel horizontal lines, with the upper flower to the right of the lower one. Round each petal end with a circle tangent to its sides, and enclose both flowers in the measured band of the enclosing ring.",
    ja: "花弁が九枚の半菊を平行な水平線に一つずつ置き、上の花を下の花より右に寄せます。花弁の先は両側に接する円で丸く収め、二つの花を輪に収めます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, second row, third column from the right: 丸ニ二ッワリきく", ja: "右頁、二段目、右から三列目「丸ニ二ッワリきく」" }, read: "2026-11-27", measured: true },
  build(c) { maruNiFutatsuWariKikuBuild(c); },
});

export const kaburoYaeGiku= defineCrest({
  id: "kaburo-yae-giku",
  name: { en: "Layered chrysanthemum with drooping petals", ja: "禿八重菊" },
  reading: "かぶろやえぎく",
  romaji: "kaburo yae-giku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["かふろ八重きく", "かむろやえぎく"],
  construction: {
    en: "Set the hub above the middle and draw pointed petals with two arcs meeting at each tip. Lengthen the lower petals and leave thin paper divisions where the second row shows between them.",
    ja: "中心を中央より上にとり、先で交わる二つの弧で花弁をとがらせます。下の花弁を長くとり、その間から見える二重目との境に細い白いすき間をあけます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, third row, second column from the right: かふろ八重きく", ja: "左頁、三段目、右から二列目「かふろ八重きく」" }, read: "2026-11-27", measured: true },
  build(c) { kaburoYaeGikuBuild(c); },
});

export const ouchiKikuGuruma = defineCrest({
  id: "ouchi-kiku-guruma",
  name: { en: "Ōuchi chrysanthemum wheel", ja: "大内菊車" },
  reading: "おおうちきくぐるま",
  romaji: "ōuchi kiku guruma",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["大内きく車"],
  construction: {
    en: "Around a round hub, alternate three scalloped, veined leaves with three stalks. Place a flower head with round-tipped petals at the end of each stalk.",
    ja: "丸い中心のまわりに、丸い切れ込みと葉脈のある葉を三枚、茎を三本、交互に並べます。各茎の先に、先を丸く収めた花弁の花を置きます。",
  },
  measured: "The heads and leaves repeat in three turns. The drawing makes their proportions regular and uses three pairs of leaf veins.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, second row, second column from the right: 大内きく車", ja: "右頁、二段目、右から二列目「大内きく車」" }, read: "2026-11-27", measured: true },
  build: ouchiKikuGurumaBuild,
});

export const hatsukiKikuGuruma = defineCrest({
  id: "hatsuki-kiku-guruma",
  name: { en: "Chrysanthemum wheel with leaves", ja: "葉付き菊車" },
  reading: "はつききくぐるま",
  romaji: "hatsuki kiku guruma",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["葉つききく車"],
  construction: {
    en: "Alternate three scalloped leaves with three stems around a round centre. At each stem tip fan out pointed petals made from two arcs each.",
    ja: "丸い中心のまわりに、丸い切れ込みのある葉を三枚、茎を三本、交互に並べます。各茎の先で、二つの弧でとがらせた花弁を扇形に開きます。",
  },
  measured: "The radial fans are equalised and their ruled stems are straighter than the stems of the printed cell.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, third row, first column from the right: 葉つききく車", ja: "左頁、三段目、右から一列目「葉つききく車」" }, read: "2026-11-27", measured: true },
  build: hatsukiKikuGurumaBuild,
});

export const mitsubaUraHonGiku = defineCrest({
  id: "mitsuba-ura-hon-giku",
  name: { en: "Back-view chrysanthemum with three leaf sprays", ja: "三つ葉裏本菊" },
  reading: "みつばうらほんぎく",
  romaji: "mitsuba ura hon-giku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["三ッ葉うら本きく"],
  construction: {
    en: "Place a broad round centre inside the row of petals. Lay three sprays of scalloped leaves behind the flower, with a long middle leaf and two shorter side leaves on each spray.",
    ja: "花弁の列の内側に幅の広い丸い中心を置きます。花の後ろに丸い切れ込みのある葉の集まりを三組置き、各組は中央の葉を長く、両側の葉を短くとります。",
  },
  measured: "The drawing evens out the three sprays and makes the broad central field circular.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, third row, fourth column from the right: 三ッ葉うら本きく", ja: "右頁、三段目、右から四列目「三ッ葉うら本きく」" }, read: "2026-11-27", measured: true },
  build: mitsubaUraHonGikuBuild,
});

export const shitabaGiku = defineCrest({
  id: "shitaba-giku",
  name: { en: "Chrysanthemum with leaves below", ja: "下葉菊" },
  reading: "したばぎく",
  romaji: "shitaba giku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["下葉きく"],
  construction: {
    en: "Two mirrored leaves join one chrysanthemum stalk. Pointed petals form two ranks above the calyx.",
    ja: "左右を同じ形にした葉を菊の柄に集め、萼の上にとがった花びらを二段に重ねます。",
  },
  measured: "The lower leaves, crossing feet and petal rows follow the 1892 drawing. The veins branch from the same circular parent ribs, and both sides were regularised to exact mirrors.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "left page, first row, second column from the right: 下葉きく", ja: "左頁、一段目、右から二列目「下葉きく」" }, read: "2026-11-27", measured: true },
  build: shitabaGikuBuild,
});

export const kikuZuru = defineCrest({
  id: "kiku-zuru",
  name: { en: "Chrysanthemum crane", ja: "菊鶴" },
  reading: "きくづる",
  romaji: "kikuzuru",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 1, arrangement: "single" }, { motif: "crane", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["きく鶴"],
  construction: {
    en: "Long chrysanthemum petals rise like spread wings above the low curved neck of a crane.",
    ja: "長い菊の花びらを翼のように広げ、その下に低く曲がる鶴の首を置きます。",
  },
  measured: "The flower rises higher on the right, where two rounded petals stand behind the long narrow petals.",
  source: { ...SHINSEN_MONCHO, frame: 40, place: { en: "right page, fourth row, second column from the right: きく鶴", ja: "右頁、四段目、右から二列目「きく鶴」" }, read: "2026-11-27", measured: true },
  build: kikuZuruBuild,
});

export const kikuEdaMaru = defineCrest({
  id: "kiku-eda-maru",
  name: { en: "Chrysanthemum branch round", ja: "菊枝丸" },
  reading: "きくえだまる",
  romaji: "kiku eda maru",
  frame: "ring-thin",
  motifs: [{ motif: "chrysanthemum", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["きく枝丸"],
  construction: {
    en: "A tapering chrysanthemum branch stands inside a fine ring. Large lobed leaves surround the fan of pointed petals, with a seamed bud at the top.",
    ja: "細い輪の内側に先細りの菊の枝を置きます。切れ込みのある大きな葉で先のとがった花びらを囲み、上にすじ入りのつぼみを付けます。",
  },
  measured: "The fan, leaves and branching joints were measured from the 1892 cell. The left shoot, main foot and top bud reach the ring.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, fourth row, fourth column from the right: きく枝丸", ja: "右頁、四段目、右から四列目「きく枝丸」" }, read: "2026-11-27", measured: true },
  build: kikuEdaMaruBuild,
});
