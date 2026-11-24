// Crests of living things: wisteria, gentian and bamboo grass, orange, butterfly, dragonfly, rabbit; and the nine stars.
import { C0, CX, CY, Path, circle, curveThrough, lens, polar } from "../construct/geo.ts";
import { slit } from "../construct/motifs.ts";
import type { Pt } from "../construct/geo.ts";
import { defineCrest, fam } from "./util.ts";

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
    en: "A pointed leaf over two leaves and a knot at the top; from it two clusters hang round a circle, each a band of florets that narrows to a rounded end, its edges scalloped and a curved line between each pair of florets.",
    ja: "上に、尖った葉と左右に伸びる二枚の葉、結び目を置きます。そこから二房が円に沿って垂れ下がり、それぞれが、縁が小花で波打ち、先に向かって細くなって丸く終わる帯で、小花の間に曲線を一本ずつ入れます。",
  },
  build(c) {
    fujiBuild(c, false);
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
  construction: { en: "The hanging wisteria inside a ring a tenth of the diameter thick.", ja: "直径の10分の1の太さの輪の中に下がり藤を収めます。" },
  build(c) {
    c.ring("ring-medium");
    c.zoom(0.94);
    fujiBuild(c, false);
  },
});

/** A gentian bloom from the front: five pointed petals round a middle. */
const rindoFlower = (c: B, centre: Pt, size: number, deg: number): void => {
  const petals = [0, 72, 144, 216, 288].map((a) => lens(polar(size * 0.12, a + deg, centre), polar(size, a + deg, centre), 0.34));
  c.fill("gentian", petals.reduce((acc, p) => acc.join(p), new Path()));
};

export const sasaRindo = defineCrest({
  id: "sasa-rindo",
  name: { en: "Bamboo grass and gentian", ja: "笹竜胆" },
  reading: "ささりんどう",
  romaji: "sasa-rindō",
  frame: "ring-thin",
  motifs: [
    { motif: "bamboo-grass", count: 3, arrangement: "radial" },
    { motif: "gentian", count: 3, arrangement: "radial" },
  ],
  families: [fam("Minamoto (Genji)", "源氏", "げんじ"), fam("Uda Genji", "宇多源氏", "うだげんじ")],
  aliases: ["minamoto", "genji", "gentian", "rindo", "bamboo leaves"],
  construction: {
    en: "Three bamboo-grass leaves a third of a turn apart, with a gentian flower of five pointed petals set between each pair, all inside a thin ring.",
    ja: "笹の葉を三枚、120度ずつ離して置き、その間に五枚の尖った花弁の竜胆の花を一つずつ置いて、細輪で囲みます。",
  },
  build(c) {
    const inner = c.ring("ring-thin");
    c.guideCircle(C0, inner - 4);
    c.guideSpokes(6, 0, inner);
    for (const a of [0, 120, 240]) {
      const leaf = lens(polar(8, a), polar(inner - 8, a), 0.17);
      const rib = lens(polar(20, a), polar(inner - 22, a), 0.02);
      c.fill("bamboo-grass", leaf.join(rib), "evenodd");
    }
    for (const a of [60, 180, 300]) rindoFlower(c, polar(inner * 0.66, a), inner * 0.26, a);
  },
});

const tachibanaBuild = (c: B): void => {
  const fruit: Pt = [CX, CY + 34];
  c.guideCircle(fruit, 36);
  c.guideLine([CX, 6], [CX, 194]);
  c.group(() => {
    for (const a of [-76, -38, 0, 38, 76]) {
      const from = polar(30, a, fruit);
      const to = polar(112 - Math.abs(a) * 0.55, a, fruit);
      c.fill("tachibana", lens(from, to, 0.2).join(lens(polar(48, a, fruit), polar(96 - Math.abs(a) * 0.55, a, fruit), 0.02)), "evenodd");
    }
  });
  const calyx = [0, 72, 144, 216, 288].map((a) => lens(polar(2, a, [CX, CY + 34 - 24]), polar(10, a, [CX, CY + 34 - 24]), 0.3));
  c.fill("tachibana", calyx.reduce((acc, k) => acc.join(k), circle(fruit, 35)), "evenodd");
};

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
    en: "A round fruit with a five-pointed calyx cut into its top, and five leaves fanning above it, each with its midrib cut out.",
    ja: "丸い実の上部に五つ又の蔕（へた）を白く抜き、その上に五枚の葉を扇状に開き、各葉に中肋を抜きます。",
  },
  build(c) {
    tachibanaBuild(c);
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
  construction: { en: "The tachibana inside a ring a tenth of the diameter thick.", ja: "直径の10分の1の太さの輪の中に橘を収めます。" },
  build(c) {
    c.ring("ring-medium");
    c.zoom(0.8);
    tachibanaBuild(c);
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
    en: "One disc in the middle and eight round it, each a fifth of the diameter across and a little apart.",
    ja: "中央に円を一つ、そのまわりに八つを、それぞれ直径の5分の1ほどの大きさで、少し間をあけて並べます。",
  },
  build(c) {
    c.guideCircle(C0, 66);
    c.guideSpokes(8, 0, 90);
    c.fill("star", circle(C0, 22));
    for (let i = 0; i < 8; i += 1) c.group(() => c.fill("star", circle(polar(66, i * 45), 21)));
  },
});

/** An eyespot: a white ring with a black pupil, cut into a wing. */
const eyespot = (at: Pt, r: number): Path => circle(at, r).join(circle(at, r * 0.55));

/** Slits fanning from `from` out to the listed points, each curving a little, for the veins of a wing. */
const fan = (from: Pt, ends: Pt[], bend = 0.08): Path[] =>
  ends.map((e) => {
    const m: Pt = [(from[0] + e[0]) / 2, (from[1] + e[1]) / 2];
    const nx = -(e[1] - from[1]) * bend;
    const ny = (e[0] - from[0]) * bend;

    return slit([from, [m[0] + nx, m[1] + ny], e], 2.2);
  });

/** The swallowtail seen from the side: wings raised, the far wing showing behind, the body below, the antennae curled. */
const agehaBuild = (c: B): void => {
  c.guideLine([CX, 10], [CX, 190]);
  c.guideCircle(C0, 86);
  c.guideLine([60, 150], [140, 168]);
  // The near forewing: upright, its top edge scalloped, its veins fanning from the body, three eyespots.
  const fore = new Path().M([88, 138]);
  fore.C([78, 112], [74, 72], [83, 36]);
  fore.C([94, 30], [104, 38], [110, 46]);
  fore.C([114, 40], [126, 44], [128, 56]);
  fore.C([136, 56], [144, 70], [140, 84]);
  fore.C([146, 96], [138, 116], [120, 130]);
  fore.Z();
  const foreCuts = [...fan([92, 134], [[88, 76], [100, 82], [112, 90], [124, 104], [108, 72], [118, 80]], 0.06), eyespot([100, 52], 5.4), eyespot([121, 66], 5), eyespot([115, 84], 4.4)];
  // The hindwing: a fan behind and to the right, wavy at its edge, with a tail.
  const hind = new Path().M([100, 140]);
  hind.C([116, 118], [146, 94], [164, 100]);
  hind.C([170, 110], [172, 118], [166, 126]);
  hind.C([174, 134], [170, 146], [160, 152]);
  hind.C([164, 160], [158, 168], [148, 168]);
  hind.C([140, 178], [128, 176], [122, 166]);
  hind.C([116, 164], [108, 158], [100, 148]);
  hind.Z();
  const hindCuts = fan([104, 142], [[150, 112], [158, 124], [160, 138], [150, 154], [136, 160], [124, 156], [140, 128]], 0.05);
  // The far forewing, small and to the left, with two eyespots.
  const far = new Path().M([80, 138]);
  far.C([64, 124], [52, 112], [58, 96]);
  far.C([62, 92], [70, 90], [74, 94]);
  far.C([78, 90], [86, 92], [88, 100]);
  far.C([94, 112], [90, 128], [84, 138]);
  far.Z();
  const farCuts = [eyespot([67, 108], 4.4), eyespot([79, 106], 4.2), ...fan([82, 134], [[66, 120], [74, 118], [84, 116]], 0.04)];
  c.group(() => {
    c.fill("butterfly", far.join(...farCuts), "evenodd");
    c.fill("butterfly", hind.join(...hindCuts), "evenodd");
    c.fill("butterfly", fore.join(...foreCuts), "evenodd");
  });
  c.group(() => {
    c.fill("butterfly", lens([74, 150], [142, 172], 0.09));
    c.fill("butterfly", circle([70, 148], 8.4).join(circle([66, 146], 2.6)), "evenodd");
    c.stroke("butterfly", curveThrough(new Path().M([66, 141]), [[66, 141], [58, 128], [54, 112], [60, 100], [68, 98], [70, 106], [65, 109]]), 3);
    c.stroke("butterfly", curveThrough(new Path().M([71, 141]), [[71, 141], [76, 134], [86, 130]]), 2.8);
    for (const [x, y] of [[62, 158], [70, 160], [80, 160]] as const) c.stroke("butterfly", new Path().M([x, y - 2]).L([x - 6, y + 8]), 2.8);
  });
};

export const agehacho = defineCrest({
  id: "agehacho",
  name: { en: "Swallowtail butterfly", ja: "揚羽蝶" },
  reading: "あげはちょう",
  romaji: "agehachō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [fam("Taira (Heike)", "平家", "へいけ"), fam("Ikeda", "池田", "いけだ")],
  aliases: ["butterfly", "swallowtail", "taira", "cho"],
  construction: {
    en: "Seen from the side: a slanting body, a raised forewing with three eyespots, a fan-shaped hindwing with its tail, the far wing showing at the left, and the antennae curled; veins and eyespots are cut out of the wings.",
    ja: "横から見た姿を描きます。斜めの胴、三つの目玉模様のある立てた前翅、尾状突起のある扇形の後翅、左にのぞく奥の翅、巻いた触角を置き、翅に翅脈と目玉模様を白く抜きます。",
  },
  build(c) {
    c.zoom(1.1);
    agehaBuild(c);
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
  construction: { en: "The side view of the swallowtail inside a ring a tenth of the diameter thick.", ja: "横向きの揚羽蝶を、直径の10分の1の太さの輪の中に収めます。" },
  build(c) {
    c.ring("ring-medium");
    agehaBuild(c);
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
  name: { en: "Rabbit in a circle", ja: "兎の丸" },
  reading: "うさぎのまる",
  romaji: "usagi no maru",
  frame: "ring-medium",
  motifs: [{ motif: "rabbit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["rabbit", "hare", "moon rabbit", "usagi"],
  construction: {
    en: "A rabbit seated and seen from the front, its body a plump peach-shaped mass, two long ears leaning out, a round face drawn in a white line with two ringed eyes, a nose and three whiskers a side, and its paws under the chin, inside a ring a tenth of the diameter thick.",
    ja: "正面から見て座った兎を描きます。体はふっくらした桃形のかたまりで、長い耳を左右に傾け、丸い顔を白い線で縁取って、輪になった目を二つ、鼻と左右三本ずつのひげを入れ、顎の下に前足を添えて、直径の10分の1の太さの輪で囲みます。",
  },
  build(c) {
    c.ring("ring-medium");
    c.guideCircle([100, 122], 34);
    c.guideLine([CX, 10], [CX, 190]);
    const body = new Path().M([100, 28]);
    body.C([118, 44], [150, 62], [160, 100]);
    body.C([166, 134], [140, 170], [100, 170]);
    body.C([60, 170], [34, 134], [40, 100]);
    body.C([50, 62], [82, 44], [100, 28]);
    body.Z();
    // The white lines cut into the body: the face, its two eyes and nose and whiskers, the paws, and a line beside each ear.
    const cuts: Path[] = [];
    const face = Array.from({ length: 16 }, (_, k): Pt => polar(34, 212 + (k * 296) / 15, [100, 122]));
    cuts.push(slit(face, 2.4, 0.04));
    for (const sign of [-1, 1]) {
      cuts.push(circle([100 + sign * 15, 118], 5.6).join(circle([100 + sign * 15, 118], 2.6)));
      for (const [dy, lift] of [[0, -3], [6, 1], [12, 6]] as const) cuts.push(slit([[100 + sign * 9, 134 + dy * 0.5], [100 + sign * 22, 133 + dy * 0.6 + lift * 0.4], [100 + sign * 36, 132 + dy * 0.7 + lift]], 1.8, 0.25));
      cuts.push(slit([[100 + sign * 3, 140], [100 + sign * 7, 146], [100 + sign * 14, 150]], 2));
      cuts.push(slit([[100 + sign * 20, 154], [100 + sign * 27, 159], [100 + sign * 31, 166]], 2));
      cuts.push(slit([[100 + sign * 26, 152], [100 + sign * 32, 157], [100 + sign * 38, 164]], 2));
    }
    cuts.push(slit([[100, 130], [100, 136], [100, 142]], 2.6, 0.3));
    const earBase = (sign: number): Pt => [100 + sign * 12, 98];
    const earTip = (sign: number): Pt => [100 + sign * 50, 34];
    for (const sign of [-1, 1]) {
      const a = earBase(sign);
      const t = earTip(sign);
      const len = Math.hypot(t[0] - a[0], t[1] - a[1]);
      const nx = -(t[1] - a[1]) / len;
      const ny = (t[0] - a[0]) / len;
      for (const side of [-1, 1]) {
        const q: Pt = [a[0] + (t[0] - a[0]) * 0.5, a[1] + (t[1] - a[1]) * 0.5];
        cuts.push(slit([[a[0] + nx * side * 8, a[1] + ny * side * 8], [(a[0] + q[0]) / 2 + nx * side * 12, (a[1] + q[1]) / 2 + ny * side * 12], [q[0] + nx * side * 15, q[1] + ny * side * 15]], 2.2, 0.2));
      }
    }
    c.group(() => c.fill("rabbit", cuts.reduce((acc, x) => acc.join(x), body), "evenodd"));
    // The ears, drawn over the body so that the white lines beside them read as their outline.
    c.group(() => {
      for (const sign of [-1, 1]) c.fill("rabbit", lens(earBase(sign), earTip(sign), 0.13));
    });
  },
});
