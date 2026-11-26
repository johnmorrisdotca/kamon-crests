// The player's buttons and the speed choice, written once for the crest card and for the Build page, so that the two look and read the same.
// `ids` names each control: the card's own ids are the defaults; the Build page gives its own, so that both can be tested and styled apart.

const CARD = { restart: "draw", back: "step-back", toggle: "play-pause", forward: "step-forward", loop: "loop", scrub: "scrub", speed: "speed" };

/** The player row: from the start, step back, play and pause, step forward, the loop switch when asked for, and the scrubber. */
export const playerMarkup = ({ ids = CARD, loop = true } = {}) => `<div class="fam-actions player" id="${ids.player ?? "player"}" data-testid="${ids.player ?? "player"}" role="group" data-say-label="player">
            <button type="button" class="fam-button" id="${ids.restart}" data-testid="${ids.restart}" data-say-label="player_restart"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 3h2v10H3zM13 3v10L6 8z" fill="currentColor"/></svg></button>
            <button type="button" class="fam-button" id="${ids.back}" data-testid="${ids.back}" data-say-label="player_back">‹</button>
            <button type="button" class="fam-button" id="${ids.toggle}" data-testid="${ids.toggle}"></button>
            <button type="button" class="fam-button" id="${ids.forward}" data-testid="${ids.forward}" data-say-label="player_forward">›</button>${
              loop
                ? `
            <button type="button" class="fam-button" id="${ids.loop}" data-testid="${ids.loop}" aria-pressed="false" data-say-label="loop"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5V6.5a2 2 0 0 1 2-2h8"/><path d="M10.5 2.5l2 2-2 2"/><path d="M13.5 8.5v1a2 2 0 0 1-2 2h-8"/><path d="M5.5 13.5l-2-2 2-2"/></svg></button>`
                : ""
            }
            <input type="range" id="${ids.scrub}" data-testid="${ids.scrub}" min="0" step="1" data-say-label="player_scrub" />
          </div>`;

/** The speed choice: 0.5×, 1× and 2×. */
export const speedMarkup = ({ ids = CARD } = {}) =>
  `<div class="fam-seg" id="${ids.speed}" data-testid="${ids.speed}" role="group" data-say-label="speed"><button type="button" data-value="0.5" aria-pressed="false">0.5×</button><button type="button" data-value="1" aria-pressed="true">1×</button><button type="button" data-value="2" aria-pressed="false">2×</button></div>`;
