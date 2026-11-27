// The demo's one menu, the same on every page: the pages in one order with the current one marked, and a Menu button that opens
// the language, the table cloth, Help and the GitHub and npm links. The family's header (family-template.mjs, never edited here)
// writes the language choice, the cloth patches, the Help switch and the two links in a row; this takes those pieces as it gives them
// and sets them in the Menu, so that its scripts find them by the same names and keep working. If the family's header changes shape
// so that a piece is not found, the build stops here and says which.
import { familyHeader } from "./family-template.mjs";

const REPO = "https://github.com/johnmorrisdotca/kamon-crests";

/** The pages, in the order every page shows them. `at` is where the page lives; `say` is its word. */
export const PAGES = [
  { page: "demo", at: "", say: "pageBack" },
  { page: "docs", href: `${REPO}/tree/main/docs/guides`, say: "pageDocs" },
  { page: "api", at: "api.html", say: "pageApi" },
  { page: "coverage", at: "coverage/", say: "pageCoverage" },
  { page: "book", at: "book/", say: "pageBook" },
  { page: "samurai", at: "samurai/", say: "pageSamurai" },
  { page: "build", at: "build/", say: "pageBuild" },
  { page: "help", href: `${REPO}/blob/main/docs/guides/draw-a-crest.md`, say: "pageHelp" },
];

/** The words the pages' links and the Menu say, which every page's word table has. */
export const NAV_KEYS = [...PAGES.map((one) => one.say), "menu", "menu_language"];

const hrefOf = (one, base) => one.href ?? (one.at === "" && base === "" ? "./" : `${base}${one.at}`);

const piece = (html, pattern, name) => {
  const found = pattern.exec(html);
  if (found === null) throw new Error(`site-header: the family's header has no ${name}; the Menu is built from it, so this file needs to follow the change`);
  return found[0];
};

/**
 * The header of a page. `page` is which page this is (one of `PAGES`); `base` is the way back to the site's root from there: "" on the
 * front page and the API page, "../" on the pages in folders.
 */
export function siteHeader({ id, page, base }) {
  if (!PAGES.some((one) => one.page === page)) throw new Error(`site-header: no page called ${page}`);
  const links = PAGES.map((one) => ({ href: hrefOf(one, base), say: one.say }));
  const family = familyHeader({ id, links });
  const lang = piece(family, /<div class="lang"[\s\S]*?<\/div>/, "language choice");
  const cloth = piece(family, /<div class="cloth"[\s\S]*?<\/button><\/div>/, "cloth patches");
  const help = piece(family, /<button type="button" class="fam-button" data-help-switch[\s\S]*?<\/button>/, "Help switch");
  const repo = piece(family, new RegExp(`<a href="${REPO.replace(/[./]/g, "\\$&")}">GitHub</a>`), "GitHub link");
  const npm = piece(family, /<a href="https:\/\/www\.npmjs\.com\/[^"]*">npm<\/a>/, "npm link");
  const head = family.slice(0, family.indexOf("<nav>"));
  const here = PAGES.find((one) => one.page === page);
  const pages = PAGES.map((one) => `<a href="${hrefOf(one, base)}" data-say="${one.say}" data-page="${one.page}"${one.page === here.page ? ' aria-current="page"' : ""}></a>`).join("\n          ");
  const chevron = `<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6l4.5 4.5L12.5 6"/></svg>`;

  return `${head}<nav data-testid="site-nav" aria-label="Pages / ページ">
          ${pages}
          <div class="menu" data-menu>
            <button type="button" class="fam-button menu-button" id="menu-button" data-testid="menu-button" aria-expanded="false" aria-controls="site-menu" aria-haspopup="true"><span data-say="menu"></span>${chevron}</button>
            <div class="menu-panel" id="site-menu" data-testid="menu-panel" role="group" data-say-label="menu" hidden>
              <div class="menu-row"><span class="menu-label" data-say="menu_language"></span>${lang}</div>
              <div class="menu-row"><span class="menu-label" data-say="cloth"></span>${cloth}</div>
              <div class="menu-row menu-links">${help}${repo}${npm}</div>
            </div>
          </div>
        </nav>
      </header>`;
}

/** The link to the Menu's stylesheet, from a page whose root is `base` away. */
export const menuHead = (base) => `<link rel="stylesheet" href="${base}menu.css" />`;

/** The Menu's behaviour, as the source of a classic script: open and close, Escape and a press outside close it, focus goes back to its button. */
export const MENU_SCRIPT = `(function siteMenu() {
  var menu = document.querySelector("[data-menu]");
  if (menu === null) return;
  var button = menu.querySelector(".menu-button");
  var panel = menu.querySelector(".menu-panel");
  // The panel opens under the button and is moved sideways, if it must be, to stay inside the window.
  var place = function () {
    panel.style.left = "0px";
    var box = panel.getBoundingClientRect();
    var shift = Math.min(0, document.documentElement.clientWidth - 8 - box.right);
    if (box.left + shift < 8) shift = 8 - box.left;
    panel.style.left = shift + "px";
  };
  var show = function (open) {
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    if (open) place();
  };
  window.addEventListener("resize", function () { if (!panel.hidden) place(); });
  button.addEventListener("click", function () { show(panel.hidden); });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || panel.hidden) return;
    show(false);
    button.focus();
  });
  document.addEventListener("pointerdown", function (event) {
    if (!panel.hidden && !menu.contains(event.target)) show(false);
  });
  menu.addEventListener("focusout", function (event) {
    if (!panel.hidden && event.relatedTarget !== null && !menu.contains(event.relatedTarget)) show(false);
  });
})();`;
