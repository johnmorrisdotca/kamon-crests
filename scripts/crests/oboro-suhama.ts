import { SHINSEN_MONCHO } from "./books.ts";
import { oboroSuhamaBuild } from "./drawn/oboro-suhama.ts";
import { defineCrest } from "./util.ts";

export const oboroSuhama = defineCrest({
  id: "oboro-suhama",
  name: { en: "Soft sandbar tray", ja: "朧洲浜" },
  reading: "おぼろすはま",
  romaji: "oboro suhama",
  frame: "none",
  motifs: [{ motif: "sandbar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["おぼろ洲濱"],
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "left page, row 1, fourth column from the right: おぼろ洲濱 (measured, and drawn with compass and ruler)", ja: "左頁、一段目、右から四列目「おぼろ洲濱」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "A soft three-lobed shape: one lobe up and one at each lower corner, each lobe round, and the sides between the lobes hollowed in broad smooth curves. In the printed cell the lobes are about 157 across the radius with their centres about 315 from the middle, and each hollow reaches in to about 205 from the middle, which is a curve of about 300 across the radius. The three printed lobes differ by a tenth, and the drawing makes them equal.",
  construction: {
    en: "Strike three equal circles of 32 across the radius, centred 64 out at the top, lower left and lower right. Between each pair strike a circle of 61 across the radius that touches both from outside, with its centre out between them. The shape is the three lobes and the body joining them, with the three outer circles cut away, so each side is a smooth hollow running from one lobe into the next.",
    ja: "同じ大きさの円を三つ、半径32で、中心を64離して、上、左下、右下に描きます。となり合う二つの円の間に、半径61の円を、両方に外側から接するように、中心をその間の外側に置いて描きます。形は、三つの円とそれをつなぐ胴で、外の三つの円を切り取った残りです。どの辺も、一つの円から次の円へなめらかにへこんで続きます。",
  },
  build: oboroSuhamaBuild,
});
