// Crests of birds: the wild goose, the plover, the crane and the sparrow.
import { R } from "../construct/geo.ts";
import { chidoriBuild } from "./drawn/chidori.ts";
import { kariganeBuild, mukaiKariganeBuild } from "./drawn/karigane.ts";
import { suzumeBuild } from "./drawn/suzume.ts";
import { tsuruBuild } from "./drawn/tsuru.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const karigane = defineCrest({
  id: "karigane",
  name: { en: "Wild goose", ja: "雁金" },
  reading: "かりがね",
  romaji: "karigane",
  frame: "none",
  motifs: [{ motif: "goose", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["goose", "wild goose", "kari", "雁", "かり"],
  construction: {
    en: "A goose flying, seen from above with its head in profile. Two circles of one width struck from below give the wings' upper edges and cross on the axis; two more give the hollows under the wings and meet in the point of the tail. The head is a circle on the axis; the eye is a dot, a ring and the cheek's arc about one centre. The beak is ruled from its point to the head and to the wing, and the collar is two white lines ruled from a point on the axis up to the wings.",
    ja: "上から見た、飛ぶ雁です。頭は横向きです。下から描いた同じ幅の円二つが翼の上の縁になり、中心線の上で交わります。別の円二つが翼の下のくぼみになり、尾の先で出会います。頭は中心線の上の円です。目は、一つの中心のまわりに置いた点と輪、それに頬の弧です。くちばしは、先から頭と翼へ直線を引きます。襟は、中心線の上の一点から翼へ引いた、白い線二本です。",
  },
  build(c) {
    kariganeBuild(c, R);
  },
});

export const mukaiHashiaiKarigane = defineCrest({
  id: "mukai-hashiai-karigane",
  name: { en: "Facing geese, beaks joined", ja: "向かい嘴合い雁金" },
  reading: "むかいはしあいかりがね",
  romaji: "mukai hashiai karigane",
  frame: "none",
  motifs: [{ motif: "goose", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["two geese", "facing geese", "mukai karigane", "向かい雁金", "嘴合い雁金"],
  construction: {
    en: "The wild goose stood on end and set against its mirror image, so that the two beaks join on the centre. Each goose's wings run up and down: a circle struck from the side gives each wing's edge toward the other goose, and a wider one the hollow behind it, the two hollows meeting in the point of the tail at the side. The head is a circle on the level axis that all but touches the other head, with a ringed eye above a ruled beak, and the collar is two white lines. The left goose is struck first and the right one in its place as its mirror image.",
    ja: "雁金を縦に立て、左右対称に向かい合わせて、くちばしを中心で合わせます。翼は上下に伸びます。横から描いた円が、相手側の翼の縁になり、それより幅の広い円が翼の後ろのくぼみになって、二つのくぼみは、横にある尾の先で出会います。頭は横の中心線の上の円で、相手の頭にほとんど触れます。引いた直線のくちばしの上に、輪のある目を置き、襟は白い線二本です。左の雁を先に描き、右の雁は、その場所に左右対称に描きます。",
  },
  build(c) {
    mukaiKariganeBuild(c, R);
  },
});

export const chidori = defineCrest({
  id: "chidori",
  name: { en: "Plover", ja: "千鳥" },
  reading: "ちどり",
  romaji: "chidori",
  frame: "none",
  motifs: [{ motif: "plover", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["plover", "chidori", "shore bird", "ちどり"],
  note: {
    en: "Its construction re-strikes the compass construction shown in a modern crest-drawing manual; it will be rebuilt from a public-domain source when one with a plain plover is found.",
    ja: "この千鳥の作図は、現代の家紋の作図の本にあるコンパスの作図と、同じ手順で描き直したものです。飾りのない千鳥がのっている、著作権の切れた資料が見つかったら、それをもとに作り直します。",
  },
  construction: {
    en: "A plump plover in flight, looking to the left, set out as the drawing manuals do: compass circles of set widths, each placed against the ones before, and the outline inked from their arcs. The head, the wing and the belly are three circles, and one long arc runs down the breast to the tail. Four circles are struck from outside: the saddle of the back, which touches the head and the wing; the bite under the wing tip; the notch of the tail; and the throat, through the point of the beak. The beak's upper edge is ruled from its point to touch the head. The eye is a white disc, the wing's line the white crescent between two circles, and each of the four claws the crescent between two circles that cross at its point.",
    ja: "左を向いて飛ぶ、ふっくらした千鳥です。作図の本のとおり、決まった幅のコンパスの円を、前の円に合わせて順に置き、その弧をなぞって輪郭にします。頭、翼、腹は三つの円で、胸から尾までは長い弧一本です。外から描く円は四つあります。頭と翼に接する背のくぼみ、翼の先の下の切れ込み、尾の切れ込み、くちばしの先を通るのどです。くちばしの上の線は、先から、頭の円に接する直線にします。目は白い円、翼の線は二つの円の間に残る白い三日月で、四本の爪は、それぞれ先で交わる二つの円の間の三日月です。",
  },
  build(c) {
    chidoriBuild(c, R);
  },
});

export const tsuruNoMaru = defineCrest({
  id: "tsuru-no-maru",
  measured: "The 鶴の丸 of the 1892 crest book (frame 21, left page, row 3, column 4 from the right), read on a grid as parts of the outer radius: a crane from the front whose wings rise from the body in curved feathers that follow the rim, the outermost of each wing crossing over the other about 0.78 up; a head that looks left, its top 0.63 up, its eye 0.08 left and 0.50 up and its beak pointing down to 0.40 left and 0.24 up; a breast of scales; and a tail and feet at the foot. The book draws it by hand, in outline, and not quite alike on the two sides. A modern drawing on Wikimedia Commons (Japanese crest Tsuru no Maru.svg) was measured for comparison only, for how the crest reads: a round window of radius 0.51 about a point 0.40 above the centre; the eye 0.05 left and 0.67 up and the beak's point 0.40 left and 0.42 up; the white lines between a wing's long feathers 0.61, 0.73 and 0.86 out from the axis at 0.30 up, and lines across the lower feathers that run in from the rim nearly level. The drawing follows the two where they agree, and the modern drawing where they differ: the head stands higher and the beak nearly level, and the tips cross just over the window. It makes the two wings mirror images, sets the scales in even rows, and leaves out the feet.",
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "left page, third row, fourth column counted from the right: 鶴の丸 (measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から四列目「鶴の丸」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  name: { en: "Crane in a circle", ja: "鶴の丸" },
  reading: "つるのまる",
  romaji: "tsuru no maru",
  frame: "none",
  motifs: [{ motif: "crane", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["crane", "crane circle", "tsurumaru", "鶴丸", "つるまる"],
  construction: {
    en: "A crane seen from the front, its wings raised round a round window so that their tips cross over the top of it. In the window the head looks to the left: a circle with a ringed eye and three white slivers at its back for its crest of feathers, a beak of two ruled edges with the white line of the mouth between them, and a neck that is the band between two circles about one point, the inner one touching the head, with a white line down its front into the breast. The white lines between a wing's long feathers are four arcs about one point on the other side of the axis, so that the feathers follow the rim, and one feather of each wing crosses over the window to the other side. Six lines across the lower feathers are arcs about a point high on the other side, and one across the upper feathers an arc about a point low on the other side. The breast is six rows of round scales about the window's centre, each row over the next, with a white tick on each scale, and the tail is a lens at the foot with a white line down it. The right half is built in full, then the head and the neck, and the left half where it stands.",
    ja: "正面から見た鶴です。翼を上げて丸い窓を囲み、翼の先は窓の上で交差します。窓の中の頭は左を向きます。頭は円で、目は輪と点、後ろの冠羽は白い細い切れ込み三本です。くちばしは定規で引いた二本の辺で、間に口の白い線が一本あります。首は、同じ中心の二つの円の間の帯で、内側の円は頭に接します。首の前には、胸まで白い線が一本伸びます。片方の翼の長い羽の間の白い線は、中心線の反対側の一点を中心とする四本の弧で、羽は外の円に沿います。それぞれの翼から羽が一枚ずつ、窓の上を越えて反対側へ渡ります。下の羽を横切る六本の線は、反対側の高い一点を中心とする弧で、上の羽を横切る一本の線は、反対側の低い一点を中心とする弧です。胸は、窓の中心のまわりに並ぶ丸いうろこ六列で、上の列が下の列に重なり、うろこにはそれぞれ白い切れ込みが一つあります。尾は下の端のレンズ形で、中に白い線が一本あります。右半分を作図してから、頭と首を作図し、左半分はその場で作図します。",
  },
  build(c) {
    tsuruBuild(c, "crane", R);
  },
});

export const fukuraSuzume = defineCrest({
  id: "fukura-suzume",
  measured: "The ふくらすゞめ of the 1892 crest book (frame 45, left page, row 1, column 2 from the right), measured as numbers only, in units of the radius of the fan of its wings and tail. The fan, the back and the belly are circles about one point: the back 0.59 and the belly 0.51 of the fan. The tail is ten or eleven feathers over the back; each wing has five lines along it and its lower edge runs from the fan back to the belly a third of a turn from upright. The head is a circle 0.26 in radius, its middle 0.1 over the fan's, drawn only round its top; the eyes are rings 0.06 in radius, 0.17 each side of the axis, and the beak is a triangle 0.18 wide and 0.12 tall. In its cell the fan's middle stands 0.22 under the middle of the whole bird; ours stands 0.1 of the layout circle under the crest's centre, so that the wing tips stay inside the circle. The book draws it in outline; ours is solid, as a crest is worn, the left half the mirror of the right, with ten tail feathers a thirtieth of a turn each, four white lines along each wing, white discs with a dot for the eyes and a white beak.",
  name: { en: "Puffed sparrow", ja: "ふくら雀" },
  reading: "ふくらすずめ",
  romaji: "fukura suzume",
  frame: "none",
  motifs: [{ motif: "sparrow", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["suzume", "sparrow", "fukura-suzume", "雀", "すずめ", "福良雀"],
  construction: {
    en: "A plump sparrow seen from the front, its wings and tail spread into a fan. The belly, the back and the fan are circles about one point on the axis. The tail is ten feathers, a thirtieth of a turn each, with a white line between any two; each wing is as wide as five feathers, with four white lines along it, and its lower edge is ruled from the same point. A white line parts the tail from each wing, another runs along the top of each wing to the head, and a white line goes round the top of the head down to the level line through its middle. The eyes are white discs with a dot, and the beak is a white triangle. The right half of the tail is built in full, then the body with both wings, then the left half of the tail where it stands.",
    ja: "正面から見た、ふっくらした雀です。翼と尾を扇のように広げています。腹、背、扇は、中心線の上の一点を中心にした円です。尾は羽根十枚で、一枚は一周の三十分の一、羽根の間に白い線があります。翼は羽根五枚分の広さで、白い線が四本あります。翼の下の縁は、同じ点から引いた直線です。尾と翼の間に白い線が一本、翼の上の縁から頭まで白い線が一本あります。頭の上半分のまわりにも白い線があり、頭の中心を通る横の線で終わります。目は点のある白い円、くちばしは白い三角です。尾の右半分を作図し、次に体と両方の翼を作図し、尾の左半分はその場で作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "left page, first row, second column counted from the right: ふくらすゞめ (measured, and drawn with compass and ruler)", ja: "左頁、一段目、右から二列目「ふくらすゞめ」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    suzumeBuild(c, "sparrow", R);
  },
});
