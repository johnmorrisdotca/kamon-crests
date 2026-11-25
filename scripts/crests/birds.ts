// Crests of birds: the wild goose, the plover and the crane.
import { R } from "../construct/geo.ts";
import { chidoriBuild } from "./drawn/chidori.ts";
import { kariganeBuild, mukaiKariganeBuild } from "./drawn/karigane.ts";
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
  measured: "The 鶴の丸 of the 1892 crest book (frame 21, left page, row 3, column 4), read on a grid as parts of the outer radius. The window about the head is a circle of 0.47 about a point 0.48 above the centre. The head's outline reaches 0.70 up, the eye stands 0.07 left and 0.55 up, and the beak's point 0.42 left and 0.28 up; the neck's back comes down the right side at 0.25. The small feathers end on a circle of about 0.66 about a point a little below the centre, and the lines between the long feathers meet the rim from about 30 to 160 degrees from upright, some 11 degrees apart. The book draws it by hand, in outline, and not quite alike on the two sides. The drawing makes the two wings mirror images, gives every long line the compass width 96, sets the small feathers and the scales in even rows, and leaves out the book's legs and the crossing of the wing tips over the head.",
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "left page, third row, fourth column: 鶴の丸 (measured, and drawn with compass and ruler)", ja: "左頁、三段目の四列目「鶴の丸」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  name: { en: "Crane in a circle", ja: "鶴の丸" },
  reading: "つるのまる",
  romaji: "tsuru no maru",
  frame: "none",
  motifs: [{ motif: "crane", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["crane", "crane circle", "tsurumaru", "鶴丸", "つるまる"],
  construction: {
    en: "A crane seen from the front, its wings raised until their tips meet over its head: the long feathers make the crest's own circle and leave a round window. In the window the head is a circle with a ringed eye, the beak is two arcs that meet in a point with a white line between them, and the neck is the band between two circles about one point, bending down into the body. Each wing has thirteen white lines between its long feathers, every one an arc of the same compass width, 96, from the rim in to the small feathers. The small feathers are two rows of round ends about the body's centre, with a white line round each row. The body is a circle and the belly a smaller one below it, with a white line round the breast and four rows of scales under it. The right wing is built in full, then the head and the body, and the left wing where it stands.",
    ja: "正面から見た鶴です。翼を上げ、先が頭の上で出会うので、長い羽がそのまま紋の丸になり、中に丸い窓が残ります。窓の中の頭は円で、目は輪と点です。くちばしは、先で出会う二本の弧で、間に白い線が一本あります。首は、同じ中心の二つの円の間の帯で、曲がって体につながります。翼の長い羽の間には、白い線が十三本あります。どれも同じコンパスの幅96の弧で、外の円から小さい羽まで引きます。小さい羽は、体の中心のまわりに二列ならぶ丸い先で、列ごとに白い線で囲みます。体は円、腹はその下の小さい円です。胸のまわりに白い線があり、その下にうろこが四列ならびます。右の翼を作図してから、頭と体を作図し、左の翼はその場で作図します。",
  },
  build(c) {
    tsuruBuild(c, "crane", R);
  },
});
