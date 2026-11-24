---
title: Complexity
section: concept
order: 10
description: A crest's score, its meter of 0 to 100 and its grade, and why arcs and compass widths weigh most.
---
# Complexity: the score, the meter and the grade

How hard a crest is to draw, as one number a page can sort by and show. It is made from the crest's counts and nothing else, so it is never typed by hand. The Japanese is in [ja/complexity.md](ja/complexity.md).

## The formula

```
score = 3 × arcs + 2 × circles + 1 × lines + 5 × (compass widths − 1)
meter = round(25 × log10(score)), kept between 0 and 100
grade = 1 to 5, a fifth of the meter each
```

The counts are what the animation does, over every place a turn or a mirror builds ([the counts](parts-and-search.md)): the arcs inked, the circles struck, the lines ruled, and the distinct compass widths.

## Why these weights

- **An arc is 3.** Inking an arc is the most careful work in a crest: the pen follows the circle only between two crossings, and must start and stop exactly on them.
- **A circle is 2.** A circle is struck in one sweep, but its point has to be set on the right centre first.
- **A line is 1.** A ruled line is the quickest stroke: two points and the ruler.
- **A compass width after the first is 5.** Resetting the compass is the slowest move of all: the width is measured again, and every circle of the old width has to be done before it. A crest of thirty widths is far more work than one of three with as many circles.

## The meter

The meter is fixed, not relative to the other crests: a crest keeps its meter as crests are added. It goes up 25 for each tenfold of the score.

| Score | 1 | 10 | 100 | 1000 | 10000 |
| --- | --- | --- | --- | --- | --- |
| Meter | 0 | 25 | 50 | 75 | 100 |

## The grades

| Grade | Meter | English | 日本語 |
| --- | --- | --- | --- |
| 1 | under 20 | Simple | 入門 |
| 2 | 20 to 39 | Easy | 初級 |
| 3 | 40 to 59 | Moderate | 中級 |
| 4 | 60 to 79 | Hard | 上級 |
| 5 | 80 and over | Master | 名人 |

The Japanese names have not yet been checked by a native reader. Today the snake's eye scores 15 (meter 29, Easy) and the hollyhock in a ring 1249 (meter 77, Hard); no crest yet reaches Master.

## In code

```ts
import { GRADES, findCrests, rankCrests, topCrests } from "@johnmorrisdotca/kamon-crests/search";
import { manifest } from "@johnmorrisdotca/kamon-crests/manifest";

const stats = manifest("maru-ni-kikyo")?.stats;
console.log(stats?.score, stats?.meter, stats?.grade);   // 216 58 3
console.log(GRADES[2].en, GRADES[2].ja);                 // "Moderate" "中級"

rankCrests();                        // every crest by its score, the simplest first
topCrests(5);                        // the five most complex
findCrests({ grade: 4 });            // every Hard crest
findCrests({ meter: { min: 70 } });  // by the meter, like any count
```

The crests still being redrawn from a crest book have no meter to show: their counts are of a traced drawing. `rankCrests()` puts them last and `topCrests()` leaves them out.
