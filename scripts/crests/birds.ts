// Crests of birds: the wild goose and the plover.
import { R } from "../construct/geo.ts";
import { chidoriBuild } from "./drawn/chidori.ts";
import { kariganeBuild, mukaiKariganeBuild } from "./drawn/karigane.ts";
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
