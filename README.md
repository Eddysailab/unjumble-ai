# Unjumble AI

A free word puzzle that teaches you the language of AI, by Eddy's AI Lab.
One hundred AI terms, split into five themed packs. You unscramble the word
from a short clue, then you get the plain English meaning and a real life
example. It is built for complete beginners: no lives, no timer, and no way
to lose.

Unjumble AI is a plain static website. No build step, no server, no accounts.
It runs fully offline once the files are on a page.

---

## Quick start (run it on your computer)

**Option A, just open it.**
Double-click `index.html`. It opens in your browser and works.

**Option B, run the little local server (matches how it will look online).**
In a terminal, from this folder:

```
powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1
```

Then open `http://localhost:3211/` in your browser.

Either way, nothing needs installing.

**Light or dark:** there is a sun/moon button in the top right. **Sound:**
there is a speaker button next to it. Both choices are remembered.

The icons come from Iconoir (iconoir.com) and are built into the files, so
nothing is loaded from the internet.

---

## How the game works

1. The player picks a pack. Packs unlock in order, one at a time.
2. A short clue appears, along with the word's letters, scrambled.
3. They tap the letters in order to spell the word.
4. Stuck? **Reveal a letter** fills in the next correct letter. It is free
   and unlimited, it just trims the points for that word.
5. Wrong order? The letters shake and drop back. Nothing else happens, and
   they can try again straight away.
6. Solved? They get the word's **meaning** and a **real life example**, plus
   points and a streak.

Points are 100 per word, minus 20 for each letter revealed, never below 20,
plus a small streak bonus. You can change all of those numbers in
`js/config.js`.

---

## What is where (folder map)

```
unjumble-ai/
  index.html            The single page. Loads everything.
  README.md             This file.
  DEPLOY.md             One-page guide to putting it online.
  css/
    styles.css          All the styling. Brand colors are at the very top.
  js/
    config.js           <-- START HERE. Site URL, brand, CTA, points, email.
    ui.js               Small helpers. You will not need to touch this.
    icons.js            The icon set (from Iconoir). Inlined so it works offline.
    state.js            Saves progress in the browser.
    audio.js            All the sounds, generated live. No sound files needed.
    fx.js               Background, confetti, the scrambling title animation.
    engine.js           The unjumble mechanic itself.
    app.js              Screen flow and glue.
    data/
      categories.js     The five packs (name, icon, color, description).
      terms.js          <-- ALL 100 WORDS, CLUES, MEANINGS AND EXAMPLES.
      copy.js           Small bits of on screen text.
```

You will spend almost all of your editing time in just two files:
`js/config.js` (setup) and `js/data/terms.js` (the words).

---

## How to edit or add words (no coding needed)

Open `js/data/terms.js` in any text editor (Notepad works). Each word is a
block that looks like this:

```js
{
  term: "HALLUCINATION",
  clue: "Confidently wrong, and it will not blink.",
  definition: "When an AI states something false as if it were fact, because it is predicting likely words rather than checking truth.",
  example: "An AI inventing a book title that does not exist, complete with a made up author, is a hallucination.",
  category: "genai",
  icon: "cloud"
},
```

- `term` is the word players unscramble. Use CAPITAL LETTERS. Spaces are
  fine, they show as a gap and are never scrambled.
- `clue` is the teaser shown while they are solving. **Never put the word
  itself in the clue**, or you give the answer away.
- `definition` is the plain English meaning, shown after they solve it.
- `example` is one concrete, real life example.
- `category` decides the pack. It must match an `id` in `categories.js`
  (`basics`, `ml`, `genai`, `ethics`, `work`).
- `icon` is the little picture. Valid names are listed in `js/icons.js`.

**Golden rules when editing:**

1. Keep the quotation marks `"` around the text.
2. Keep the commas at the end of the lines.
3. Terms may only contain letters and spaces. No numbers, no punctuation.
4. Save the file, then refresh your browser to see the change.

If something breaks, you probably removed a quote or a comma. Undo your last
change and try again.

To add a whole new pack, add a block to `js/data/categories.js`, then give
some words that pack's `id` as their `category`.

---

## The setup values (config.js)

Open `js/config.js`. The important ones:

- `SITE_URL` and `SITE_URL_LABEL` — your website.
- `BRAND` — the product name and tagline.
- `CTA` — the exact call to action text and its button link.
- `POINTS` — the scoring numbers.
- `FORM_ENDPOINT` — where email signups go. See the next section.

---

## Collecting emails for real

By default, emails players submit are saved only in their own browser. To
actually collect them, you paste one link into `js/config.js`.

1. Make a free form at **Formspree** (formspree.io), **ConvertKit**, or
   **Mailchimp**. Formspree is the quickest.
2. Copy the form's endpoint URL. In Formspree it looks like
   `https://formspree.io/f/abcdwxyz`.
3. In `js/config.js`, put it between the quotes:

   ```js
   FORM_ENDPOINT: "https://formspree.io/f/abcdwxyz",
   ```

4. Save and re-upload. Signups now arrive in that form's inbox, along with
   how many words the player solved and their score.

---

## Sound

Every sound is generated in the browser, so there are no audio files to load
and nothing breaks offline. Players can mute with the speaker button, and the
choice is remembered. Browsers do not allow sound until someone interacts with
the page, so the first sound plays on the first tap.

To change how things sound, edit the `SOUNDS` block in `js/audio.js`.

---

## Accounts and sign in

There are none, by design. Anyone can open Unjumble AI and play immediately,
with no account and no internet. Progress is saved on the player's own device.

---

## Resetting all saved progress

Progress lives in each player's browser. If you change the game a lot and want
everyone to start clean, open `js/config.js` and change:

```js
STORAGE_PREFIX: "unjumble.v1."
```

to `"unjumble.v2."` (any new value). Everyone gets a fresh start.

---

## Putting it online

See **DEPLOY.md** for a short, non-technical guide.

---

## Notes for a future developer

Plain HTML, CSS, and JavaScript. No framework, no build step. Content is
separated from logic in `js/data/*`, and everything hangs off a single global
`UNJUMBLE` namespace.

- **State** (`js/state.js`) is the only place progress is read and written.
  Point `load()` and `save()` at an API to sync across devices.
- **Engine** (`js/engine.js`) exposes one entry point, `UNJUMBLE.runPuzzle`,
  driven by a small context object. A second puzzle type would be a second
  function plus a field on the term data.
- **Audio** (`js/audio.js`) is pure Web Audio, built lazily on first use and
  safe to call when muted or unsupported.
- **Branding** is config and CSS variable driven (`js/config.js`, top of
  `css/styles.css`), which makes a white label version straightforward.

Things the structure already allows for: shuffling word order, a daily word,
timed modes, a shared leaderboard, and per pack certificates.
