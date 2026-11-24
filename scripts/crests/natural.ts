// Crests of living things: wisteria, gentian and bamboo grass, orange, butterfly, dragonfly, rabbit; and the nine stars.
import { C0, CX, CY, Path, circle, curveThrough, ellipse, lens, polar } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { defineCrest, fam } from "./util.ts";

type B = Parameters<(typeof sagariFuji)["build"]>[0];

/**
 * One raceme of wisteria: a spine through `spine`, and along it, station by station, a pair of petals that shrink
 * toward the tip. Petals lean away from the spine and toward the tip, as a hanging flower does.
 */
const raceme = (c: B, spine: Pt[], first: number, last: number, stations: number): void => {
  c.stroke("wisteria", curveThrough(new Path().M(spine[0]), spine), 3.2);
  const points: Pt[] = [];
  const along = (t: number): Pt => {
    const f = t * (spine.length - 1);
    const i = Math.min(spine.length - 2, Math.floor(f));
    const u = f - i;

    return [spine[i][0] + (spine[i + 1][0] - spine[i][0]) * u, spine[i][1] + (spine[i + 1][1] - spine[i][1]) * u];
  };
  for (let k = 0; k < stations; k += 1) points.push(along(0.04 + (0.9 * k) / (stations - 1)));
  c.group(() => {
    points.forEach((p, k) => {
      const u = k / (stations - 1);
      const size = first + (last - first) * u;
      const before = points[Math.max(0, k - 1)];
      const after = points[Math.min(points.length - 1, k + 1)];
      const heading = (Math.atan2(after[0] - before[0], -(after[1] - before[1])) * 180) / Math.PI;
      for (const sign of [-1, 1]) {
        const end = polar(size * 2.3, heading + sign * 55, p);
        c.fill("wisteria", lens(p, end, 0.46));
      }
    });
    const tip = points[points.length - 1];
    c.fill("wisteria", circle(polar(last * 1.2, 180, tip), last * 0.55));
  });
};

const fujiBuild = (c: B, wreath: boolean): void => {
  c.guideLine([CX, 4], [CX, 196]);
  if (wreath) {
    c.guideCircle(C0, 64);
    for (const sign of [-1, 1]) {
      const spine: Pt[] = [];
      for (let i = 0; i <= 8; i += 1) spine.push(polar(64, sign * (14 + (150 * i) / 8)));
      raceme(c, spine, 9.5, 5.2, 9);
    }
    return;
  }
  c.guideLine([CX - 40, 30], [CX - 40, 190]);
  c.guideLine([CX + 40, 30], [CX + 40, 190]);
  for (const sign of [-1, 1]) {
    const spine: Pt[] = [[CX + sign * 6, 34], [CX + sign * 30, 52], [CX + sign * 38, 92], [CX + sign * 34, 134], [CX + sign * 24, 188]];
    raceme(c, spine, 11.5, 5.5, 7);
  }
  // The shared bud at the top.
  c.fill("wisteria", circle([CX, 36], 5));
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
    en: "Two clusters hang from one point, each a curved spine with pairs of petals along it that grow smaller toward the tip.",
    ja: "一点から二房を垂らし、それぞれ曲線の軸に沿って花弁を二枚ずつ並べ、先へ行くほど小さくします。",
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
    en: "Two spines follow one circle round from the top, one to the right and one to the left, each carrying pairs of petals that shrink to a point.",
    ja: "頂点から右と左へ、一つの円に沿って二本の軸を回し、それぞれに花弁を二枚ずつ、先へ行くほど小さく並べます。",
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
  frame: "ring-thin",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "hanging" }],
  families: [fam("Fujiwara", "藤原", "ふじわら")],
  aliases: ["fujiwara ring"],
  construction: { en: "The hanging wisteria inside a thin ring.", ja: "細輪の中に下がり藤を収めます。" },
  build(c) {
    c.ring("ring-thin");
    c.zoom(0.84);
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
  frame: "ring-thin",
  motifs: [{ motif: "tachibana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["orange ring"],
  construction: { en: "The tachibana inside a thin ring.", ja: "細輪の中に橘を収めます。" },
  build(c) {
    c.ring("ring-thin");
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

/** The right half of a swallowtail: forewing and hindwing with a tail, with spots cut out. */
const butterflyWings = (): { right: Path; spots: Path[] } => {
  const x = (v: number): number => CX + v;
  const fore = new Path().M([x(3), 94]);
  fore.C([x(10), 60], [x(46), 26], [x(84), 24]);
  fore.C([x(98), 30], [x(98), 56], [x(86), 74]);
  fore.C([x(70), 96], [x(36), 108], [x(4), 112]);
  fore.Z();
  const hind = new Path().M([x(4), 116]);
  hind.C([x(40), 112], [x(80), 124], [x(90), 152]);
  hind.C([x(94), 168], [x(86), 180], [x(76), 190]);
  hind.C([x(70), 178], [x(58), 176], [x(48), 170]);
  hind.C([x(34), 164], [x(14), 150], [x(4), 128]);
  hind.Z();
  const spots = [circle([x(66), 54], 8), circle([x(44), 70], 6), circle([x(70), 140], 7), lens([x(14), 104], [x(52), 92], 0.18)];

  return { right: fore.join(hind), spots };
};

const agehaBuild = (c: B): void => {
  c.guideLine([CX, 6], [CX, 194]);
  const { right, spots } = butterflyWings();
  const left = right.mirror();
  const holes = (m: (p: Path) => Path): Path => spots.reduce((acc, s) => acc.join(m(s)), new Path());
  c.group(() => {
    c.fill("butterfly", right.join(holes((p) => p)), "evenodd");
    c.fill("butterfly", left.join(holes((p) => p.mirror())), "evenodd");
  });
  c.group(() => {
    c.fill("butterfly", lens([CX, 76], [CX, 150], 0.07));
    c.fill("butterfly", circle([CX, 70], 6.5));
    c.stroke("butterfly", new Path().M([CX - 3, 66]).C([CX - 10, 52], [CX - 18, 46], [CX - 28, 44]), 2.4);
    c.stroke("butterfly", new Path().M([CX + 3, 66]).C([CX + 10, 52], [CX + 18, 46], [CX + 28, 44]), 2.4);
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
    en: "A body on the centre line, and on each side a forewing and a hindwing with a tail, the two sides mirrored; spots and a vein cut out of the wings.",
    ja: "中心線上に胴を置き、左右に前翅と、尾状突起のある後翅を鏡写しに描き、翅に斑紋と翅脈を白く抜きます。",
  },
  build(c) {
    agehaBuild(c);
  },
});

export const maruNiAgehacho = defineCrest({
  id: "maru-ni-agehacho",
  name: { en: "Swallowtail butterfly in a circle", ja: "丸に揚羽蝶" },
  reading: "まるにあげはちょう",
  romaji: "maru ni agehachō",
  frame: "ring-thin",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [fam("Ikeda", "池田", "いけだ")],
  aliases: ["butterfly ring"],
  construction: { en: "The swallowtail inside a thin ring.", ja: "細輪の中に揚羽蝶を収めます。" },
  build(c) {
    c.ring("ring-thin");
    c.zoom(0.82);
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
  frame: "ring-thin",
  motifs: [{ motif: "rabbit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["rabbit", "hare", "moon rabbit", "usagi"],
  construction: {
    en: "A sitting rabbit turned to the right: an oval body, a round head with two long ears laid back, a round haunch and a tail, inside a thin ring; one eye cut out.",
    ja: "右向きに座った兎を描きます。楕円の胴、丸い頭と後ろに寝かせた長い耳、丸い腿と尾を置き、目を一つ白く抜いて、細輪で囲みます。",
  },
  build(c) {
    c.ring("ring-thin");
    c.guideCircle(C0, 60);
    c.guideLine([CX, 10], [CX, 190]);
    for (const sign of [-1, 1]) {
      const ear = lens([CX + sign * 14, CY - 6], [CX + sign * 30, CY - 82], 0.2);
      const inner = lens([CX + sign * 16, CY - 18], [CX + sign * 28, CY - 68], 0.06);
      c.fill("rabbit", ear.join(inner), "evenodd");
    }
    const holes = [circle([CX - 22, CY + 14], 5.5), circle([CX + 22, CY + 14], 5.5), lens([CX, CY + 28], [CX, CY + 38], 0.5)];
    for (const sign of [-1, 1]) for (const k of [0, 1]) holes.push(lens([CX + sign * 14, CY + 32 + k * 6], [CX + sign * 40, CY + 26 + k * 12], 0.03));
    c.fill("rabbit", holes.reduce((acc, h) => acc.join(h), ellipse([CX, CY + 24], 50, 44)), "evenodd");
   
  },
});
