// Holds every public export to its documentation, as the shipped types carry it (dist/*.d.ts, so a comment lost in
// the build counts as missing). `pnpm check` runs it after the build; it exits 1 listing what is missing.
//
// Every export of every entry, and of every flag's module, must have:
//   - a summary;
//   - an @example with a fenced code block;
//   - for a function: an @param for each parameter, and @returns, which says what null means when it can be null.
// Then every example is type-checked against the built package, as a reader would paste it: the package's name
// resolves to dist/, and `element`, `image` and `form` are an element, an image and a form somebody has.
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import process from "node:process";

import ts from "typescript";

const ROOT = join(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const crests = readdirSync(join(DIST, "crests")).filter((file) => file.endsWith(".d.ts"));
const steps = readdirSync(join(DIST, "steps")).filter((file) => file.endsWith(".d.ts"));
const entries = [
  ["@johnmorrisdotca/kamon-crests", "index.d.ts"],
  ["@johnmorrisdotca/kamon-crests/load", "load.d.ts"],
  ["@johnmorrisdotca/kamon-crests/manifest", "manifest.d.ts"],
  ["@johnmorrisdotca/kamon-crests/parts", "parts.d.ts"],
  ["@johnmorrisdotca/kamon-crests/search", "search.d.ts"],
  ["@johnmorrisdotca/kamon-crests/animate", "animate.d.ts"],
  ["@johnmorrisdotca/kamon-crests/names", "names.d.ts"],
  ["@johnmorrisdotca/kamon-crests/element", "element.d.ts"],
  ["@johnmorrisdotca/kamon-crests/element/define", "element-define.d.ts"],
  ...crests.map((file) => [`@johnmorrisdotca/kamon-crests/crests/${file.slice(0, -5)}`, `crests/${file}`]),
  ...steps.map((file) => [`@johnmorrisdotca/kamon-crests/steps/${file.slice(0, -5)}`, `steps/${file}`]),
];
const program = ts.createProgram(entries.map(([, file]) => join(DIST, file)), { noEmit: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, lib: ["lib.es2022.d.ts", "lib.dom.d.ts"] });
const checker = program.getTypeChecker();
const problems = [];
const examples = new Map();
const text = (parts) => ts.displayPartsToString(parts ?? []).trim();

for (const [entry, file] of entries) {
  const module = checker.getSymbolAtLocation(program.getSourceFile(join(DIST, file)));
  for (const exported of checker.getExportsOfModule(module)) {
    if (exported.name === "default") continue;
    const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    const where = `${entry} ${exported.name}`;
    const tags = symbol.getJsDocTags(checker);
    if (text(symbol.getDocumentationComment(checker)) === "") problems.push(`${where}: no summary`);
    const example = tags.filter((tag) => tag.name === "example").map((tag) => text(tag.text)).find((one) => one.includes("```"));
    if (example === undefined) problems.push(`${where}: no @example with a code block`);
    else examples.set(example.replace(/^```\w*(?:[ \t]+(?:no-run|no-check))*\n|```[ \t]*$/gm, "").trim(), where);
    const declaration = symbol.declarations?.[0];
    if (declaration === undefined) continue;
    const calls = checker.getTypeOfSymbolAtLocation(symbol, declaration).getCallSignatures();
    if (calls.length === 0 || symbol.flags & (ts.SymbolFlags.TypeAlias | ts.SymbolFlags.Interface)) continue;
    const params = tags.filter((tag) => tag.name === "param").map((tag) => text(tag.text).split(/\s/)[0]);
    for (const parameter of calls[0].getParameters()) if (!params.includes(parameter.name)) problems.push(`${where}: no @param for ${parameter.name}`);
    const returns = tags.find((tag) => tag.name === "returns");
    if (returns === undefined) problems.push(`${where}: no @returns`);
    else if (/\bnull\b/.test(checker.typeToString(calls[0].getReturnType())) && !/`?null`?/.test(text(returns.text))) problems.push(`${where}: @returns does not say what null means`);
  }
}

// The examples, type-checked against the built package. A crest's example differs from the next only in its id,
// so one of them stands for all.
const scratch = mkdtempSync(join(tmpdir(), "kamon-crests-examples-"));
const perCrest = (code) => /\/(?:crests|steps)\/[^"']+["']/.test(code);
const unique = [...examples].filter(([code], at, all) => !perCrest(code) || all.findIndex(([other]) => perCrest(other)) === at);
const files = unique.map(([code, where], at) => {
  const name = join(scratch, `example-${at}.ts`);
  writeFileSync(name, `// ${where}\ndeclare const element: HTMLElement;\ndeclare const image: HTMLImageElement;\n\n${code}\nexport {};\n`);
  return name;
});
mkdirSync(join(scratch, "node_modules", "@johnmorrisdotca"), { recursive: true });
const examined = ts.createProgram(files, {
  noEmit: true,
  strict: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
  types: [],
  baseUrl: scratch,
  paths: { "@johnmorrisdotca/kamon-crests": [join(DIST, "index.d.ts")], "@johnmorrisdotca/kamon-crests/*": [join(DIST, "*")] },
});
for (const diagnostic of ts.getPreEmitDiagnostics(examined)) {
  const file = diagnostic.file;
  const where = file ? file.text.split("\n")[0].slice(3) : "";
  problems.push(`example of ${where}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`);
}
rmSync(scratch, { recursive: true, force: true });

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`ok   every export of ${entries.length} entries is documented, and ${unique.length} examples type-check against the build`);
