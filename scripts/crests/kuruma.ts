import { SHINSEN_MONCHO } from "./books.ts";
import { hanaGurumaBuild, kazagurumaBuild, kinoshitaGurumaBuild, mitsuWariGenjiGurumaBuild, mutsuWariGenjiGurumaBuild } from "./drawn/kuruma.ts";
import { defineCrest } from "./util.ts";

export const mitsuWariGenjiGuruma = defineCrest({
  id: "mitsu-wari-genji-guruma",
  name: { en: "Three-part Genji wheel", ja: "三つ割り源氏車" },
  reading: "みつわりげんじぐるま",
  romaji: "mitsu wari genji guruma",
  frame: "none",
  motifs: [{ motif: "wheel", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三つ割源氏車", "三ッワリ源氏車"],
  construction: {
    en: "Place three cart-wheel hubs around one circle. Each wheel turns a third of the way around the layout and is cut back at its neighbour's outer edge.",
    ja: "一つの円周に車輪の轂を三つ置きます。車輪を3分の1回転ずつ並べ、隣の車輪の外縁で切りそろえます。",
  },
  measured: "The surviving hubs lie roughly 154 from the centre of the plate's circle, whose radius is about 156. From each hub the arcs dividing the spokes, felloes and rim lie about 75, 104 and 155 out. The drawing regularizes the three turns to 120 degrees.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, first row, third column from the right: 三ッワリ源氏車", ja: "右頁、一段目、右から三列目「三ッワリ源氏車」" }, read: "2026-11-26", measured: true },
  build: mitsuWariGenjiGurumaBuild,
});

export const mutsuWariGenjiGuruma = defineCrest({
  id: "mutsu-wari-genji-guruma",
  name: { en: "Six-part Genji wheel", ja: "六つ割り源氏車" },
  reading: "むつわりげんじぐるま",
  romaji: "mutsu wari genji guruma",
  frame: "none",
  motifs: [{ motif: "wheel", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["六つ割源氏車", "六ッワリ源氏車"],
  construction: {
    en: "Divide the tyre and felloes into six pieces each, staggering their joins. Six widening spokes lead out from the hub.",
    ja: "外輪と輪木をそれぞれ六つに分け、継ぎ目を互い違いにします。轂から外に向けて、幅の広がる輻を六本引きます。",
  },
  measured: "From the cell, the outside circle is about 154 in radius, the tyre ends at 128, the felloes end at 96 and the hub is 21. The layout uses 96, 80, 60 and 12, with equally spaced joins.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, second row, second column from the right: 六ッワリ源氏車", ja: "右頁、二段目、右から二列目「六ッワリ源氏車」" }, read: "2026-11-26", measured: true },
  build: mutsuWariGenjiGurumaBuild,
});

export const kazaguruma = defineCrest({
  id: "kazaguruma",
  name: { en: "Pinwheel", ja: "風車" },
  reading: "かざぐるま",
  romaji: "kazaguruma",
  frame: "none",
  motifs: [{ motif: "wheel", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["windmill", "かざぐるま"],
  construction: {
    en: "Eight fine spokes lead from the hub to a narrow rim. Outside it eight square vanes meet the same axes at their corners.",
    ja: "轂から細いふちに八本の細い輻を渡します。その外側に八枚の正方形の羽根を置き、各羽根の角を輻と同じ軸に合わせます。",
  },
  measured: "The points of the blades are about 156 from the centre in the printed cell. The wheel rim is 68, the hub is 17, the blade centres are 111 from the centre and their half diagonals are 43. The layout uses 96, 42, 10, 69 and 27.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, second row, third column from the right: かざぐるま", ja: "右頁、二段目、右から三列目「かざぐるま」" }, read: "2026-11-26", measured: true },
  build: kazagurumaBuild,
});

export const kinoshitaGuruma = defineCrest({
  id: "kinoshita-guruma",
  name: { en: "Kinoshita wheel", ja: "木下車" },
  reading: "きのしたぐるま",
  romaji: "kinoshita guruma",
  frame: "none",
  motifs: [{ motif: "wheel", count: 1, arrangement: "single" }, { motif: "tomoe", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["木下ぐるま"],
  construction: {
    en: "Strike a narrow outer rim and the ring of the hub. Rule twelve spokes between them. Lay three curled tomoe inside the hub, a third of a turn apart.",
    ja: "細い外輪と軸を囲む輪を打ちます。その間に輻を十二本引き、内側に巴を三つ、等間隔に置きます。",
  },
  measured: "Twelve long spokes join the outer edge directly to a small ring around the three tomoe. The spacing in the print is slightly uneven; the drawing sets all spokes at equal turns.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, third row, second column from the right: 木下車, with きのした gloss", ja: "右頁、三段目、右から二列目「木下車」（「きのした」の傍訓）" }, read: "2026-11-27", measured: true },
  build: kinoshitaGurumaBuild,
});

export const hanaGuruma = defineCrest({
  id: "hana-guruma",
  name: { en: "Overlapping flower-rimmed wheels", ja: "花車" },
  reading: "はなぐるま",
  romaji: "hana guruma",
  frame: "none",
  motifs: [{ motif: "wheel", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["花ぐるま"],
  construction: {
    en: "Build each wheel from a hub, eight spokes and a segmented rim whose outside edge is scalloped. Place a second wheel above and beside the first, with its lower face hidden behind the front wheel.",
    ja: "軸と八本の輻を引き、外側を花弁のように波打たせた輪を作ります。二つ目の車を斜め上に置き、下側を手前の車で隠します。",
  },
  measured: "Two similar wheels overlap on an upward diagonal. The front wheel shows a complete rim and spoke group. Only the upper and right rim and some joins of the back wheel remain visible.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, third row, third column from the right: 花ぐるま", ja: "右頁、三段目、右から三列目「花ぐるま」" }, read: "2026-11-27", measured: true },
  build: hanaGurumaBuild,
});
