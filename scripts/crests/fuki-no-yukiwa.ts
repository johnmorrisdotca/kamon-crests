import { SHINSEN_MONCHO } from "./books.ts";
import { fukiNoYukiwaBuild } from "./drawn/fuki-no-yukiwa.ts";
import { defineCrest } from "./util.ts";

export const fukiNoYukiwa = defineCrest({
  id: "fuki-no-yukiwa",
  name: { en: "Butterbur snow ring", ja: "蕗の雪輪" },
  reading: "ふきのゆきわ",
  romaji: "fuki no yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["ふきの雪ワ"],
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "left page, row 3, third column from the right: ふきの雪ワ (measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から三列目「ふきの雪ワ」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Six petals meet at a small round hub, each cut off from the next by a straight seam and each ending in two round bumps with a shallow notch between them. Behind the seams a round lobe shows as a narrow crescent. In the printed cell the petals reach about 480 pixels from the hub at their bumps and 436 at their notches, the shoulders at the seams stand about 395 out, the hub is about 67 across the radius, and the crescents reach about 470. The printed petals differ in size by a tenth, and the drawing makes them equal.",
  construction: {
    en: "Rule six seams through the centre at every sixth of the way round, with a narrow white gap along each. In each wedge between two seams strike two equal circles of 24 across the radius, centred 71 out and 13.7 degrees either side of the wedge's middle, and fill the wedge out to them. Strike a round lobe of 45 across the radius behind each seam, centred 49 out, and leave a narrow white between it and the petals in front. Leave a hub of 13.3 across the radius white.",
    ja: "中心を通る継ぎ目を、6等分の位置に六本引き、それぞれに細い白いすき間を残します。継ぎ目と継ぎ目の間の扇形ごとに、半径24の同じ円を二つ、中心を71離し、扇形の真ん中から左右に13.7度ずつ離して描き、扇形をその円のところまで塗ります。それぞれの継ぎ目の後ろには、半径45の丸い山を、中心を49離して描き、手前の花びらとの間に細い白を残します。中心には半径13.3の円を白く抜きます。",
  },
  build: fukiNoYukiwaBuild,
});
