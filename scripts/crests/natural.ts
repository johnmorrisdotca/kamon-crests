// Crests of living things: wisteria, gentian and bamboo grass, orange, butterfly, dragonfly, rabbit; and the nine stars.
import { C0, CX, Path, R, circle, curveThrough, lens, polar } from "../construct/geo.ts";
import { slit } from "../construct/motifs.ts";
import type { Pt } from "../construct/geo.ts";
import { agehaBuild } from "./drawn/ageha.ts";
import { sagariFujiBuild } from "./drawn/fuji.ts";
import { usagiBuild } from "./drawn/usagi.ts";
import { defineCrest, fam } from "./util.ts";
import { RING_GAP } from "../construct/builder.ts";
import { mirrored } from "../construct/traced.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { SASA_RINDO_LEFT } from "./traced/rindo.ts";
import { TACHIBANA_LEFT } from "./traced/tachibana.ts";

/** A mirror-symmetric crest drawn from its traced left half, set out on its axis and the circle it fills. */
const fromBook = (c: B, part: string, pieces: readonly string[]): void => {
  c.guideLine([CX, 4], [CX, 196]);
  c.guideCircle(C0, R);
  mirrored(c, part, pieces);
};

type B = Parameters<(typeof sagariFuji)["build"]>[0];

/**
 * One raceme of wisteria as a band that follows the circle of radius `rc` from clock angle `a0` to `a1` (mirrored for the left), its
 * edges scalloped by the florets, tapering to a rounded end; a long line near its inner edge and a curved line between each pair of
 * florets are cut out of it as slits.
 */
const raceme = (c: B, sign: 1 | -1, rc: number, a0: number, a1: number, hw0: number): void => {
  const n = 64;
  const bumps = 9;
  const at = (r: number, a: number): Pt => polar(r, sign * a);
  const half = (s: number): number => hw0 * (1 - 0.42 * s) * Math.pow(Math.min(1, s / 0.05, (1 - s) / 0.05), 0.5);
  const outer: Pt[] = [];
  const inner: Pt[] = [];
  for (let i = 0; i <= n; i += 1) {
    const s = i / n;
    const a = a0 + (a1 - a0) * s;
    const bump = 2.6 * (Math.abs(Math.sin(Math.PI * bumps * s)) - 0.5) * (s > 0.97 ? 0 : 1);
    outer.push(at(rc + half(s) + bump, a));
    inner.push(at(rc - half(s) - bump * 0.6, a));
  }
  const back = inner.slice().reverse();
  // One closed path: outer edge there, inner edge back, joined at the two ends by straight caps.
  const closed = new Path().M(outer[0]);
  curveThrough(closed, outer);
  closed.L(back[0]);
  curveThrough(closed, back);
  closed.Z();
  const cuts: Path[] = [slit(Array.from({ length: 24 }, (_, i): Pt => at(rc - half(0.1 + (0.7 * i) / 23) * 0.55, a0 + (a1 - a0) * (0.1 + (0.7 * i) / 23))), 2.4, 0.08)];
  for (let k = 0; k < bumps; k += 1) {
    const s = (k + 0.5) / bumps;
    const a = a0 + (a1 - a0) * s;
    const h = half(s);
    const d = ((a1 - a0) / bumps) * 0.42;
    cuts.push(slit([at(rc + h * 1.02, a - d * 0.2), at(rc + h * 0.1, a + d * 0.5), at(rc - h * 0.7, a + d * 1.3)], 2.2, 0.2));
  }
  c.fill("wisteria", cuts.reduce((acc, x) => acc.join(x), closed), "evenodd");
};

/** The top of the wreath: a pointed leaf over two leaves that lie out to each side, a knot and a short stalk. */
const fujiTop = (c: B): void => {
  c.group(() => {
    c.fill("wisteria", lens([100, 74], [100, 20], 0.26).join(slit([[100, 68], [100, 46], [100, 30]], 2.2, 0.15)), "evenodd");
    for (const sign of [-1, 1]) c.fill("wisteria", lens([100 + sign * 4, 76], [100 + sign * 54, 62], 0.16).join(slit([[100 + sign * 9, 74], [100 + sign * 30, 67], [100 + sign * 44, 63]], 2.2, 0.15)), "evenodd");
    c.fill("wisteria", circle([100, 78], 6));
    c.fill("wisteria", new Path().M([97, 78]).L([103, 78]).L([103, 108]).L([97, 108]).Z());
  });
};

const fujiBuild = (c: B, wreath: boolean): void => {
  c.guideCircle(C0, 80);
  c.guideCircle(C0, 52);
  c.guideLine([CX, 4], [CX, 196]);
  c.guideCircle([100, 78], 6);
  const rc = 66;
  c.group(() => {
    raceme(c, 1, rc, wreath ? 14 : 30, 168, 14.5);
    raceme(c, -1, rc, wreath ? 14 : 30, 168, 14.5);
  });
  fujiTop(c);
};

export const sagariFuji = defineCrest({
  id: "sagari-fuji",
  name: { en: "Hanging wisteria", ja: "下がり藤" },
  reading: "さがりふじ",
  romaji: "sagari-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "hanging" }],
  families: [fam("Fujiwara", "藤原", "ふじわら"), fam("Ichijo", "一条", "いちじょう")],
  aliases: ["wisteria", "fuji", "fujiwara", "pendant wisteria"],
  construction: {
    en: "Three leaves and their knot stand at the top. Two mirrored clusters hang around a circle, with tapered rows of florets on each side of the white stem.",
    ja: "上に三枚の葉と結び目を置きます。左右反転した二つの花房が円に沿って垂れ、白い花軸の両側で小花が先へ向かって細くなります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, fourth row, second column counted from the right: 下り藤", ja: "右頁、四段目、右から二列目「下り藤」" }, read: READ, measured: true },
  build(c) {
    sagariFujiBuild(c);
  },
});

export const fujiNoMaru = defineCrest({
  id: "fuji-no-maru",
  name: { en: "Wisteria wreath", ja: "藤の丸" },
  reading: "ふじのまる",
  romaji: "fuji no maru",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "ring" }],
  families: [fam("Fujiwara", "藤原", "ふじわら")],
  aliases: ["wisteria circle", "wisteria wreath", "fuji"],
  construction: {
    en: "The same two clusters, begun nearer the top so that they round the circle almost to meet at the leaves.",
    ja: "同じ二房を、上の近くから始めて、葉のところでほとんど出会うように、円に沿って回します。",
  },
  build(c) {
    fujiBuild(c, true);
  },
});

export const maruNiSagariFuji = defineCrest({
  id: "maru-ni-sagari-fuji",
  name: { en: "Hanging wisteria in a circle", ja: "丸に下がり藤" },
  reading: "まるにさがりふじ",
  romaji: "maru ni sagari-fuji",
  frame: "ring-medium",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "hanging" }],
  families: [fam("Fujiwara", "藤原", "ふじわら")],
  aliases: ["fujiwara ring"],
  construction: { en: "The hanging wisteria scaled to fill a ring about a tenth of the diameter thick, a narrow even gap inside it.", ja: "下がり藤を縮めて、直径の約10分の1の太さの輪の中に、狭く均一な隙間を残して収めます。" },
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, fourth row, second column counted from the right: 下り藤", ja: "右頁、四段目、右から二列目「下り藤」" }, read: READ, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    c.zoom((inner - RING_GAP) / R);
    sagariFujiBuild(c);
  },
});

export const sasaRindo = defineCrest({
  id: "sasa-rindo",
  name: { en: "Bamboo grass and gentian", ja: "笹竜胆" },
  reading: "ささりんどう",
  romaji: "sasa-rindō",
  frame: "none",
  motifs: [
    { motif: "bamboo-grass", count: 5, arrangement: "upright" },
    { motif: "gentian", count: 3, arrangement: "upright" },
  ],
  families: [fam("Minamoto (Genji)", "源氏", "げんじ"), fam("Uda Genji", "宇多源氏", "うだげんじ")],
  aliases: ["minamoto", "genji", "gentian", "rindo", "bamboo leaves", "Sasa-rindo", "Minamoto crest"],
  construction: {
    en: "Five bamboo-grass leaves fanned below, the middle one upright with its midrib, and above them three gentian flowers, the middle one the largest, each a bell of five pointed petals. The left half is drawn from the book and mirrored about the axis.",
    ja: "下に笹の葉を五枚扇状に広げ、中央の葉は立てて中肋を入れます。その上に竜胆の花を三つ、中央を最も大きく、五枚の尖った花弁の鐘形に置きます。左半分を紋帳から写し取り、中心線で左右対称に返します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "right page, third row, first column counted from the right: 笹りんどう", ja: "右頁、三段目、右から一列目「笹りんどう」" }, read: READ },
  build(c) {
    c.guideLine([CX, 4], [CX, 196]);
    c.guideCircle(C0, R);
    mirrored(c, "bamboo-grass", SASA_RINDO_LEFT.slice(0, 1));
    mirrored(c, "gentian", SASA_RINDO_LEFT.slice(1));
  },
});

export const tachibana = defineCrest({
  id: "tachibana",
  name: { en: "Tachibana orange", ja: "橘" },
  reading: "たちばな",
  romaji: "tachibana",
  frame: "none",
  motifs: [{ motif: "tachibana", count: 1, arrangement: "single" }],
  families: [fam("Tachibana", "橘", "たちばな")],
  aliases: ["orange", "citrus", "mandarin"],
  construction: {
    en: "A round fruit whose top is parted into segments round its calyx, a pointed leaf standing above it and a leaf to each side, two more leaves below, and a short stem. The left half is drawn from the book and mirrored about the axis.",
    ja: "丸い実の上部を蔕のまわりで房に分け、その上に尖った葉を一枚立て、左右に一枚ずつ、下にも二枚の葉と短い枝をつけます。左半分を紋帳から写し取り、中心線で左右対称に返します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 20, place: { en: "left page, third row, third column counted from the right: たちばな", ja: "左頁、三段目、右から三列目「たちばな」" }, read: READ },
  build(c) {
    fromBook(c, "tachibana", TACHIBANA_LEFT);
  },
});

export const maruNiTachibana = defineCrest({
  id: "maru-ni-tachibana",
  name: { en: "Tachibana orange in a circle", ja: "丸に橘" },
  reading: "まるにたちばな",
  romaji: "maru ni tachibana",
  frame: "ring-medium",
  motifs: [{ motif: "tachibana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["orange ring"],
  construction: { en: "The tachibana scaled to fill a ring about a tenth of the diameter thick, a narrow even gap inside it.", ja: "橘を縮めて、直径の約10分の1の太さの輪の中に、狭く均一な隙間を残して収めます。" },
  source: { ...SHINSEN_MONCHO, frame: 20, place: { en: "left page, third row, third column counted from the right: たちばな", ja: "左頁、三段目、右から三列目「たちばな」" }, read: READ },
  build(c) {
    const inner = c.ring("ring-medium");
    c.zoom((inner - RING_GAP) / R);
    fromBook(c, "tachibana", TACHIBANA_LEFT);
  },
});

export const kuyo = defineCrest({
  id: "kuyo",
  name: { en: "Nine luminaries", ja: "九曜" },
  reading: "くよう",
  romaji: "kuyō",
  frame: "none",
  motifs: [{ motif: "star", count: 9, arrangement: "ring" }],
  families: [fam("Hosokawa", "細川", "ほそかわ"), fam("Chiba", "千葉", "ちば")],
  aliases: ["nine stars", "nine discs", "kuyou", "hosokawa"],
  construction: {
    en: "A large disc with eight smaller discs round it, each a little clear of its neighbours and of the large one.",
    ja: "大きな円のまわりに小さな円を八つ並べ、隣どうしも大きな円とも、わずかに離します。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.guideCircle(C0, 71.5);
    c.guideSpokes(8, 0, R);
    c.fill("star", circle(C0, 44));
    for (let i = 0; i < 8; i += 1) c.group(() => c.fill("star", circle(polar(71.5, i * 45), 23.5)));
  },
});

export const agehacho = defineCrest({
  id: "agehacho",
  name: { en: "Swallowtail butterfly", ja: "揚羽蝶" },
  reading: "あげはちょう",
  romaji: "agehachō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [fam("Taira (Heike)", "平家", "へいけ"), fam("Ikeda", "池田", "いけだ")],
  aliases: ["butterfly", "swallowtail", "taira", "cho"],
  measured: "Proportions measured, as numbers only, from a present-day drawing of 丸に揚羽蝶 and checked against the 1892 crest book (frame 34, 上羽てふ and 丸に上羽てふ); no drawing or outline from either is included. In the drawing the butterfly reaches 0.79 to 0.81 of its ring's outer radius in most directions, as ours does at 0.79. Its tails are two mittens: a finger about 0.08 of that radius wide with a round end and a thumb about 0.07 across, the lower finger's thumb on its outer side; a white bay between the tails, and a round white hole in the lower palm. Its three legs bend at the knee, the shin about 0.11 of the radius long, the thigh short. The book's hindwing rim is wavy, in several scallops; ours has three, cut in deep.",
  construction: {
    en: "Seen from the side, every edge an arc of a struck circle or a ruled line. The near forewing stands upright behind a ruled front edge: a band of four round lobes with three eyes, each a ring with two white arcs under it, and at the band's foot three scallops, each a pair of white lines. Below the band the veins are white lines ruled from the centre of the head, a long one to each point of the scallops and a short one between. The far forewing shows at the left with two eyes and a pointed tip. The hindwing lies behind at the right: its veins are arcs of one compass width, their centres stepped along a line, its rim is cut in three deep scallops, and above it stand two mitten tails, each a long finger and a short thumb, a white hole in the lower palm. One feeler curls above the far wing, its stem down the front edge; the other runs along the far wing's foot to a small hook. The head is a dome inside two rings, with a ringed eye; three legs bent at the knee, two blades and three bars are drawn below. Each part is built in turn where it stands: the far forewing first, then the hindwing and the near forewing, then the feelers, the legs, the blades and bars, and the head last.",
    ja: "横から見た姿で、どの辺も、コンパスで描いた円の弧か、定規で引いた直線です。手前の前翅は、直線の前縁の後ろに立てます。丸い山を四つ並べた帯に目玉模様を三つ（輪と、その下の白い弧二本）入れ、帯の下の縁は、白い線二本ずつの波形を三つ並べます。帯の下の翅脈は、頭の中心から引いた白い線で、波形の角へ長い線を一本ずつ、その間に短い線を入れます。左に、目玉模様二つと尖った先のある奥の前翅がのぞきます。右奥の後翅の翅脈は、同じコンパス幅の弧で、中心を一本の線に沿ってずらして描き、縁を深い波形三つに切り、上に、長い指と短い親指のあるミトンの形の尾を二つつけます。下の尾の手のひらには、丸い白い穴をあけます。触角は、一本を奥の翅の上で巻いて、軸を前縁に沿わせ、もう一本を奥の翅の下の縁に沿わせて小さく曲げます。頭は二重の輪の中の半円で、輪のある目を入れます。下に、ひざで曲がった脚三本、葉の形を二つ、棒を三本描きます。奥の前翅、後翅、手前の前翅の順に、それぞれその場で作図します。そのあと、触角、脚、葉の形、棒を作図し、頭は最後に作図します。",
  },
  build(c) {
    agehaBuild(c, R);
  },
});

export const maruNiAgehacho = defineCrest({
  id: "maru-ni-agehacho",
  name: { en: "Swallowtail butterfly in a circle", ja: "丸に揚羽蝶" },
  reading: "まるにあげはちょう",
  romaji: "maru ni agehachō",
  frame: "ring-medium",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [fam("Ikeda", "池田", "いけだ")],
  aliases: ["butterfly ring"],
  construction: { en: "The same swallowtail, struck from the same circles made smaller, inside a ring about a tenth of the diameter thick with a narrow gap inside it.", ja: "同じ揚羽蝶を、同じ円を縮めて描き、直径の約10分の1の太さの輪の中に、狭い隙間を残して収めます。" },
  build(c) {
    agehaBuild(c, c.ring("ring-medium") - RING_GAP);
  },
});

export const tonbo = defineCrest({
  id: "tonbo",
  name: { en: "Dragonfly", ja: "蜻蛉" },
  reading: "とんぼ",
  romaji: "tonbo",
  frame: "none",
  motifs: [{ motif: "dragonfly", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["dragonfly", "katchimushi", "akitsu"],
  construction: {
    en: "A long body on the centre line, a round head, and two pairs of long wings spread across it, the lower pair a little shorter.",
    ja: "中心線上に細長い胴を置き、丸い頭をつけ、左右に長い翅を二対、広げます。下の翅はやや短くします。",
  },
  build(c) {
    c.guideLine([CX, 6], [CX, 194]);
    c.group(() => {
      for (const sign of [-1, 1]) {
        c.fill("dragonfly", lens([CX + sign * 4, 78], [CX + sign * 90, 60], 0.14).join(lens([CX + sign * 20, 75], [CX + sign * 78, 62], 0.02)), "evenodd");
        c.fill("dragonfly", lens([CX + sign * 4, 90], [CX + sign * 80, 108], 0.14).join(lens([CX + sign * 20, 92], [CX + sign * 68, 104], 0.02)), "evenodd");
      }
    });
    c.fill("dragonfly", lens([CX, 70], [CX, 186], 0.06));
    c.fill("dragonfly", circle([CX, 62], 10));
    for (const sign of [-1, 1]) c.fill("dragonfly", circle([CX + sign * 8, 58], 4.4));
  },
});

export const usagi = defineCrest({
  id: "usagi",
  name: { en: "Front-facing rabbit", ja: "真向き兎" },
  reading: "まむきうさぎ",
  romaji: "mamuki usagi",
  frame: "none",
  motifs: [{ motif: "rabbit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["rabbit", "hare", "moon rabbit", "usagi", "makkō usagi", "真向兎", "兎"],
  construction: {
    en: "A rabbit crouched and seen from the front. Its body is two equal circles side by side, which cross on the axis and leave a notch under the chin, with two ruled lines from the point of the back touching them. Each ear is the lens between two equal arcs, leaning out. The face is a circle drawn as a white line, with ringed eyes, the line of the nose, four ruled whiskers a side, and an arm coming round to a three-clawed paw.",
    ja: "正面から見た、うずくまる兎です。体は同じ大きさの円を二つ並べ、中心線上で交わらせて顎の下に切れ込みを作り、背の頂点から二本の直線を円に接するように引きます。耳は同じ半径の二つの弧にはさまれた形で、外へ傾けます。顔は白い線の円で、輪の目、鼻筋の線、左右四本ずつの直線のひげ、三本爪の前足へ回る腕の線を入れます。",
  },
  build(c) {
    usagiBuild(c, R);
  },
});
