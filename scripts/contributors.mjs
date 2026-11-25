// The people who drew crests for Kamon Crests, outside the maintainer. A contributor adds themselves here in the pull request that
// brings their first crest, and adds each later crest's id to their own line. It writes the README's "People who helped" section
// (`pnpm contributors`, held by src/contributors.test.ts) and the demo's "Contributed by" line on each crest's card; nothing of it
// is in the package.

/**
 * @typedef {{ name: string, github: string, crests: string[] }} Contributor
 */

/** @type {Contributor[]} */
export const CONTRIBUTORS = [];

/** The id of every crest a contributor drew, with who drew it. */
export const contributedBy = () => Object.fromEntries(CONTRIBUTORS.flatMap((one) => one.crests.map((id) => [id, { name: one.name, github: one.github }])));

export const README_START = "<!-- contributors:start -->";
export const README_END = "<!-- contributors:end -->";

/** The README's section between its markers. */
export const readmeSection = () => {
  const people =
    CONTRIBUTORS.length === 0
      ? "No one yet: the first name here could be yours. [Draw a crest](docs/guides/draw-a-crest.md) shows how, and the [issues labelled draw a crest](https://github.com/johnmorrisdotca/kamon-crests/issues?q=is%3Aopen+label%3A%22draw+a+crest%22) are crests waiting for someone."
      : [
          "| Who | Crests |",
          "| --- | --- |",
          ...[...CONTRIBUTORS]
            .sort((a, b) => b.crests.length - a.crests.length || a.name.localeCompare(b.name))
            .map((one) => `| [${one.name}](https://github.com/${one.github}) | ${one.crests.map((id) => `\`${id}\``).join(", ")} |`),
        ].join("\n");

  return `${README_START}\n${people}\n${README_END}`;
};
