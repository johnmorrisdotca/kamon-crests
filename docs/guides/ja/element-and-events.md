---
title: 要素
section: reference
order: 5
description: <kamon-crest>の属性、アニメーション、イベントです。
---

## タグ

```html
<kamon-crest crest="mitsuba-aoi" size="120"></kamon-crest>
```

`import "@johnmorrisdotca/kamon-crests/element/define"` か、CDNのスクリプトタグ一つで登録します。家紋はページ自身のドキュメントの中に、シャドウルートなしで、文字色で描かれます。要素か親に `color: #8a1c1c` を指定すると、その色になります。属性名が `id` でなく `crest` なのは、HTMLの `id` は一ページに一度しか使えないのに、家紋は二度表示することがあるからです。

## 属性

| 属性 | はたらき |
| --- | --- |
| `crest` | 家紋のID（ゆるい書き方でも可）。 |
| `size` | `small`・`medium`・`large`、またはピクセル数。指定がなければ `1em`。 |
| `animate` | 一手ずつ描きます。 |
| `speed` | 1が標準の速さです。 |
| `loop` | ページを閉じるまで、くり返します。 |
| `guides` | `off` で、アニメーションから補助線を除きます。 |
| `replay` | `off` で、クリックやEnterでのやり直しを止めます。 |
| `color`・`background` | 通常のCSSの色。 |
| `label`・`lang` | 読み上げる文言と、その言語。 |
| `loading` | `lazy`（標準）または `eager`。 |

どの属性もプロパティでもあります。`play()` は作図を最初から描き直し、終わったときに解決します。`ready` は家紋が描かれると解決し、該当する家紋がなければ `false` になります。

## イベント

描かれたときに `kamon-load`、アニメーションが終わったときに `kamon-end`、何も描けなかったときに `reason` 付きの `kamon-error` が出ます。どれも `detail` に `{ crest }` を持ち、バブリングし、composedです。

## 動きを減らす設定

読者が動きを減らす設定にしている場合、`animate` はアニメーションなしで、完成した家紋をすぐに表示します。
