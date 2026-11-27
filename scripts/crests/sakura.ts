import { sakuraBuild, edoSakuraBuild, yaeSakuraBuild, hosokawaSakuraBuild, kasaneSakuraBuild, chuKageSakuraBuild, chuKageUraSakuraBuild, chiriSakuraBuild, chuKageKaraZakuraBuild, sakuraiSakuraBuild } from "./drawn/sakura.ts";
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
  construction: { en: "A five-pointed calyx and its short curved stalk sit inside the two outlines of the petals.", ja: "花びらの二重の輪郭の内側に、五つの先がとがったがくと短く曲がった茎を置きます。" },
  measured: "The double petal outline has a uniform gap.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, second row, third column from the right: 中かげうら櫻", ja: "右頁、二段目、右から三列目「中かげうら櫻」" }, read: "2026-11-26", measured: true },
  build(c) {
    chuKageUraSakuraBuild(c);
  },
});

export const chiriSakura = defineCrest({
  id: "chiri-sakura",
  name: { en: "Scattered cherry blossoms", ja: "散り桜" },
  reading: "ちりざくら",
  romaji: "chiri zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["ちり櫻"],
  construction: {
    en: "Three detached cherry blossoms descend diagonally. Each has five notched petals, a small centre and narrow white seams between the petals.",
    ja: "離れた三つの桜を斜めに散らします。それぞれに先の割れた花びらを五枚と小さな中心を置き、花びらの間を細い白線で分けます。",
  },
  measured: "In the print two flowers sit close on the left, and a third falls to the lower right. The drawing preserves that uneven spacing and regularizes the petal outlines. The damaged final graph in ちり櫻 agrees with clear 櫻 in the two reverse cherry names and Sakurai on the same frame.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, second row, first column from the right: ちり櫻", ja: "左頁、二段目、右から一列目「ちり櫻」" }, read: "2026-11-26", measured: true },
  build: chiriSakuraBuild,
});

export const chuKageKaraZakura = defineCrest({
  id: "chu-kage-kara-zakura",
  name: { en: "Kara cherry blossom in middle shadow", ja: "中陰唐桜" },
  reading: "ちゅうかげからざくら",
  romaji: "chu kage kara zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中かげ唐さくら"],
  construction: { en: "A scalloped outline surrounds five rounded petals. Hollow, round-tipped stamens lead back towards a small circular heart.", ja: "丸いふくらみが連なる輪郭の内側に、先の丸い花びらを五枚置きます。先が丸く中を白く抜いた雄しべを、小さな丸い中心に向けて並べます。" },
  measured: "The one upright petal and its four companions have broad rounded tips rather than deep clefts. The thin outer outline follows three rounded shoulders to each tip; five short open stamens and a round outlined heart remain visible. The measured drawing evens their spacing.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, fourth row, second column from the right: 中かげ唐さくら", ja: "左頁、四段目、右から二列目「中かげ唐さくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    chuKageKaraZakuraBuild(c);
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
  construction: { en: "Five narrow, sharply notched petals open from a circular centre. Inside each, two curved seams meet a short straight midrib in white.", ja: "先が鋭く割れた細長い花びらを、丸い中心から五枚開きます。各花びらの内側で、二本の曲がった筋と短い直線の葉脈が白く合流します。" },
  measured: "The pointed notch, shoulder, branching seams and round centre are measured from the cell. The small variations in the five printed petals are evened into one petal repeated by fifth turns.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, first row, first column from the right: 櫻井さくら", ja: "左頁、一段目、右から一列目「櫻井さくら」" }, read: "2026-11-27", measured: true },
  build: sakuraiSakuraBuild,
});
