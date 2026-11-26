---
title: はじめに
section: tutorial
order: 1
description: 家紋を一つ読み込み、IDで別の家紋を読み込み、ページに置きます。
---

## インストール

```sh
npm install @johnmorrisdotca/kamon-crests
```

スコープ付きの名前を使ってください。サーバーではNode 24以降、ブラウザーは現行のものならどれでも使えます。実行時の依存関係はなく、ホスティングサービスも使わず、このパッケージ自身がネットワークに要求を出すこともありません。

## 家紋を一つ読み込む

```ts
import aoi from "@johnmorrisdotca/kamon-crests/crests/mitsuba-aoi";

document.querySelector("#crest")!.innerHTML = aoi;
```

家紋のモジュールは、SVG文字列だけを持ちます。周囲の文字色（`currentColor`）で、背景なしの200×200のページに描かれているので、大きさはCSSで、色は `color` で決められます。家紋ごとに独立したモジュールなので、ページが運ぶのは読み込んだ家紋だけです。

## IDで読み込む

```ts
import { crest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await crest("maru-ni-juji", { color: "#8a1c1c" });
```

ルートはIDと道具、`/load` は実行時に決まるID、`/manifest` は名前と事実、`/search` は部品による検索、`/animate` は作図アニメーション、任意の `/element/define` は `<kamon-crest>` タグのためのものです。すべてのエントリーは、READMEの[エントリー一覧](../../../README.md#the-entries)にあります。

## タグ一つで置く

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@johnmorrisdotca/kamon-crests@0/dist/element-define.js"></script>
<kamon-crest crest="kikyo" size="96" animate></kamon-crest>
```

## どのガイドを読めばよいか

| やりたいこと | 読むもの |
| --- | --- |
| ページに家紋を一つ表示する | 上の[家紋を一つ読み込む](#家紋を一つ読み込む)、続いて、色・背景・`<img>` については[家紋の読み込み](loading-crests.md) |
| IDで家紋を読み込む | 上の[IDで読み込む](#idで読み込む)と、[家紋の読み込み](loading-crests.md) |
| 部品・名前・家で家紋を検索する | [部品と検索](parts-and-search.md) |
| 作図アニメーションを再生する | [アニメーション](how-crests-are-constructed.md#アニメーション)と、[要素](element-and-events.md)の `animate` 属性 |
| `<kamon-crest>` 要素を使う | 上の[タグ一つで置く](#タグ一つで置く)、続いて[要素](element-and-events.md) |
| 家紋を簡単なものから難しいものへ並べる | [複雑さ](complexity.md) |
| 図の出どころと、使ってよいかを知る | [家紋の利用について](using-these-crests.md)と[現在の使用](used-today.md) |
| 家紋が黒い、出ない、動かないときに直す | [うまくいかないとき](troubleshooting.md) |
| 家紋を描いて送る | [家紋を描く](draw-a-crest.md)、続いて[CONTRIBUTING.md](../../../CONTRIBUTING.md) |
| このパッケージの作りを知る | [構造](architecture.md) |
