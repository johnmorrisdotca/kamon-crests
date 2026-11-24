// The entry @johnmorrisdotca/kamon-crests/element/define (dist/element-define.js): importing it registers <kamon-crest>, the
// one module of the package with an effect of its own, for a page that wants a single script tag:
//
//     <script type="module" src="https://cdn.jsdelivr.net/npm/@johnmorrisdotca/kamon-crests@0/dist/element-define.js"></script>
//     <kamon-crest crest="mitsuba-aoi" size="96"></kamon-crest>

import { defineCrest } from "./element.js";

defineCrest();

export { defineCrest };
