import { SHINSEN_MONCHO } from "./books.ts";
import { kagiBishiBuild, maruNiHitotsuKagiBuild } from "./drawn/kagi-bishi.ts";
import { defineCrest } from "./util.ts";

export const kagiBishi = defineCrest({
  id: "kagi-bishi",
  name: { en: "Key lozenge", ja: "鍵菱" },
  reading: "かぎびし",
  romaji: "kagi bishi",
  frame: "none",
  motifs: [{ motif: "key", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["かぎびし"],
  construction: {
    en: "Rule the first key's shaft inward along a broad lozenge and pierce its wide outer grip. Turn the second key halfway around the centre. The two inner tips meet the opposite shafts and enclose a white lozenge.",
    ja: "横長の菱に沿って、一本目の鍵の軸を内側へ折り、外側の太い持ち手に穴をあけます。二本目は中心から半回転させて置きます。内側の先端が互いの軸に合い、白い菱を囲みます。",
  },
  measured: "Across the centre the cell has three bands on each side, reaching about 88, 52 and 20 units from the middle on the 200-unit page. The diagonals rise about 4 for every 5 across. The shafts are about 6 units wide and the grips about 10, each with a small pin opening of radius about 2. Opposite bands and the angles of their corners are matched by a half turn.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "right page, first row, fourth column from the right: かぎびし", ja: "右頁、一段目、右から四列目「かぎびし」" }, read: "2026-11-27", measured: true },
  build: kagiBishiBuild,
});

export const maruNiHitotsuKagi = defineCrest({
  id: "maru-ni-hitotsu-kagi",
  name: { en: "Single key with cords in a circle", ja: "丸に一つ鍵" },
  reading: "まるにひとつかぎ",
  romaji: "maru ni hitotsu kagi",
  frame: "ring-medium",
  motifs: [{ motif: "key", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ一ッかぎ"],
  construction: {
    en: "Rule the key from its rounded shaft into a rectangular spiral. Leave a small eye at the foot of the shaft. Loop the cords below the head and to each side, with a tassel at each outer end. Strike the enclosing ring.",
    ja: "丸い軸の先から、角を曲がりながら内へ巻く鍵を引きます。軸の下に小さな穴をあけます。鍵の頭の下と軸の両側に紐を巻き、二つの端に房を付け、外に輪を打ちます。",
  },
  measured: "The cell's ring is about 322 pixels across. The head of the key covers about 123 by 83 pixels and the shaft is about 13 pixels wide. On the working page the head is about 68 units wide and 41 high, with a rail 7.4 units wide. The ring's catalogue weight follows the printed band, and the cords remain off the ring.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "right page, third row, third column from the right: 丸ニ一ッかぎ", ja: "右頁、三段目、右から三列目「丸ニ一ッかぎ」" }, read: "2026-11-27", measured: true },
  build: maruNiHitotsuKagiBuild,
});
