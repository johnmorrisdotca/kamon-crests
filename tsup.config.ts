import { readdirSync } from "node:fs";
import { basename } from "node:path";

import type { Plugin } from "esbuild";
import { defineConfig } from "tsup";

// One entry for each crest (src/crests/<id>.ts) and each construction (src/steps/<id>.ts), written by scripts/build-data.ts.
// Their types are written by scripts/build-extras.ts, one small file each, rather than by a TypeScript build per crest.
const crestEntries: Record<string, string> = Object.fromEntries([
  ...readdirSync("src/crests").filter((file) => file.endsWith(".ts")).map((file) => [`crests/${basename(file, ".ts")}`, `src/crests/${file}`]),
  ...readdirSync("src/steps").filter((file) => file.endsWith(".ts")).map((file) => [`steps/${basename(file, ".ts")}`, `src/steps/${file}`]),
]);

// The tables import each crest's entry when it is asked for, and the element's modules are entries of their own: the
// element loads /load, /animate and /names rather than carry a copy of each. Both are left as imports of the built entry file.
const imports: Plugin = {
  name: "kamon-imports",
  setup(build) {
    build.onResolve({ filter: /^\.\/(load|animate|names|element|element-controls|parts|manifest)\.js$/ }, (args) => ({ path: args.path, external: true }));
    build.onResolve({ filter: /^\.\.\/(crests|steps)\/[a-z0-9-]+\.js$/ }, (args) => ({ path: args.path.replace("..", "."), external: true }));
  },
};

const shared = {
  format: ["esm"] as "esm"[],
  // Each entry stands alone, so that a crest's file carries only its own picture.
  splitting: false,
  sourcemap: false,
  target: "es2022",
  outDir: "dist",
  esbuildPlugins: [imports],
};

const entries = { index: "src/index.ts", load: "src/load.ts", manifest: "src/manifest.ts", parts: "src/parts.ts", search: "src/search.ts", animate: "src/animate.ts", names: "src/names.ts", element: "src/element.ts", "element-define": "src/element-define.ts" };

export default defineConfig([
  {
    ...shared,
    // element-controls is the element's own file, loaded when its controls are first wanted: built, but not an entry with types.
    entry: { ...entries, "element-controls": "src/element-controls.ts" },
    dts: { entry: entries },
    minify: false,
    esbuildOptions(options) {
      options.charset = "utf8";
    },
  },
  {
    ...shared,
    entry: crestEntries,
    dts: false,
    esbuildOptions(options) {
      options.charset = "utf8";
      options.minifyWhitespace = true;
    },
  },
]);
