// Every crest, in the order of the catalogue: by family of motif, plain shapes first.
import type { CrestDef } from "./types.ts";
import * as hoshi from "./hoshi.ts";
import * as kuyoArrangements from "./kuyo-arrangements.ts";
import * as geometric from "./geometric.ts";
import * as janome from "./janome.ts";
import * as kan from "./kan.ts";
import * as flowers from "./flowers.ts";
import * as hanabishiDetail from "./hanabishi-detail.ts";
import * as hanabishiClusters from "./hanabishi-clusters.ts";
import * as hanabishiDivisions from "./hanabishi-divisions.ts";
import * as hanabishiKage from "./hanabishi-kage.ts";
import * as kiri from "./kiri.ts";
import * as leaves from "./leaves.ts";
import * as birds from "./birds.ts";
import * as suzumeMore from "./suzume-more.ts";
import * as kame from "./kame.ts";
import * as horns from "./horns.ts";
import * as kariganeVariants from "./karigane-variants.ts";
import * as kariganeWheels from "./karigane-wheels.ts";
import * as natural from "./natural.ts";
import * as awaSprays from "./awa-sprays.ts";
import * as nanten from "./nanten.ts";
import * as usagiVariants from "./usagi-variants.ts";
import * as choVariants from "./cho-variants.ts";
import * as yama from "./yama.ts";
import * as kuginukiForms from "./kuginuki-forms.ts";
import * as ya from "./ya.ts";
import * as yaWheels from "./ya-wheels.ts";
import * as takanohaArrangements from "./takanoha-arrangements.ts";
import * as izutsuForms from "./izutsu-forms.ts";
import * as yamamichi from "./yamamichi.ts";
import * as yamagataPairs from "./yamagata-pairs.ts";
import * as yotsuYamagata from "./yotsu-yamagata.ts";
import * as ume from "./ume.ts";
import * as kiku from "./kiku.ts";
import * as karahana from "./karahana.ts";
import * as mokko from "./mokko.ts";
import * as mokkoVariants from "./mokko-variants.ts";
import * as mokkoArrangements from "./mokko-arrangements.ts";
import * as objects from "./objects.ts";
import * as noshi from "./noshi.ts";
import * as tsuchi from "./tsuchi.ts";
import * as heishi from "./heishi.ts";
import * as fukuro from "./fukuro.ts";
import * as suhama from "./suhama.ts";
import * as kotoNoTsume from "./koto-no-tsume.ts";
import * as fumi from "./fumi.ts";
import * as yumi from "./yumi.ts";
import * as kase from "./kase.ts";
import * as koma from "./koma.ts";
import * as mamezo from "./mamezo.ts";
import * as spoolToy from "./spool-toy.ts";
import * as kamashiki from "./kamashiki.ts";
import * as chigiri from "./chigiri.ts";
import * as kutsuwa from "./kutsuwa.ts";
import * as shogiKoma from "./shogi-koma.ts";
import * as jigami from "./jigami.ts";
import * as maribasami from "./maribasami.ts";
import * as paddles from "./paddles.ts";
import * as kotoji from "./kotoji.ts";
import * as itomaki from "./itomaki.ts";
import * as ho from "./ho.ts";
import * as fundo from "./fundo.ts";
import * as masu from "./masu.ts";
import * as kama from "./kama.ts";
import * as ogi from "./ogi.ts";
import * as uchiwa from "./uchiwa.ts";
import * as zeni from "./zeni.ts";
import * as kuruma from "./kuruma.ts";
import * as plainForms from "./plain-forms.ts";
import * as arms from "./arms.ts";
import * as masakariVariants from "./masakari-variants.ts";
import * as shapes from "./shapes.ts";
import * as hishiForms from "./hishi-forms.ts";
import * as hishiClusters from "./hishi-clusters.ts";
import * as ishidatami from "./ishidatami.ts";
import * as tomoe from "./tomoe.ts";
import * as tomoeRings from "./tomoe-rings.ts";
import * as tier1 from "./tier1.ts";
import * as kikkoVariants from "./kikko-variants.ts";
import * as kikkoArrangements from "./kikko-arrangements.ts";
import * as urokoForms from "./uroko-forms.ts";
import * as hanabishiForms from "./hanabishi-forms.ts";
import * as greatLeaves from "./great-leaves.ts";
import * as variants from "./variants.ts";
import * as kakuMeyui from "./kaku-meyui.ts";
import * as hikiryo from "./hikiryo.ts";
import * as lattice from "./lattice.ts";
import * as meyui from "./meyui.ts";
import * as meyuiVariants from "./meyui-variants.ts";
import * as meyuiSets from "./meyui-sets.ts";
import * as inazuma from "./inazuma.ts";
import * as inazumaVariants from "./inazuma-variants.ts";
import * as inazumaFrets from "./inazuma-frets.ts";
import * as wachigai from "./wachigai.ts";
import * as wachigaiFlowers from "./wachigai-flowers.ts";
import * as shippo from "./shippo.ts";
import * as kaku from "./kaku.ts";
import * as kakuWoven from "./kaku-woven.ts";
import * as kakuMore from "./kaku-more.ts";
import * as kakuCorners from "./kaku-corners.ts";
import * as yukiwa from "./yukiwa.ts";
import * as manji from "./manji.ts";

import * as kai from "./kai.ts";
import * as kaiVariants from "./kai-variants.ts";
import * as iori from "./iori.ts";

import * as fuji from "./fuji.ts";
import * as gaku from "./gaku.ts";
import * as kikyoCurled from "./kikyo-curled.ts";

const modules: Record<string, unknown>[] = [geometric, fuji, kai, shapes, plainForms, tomoe, flowers, kiku, ume, karahana, mokko, leaves, kiri, objects, arms, natural, birds, tier1, kikkoVariants, greatLeaves, variants, kakuMeyui, hikiryo, lattice, meyui, ogi, iori, inazuma, uchiwa, gaku, wachigai, shippo, kaku, yukiwa, sakura, kikyo, kikyoKnots, zeni, kaiVariants, manji, kuruma, kikyoCurled, fundo, kariganeVariants, masu, usagiVariants, choVariants, mokkoVariants, kikyoProfile, yama, kama, meyuiVariants, ringedCharacters, inazumaVariants, masakariVariants, wachigaiFlowers, kakuMore, kotoji, itomaki, gentianWheels, kan, katabami, suzumeMore, ho, gentianLeaves, inazumaFrets, gentianThread, icho, shogiKoma, goRingo, kariganeWheels, kame, ishidatami, kakuCorners, jigami, omodaka, yamamichi, maribasami, paddles, kamashiki, mapleStream, meyuiSets, chigiri, myoga, dianthus, mokkoArrangements, kutsuwa, kakuWoven, kashiwa, kashiwaLeaves, kase, peonyFaces, tsuta, janome, horns, koma, tsutaArrangements, nashi, tachibanaBoughs, peonyOrbits, suhama, yamagataPairs, hyotan, kotoNoTsume, fumi, chinaPink, tessen, yumi, awaSprays, kuchinashi, heishi, teaFruit, asaArrangements, spatterdock, fukuro, kurumi, warabi, sugi, sumire, renge, asaTail, mamezo, hoju, zukin, gotoku, futowaKoma, shamigoma, spoolToy, tsuzumi, noshi, chigaiMitsuYamagata, chochin, hansho, hane, tsuchi, yuiwata, sanNoJi, mitsuwariKurusu, mitsuTsuruMakuwa, yotsuYamagata, nanten, hoshi, kuyoArrangements, aoiVariants, ya, yaWheels, kikkoArrangements, waClassA, takanohaArrangements, waAndKanawa, kasaneMitsuBoshi, urokoForms, aoiWheels, tsukiClassA, tsuruClassA, hishiForms, hishiClusters, kiriVariants, komochiWa, izutsuForms, hanabishiForms, kuginukiForms, yuiwataBishi, nejiWa, kiriStanding, kiriRosettes, wellLattice, tomoeRings, hanabishiDetail, kiriSplit, kiriWheels, wellProjection, hanabishiClusters, hanabishiDivisions, wellKnots, hanabishiKage, sasaGroups, sasaGeometry, takanohaFramed, sasaStems];
import * as kiriRosettes from "./kiri-rosettes.ts";

import * as kiriStanding from "./kiri-standing.ts";

import * as wellLattice from "./well-lattice.ts";

import * as kiriWheels from "./kiri-wheels.ts";

import * as kiriSplit from "./kiri-split.ts";

import * as wellProjection from "./well-projection.ts";

import * as wellKnots from "./well-knots.ts";

import * as sasaGeometry from "./sasa-geometry.ts";

import * as sasaGroups from "./sasa-groups.ts";

import * as takanohaFramed from "./takanoha-framed.ts";

import * as sasaStems from "./sasa-stems.ts";

import * as aoiVariants from "./aoi-variants.ts";

import * as aoiWheels from "./aoi-wheels.ts";

import * as kiriVariants from "./kiri-variants.ts";

import * as mitsuwariKurusu from "./mitsuwari-kurusu.ts";
import * as mitsuTsuruMakuwa from "./mitsu-tsuru-makuwa.ts";
import * as waClassA from "./wa-class-a.ts";
import * as waAndKanawa from "./wa-and-kanawa.ts";
import * as kasaneMitsuBoshi from "./kasane-mitsu-boshi.ts";
import * as tsukiClassA from "./tsuki-class-a.ts";
import * as tsuruClassA from "./tsuru-class-a.ts";
import * as komochiWa from "./komochi-wa.ts";
import * as nejiWa from "./neji-wa.ts";
import * as chigaiMitsuYamagata from "./chigai-mitsu-yamagata.ts";

import * as chochin from "./chochin.ts";

import * as hansho from "./hansho.ts";

import * as hane from "./hane.ts";

import * as kurumi from "./kurumi.ts";

import * as warabi from "./warabi.ts";

import * as sugi from "./sugi.ts";

import * as sumire from "./sumire.ts";

import * as renge from "./renge.ts";

import * as asaTail from "./asa-tail.ts";

import * as hoju from "./hoju.ts";

import * as zukin from "./zukin.ts";

import * as gotoku from "./gotoku.ts";

import * as futowaKoma from "./futowa-koma.ts";

import * as shamigoma from "./shamigoma.ts";

import * as tsuzumi from "./tsuzumi.ts";

import * as tessen from "./tessen.ts";
import * as yuiwata from "./yuiwata.ts";
import * as yuiwataBishi from "./yuiwata-bishi.ts";

import * as kuchinashi from "./kuchinashi.ts";

import * as asaArrangements from "./asa-arrangements.ts";

import * as tsutaArrangements from "./tsuta-arrangements.ts";

import * as nashi from "./nashi.ts";

import * as hyotan from "./hyotan.ts";

import * as kashiwa from "./kashiwa.ts";

import * as kashiwaLeaves from "./kashiwa-leaves.ts";

import * as tsuta from "./tsuta.ts";

import * as omodaka from "./omodaka.ts";

import * as myoga from "./myoga.ts";

import * as katabami from "./katabami.ts";

import * as icho from "./icho.ts";

import * as sakura from "./sakura.ts";

import * as kikyo from "./kikyo.ts";

import * as kikyoKnots from "./kikyo-knots.ts";


import * as kikyoProfile from "./kikyo-profile.ts";
import * as ringedCharacters from "./ringed-characters.ts";
import * as sanNoJi from "./san-no-ji.ts";
import * as gentianWheels from "./gentian-wheels.ts";

import * as gentianLeaves from "./gentian-leaves.ts";

import * as gentianThread from "./gentian-thread.ts";
import * as goRingo from "./go-no-ji-ringo.ts";
import * as mapleStream from "./maple-stream.ts";
import * as tachibanaBoughs from "./tachibana-boughs.ts";
import * as dianthus from "./dianthus.ts";
import * as chinaPink from "./china-pink.ts";
import * as teaFruit from "./tea-fruit.ts";
import * as spatterdock from "./spatterdock.ts";
import * as peonyFaces from "./peony-faces.ts";
import * as peonyOrbits from "./peony-orbits.ts";

export const ALL: CrestDef[] = modules.flatMap((m) => Object.values(m)).filter((v): v is CrestDef => typeof v === "object" && v !== null && "build" in v);
