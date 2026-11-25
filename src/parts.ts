// The vocabulary a crest is described in: its frame, its motifs, how many of a motif there are and how they are arranged.
// Every term has its English, its Japanese, the Japanese's reading in hiragana and in romaji, and a line saying what it is.
// A crest's record names its parts by these ids, so a site can search crests by them and a demo can explain each.

/**
 * A word in both languages, with its reading: a frame, a motif, an arrangement or a turn.
 *
 * @example
 * ```ts
 * import type { Term } from "@johnmorrisdotca/kamon-crests/parts";
 * import { term } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * const tomoe: Term | null = term("tomoe");
 * console.log(tomoe?.reading); // "ともえ"
 * ```
 */
export interface Term {
  id: string;
  en: string;
  ja: string;
  /** The Japanese in hiragana. */
  reading: string;
  /** The Japanese in Hepburn romaji. */
  romaji: string;
  /** What it is, in a line. */
  about: { en: string; ja: string };
}

/**
 * A motif is a term with a kind: what sort of thing it is.
 *
 * @example
 * ```ts
 * import { motifTerm } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(motifTerm("rabbit")?.kind); // "animal"
 * ```
 */
export interface MotifTerm extends Term {
  kind: "plant" | "animal" | "object" | "shape" | "sky";
}

const t = (id: string, en: string, ja: string, reading: string, romaji: string, aboutEn: string, aboutJa: string): Term => ({ id, en, ja, reading, romaji, about: { en: aboutEn, ja: aboutJa } });
const m = (kind: MotifTerm["kind"], term: Term): MotifTerm => ({ ...term, kind });

/**
 * The frames: what, if anything, surrounds a crest's motif. A ring is a 丸 (maru), and a crest in one is said
 * "maru ni ...", "... in a circle".
 *
 * @example
 * ```ts
 * import { FRAMES } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(FRAMES.map((frame) => frame.id)); // ["none", "ring-thin", …]
 * ```
 */
export const FRAMES: readonly Term[] = [
  t("none", "No frame", "枠なし", "わくなし", "waku nashi", "The motif stands on its own, with nothing round it.", "図柄だけで、まわりに枠がありません。"),
  t("ring-thin", "Thin ring", "細輪", "ほそわ", "hosowa", "A circle of line, about a thirtieth of the diameter thick, round the motif.", "図柄のまわりを、直径の30分の1ほどの細い線の円で囲んだものです。"),
  t("ring-medium", "Medium ring", "中太輪", "ちゅうぶとわ", "chūbutowa", "A circle about a tenth of the diameter thick round the motif.", "図柄のまわりを、直径の10分の1ほどの太さの円で囲んだものです。"),
  t("hexagon", "Hexagon", "亀甲", "きっこう", "kikkō", "A six-sided frame, from the pattern of a tortoise's shell.", "亀の甲羅の模様から生まれた、六角形の枠です。"),
  t("iori", "Hut frame", "庵", "いおり", "iori", "A straight triangular roof on two posts.", "まっすぐな三角形の屋根を二本の柱で支えた枠です。"),
  t("mokko", "Lobed frame", "木瓜", "もっこう", "mokkō", "A frame of rounded lobes, like the cut section of a quince flower's cup.", "丸い切れ込みを持つ枠で、木瓜（ぼけ）の実の断面に似た形です。"),
];

/**
 * The motifs: what the crest is a picture of. A motif is a plant, an animal, a made thing, a plain shape, or something
 * in the sky.
 *
 * @example
 * ```ts
 * import { MOTIFS } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(MOTIFS.filter((motif) => motif.kind === "plant").map((motif) => motif.ja).slice(0, 3)); // ["桐", "菊", "梅"]
 * ```
 */
export const MOTIFS: readonly MotifTerm[] = [
  m("plant", t("paulownia", "Paulownia", "桐", "きり", "kiri", "A tree with upright spikes of bell flowers and large leaves; the crest of governments and of Hideyoshi.", "釣鐘形の花を穂にしてつける木で、政府や豊臣秀吉の紋として知られます。")),
  m("plant", t("chrysanthemum", "Chrysanthemum", "菊", "きく", "kiku", "A flower of many narrow petals round a centre; the Imperial House's flower.", "細い花びらを中心から放射状に並べた花で、皇室の花です。")),
  m("plant", t("quince-lobes", "Quince lobes", "木瓜の裂片", "もっこうのれっぺん", "mokkō no reppen", "Rounded lobes around the flower of a quince crest.", "木瓜紋の花を囲む丸い裂片です。")),
  m("plant", t("plum", "Plum blossom", "梅", "うめ", "ume", "A flower of five round petals; the plum is the flower of Sugawara no Michizane.", "丸い花びらが五枚の花で、菅原道真ゆかりの花です。")),
  m("plant", t("cherry", "Cherry blossom", "桜", "さくら", "sakura", "A flower of five petals, each notched at its tip.", "先端に切れ込みのある花びらが五枚の花です。")),
  m("plant", t("wisteria", "Wisteria", "藤", "ふじ", "fuji", "A vine whose flowers hang in long clusters; the Fujiwara's flower.", "花が長い房になって垂れ下がる蔓性の木で、藤原氏の花です。")),
  m("plant", t("wood-sorrel", "Wood sorrel", "片喰", "かたばみ", "katabami", "A small plant with three heart-shaped leaflets; it spreads fast, so it stood for a house that would last.", "ハート形の小葉を三枚つける草で、繁殖力が強いことから、家が絶えない象徴とされました。")),
  m("plant", t("hollyhock", "Hollyhock", "葵", "あおい", "aoi", "A plant of broad heart-shaped leaves, sacred to the Kamo shrines; the Tokugawa's crest.", "幅の広い心形の葉をつける草で、賀茂神社の神草であり、徳川氏の紋です。")),
  m("plant", t("gentian", "Gentian", "竜胆", "りんどう", "rindō", "An autumn flower of bell-shaped blue petals, shown with its pointed petals; the Minamoto's flower.", "秋に咲く釣鐘形の花で、尖った花びらで表されます。源氏の花です。")),
  m("plant", t("bellflower", "Bellflower", "桔梗", "ききょう", "kikyō", "A star-shaped flower of five pointed petals; the Toki and Akechi's crest.", "五枚の尖った花びらを持つ星形の花で、土岐氏・明智氏の紋です。")),
  m("plant", t("sword-leaf", "Water plantain", "沢瀉", "おもだか", "omodaka", "A marsh plant with arrow-shaped leaves; warriors liked its name, which suggests \"face up\" in front of a foe.", "矢じり形の葉をつける水辺の草で、名が「面高」に通じることから武家に好まれました。")),
  m("plant", t("oak", "Oak", "柏", "かしわ", "kashiwa", "A tree whose long lobed leaves wrapped food offered to the gods.", "長く切れ込みのある葉の木で、その葉は神に供える食物を包むのに使われました。")),
  m("plant", t("bamboo-grass", "Bamboo grass", "笹", "ささ", "sasa", "Low bamboo with long narrow leaves, shown as a spray.", "細長い葉をつける丈の低い竹で、葉の房として描かれます。")),
  m("plant", t("tachibana", "Tachibana orange", "橘", "たちばな", "tachibana", "A wild citrus, its fruit and glossy leaves, an emblem of the Tachibana family and of lasting life.", "野生の柑橘で、その実と艶のある葉が、橘氏の紋、また長寿の象徴とされました。")),
  m("plant", t("ginkgo", "Ginkgo leaf", "銀杏", "いちょう", "ichō", "A fan-shaped leaf notched at its top.", "上端に切れ込みのある扇形の葉です。")),
  m("plant", t("maple", "Maple leaf", "紅葉", "もみじ", "momiji", "A leaf of seven pointed lobes with smooth edges.", "先のとがった七つの裂片に分かれた、縁のなめらかな葉です。")),
  m("plant", t("ivy", "Ivy leaf", "蔦", "つた", "tsuta", "A vine that climbs trees and walls; its leaf of five scalloped lobes is drawn with the largest lobe pointing down.", "木や壁をつたって伸びる、つるの植物です。葉は波打つ縁の五つの裂片に分かれ、いちばん大きい裂片を下に向けて描きます。")),
  m("plant", t("ginger", "Myoga ginger", "茗荷", "みょうが", "myōga", "The bud of the myoga ginger, wrapped in scales; its name sounds like the word for the unseen protection of the gods and buddhas.", "うろこのような皮に包まれた、茗荷の花のつぼみです。名前の音が、神や仏の見えない守りを意味する「冥加」と同じです。")),
  m("plant", t("pine", "Pine", "松", "まつ", "matsu", "An evergreen that stands for long life, drawn as a cloud-shaped crown of needles on a short trunk.", "一年中緑の木で、長寿を表します。雲の形に茂る松葉を、短い幹の上に描きます。")),
  m("plant", t("clove", "Clove", "丁子", "ちょうじ", "chōji", "The dried flower bud of the clove tree, a spice once brought from far away and counted among the treasures.", "丁子の木の花のつぼみを干した香料です。遠い国から届く貴重な品で、宝物の一つに数えられました。")),
  m("plant", t("paper-mulberry", "Paper-mulberry leaf", "梶の葉", "かじのは", "kaji no ha", "The broad lobed leaf of the paper mulberry, once used as a dish for offerings to the gods; the crest of the Suwa shrine.", "梶の木の、切れ込みのある広い葉です。昔、神へのお供えをのせる器に使いました。諏訪大社の紋です。")),
  m("plant", t("tortoise-shell", "Tortoise shell", "亀甲", "きっこう", "kikkō", "The six-sided pattern of a tortoise's shell, a wish for long life.", "亀の甲羅の六角形の模様で、長寿を願う意味があります。")),
  m("animal", t("butterfly", "Swallowtail butterfly", "蝶", "ちょう", "chō", "A butterfly with tailed hindwings; the Taira's crest.", "後翅に尾のある蝶で、平氏の紋です。")),
  m("animal", t("dragonfly", "Dragonfly", "蜻蛉", "とんぼ", "tonbo", "An insect that flies only forward, so a warrior's emblem of never retreating.", "前にしか進まない虫で、退かない武士の象徴とされました。")),
  m("animal", t("rabbit", "Rabbit", "兎", "うさぎ", "usagi", "The rabbit that, in Japan, is seen pounding rice cakes on the moon.", "日本では、月で餅をつく姿に見立てられる動物です。")),
  m("animal", t("goose", "Wild goose", "雁金", "かりがね", "karigane", "The wild goose in flight, its wings spread and its head in profile; a bird of good news.", "翼を広げて飛ぶ雁で、頭は横向きです。よい知らせを運ぶ鳥とされます。")),
  m("animal", t("sparrow", "Sparrow", "雀", "すずめ", "suzume", "A small bird that lives near people; puffed up against the cold with its wings spread, it is a wish for plenty.", "人のそばでくらす小さな鳥です。寒さにふくらんで翼を広げた姿は「福良雀」と書き、豊かさを願う意味があります。")),
  m("animal", t("plover", "Plover", "千鳥", "ちどり", "chidori", "A small round shore bird, shown plump and in flight; it is drawn with waves, and its name sounds like a thousand catches.", "ふっくらと丸く、飛ぶ姿に描く、浜辺の小さな鳥です。波と組み合わせることが多く、名前は「千取り」に通じます。")),
  m("animal", t("crane", "Crane", "鶴", "つる", "tsuru", "The red-crowned crane, said to live a thousand years; a sign of long life and good fortune, most often shown with its wings raised into a circle.", "千年生きるといわれる丹頂鶴です。長生きとめでたさのしるしで、翼を上げて丸い形にした姿でよく描きます。")),
  m("object", t("tomoe", "Tomoe", "巴", "ともえ", "tomoe", "A comma-shaped swirl, a round head and a tail; there are many, and they turn left or right.", "丸い頭と尾を持つ勾玉形の渦で、数や向き（左・右）で呼び分けられます。")),
  m("object", t("hawk-feather", "Hawk feather", "鷹の羽", "たかのは", "taka no ha", "A feather of the hawk, the warrior's bird; shown with its quill and barbs.", "武士の鳥である鷹の羽を、羽軸と羽枝とともに描いたものです。")),
  m("object", t("arrow", "Arrow", "矢", "や", "ya", "An arrow for the bow, most often only its feathered end; a warrior's mark.", "弓で射る矢です。羽のついた端だけを描くことが多く、武家の紋です。")),
  m("object", t("arrow-nock", "Arrow nock", "矢筈", "やはず", "yahazu", "The notched end of an arrow, where it sits on the bowstring.", "矢の端の、弓の弦にかける切れ込みのある部分です。")),
  m("object", t("round-fan", "Round fan", "団扇", "うちわ", "uchiwa", "A fan of one round piece of paper on a handle, with ribs showing; a wish to fan away what is bad.", "一枚の丸い紙に柄をつけた団扇です。骨を見せて描き、悪いものを払う願いがこめられます。")),
  m("object", t("fan", "Folding fan", "扇", "おうぎ", "ōgi", "A fan opened to show its ribs, a wish for a future that opens out.", "骨を見せて開いた扇で、末広がりの繁栄を願う意味があります。")),
  m("object", t("wheel", "Cart wheel", "車", "くるま", "kuruma", "The wheel of the courtiers' ox-cart.", "公家の牛車の車輪です。")),
  m("object", t("ship", "Ship", "船", "ふね", "fune", "A sailing vessel, for houses of the sea and of trade.", "帆掛け船で、海や交易にかかわる家の紋に使われます。")),
  m("object", t("coin", "Coin", "銭", "せん", "sen", "A round coin with a square hole.", "中央に四角い穴のある丸い銭です。")),
  m("object", t("well-frame", "Well frame", "井桁", "いげた", "igeta", "The wooden frame round a well, laid like the character 井.", "井戸の周りの木枠で、「井」の字の形に組まれます。")),
  m("object", t("weight", "Scale weight", "分銅", "ふんどう", "fundō", "The weight of a balance, a disc with a round bite out of each side.", "秤（はかり）の重りで、円盤の左右に丸い欠けをつけた形です。")),
  m("object", t("sandbar", "Sandbar tray", "州浜", "すはま", "suhama", "A tray shaped like a sandbar, one round lobe above two, with a narrow slit between the lower two.", "砂州（すなす）の形をした盆で、上に丸いふくらみを一つ、下に二つ並べ、下の二つの間にせまいすき間を残した形です。")),
  m("object", t("gion-amulet", "Gion amulet", "祇園守", "ぎおんまもり", "gion mamori", "The amulet of the Gion shrine in Kyoto (Yasaka Shrine): two scrolls crossed and tied, on a ring, most often with a ginkgo leaf below.", "京都の祇園社（八坂神社）のお守りです。二本の巻物を交差させて結び、輪に重ねます。下に銀杏の葉を添えることが多いです。")),
  m("object", t("torii", "Torii gate", "鳥居", "とりい", "torii", "The gate at the entrance of a shrine, two posts under a curved lintel; the mark between the world of people and the home of the gods.", "神社の入口に立つ門です。二本の柱の上に、反りのある横木をのせます。人の世界と神様の世界の境を表します。")),
  m("object", t("nail-puller", "Nail-puller", "釘抜", "くぎぬき", "kuginuki", "A carpenter's tool for drawing nails, shown as a square on its corner with a square hole.", "釘を抜く大工道具で、角で立てた正方形に四角い穴をあけた形で表されます。")),
  m("object", t("knot", "Knot", "結び", "むすび", "musubi", "A cord tied into a decorative knot, with loops and a weave of crossings where it passes over and under itself.", "ひもを飾りのために結んだ形です。輪と、上と下を交互に通る交わりでできています。")),
  m("object", t("bar", "Bar", "一文字", "いちもんじ", "ichimonji", "A single horizontal line, the character 一.", "横に一本引いた線で、「一」の字の形です。")),
  m("object", t("line", "Pulled lines", "引両", "ひきりょう", "hikiryō", "Bars drawn straight across a ring.", "輪の中を横に貫く太い線です。")),
  m("object", t("linked-rings", "Linked rings", "輪違い", "わちがい", "wachigai", "Rings that pass through one another.", "互いに通り抜けて組み合わさった輪です。")),
  m("object", t("seven-treasures", "Seven treasures", "七宝", "しっぽう", "shippō", "Circles overlapping in petals, from the pattern of enamelled ware.", "円が花弁形に重なり合う模様で、七宝焼に由来します。")),
  m("shape", t("snake-eye", "Snake's eye", "蛇の目", "じゃのめ", "janome", "A thick ring with a round hole, like the eye of a snake or a target.", "太い輪に丸い穴のあいた形で、蛇の目や的に似ています。")),
  m("shape", t("plain-ring", "Plain ring", "輪", "わ", "wa", "A plain circle of line with nothing inside it: thread, thin or medium by how thick the line is.", "中に何も入れない、線だけの円です。線の太さで、糸輪、細輪、中輪に分かれます。")),
  m("shape", t("black-disc", "Black disc", "石持ち", "こくもち", "kokumochi", "A plain disc filled in black, the ground that other crests are cut out of in white.", "黒く塗りつぶしただけの円です。ほかの紋を白く抜くときの、地になる形でもあります。")),
  m("shape", t("cut-corner-square", "Cut-corner square", "隅切り角", "すみきりかく", "sumikiri kaku", "A square frame whose four corners are cut off at half a right angle, so that it has eight sides.", "四つの角を45度に切り落とした四角い枠で、辺が八つあります。")),
  m("shape", t("manji", "Manji", "卍", "まんじ", "manji", "A Buddhist sign of four arms bent at their ends, used as a Japanese family crest for centuries.", "先を折り曲げた四本の腕をもつ仏教のしるしで、古くから日本の家紋に使われてきました。")),
  m("shape", t("cross", "Cross", "十字", "じゅうじ", "jūji", "Two bars crossing at right angles.", "二本の線が直角に交わった形です。")),
  m("shape", t("star", "Star", "星", "ほし", "hoshi", "A plain disc, said to be a star.", "星に見立てた、ただの円です。")),
  m("shape", t("diamond", "Diamond", "菱", "ひし", "hishi", "A square standing on its corner, from the leaf of the water-chestnut.", "正方形を角で立てた形で、菱の葉に由来します。")),
  m("shape", t("scale", "Scale", "鱗", "うろこ", "uroko", "A triangle, from the scale of a fish or a dragon.", "魚や龍の鱗に見立てた三角形です。")),
  m("shape", t("hexagram", "Hexagram", "籠目", "かごめ", "kagome", "The six-pointed star made of two triangles, from the eye of a basket's weave.", "二つの三角形を重ねた六芒星で、籠の編み目に由来します。")),
  m("shape", t("flower-lozenge", "Flower lozenge", "花菱", "はなびし", "hanabishi", "A flower of four petals drawn to fill a lozenge, each petal with three round lobes; it began as a woven pattern of the court, and it is the Takeda's other crest.", "菱形におさまるように描いた、花びら四枚の花です。花びらの先は三つの丸い山に分かれます。もとは公家の織物の模様で、武田氏のもう一つの紋でもあります。")),
  m("shape", t("hemp-leaf", "Hemp leaf", "麻の葉", "あさのは", "asa no ha", "A six-pointed star divided by lines, from the pattern of hemp leaves; it stood for strong, quick growth.", "線で分けた六芒星の模様で、麻の葉に由来し、丈夫でよく育つことを願うものです。")),
  m("shape", t("four-eyes", "Four eyes", "四つ目", "よつめ", "yotsume", "Four square frames side by side.", "四角い枠を四つ並べた形です。")),
  m("sky", t("crescent", "Crescent moon", "三日月", "みかづき", "mikazuki", "A thin new moon.", "細い新月です。")),
  m("sky", t("snow-ring", "Snow ring", "雪輪", "ゆきわ", "yukiwa", "A ring of round bumps like snow lying on a branch, each big bump with a little curl; snow was a sign of a good harvest.", "枝に積もった雪のような、丸い山が並ぶ輪です。大きい山にはそれぞれ、くるりと巻いた小さな耳があり、雪は豊作のしるしだと考えられていました。")),
  m("sky", t("sun-disc", "Sun disc", "日の丸", "ひのまる", "hinomaru", "A plain round disc standing for the sun.", "太陽を表す丸い円です。")),
];

/**
 * How a motif is set out: alone, turned about the centre, crossed, hanging and so on.
 *
 * @example
 * ```ts
 * import { ARRANGEMENTS } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(ARRANGEMENTS.map((one) => one.ja).slice(0, 3)); // ["単独", "巡り", "品の字"]
 * ```
 */
export const ARRANGEMENTS: readonly Term[] = [
  t("single", "Single", "単独", "たんどく", "tandoku", "One of it, on the centre line.", "中心線上に一つだけ置いたものです。"),
  t("radial", "Turned about the centre", "巡り", "めぐり", "meguri", "Copies set equally round the centre, each turned from the last.", "中心のまわりに、同じものを等間隔で、少しずつ回して置いたものです。"),
  t("triangle", "In a triangle", "品の字", "しなのじ", "shina no ji", "Three set like the character 品: one above two.", "「品」の字のように、上に一つ、下に二つ置いたものです。"),
  t("rows", "In rows", "並び", "ならび", "narabi", "Set side by side in lines.", "列にして並べたものです。"),
  t("quartered", "Quartered", "割り", "わり", "wari", "A shape divided into four equal parts.", "一つの形を四つに等分したものです。"),
  t("crossed", "Crossed", "違い", "ちがい", "chigai", "Two set across each other like an X.", "二つを、Xの字のように交差させたものです。"),
  t("upright", "Upright", "立ち", "たち", "tachi", "Standing straight up from a base.", "根元からまっすぐに立てたものです。"),
  t("hanging", "Hanging", "下がり", "さがり", "sagari", "Hanging downward from a point.", "一点から下へ垂らしたものです。"),
  t("ring", "In a ring", "輪", "わ", "wa", "Set round a circle.", "円のまわりに並べたものです。"),
  t("stacked", "Stacked", "重ね", "かさね", "kasane", "One set on another, each partly over the one beneath.", "形を一つずつ、下のものに少し重ねて積んだものです。"),
  t("facing", "Facing", "向かい", "むかい", "mukai", "Two set face to face, each the mirror image of the other.", "二つを、左右対称に向かい合わせたものです。"),
];

/**
 * Which way a motif turns, where that is part of the design (the tomoe).
 *
 * @example
 * ```ts
 * import { TURNS } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(TURNS.map((one) => `${one.ja} ${one.reading}`)); // ["左 ひだり", "右 みぎ"]
 * ```
 */
export const TURNS: readonly Term[] = [
  t("left", "Left", "左", "ひだり", "hidari", "Named for the way the tails flow: counter-clockwise, behind heads that lead clockwise.", "尾が流れる向きで呼びます。頭が時計回りに進み、尾がそのあとを反時計回りに流れます。"),
  t("right", "Right", "右", "みぎ", "migi", "Named for the way the tails flow: clockwise, behind heads that lead counter-clockwise.", "尾が流れる向きで呼びます。頭が反時計回りに進み、尾がそのあとを時計回りに流れます。"),
];

const NUMBERS: readonly [string, string, string][] = [
  ["zero", "零", "れい"], ["one", "一", "いち"], ["two", "二", "に"], ["three", "三", "さん"], ["four", "四", "し"], ["five", "五", "ご"], ["six", "六", "ろく"], ["seven", "七", "しち"],
  ["eight", "八", "はち"], ["nine", "九", "きゅう"], ["ten", "十", "じゅう"], ["eleven", "十一", "じゅういち"], ["twelve", "十二", "じゅうに"], ["thirteen", "十三", "じゅうさん"],
  ["fourteen", "十四", "じゅうし"], ["fifteen", "十五", "じゅうご"], ["sixteen", "十六", "じゅうろく"],
];

/**
 * A count's name in a language.
 *
 * @param count - A whole number from 1 to 16.
 * @param lang - `en` or `ja`.
 * @returns "three" or "三"; `null` for a count outside 1 to 16.
 *
 * @example
 * ```ts
 * import { countName } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(countName(3, "en")); // "three"
 * console.log(countName(16, "ja")); // "十六"
 * ```
 */
export const countName = (count: number, lang: "en" | "ja"): string | null => {
  const row = Number.isInteger(count) && count >= 1 ? NUMBERS[count] : undefined;

  return row === undefined ? null : lang === "en" ? row[0] : row[1];
};

/**
 * The reading of a count in hiragana.
 *
 * @param count - A whole number from 1 to 16.
 * @returns "さん" for 3; `null` for a count outside 1 to 16.
 *
 * @example
 * ```ts
 * import { countReading } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(countReading(3)); // "さん"
 * console.log(countReading(0)); // null
 * ```
 */
export const countReading = (count: number): string | null => {
  const row = Number.isInteger(count) && count >= 1 ? NUMBERS[count] : undefined;

  return row === undefined ? null : row[2];
};

const find = (list: readonly Term[], id: string): Term | undefined => list.find((term) => term.id === id);

/**
 * A frame, a motif, an arrangement or a turn by its id.
 *
 * @param id - A term's id: "ring-thin", "paulownia", "crossed", "left".
 * @returns The term with its names, reading and the line saying what it is; `null` when no vocabulary has that id.
 *
 * @example
 * ```ts
 * import { term } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(term("tomoe")?.ja); // "巴"
 * console.log(term("nope"));      // null
 * ```
 */
export const term = (id: string): Term | null => find(MOTIFS, id) ?? find(FRAMES, id) ?? find(ARRANGEMENTS, id) ?? find(TURNS, id) ?? null;

/**
 * A motif by its id.
 *
 * @param id - A motif's id: "paulownia", "tomoe".
 * @returns The motif with its kind, or `null` when there is no such motif (a frame's id is not one).
 *
 * @example
 * ```ts
 * import { motifTerm } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(motifTerm("paulownia")?.ja); // "桐"
 * console.log(motifTerm("ring-thin"));     // null
 * ```
 */
export const motifTerm = (id: string): MotifTerm | null => MOTIFS.find((one) => one.id === id) ?? null;

/**
 * The ids of every frame.
 *
 * @example
 * ```ts
 * import { FRAME_IDS } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(FRAME_IDS[0]); // "none"
 * ```
 */
export const FRAME_IDS: readonly string[] = FRAMES.map((one) => one.id);

/**
 * The ids of every motif.
 *
 * @example
 * ```ts
 * import { MOTIF_IDS } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(MOTIF_IDS.includes("paulownia")); // true
 * ```
 */
export const MOTIF_IDS: readonly string[] = MOTIFS.map((one) => one.id);

/**
 * The ids of every arrangement.
 *
 * @example
 * ```ts
 * import { ARRANGEMENT_IDS } from "@johnmorrisdotca/kamon-crests/parts";
 *
 * console.log(ARRANGEMENT_IDS.includes("crossed")); // true
 * ```
 */
export const ARRANGEMENT_IDS: readonly string[] = ARRANGEMENTS.map((one) => one.id);
