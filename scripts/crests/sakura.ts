import { sakuraBuild, edoSakuraBuild, yaeSakuraBuild, hosokawaSakuraBuild, kasaneSakuraBuild, sakuraiSakuraBuild, chuKageSakuraBuild, chuKageUraSakuraBuild, mitsuWariYamazakuraBuild } from "./drawn/sakura.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const sakura = defineCrest({
  id: "sakura",
  name: { en: "Cherry blossom", ja: "桜" },
  reading: "さくら",
  romaji: "sakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["さくら"],
  construction: { en: "Five broad, notched petals enclose a round centre. A short pointed stamen stands on each petal.", ja: "先の割れた幅広い花びら五枚を、丸い中心のまわりに並べます。花びらの上に先のとがった短い雄しべを一本ずつ置きます。" },
  measured: "The five petals and pointed stamens are set at equal angles. The centre keeps a narrow white margin.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, first row, third column from the right: さくら", ja: "右頁、一段目、右から三列目「さくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    sakuraBuild(c);
  },
});

export const edoSakura = defineCrest({
  id: "edo-sakura",
  name: { en: "Edo cherry blossom", ja: "江戸桜" },
  reading: "えどざくら",
  romaji: "Edo zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["江戸さくら"],
  construction: { en: "Five broad petals enclose the heart. Small arc loops mark the points where the petals meet. Three stamens have round tips and two have leaf-shaped tips.", ja: "幅広い花びら五枚が中心を囲みます。花びらが出会うところに円弧の小さな輪を置きます。雄しべのうち三本の先は丸く、二本の先は葉形です。" },
  measured: "The five small loops are regularised around the edges. The print’s two kinds of stamen remain distinct.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, fourth row, first column from the right: 江戸さくら", ja: "右頁、四段目、右から一列目「江戸さくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    edoSakuraBuild(c);
  },
});

export const yaeSakura = defineCrest({
  id: "yae-sakura",
  name: { en: "Double cherry blossom", ja: "八重桜" },
  reading: "やえざくら",
  romaji: "yae zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["八重ざくら"],
  construction: { en: "Five front petals with pointed stamens cover a second row of five petals. The rear petals show between the notched front ones.", ja: "先のとがった雄しべを持つ五枚の花びらを、奥の五枚に重ねます。手前の先が割れた花びらの間から、奥の花びらが見えます。" },
  measured: "The rear petals repeat midway between the front petals. Thin white gaps keep the two rows distinct.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, fourth row, third column from the right: 八重ざくら", ja: "右頁、四段目、右から三列目「八重ざくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    yaeSakuraBuild(c);
  },
});

export const hosokawaSakura = defineCrest({
  id: "hosokawa-sakura",
  name: { en: "Hosokawa cherry blossom", ja: "細川桜" },
  reading: "ほそかわざくら",
  romaji: "Hosokawa zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["細川さくら"],
  construction: { en: "Three round-tipped stamens spread across each of five wide petals around the round centre.", ja: "丸い中心を囲む幅広い花びら五枚に、先の丸い雄しべを三本ずつ広げます。" },
  measured: "The fifteen stamens repeat in groups of three. The five shallow petal notches are regularised.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, third row, second column from the right: 細川さくら", ja: "右頁、三段目、右から二列目「細川さくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    hosokawaSakuraBuild(c);
  },
});

export const kasaneSakura = defineCrest({
  id: "kasane-sakura",
  name: { en: "Layered cherry blossom", ja: "重ね桜" },
  reading: "かさねざくら",
  romaji: "kasane zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["かさねさくら"],
  construction: { en: "Three five-petalled outlines sit one inside another, with fine gaps between them.", ja: "五枚ずつの花びらを三重に重ね、その間に細い空きを残します。" },
  measured: "The second circle of petals turns halfway between the outer petals.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, first row, fourth column from the right: かさねさくら", ja: "右頁、一段目、右から四列目「かさねさくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    kasaneSakuraBuild(c);
  },
});

export const sakuraiSakura = defineCrest({
  id: "sakurai-sakura",
  name: { en: "Sakurai cherry blossom", ja: "桜井桜" },
  reading: "さくらいざくら",
  romaji: "Sakurai zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["櫻井さくら"],
  construction: { en: "Five narrow petals open from the centre. Their outer ends split into points, and two curved seams follow the shoulders.", ja: "細長い花びらを中心から五枚開きます。先が二つに割れてとがり、肩に二本の曲がった筋が入ります。" },
  measured: "The petals use the same notch and ruled flanks at each turn.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, first row, first column from the right: 櫻井さくら", ja: "左頁、一段目、右から一列目「櫻井さくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    sakuraiSakuraBuild(c);
  },
});

export const chuKageSakura = defineCrest({
  id: "chu-kage-sakura",
  name: { en: "Cherry blossom in middle shadow", ja: "中陰桜" },
  reading: "ちゅうかげざくら",
  romaji: "chū kage zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中かげさくら"],
  construction: { en: "A band between two notched outlines defines each of five petals. A short ruled ray reaches out from the round centre.", ja: "五枚の花びらを、先の割れた二つの輪郭の間の帯で作ります。丸い中心から短い直線を伸ばします。" },
  measured: "The five inner outlines meet the round heart at the same angle.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, first row, second column from the right: 中かげさくら", ja: "右頁、一段目、右から二列目「中かげさくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    chuKageSakuraBuild(c);
  },
});

export const chuKageUraSakura = defineCrest({
  id: "chu-kage-ura-sakura",
  name: { en: "Back of a cherry blossom in middle shadow", ja: "中陰裏桜" },
  reading: "ちゅうかげうらざくら",
  romaji: "chū kage ura zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中かげうら櫻"],
  construction: { en: "A five-pointed calyx and its short curved stalk sit inside the two outlines of the petals.", ja: "花びらの二重の輪郭の内側に、五つの先がとがった萼と短く曲がった茎を置きます。" },
  measured: "The double petal outline has a uniform gap.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, second row, third column from the right: 中かげうら櫻", ja: "右頁、二段目、右から三列目「中かげうら櫻」" }, read: "2026-11-26", measured: true },
  build(c) {
    chuKageUraSakuraBuild(c);
  },
});

export const mitsuWariYamazakura = defineCrest({
  id: "mitsu-wari-yamazakura",
  name: { en: "Three split mountain cherry blossoms", ja: "三つ割り山桜" },
  reading: "みつわりやまざくら",
  romaji: "mitsu wari yamazakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリ山ざくら"],
  construction: { en: "Three mountain cherry blossoms open inward from the edge. Each has short rays at its half-round heart.", ja: "山桜を三つ、外側から内へ向けて開きます。半円の中心から短い筋が広がります。" },
  measured: "The three flowers repeat at equal angles.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, second row, second column from the right: 三ッワリ山ざくら", ja: "右頁、二段目、右から二列目「三ッワリ山ざくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuWariYamazakuraBuild(c);
  },
});
