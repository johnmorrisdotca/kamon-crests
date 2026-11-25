---
title: 構造
section: concept
order: 8
description: 家紋がどう書かれ、ビルドされ、読み込まれるかです。
---

家紋は `scripts/crests/` にある定義です。名前、部品、家、そして補助線を引いて図形を描く `build` 関数で、道具は `scripts/construct/` にあります。`pnpm data` はすべての定義を実行し、家紋ごとに `src/crests/<id>.ts`（SVG）と `src/steps/<id>.ts`（作図と、作り方を書いた一行の文。`manifest` を小さく保つため、この文は記録に入れません）を、全体の表として `src/data/*.data.ts`（ID、名前、ローダー、記録）を、さらに `docs/catalogue.md`、`docs/sizes.md`、`docs/strings-ja.md` を書き出します。tsupは、それぞれを独立したエントリーとしてビルドするので、家紋のファイルは、その家紋の図だけを持ちます。

実行時のコードは小さく、`index`（IDと道具）、`load`（IDによる家紋、動的インポート）、`manifest`、`parts`、`search`、`animate`（作図アニメーション。静止したSVGも書く `render.ts` から作るので、両者がずれることはありません）、`names`、そして要素です。関数はすべて純粋で、文字列を扱います。
