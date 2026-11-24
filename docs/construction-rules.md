# Construction rules

Required reading before a crest is drawn, redrawn or reviewed. Each rule is one that can be checked: by the test named beside it
(`pnpm check` runs them all), or, where no test can see it, on the side-by-side sheet. A rule marked "checked on the sheet" is the
reviewer's to hold, crest by crest. The Japanese follows the English.

| # | Rule | How it is checked |
| --- | --- | --- |
| 1 | **Compass and ruler only.** A crest is compass circles, arcs taken from circles that were struck, and ruled lines. No Bézier curve, no stroke, no offset path, no traced run of short lines. | `src/compass.test.ts`, "is fills outlined in arcs and ruled lines only". The crests still to be rebuilt are named in its `PENDING` list, and a crest on the list that passes fails the test until it is taken off. |
| 2 | **Whole circles, struck first.** Every guide is a full circle or a ruled line, struck before any arc is taken from it. Every arc of the finished crest lies on a struck circle and every straight edge on a ruled line. | `src/compass.test.ts`, "takes every arc from a circle struck in full, and every straight edge from a ruled line" (within 0.05 of a unit). `src/steps.test.ts`, "has guides, shapes and ordered steps that draw each exactly once": the guides come before the shapes. |
| 3 | **A white line is a gap.** White is the space left between two fills, never a stroke. A white line of width w is bounded by arcs of radius r and r + w. | No stroke: `src/compass.test.ts`, as rule 1. The two radii: checked on the sheet. |
| 4 | **Over and under.** Where one piece crosses over another, the gap in the piece beneath is bounded by circles (or lines) offset from the piece on top, and those are struck first. | Checked on the sheet. |
| 5 | **One unit, then the turn.** A repeated part is built once in full; its other places are a turn step or a mirror step, not drawn again. | `src/steps.test.ts`, "turns only a unit already drawn". `src/isolate.test.ts`, "tags every shape and every guide with its part and its unit". |
| 6 | **Rings are measured.** A ring is 0.087 of the diameter, the white inside it 0.018, and the motif reaches 0.79 of the radius. | The weights are `RING_WEIGHT` and `RING_GAP` in `scripts/construct/builder.ts`, used by `ring()`. That a crest uses them and fills its ring: checked on the sheet. |
| 7 | **The animation's phases.** The underdrawing, compass width by compass width; trace what is needed; thicken; rule the lines; fill; finish. | Not built yet, and no test holds it. Today the animation strikes every guide, draws each unit, turns it and rubs the guides out, and `src/steps.test.ts` holds that order. Until the phases are built: checked on the sheet. |
| 8 | **Measure, never copy.** Measuring a crest's proportions from any reference is allowed. Copying a modern drawing's outline or pixels is not. A public-domain book may be vectorised only as a step in measuring, never as the finished drawing. | Checked on the sheet and in review, against the crest's `source` and `docs/provenance.md`. Rule 1's test refuses a traced outline once a crest is off the `PENDING` list. |
| 9 | **The side-by-side gate.** Every crest is put beside a real reference at the same size, and passes only when a stranger could not tell it from the real form, before it ships. | Checked on the sheet: one row per crest, every row looked at. |
| 10 | **A craftsman's construction is followed.** Where a craftsman has published how a crest is constructed (Hatoba's UWAEMON, NHK's デザインあ), ours uses the same circles in the same order. | Checked on the sheet, against the published construction, and credited in the crest's provenance. |

## 作図のルール（日本語）

家紋を描く前、描き直す前、確認する前に、かならず読んでください。どのルールも確かめられる形で書いてあります。横にあるテスト
（`pnpm check` がすべて実行します）で確かめるか、テストでは見えないものは、見比べ用のシートで一つずつ確かめます。

| # | ルール | 確かめ方 |
| --- | --- | --- |
| 1 | **コンパスと定規だけ。** 家紋は、コンパスの円、描いた円から取った弧、定規の直線だけで作ります。ベジェ曲線、線（ストローク）、オフセットしたパス、短い線をつないだなぞり書きは使いません。 | `src/compass.test.ts` の "is fills outlined in arcs and ruled lines only"。まだ描き直していない家紋は `PENDING` に名前があります。 |
| 2 | **円は一周分を先に描く。** 補助線は円一周か定規の直線で、弧を取る前に描きます。仕上がりの弧はすべて描いた円の上に、まっすぐな辺はすべて引いた直線の上にあります。 | `src/compass.test.ts` の "takes every arc from a circle struck in full, and every straight edge from a ruled line"、`src/steps.test.ts` の "has guides, shapes and ordered steps that draw each exactly once"。 |
| 3 | **白い線はすき間。** 白は二つの塗りの間に残したすき間で、線ではありません。幅 w の白い線は、半径 r と r + w の弧ではさみます。 | 線がないこと：ルール1のテスト。二つの半径：シートで確認。 |
| 4 | **上と下の重なり。** 上を通る部分があるとき、下の部分の切れ目は、上の部分からずらした円（または直線）ではさみ、その円を先に描きます。 | シートで確認。 |
| 5 | **一つ作ってから回す。** くり返す部分は一つだけ最後まで作り、ほかの位置は「回す」か「裏返す」手順で写します。 | `src/steps.test.ts` の "turns only a unit already drawn"、`src/isolate.test.ts` の "tags every shape and every guide with its part and its unit"。 |
| 6 | **輪は測った太さ。** 輪は直径の0.087、内側の白は0.018、図柄は半径の0.79まで。 | 太さは `scripts/construct/builder.ts` の `RING_WEIGHT` と `RING_GAP`。使っているかどうかはシートで確認。 |
| 7 | **アニメーションの順番。** 下書き（コンパスの幅ごと）、必要な線をなぞる、太くする、直線を引く、塗る、仕上げ。 | まだ作っていません。テストもありません。今は、補助線、単位、回す、補助線を消す、の順で、`src/steps.test.ts` がその順を守っています。できるまではシートで確認。 |
| 8 | **測るのはよい、写すのはだめ。** どの資料からでも比率を測ってかまいません。今の人が描いた図の輪郭や画素を写してはいけません。著作権の切れた本は、測るための途中の作業としてだけベクター化できます。 | シートとレビューで確認（家紋の `source` と `docs/provenance.md`）。 |
| 9 | **見比べの関門。** どの家紋も、本物の資料と同じ大きさで並べ、知らない人が見分けられないときだけ合格です。出す前にかならず行います。 | シートで確認（家紋ごとに一行、全部の行を見る）。 |
| 10 | **職人の作図に合わせる。** 職人が作図を公開している家紋（波戸場承龍さんのUWAEMON、NHK「デザインあ」）は、同じ円を同じ順番で使います。 | 公開された作図と見比べてシートで確認し、出典に書きます。 |
