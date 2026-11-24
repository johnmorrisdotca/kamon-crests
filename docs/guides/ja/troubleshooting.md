---
title: うまくいかないとき
section: how-to
order: 9
description: 家紋が黒い、出ない、動かないときです。
---

- **`<img>` の家紋が黒い。** 画像はページの文字色を見られません。`color` を渡します：`crestDataUri(id, { color })`。
- **`crest()` が `null` を返す。** IDではない値です。家や名前は検索です：`findCrests({ text: "Tokugawa" })[0]?.id`。
- **`<kamon-crest>` が何も描かない。** タグの属性は `id` ではなく `crest="…"` です。コンソールの `no crest for the id` を確かめます。
- **`animate` が動かない。** 読者が動きを減らす設定にしているのかもしれません。その場合は完成した家紋がすぐに表示されます。
- **アニメーションする家紋を二つ置くと、互いに影響する。** `animatedSvg(construction, { id })` で、それぞれに別の `id` を渡します。要素は自動で行います。
