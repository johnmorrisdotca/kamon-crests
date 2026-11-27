// Where each crest stands in the books' order: its chapter, its family (the motif it is a version of), the plain form of that family
// (its base), what sort of variant it is and its place among those of its sort. Written here as the editorial part: the chapters, the
// families with their base crests, and the few crests whose place the parts cannot say. Everything else is derived from the parts
// (frame, motifs, counts, arrangement, turn) by `placeAll()`, which `pnpm data` runs, so a new crest of a known motif needs nothing here.
//
// The order is the one 日本家紋大図鑑 keeps: chapter, then families by the reading of their name (gojūon),
// then in a family the base, the forms, the tones, the counts, the frames, the arrangements, the combinations with other motifs and the
// named houses' variants.
import type { VariantKind } from "../../src/manifest.types.ts";
import type { CrestDef } from "./types.ts";

/** The seven chapters of the crest books, in their order (the coverage list's chapters). */
export const CHAPTERS = [
  { id: "plants", ja: "植物紋", en: "Plants" },
  { id: "animals", ja: "動物紋", en: "Animals" },
  { id: "nature", ja: "自然紋・天文紋", en: "Nature and sky" },
  { id: "objects", ja: "器物紋", en: "Objects and tools" },
  { id: "buildings", ja: "建造物紋", en: "Buildings" },
  { id: "patterns", ja: "文様紋・図形紋", en: "Patterns and shapes" },
  { id: "characters", ja: "文字紋", en: "Characters and writing" },
] as const;

/** What sort of variant of its family's plain form a crest is, in the order the books give them. */
export const VARIANT_KINDS: readonly VariantKind[] = ["base", "form", "tone", "count", "frame", "arrangement", "combination", "house"];

export interface FamilyDef {
  /** The family's id: the romaji of its reading. */
  id: string;
  /** The chapter's id. */
  chapter: (typeof CHAPTERS)[number]["id"];
  /** Its name as the coverage list writes it (docs/coverage/kamon.json), so that browsing and coverage agree: a test holds them to it. */
  ja: string;
  reading: string;
  en: string;
  /** The crest that is the family's plain form: the first of it, and what the others are variants of. */
  base: string;
}

const family = (id: string, chapter: FamilyDef["chapter"], ja: string, reading: string, en: string, base: string): FamilyDef => ({ id, chapter, ja, reading, en, base });

export const FAMILIES: readonly FamilyDef[] = [
  family("kai", "animals", "貝", "かい", "Shell", "mitsu-hamaguri"),
  family("awa", "plants", "粟", "あわ", "Millet", "awa-no-maru"),
  family("makuwa", "plants", "真桑", "まくわ", "Makuwa melon", "mitsu-tsuru-makuwa"),
  family("nanten", "plants", "南天", "なんてん", "Nandina", "mitsu-nanten"),
  family("mokko", "plants", "木瓜", "もっこう", "Quince blossom (mokko)", "mokko"),
  family("kashiwa", "plants", "柏", "かしわ", "Oak leaf (kashiwa)", "mitsu-gashiwa"),
  family("kiri", "plants", "桐", "きり", "Paulownia", "gosan-no-kiri"),
  family("kikyo", "plants", "桔梗", "ききょう", "Balloon flower", "kikyo"),
  family("sakura", "plants", "桜", "さくら", "Cherry blossom", "yamazakura"),
  family("ume", "plants", "梅", "うめ", "Plum", "ume-bachi"),
  family("kaede", "plants", "楓", "かえで", "Maple", "momiji"),
  family("tachibana", "plants", "橘", "たちばな", "Tachibana citrus", "tachibana"),
  family("cha-no-mi", "plants", "茶の実", "ちゃのみ", "Tea fruit", "muko-cha-no-mi"),
  family("kohone", "plants", "河骨", "こうほね", "Spatterdock (kōhone)", "mitsu-kohone"),
  family("tsuta", "plants", "蔦", "つた", "Ivy", "tsuta"),
  family("kuchinashi", "plants", "梔子", "くちなし", "Gardenia", "mitsuwari-kuchinashi"),
  family("kurumi", "plants", "胡桃", "くるみ", "Walnut", "mitsu-kurumi"),
  family("warabi", "plants", "蕨", "わらび", "Bracken", "mitsu-tachi-warabi"),
  family("sugi", "plants", "杉", "すぎ", "Cedar", "maru-ni-ippon-sugi"),
  family("sumire", "plants", "菫", "すみれ", "Violet", "daki-sumire"),
  family("hasu", "plants", "蓮", "はす", "Lotus", "itsutsu-renge"),
  family("nashi", "plants", "梨", "なし", "Pear", "nashi-no-kiriguchi"),
  family("hyotan", "plants", "瓢箪", "ひょうたん", "Gourd", "itsutsu-hyotan"),
  family("tessen", "plants", "鉄線", "てっせん", "Clematis", "yae-tessen"),
  family("nadeshiko", "plants", "撫子", "なでしこ", "Pink (dianthus)", "nadeshiko"),
  family("sekichiku", "plants", "石竹", "せきちく", "China pink", "sekichiku"),
  family("myoga", "plants", "茗荷", "みょうが", "Myoga ginger", "daki-myoga"),
  family("omodaka", "plants", "沢瀉", "おもだか", "Arrowhead (omodaka)", "omodaka"),
  family("hiiragi", "plants", "柊", "ひいらぎ", "Holly osmanthus", "maru-ni-narabi-hiiragi"),
  family("sasa", "plants", "笹", "ささ", "Bamboo grass", "kumai-zasa"),
  family("matsu", "plants", "松", "まつ", "Pine", "hitotsu-matsu"),
  family("choji", "plants", "丁子", "ちょうじ", "Clove", "hitotsu-choji"),
  family("kaji", "plants", "梶", "かじ", "Paper mulberry (kaji)", "kaji-no-ha"),
  family("katabami", "plants", "片喰", "かたばみ", "Wood sorrel", "katabami"),
  family("karahana", "plants", "唐花", "からはな", "Karahana (arabesque flower)", "karahana"),
  family("rindo", "plants", "竜胆", "りんどう", "Gentian", "sasa-rindo"),
  family("kiku", "plants", "菊", "きく", "Chrysanthemum", "juroku-yae-giku"),
  family("botan", "plants", "牡丹", "ぼたん", "Peony", "ichiyo-botan"),
  family("aoi", "plants", "葵", "あおい", "Aoi (hollyhock leaf)", "mitsuba-aoi"),
  family("fuji", "plants", "藤", "ふじ", "Wisteria", "sagari-fuji"),
  family("icho", "plants", "銀杏", "いちょう", "Ginkgo", "mitsu-icho"),
  family("asa", "plants", "麻", "あさ", "Hemp", "asa-no-ha"),
  family("usagi", "animals", "兎", "うさぎ", "Rabbit", "usagi"),
  family("tsuno", "animals", "角", "つの", "Horn", "hoso-daki-tsuno"),
  family("kame", "animals", "亀", "かめ", "Turtle", "komonji-kame"),
  family("suzume", "animals", "雀", "すずめ", "Sparrow", "fukura-suzume"),
  family("chidori", "animals", "千鳥", "ちどり", "Plover", "chidori"),
  family("tsuru", "animals", "鶴", "つる", "Crane", "tsuru-no-maru"),
  family("tonbo", "animals", "蜻蛉", "とんぼ", "Dragonfly", "tonbo"),
  family("cho", "animals", "蝶", "ちょう", "Butterfly", "agehacho"),
  family("karigane", "animals", "雁金", "かりがね", "Wild goose", "karigane"),
  family("takanoha", "animals", "鷹の羽", "たかのは", "Hawk feather", "chigai-takanoha"),
  family("shichiyo", "nature", "七曜", "しちよう", "Seven luminaries", "shichiyo"),
  family("kuyo", "nature", "九曜", "くよう", "Nine luminaries", "kuyo"),
  family("hoshi", "nature", "星", "ほし", "Star", "mitsu-boshi"),
  family("tsuki", "nature", "月", "つき", "Moon", "mikazuki"),
  family("yukiwa", "nature", "雪輪", "ゆきわ", "Snow ring", "yukiwa"),
  family("uchiwa", "objects", "団扇", "うちわ", "Round fan", "uchiwa"),
  family("ogi", "objects", "扇", "おうぎ", "Folding fan", "ogi"),
  family("ya", "objects", "矢", "や", "Arrow", "chigai-ya"),
  family("fune", "objects", "船", "ふね", "Boat", "hokake-bune"),
  family("kuruma", "objects", "車", "くるま", "Wheel", "genji-guruma"),
  family("kuginuki", "objects", "釘抜", "くぎぬき", "Nail puller", "kuginuki"),
  family("zeni", "objects", "銭", "ぜに", "Coin", "roku-mon-sen"),
  family("hoju", "objects", "宝珠", "ほうじゅ", "Sacred jewel", "itsutsu-tama"),
  family("fundo", "objects", "分銅", "ふんどう", "Scale weight", "fundo"),
  family("noshi", "objects", "熨斗", "のし", "Noshi (ceremonial strip)", "mitsu-tabane-noshi"),
  family("tsuchi", "objects", "槌", "つち", "Mallet", "itowa-ni-tsuchi"),
  family("heishi", "objects", "瓶子", "へいし", "Sake flask", "futatsu-heishi"),
  family("kase", "objects", "桛", "かせ", "Thread reel", "kase"),
  family("koma", "objects", "独楽", "こま", "Spinning top", "itsutsu-goma"),
  family("mamezo", "objects", "豆蔵", "まめぞう", "Balancing doll (mamezō)", "mitsu-mamezo"),
  family("gotoku", "objects", "五徳", "ごとく", "Brazier trivet", "gotoku"),
  family("rinpo", "objects", "輪宝", "りんぽう", "Dharma wheel (rinpo)", "rinpo-kuzushi"),
  family("ryugo", "objects", "輪鼓", "りゅうご", "String-spun spool (ryūgo)", "ryugo"),
  family("kamashiki", "objects", "釜敷", "かましき", "Pot stand", "tatami-kamashiki"),
  family("musubi-bumi", "objects", "結び文", "むすびぶみ", "Folded letter", "tamazusa"),
  family("yumi", "objects", "弓", "ゆみ", "Bow", "itsutsu-yumi"),
  family("fukuro", "objects", "袋", "ふくろ", "Bag", "fukuro"),
  family("chochin", "objects", "提灯", "ちょうちん", "Paper lantern", "chochin"),
  family("chigiri", "objects", "榺", "ちぎり", "Weaving beam", "mitsu-chigiri"),
  family("kutsuwa", "objects", "轡", "くつわ", "Horse bit", "futo-kutsuwa"),
  family("shogi-koma", "objects", "将棋駒", "しょうぎごま", "Shogi piece", "shogi-koma"),
  family("jigami", "objects", "地紙", "じがみ", "Fan paper", "sangai-jigami"),
  family("maribasami", "objects", "鞠挟", "まりばさみ", "Ball clamp", "maribasami-ni-mari"),
  family("kai-paddle", "objects", "櫂", "かい", "Oar", "itowa-ni-chigai-kai"),
  family("hane", "objects", "羽根", "はね", "Shuttlecock", "mitsuwari-hane"),
  family("itomaki", "objects", "糸巻", "いとまき", "Thread spool", "mitsu-ireko-itomaki"),
  family("ho", "objects", "帆", "ほ", "Sail", "maru-ni-ho"),
  family("masu", "objects", "枡", "ます", "Measuring box", "kage-no-masu"),
  family("kama", "objects", "鎌", "かま", "Sickle", "futatsu-kama"),
  family("shamigoma", "objects", "三味駒", "しゃみごま", "Shamisen bridge", "mitsu-shamigoma"),
  family("tsuzumi", "objects", "鼓", "つづみ", "Hand drum", "himotsuki-tsuzumi"),
  family("kotoji", "objects", "琴柱", "ことじ", "Koto bridge", "oshi-kotoji"),
  family("zukin", "objects", "頭巾", "ずきん", "Hood", "mitsu-jin-zukin"),
  family("kane", "objects", "鐘", "かね", "Bell (temple)", "hansho"),
  family("suhama", "objects", "州浜", "すはま", "Sandbar tray", "suhama"),
  family("takara-musubi", "objects", "宝結び", "たからむすび", "Treasure knot", "takara-musubi"),
  family("masakari", "objects", "鉞", "まさかり", "Battle axe", "chigai-masakari"),
  family("kuwagata", "objects", "鍬形", "くわがた", "Helmet horns", "mitsu-chigai-kuwagata"),
  family("yama", "nature", "山", "やま", "Mountain", "mitsu-yama"),
  family("yamagata", "nature", "山形", "やまがた", "Mountain form", "maru-ni-yamamichi"),
  family("inazuma", "nature", "稲妻", "いなずま", "Lightning", "mitsu-inazuma"),
  family("nami", "nature", "波", "なみ", "Wave", "maru-ni-daki-nami"),
  family("kumo", "nature", "雲", "くも", "Cloud", "ama-gumo"),
  family("gion-mamori", "objects", "祇園守", "ぎおんまもり", "Gion amulet", "gion-mamori"),
  family("gaku", "objects", "額", "がく", "Framed plaque", "sonobe-gaku"),
  family("yuiwata", "objects", "結綿", "ゆいわた", "Knotted cotton", "yuiwata"),
  family("torii", "buildings", "鳥居", "とりい", "Torii gate", "torii"),
  family("iori", "buildings", "庵", "いおり", "Hermitage", "iori"),
  family("igeta", "buildings", "井桁", "いげた", "Well frame (square lattice)", "igeta"),
  family("izutsu", "buildings", "井筒", "いづつ", "Well curb (diamond frame)", "izutsu"),
  family("ichimonji", "patterns", "一文字", "いちもんじ", "Single bar", "ichimonji"),
  family("shippo", "patterns", "七宝", "しっぽう", "Seven treasures", "shippo"),
  family("kikko", "patterns", "亀甲", "きっこう", "Tortoise shell", "kikko"),
  family("juji", "patterns", "十字", "じゅうじ", "Cross", "jumonji"),
  family("manji", "patterns", "卍", "まんじ", "Manji", "hidari-manji"),
  family("tomoe", "patterns", "巴", "ともえ", "Tomoe", "hidari-hitotsu-tomoe"),
  family("kan", "patterns", "環", "かん", "Curled band", "mitsu-kan"),
  family("hikiryo", "patterns", "引両", "ひきりょう", "Bar", "futatsu-hikiryo"),
  family("meyui", "patterns", "目結", "めゆい", "Knot-eye", "yotsume-yui"),
  family("kagome", "patterns", "籠目", "かごめ", "Basket eye", "kagome"),
  family("hishi", "patterns", "菱", "ひし", "Lozenge", "hitotsu-bishi"),
  family("hanabishi", "patterns", "花菱", "はなびし", "Flower lozenge", "hanabishi"),
  family("janome", "patterns", "蛇の目", "じゃのめ", "Snake's eye", "janome"),
  family("ishidatami", "patterns", "石畳", "いしだたみ", "Paving stones", "ishidatami-guruma"),
  family("kaku", "patterns", "角", "かく", "Square", "sumikiri-kaku"),
  family("wa", "patterns", "輪", "わ", "Ring", "itowa"),
  family("kanawa", "objects", "金輪", "かなわ", "Metal ring", "mitsu-narabi-kanawa"),
  family("wachigai", "patterns", "輪違い", "わちがい", "Linked rings", "wachigai"),
  family("uroko", "patterns", "鱗", "うろこ", "Scale", "mitsu-uroko"),
  family("yama-no-ji", "characters", "山", "やま", "Character \"mountain\"", "hosowa-ni-yama-no-ji"),
  family("hon-no-ji", "characters", "本", "ほん", "Character \"origin\"", "maru-ni-hon-no-ji"),
  family("go-no-ji", "characters", "五の字", "ごのじ", "Character \"five\"", "go-no-ji-ringo"),
  family("san-no-ji", "characters", "三の字", "さんのじ", "Character \"three\"", "sumikiri-kaku-ni-san-no-ji"),
];

/** A crest's family when it is not the family of its first motif's: stars are the 星, the 七曜 and the 九曜 by their count and set. */
const FAMILY_OF: Record<string, string> = {
  "kikko-hanabishi": "kikko",
  "kiku-wa": "wa",
  "mitsu-narabi-kanawa": "kanawa",
  "chigai-kanawa": "kanawa",
  "itowa-ni-chigai-kanawa": "kanawa",
  "yotsume-i": "izutsu",
  "kara-izutsu": "izutsu",
  "wachigai-i": "izutsu",
  "chuwa-ni-musubi-i": "izutsu",
  "orikumi-i": "izutsu",
  "orikomi-izutsu": "izutsu",
  "mitsu-yama": "yama",
  "hana-yamagata": "yamagata",
  "chigai-mitsu-yamagata": "yamagata",
  "yotsu-yamagata": "yamagata",
  "yotsu-ireko-yamabishi": "yamagata",
  "itsutsu-yama": "yama",
  shichiyo: "shichiyo",
  "maru-ni-shichiyo": "shichiyo",
  kuyo: "kuyo",
  "oboro-kuyo": "kuyo",
  "wari-kuyo": "kuyo",
  "kage-kasane-kuyo": "kuyo",
  "maru-ni-kuyo": "kuyo",
  "kaku-kuyo": "kuyo",
  "sasa-rindo": "rindo",
  "oda-mokko": "mokko",
  "mokko-ni-ume-bachi": "mokko",
  "uri-ni-chigai-takanoha": "mokko",
  "hotta-mokko": "mokko",
  uri: "mokko",
  "kokumochi-uri": "mokko",
  izutsu: "izutsu",
  "maru-ni-izutsu": "izutsu",
  "hanagata-izutsu": "izutsu",
  "sumitate-izutsu": "izutsu",
  "sumitate-hoso-izutsu": "izutsu",
};

/** The family of a crest whose first motif is such a motif. */
const MOTIF_FAMILY: Record<string, string> = {
  "dharma-wheel": "rinpo",
  "cotton-bundle": "yuiwata",
  "san-no-ji": "san-no-ji",
  "quince-lobes": "mokko",
  paulownia: "kiri",
  chrysanthemum: "kiku",
  peony: "botan",
  shell: "kai",
  plum: "ume",
  cherry: "sakura",
  wisteria: "fuji",
  "wood-sorrel": "katabami",
  hollyhock: "aoi",
  gentian: "rindo",
  bellflower: "kikyo",
  karahana: "karahana",
  "sword-leaf": "omodaka",
  oak: "kashiwa",
  millet: "awa",
  "makuwa-melon": "makuwa",
  nanten: "nanten",
  tachibana: "tachibana",
  ginkgo: "icho",
  maple: "kaede",
  ivy: "tsuta",
  gardenia: "kuchinashi",
  bracken: "warabi",
  "pear-section": "nashi",
  "pear-blossom": "nashi",
  "bottle-gourd": "hyotan",
  clematis: "tessen",
  walnut: "kurumi",
  cedar: "sugi",
  violet: "sumire",
  lotus: "hasu",
  hood: "zukin",
  "fire-bell": "kane",
  dianthus: "nadeshiko",
  "china-pink": "sekichiku",
  "tea-fruit": "cha-no-mi",
  spatterdock: "kohone",
  "bamboo-grass": "sasa",
  pine: "matsu",
  clove: "choji",
  holly: "hiiragi",
  "paper-mulberry": "kaji",
  ginger: "myoga",
  "tortoise-shell": "kikko",
  butterfly: "cho",
  dragonfly: "tonbo",
  rabbit: "usagi",
  goose: "karigane",
  plover: "chidori",
  sparrow: "suzume",
  turtle: "kame",
  horn: "tsuno",
  crane: "tsuru",
  tomoe: "tomoe",
  "hawk-feather": "takanoha",
  arrow: "ya",
  "arrow-nock": "ya",
  "round-fan": "uchiwa",
  "kara-uchiwa": "uchiwa",
  fan: "ogi",
  wheel: "kuruma",
  ship: "fune",
  coin: "zeni",
  "sacred-jewel": "hoju",
  weight: "fundo",
  noshi: "noshi",
  mallet: "tsuchi",
  "sake-flask": "heishi",
  "skein-frame": "kase",
  "spinning-top": "koma",
  "brazier-trivet": "gotoku",
  "pot-stand": "kamashiki",
  "folded-letter": "musubi-bumi",
  bow: "yumi",
  bag: "fukuro",
  "mamezo-doll": "mamezo",
  "spool-toy": "ryugo",
  "paper-lantern": "chochin",
  "weaving-beam": "chigiri",
  "horse-bit": "kutsuwa",
  "shogi-piece": "shogi-koma",
  "promoted-shogi-pawn": "shogi-koma",
  "fan-paper": "jigami",
  "ball-holder": "maribasami",
  paddle: "kai-paddle",
  "shuttlecock": "hane",
  "thread-spool": "itomaki",
  sail: "ho",
  "measuring-box": "masu",
  sickle: "kama",
  "shamisen-bridge": "shamigoma",
  "hand-drum": "tsuzumi",
  "koto-bridge": "kotoji",
  "koto-plectrum": "kotoji",
  sandbar: "suhama",
  torii: "torii",
  hermitage: "iori",
  "framed-plaque": "gaku",
  "gion-amulet": "gion-mamori",
  "well-frame": "igeta",
  "nail-puller": "kuginuki",
  bar: "ichimonji",
  knot: "takara-musubi",
  axe: "masakari",
  "helmet-horn": "kuwagata",
  "mountain-path": "yamagata",
  lightning: "inazuma",
  wave: "nami",
  cloud: "kumo",
  "curled-band": "kan",
  line: "hikiryo",
  "linked-rings": "wachigai",
  "seven-treasures": "shippo",
  "snake-eye": "janome",
  "plain-ring": "wa",
  "black-disc": "wa",
  "cut-corner-square": "kaku",
  "paving-square": "ishidatami",
  "square-frame": "kaku",
  "knot-eye": "meyui",
  manji: "manji",
  cross: "juji",
  "yama-no-ji": "yama-no-ji",
  "hon-no-ji": "hon-no-ji",
  "go-no-ji": "go-no-ji",
  star: "hoshi",
  diamond: "hishi",
  "flower-lozenge": "hanabishi",
  scale: "uroko",
  hexagram: "kagome",
  "hemp-leaf": "asa",
  "hemp-foliage": "asa",
  "four-eyes": "meyui",
  crescent: "tsuki",
  "snow-ring": "yukiwa",
};

/**
 * A crest whose kind the parts cannot say. 丸に菊 is a simpler chrysanthemum than 十六八重表菊 (its motif has half the shapes), not that
 * one in a ring; the two 竪 crests set their bars upright, which the parts do not record; 丸に一つ引両 has one bar where its family
 * has two; 松皮菱 is a lozenge cut in steps, not a count of three; 加賀梅鉢 is the Maeda house's plum bowl. The rim of
 * 永楽銭 is part of the coin, whose inscription differs from 四文銭.
 */
const KIND_OF: Record<string, VariantKind> = {
  "maru-ni-daki-tsuno": "arrangement",
  "uri-ni-chigai-takanoha": "combination",
  "chigai-kanawa": "arrangement",
  "itowa-ni-chigai-kanawa": "arrangement",
  "maru-ni-sori-bishi": "arrangement",
  "itowa-ni-mitsu-sangai-bishi": "arrangement",
  "mamezo-kiri": "arrangement",
  "futokage-hanabishi": "tone",
  "maru-ni-mitsu-ishi": "arrangement",
  "maru-ni-sumitate-yotsume-ishi": "arrangement",
  "maru-ni-kumiawase-igeta": "arrangement",
  "wachigai-tomoe": "arrangement",
  "maru-ni-oni-hanabishi": "arrangement",
  "chuwa-ni-musubi-i": "arrangement",
  "chu-kage-hanabishi-kuzushi": "tone",
  "maru-ni-kumai-zasa-kuzushi": "arrangement",
  "chuwa-ni-itsutsu-boshi": "arrangement",
  "chuwa-ni-mitsu-boshi-ni-ichi-no-ji": "arrangement",
  "itowa-ni-itsutsu-ura-aoi": "arrangement",
  "maru-ni-ippon-ya": "arrangement",
  "itowa-ni-mitsu-ya": "arrangement",
  "maru-ni-chigai-yahazu": "arrangement",
  "maru-ni-mitsu-chigai-ya": "arrangement",
  "maru-ni-sanmai-takanoha": "arrangement",
  "chuwa-ni-futatsu-uroko": "arrangement",
  "hosowa-ni-itsutsu-uroko": "arrangement",
  "kage-no-kutsuwa": "tone",
  "chuwa-ni-mitsu-tama": "arrangement",
  "chuwa-ni-hitotsu-zukin": "arrangement",
  "futowa-ni-hitotsu-koma": "arrangement",
  "futowa-ni-katamomi-cha-no-mi": "arrangement",
  "futowa-ni-chochin": "arrangement",
  "mitsu-ryugo": "arrangement",
  "hosowa-ni-futatsu-fukuro": "arrangement",
  "itowa-ni-kaku-fukuro": "form",
  "chuwa-ni-hitotsu-kasane-masu": "arrangement",
  "maru-ni-mitsu-kuchinashi": "arrangement",
  "hosowa-ni-asa-no-ha": "arrangement",
  "futatsu-tsuru-kohone": "arrangement",
  "maru-ni-hitotsu-kohone": "arrangement",
  "itowa-ni-tachibana": "arrangement",
  "maru-ni-hyotan": "arrangement",
  "nozoki-sekichiku": "arrangement",
  "itowa-ni-mitsu-wari-rindo": "arrangement",
  "maru-ni-maribasami": "form",
  "maru-ni-chigai-chigiri": "arrangement",
  "sakai-katabami": "house",
  "todo-tsuta": "house",
  "okubo-fuji": "house",
  "hosokawa-sakura": "house",
  "naito-fuji": "house",
  "toki-kikyo": "house",
  "chuwa-ni-oni-tsuta": "arrangement",
  "maru-ni-kiku": "form",
  "maru-ni-mitsu-inazuma": "form",
  "maru-ni-sumitate-manji": "form",
  "itowa-ni-yotsu-inazumabishi": "form",
  "itowa-ni-yotsu-kaku-chigai": "arrangement",
  "mitsu-wari-giku": "form",
  "maru-ni-futatsu-hamaguri": "form",
  "maru-ni-mitsu-hamaguri": "form",
  "maru-ni-tate-futatsu-hikiryo": "arrangement",
  "maru-ni-tate-mitsu-hikiryo": "arrangement",
  "maru-ni-hitotsu-hikiryo": "count",
  "matsukawa-bishi": "form",
  "kaga-umebachi": "house",
  "hojo-uroko": "house",
  "hotta-mokko": "house",
  "shiho-hanabishi": "form",
  "maru-ni-kutsuwa": "form",
  "maru-ni-mitsu-kotoji": "count",
  "eiraku-sen": "form",
  "chukage-fundo": "tone",
  "maru-ni-hana-fundo": "form",
  "chuwa-ni-masu": "form",
};

/** A frame variant's plain twin, where the parts name two crests: the left and the right manji, the 五三桐 and the 五七桐, the fan and the five-rib fan, and the plain and the Kaga plum bowl have the same parts. */
const TWIN_OF: Record<string, string> = {
  "maru-ni-hitotsu-bishi": "hitotsu-bishi",
  "maru-ni-mitsuba-aoi": "mitsuba-aoi",
  "maru-ni-izutsu": "izutsu",
  "itowa-ni-hanabishi": "hanabishi",
  "maru-ni-chigai-kuginuki": "chigai-kuginuki",
  "maru-ni-kuyo": "kuyo", "maru-ni-yamazakura": "yamazakura", "maru-ni-sagari-fuji": "sagari-fuji", "chuwa-ni-karahana": "karahana", "maru-ni-kikyo": "kikyo", "maru-ni-mokko": "mokko", "iori-mokko": "mokko", "maru-ni-hidari-manji": "hidari-manji", "maru-ni-gosan-no-kiri": "gosan-no-kiri", "maru-ni-gohonbone-ogi": "gohonbone-ogi", "maru-ni-ume-bachi": "ume-bachi", "maru-ni-wari-bishi": "wari-bishi", "maru-ni-mitsu-uroko": "mitsu-uroko", "kikko-ni-hanabishi": "hanabishi", "maru-ni-tsuta": "tsuta", "maru-ni-daki-myoga": "daki-myoga", "maru-ni-yotsume": "yoko-yotsume", "maru-ni-uchiwa": "uchiwa", "maru-ni-karigane": "karigane", "maru-ni-agehacho": "agehacho", "maru-ni-katabami": "katabami", "kikko-ni-katabami": "katabami", "maru-ni-mitsu-icho": "mitsu-icho", "maru-ni-mitsu-gashiwa": "mitsu-gashiwa", "hosowa-ni-imo-kashiwa": "imo-kashiwa", "maru-ni-mitsu-chigiri": "mitsu-chigiri", "maru-ni-nashi-no-kiriguchi": "nashi-no-kiriguchi", "maru-ni-tachibana": "tachibana", "maru-ni-suhama": "suhama", "maru-ni-sekichiku": "sekichiku", "maru-ni-ryugo": "ryugo", "itowa-ni-hitotsu-cha-no-mi": "hitotsu-cha-no-mi", "maru-ni-chochin": "chochin", "maru-ni-igeta": "igeta" };

/** A place among the crests of one kind and one count where the parts would put it elsewhere: the rings by their weight, the stacked lozenges plain first. */
const ORDER_HINT: Record<string, number> = { hosowa: 1, chuwa: 2, kokumochi: 3, "sangai-bishi": 1, "kasane-sangai-bishi": 2 };

/** The order of the frames among those of one crest: the thin ring, the medium ring, then the shaped frames. */
const FRAME_ORDER = ["none", "ring-thread", "ring-thin", "ring-medium", "ring-thick", "hexagon", "mokko"];

/** An arrangement that is only the count's way of being set out: one alone, or turned about the centre. */
const NEUTRAL = new Set(["single", "radial"]);

/** Where a crest stands. */
export interface Placement {
  family: string;
  /** The crest this is a variant of: for a frame variant its twin with no frame, for every other crest the family's base. */
  base: string;
  variantKind: VariantKind;
  /** Its place among the crests of its kind in its family, from 1. */
  variantRank: number;
  /** Where it stands among the crests of its family, from 0: the order of the books, which `variantKind` and `variantRank` give but for a frame variant of a crest that stands after the frames (see `placeAll`). */
  position: number;
}

const sameMotifs = (a: CrestDef, b: CrestDef): boolean => JSON.stringify(a.motifs) === JSON.stringify(b.motifs);
const countOf = (def: CrestDef): number => def.motifs[0].count;
const turnOf = (def: CrestDef): number => (def.motifs[0].turn === "right" ? 1 : 0);

/** The family of a crest, or a problem. */
export const familyOf = (def: CrestDef): string | undefined => FAMILY_OF[def.id] ?? MOTIF_FAMILY[def.motifs[0].motif];

/**
 * Every crest's place, with the problems found. A crest is a frame variant when a crest of its family has the same motifs and no frame
 * (its twin) and nothing says otherwise; else it is a combination when it has a motif the base has not, an arrangement when it is set
 * out differently from the base, a count when it has more or fewer of the motif, and a form when only its turn or its drawing differs.
 */
export const placeAll = (defs: readonly CrestDef[]): { places: Map<string, Placement>; problems: string[] } => {
  const problems: string[] = [];
  const byId = new Map(defs.map((def) => [def.id, def]));
  const families = new Map(FAMILIES.map((one) => [one.id, one]));
  const home = new Map<string, string>();
  for (const def of defs) {
    const id = familyOf(def);
    if (id === undefined || !families.has(id)) problems.push(`${def.id}: no family for its motif ${def.motifs[0].motif}: add it to MOTIF_FAMILY or FAMILY_OF in scripts/crests/families.ts`);
    else home.set(def.id, id);
  }
  for (const one of FAMILIES) {
    const base = byId.get(one.base);
    if (base === undefined) problems.push(`family ${one.id}: its base ${one.base} is not a crest`);
    else if (home.get(base.id) !== one.id) problems.push(`family ${one.id}: its base ${one.base} is in ${home.get(base.id)}`);
    if (![...home.values()].includes(one.id)) problems.push(`family ${one.id}: no crest is in it`);
  }
  if (problems.length > 0) return { places: new Map(), problems };

  const members = (id: string): CrestDef[] => defs.filter((def) => home.get(def.id) === id);
  const twinOf = (def: CrestDef): CrestDef | undefined => {
    if (def.frame === "none") return undefined;
    const named = TWIN_OF[def.id];
    if (named !== undefined) return byId.get(named);
    const twins = members(home.get(def.id) as string).filter((other) => other.frame === "none" && sameMotifs(other, def));
    if (twins.length > 1) problems.push(`${def.id}: more than one twin (${twins.map((one) => one.id).join(", ")}): name one in TWIN_OF`);

    return twins[0];
  };
  const kindOf = (def: CrestDef, base: CrestDef): VariantKind => {
    if (def.id === base.id) return "base";
    const set = (one: CrestDef): Set<string> => new Set(one.motifs.map((use) => use.motif));
    const mine = set(def);
    const theirs = set(base);
    if (KIND_OF[def.id] !== undefined) return KIND_OF[def.id];
    if (twinOf(def) !== undefined) return "frame";
    if ([...theirs].every((motif) => mine.has(motif)) && mine.size > theirs.size) return "combination";
    if ([...mine].some((motif) => !theirs.has(motif))) return "form";
    const here = def.motifs[0];
    const there = base.motifs[0];
    if (here.arrangement !== there.arrangement && !(NEUTRAL.has(here.arrangement) && NEUTRAL.has(there.arrangement))) return "arrangement";
    if (here.count !== there.count) return "count";

    return "form";
  };

  const places = new Map<string, Placement>();
  const order = (these: CrestDef[], keyOf: (def: CrestDef) => number[]): CrestDef[] =>
    these.sort((a, b) => {
      const ka = keyOf(a);
      const kb = keyOf(b);
      for (let at = 0; at < ka.length; at += 1) if (ka[at] !== kb[at]) return ka[at] - kb[at];

      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  for (const one of FAMILIES) {
    const base = byId.get(one.base) as CrestDef;
    const all = members(one.id);
    const kinds = new Map(all.map((def) => [def.id, kindOf(def, base)]));
    const sorted = new Map<VariantKind, CrestDef[]>();
    // The crests that are not frame variants first, each kind by the hint, the count and the turn; where each stands in the whole family is its standing.
    const standing = new Map<string, number>();
    for (const kind of VARIANT_KINDS.filter((one) => one !== "frame")) {
      const these = order(all.filter((def) => kinds.get(def.id) === kind), (def) => [countOf(def), ORDER_HINT[def.id] ?? 0, turnOf(def)]);
      sorted.set(kind, these);
      these.forEach((def, at) => standing.set(def.id, VARIANT_KINDS.indexOf(kind) * 1000 + at + 1));
    }
    // A frame variant stands where its plain twin does, then by its frame: the thin ring, the medium ring, the shaped frames.
    sorted.set("frame", order(all.filter((def) => kinds.get(def.id) === "frame"), (def) => [standing.get((twinOf(def) as CrestDef).id) ?? 0, FRAME_ORDER.indexOf(def.frame)]));
    // The books' order, but a frame variant never stands before its own plain twin: where the twin stands after the frames (an arrangement,
    // a combination, a house's variant), the frame variants follow it, the thin ring first.
    const late = (def: CrestDef): boolean => VARIANT_KINDS.indexOf(kinds.get((twinOf(def) as CrestDef).id) as VariantKind) > VARIANT_KINDS.indexOf("frame");
    const frames = sorted.get("frame") as CrestDef[];
    const sequence: CrestDef[] = [];
    for (const kind of VARIANT_KINDS) {
      if (kind === "frame") sequence.push(...frames.filter((def) => !late(def)));
      else for (const def of sorted.get(kind) as CrestDef[]) sequence.push(def, ...frames.filter((frame) => late(frame) && (twinOf(frame) as CrestDef).id === def.id));
    }
    for (const [kind, these] of sorted) these.forEach((def, at) => places.set(def.id, { family: one.id, base: kind === "frame" ? (twinOf(def) as CrestDef).id : one.base, variantKind: kind, variantRank: at + 1, position: sequence.indexOf(def) }));
  }

  return { places, problems };
};
