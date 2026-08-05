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

1. The player picks a pack. Packs unlock in order, but **not** by finishing
   one completely: solving **70 percent** of a pack (14 of its 20 words) opens
   the next one. That way a single word somebody cannot face never blocks the
   rest of the game. The locked pack tells them exactly how many are needed.
   Change `UNLOCK_THRESHOLD` in `js/config.js` to make it stricter or looser,
   and set it to `1` to go back to requiring every word.
2. A short clue appears, along with the word's letters, scrambled.
3. They tap the letters in order to spell the word.
4. Stuck? Two hints, both unlimited and both cheap:
   - **Reveal a letter** fills in the next correct letter.
   - **What does it mean?** shows the plain English meaning before they
     solve, which is usually the one that makes the word click.
5. Wrong order? The letters shake and drop back. Nothing else happens, and
   they can try again straight away.
6. Solved? They get the word's **meaning** and a **real life example**, plus
   points and a streak.

Points are 100 per word, minus 2 percent for each letter revealed and 10
percent for the meaning, never below 20, plus a small streak bonus. You can
change all of those numbers in `js/config.js`.

**Words get harder as you go.** Inside every pack the game orders words by
length, shortest first, so a pack opens with four and five letter words and
works up to the long ones. That happens automatically, so any word you add
slots itself into the right place without you thinking about it.

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

> **Until you do this, no email is collected. Ever.**
> Out of the box `FORM_ENDPOINT` is empty, so there is nowhere for a signup to
> go. The game does not pretend otherwise: it tells the player "signup is not
> live yet" instead of thanking them, and prints a warning in the browser
> console. Nothing is silently lost without a trace, but nothing is captured
> either. **Do the four steps below before you share the game anywhere.**

To actually collect them, you paste one link into `js/config.js`.

1. Make a free form at **Formspree** (formspree.io), **ConvertKit**, or
   **Mailchimp**. Formspree is the quickest.
2. Copy the form's endpoint URL. In Formspree it looks like
   `https://formspree.io/f/abcdwxyz`.
3. In `js/config.js`, put it between the quotes:

   ```js
   FORM_ENDPOINT: "https://formspree.io/f/abcdwxyz",
   ```

4. Save and re-upload. Signups now arrive in that form's inbox, along with
   how many words the player solved, their score, and which pack they were on
   when they signed up.

**How to check it worked:** open the live game, scroll to a signup box, enter
your own address and submit. You should see "You are on the list." If you see
"Signup is not live yet", the endpoint is still empty. If you see "That did
not send", the endpoint is wrong or the service is down.

---

## Where the game asks for the sale

There are two moments, and both matter more than the game itself.

**After every pack** (five chances, not one) the player sees a share button,
a call to action pointing at your site, and a signup box. The wording of the
call to action changes per pack, so it picks up whatever they just learned.
Edit those five in `CTA_BY_PACK` in `js/config.js`. Any pack you delete from
that list quietly falls back to the main `CTA` block.

**On the finish screen** they get the strongest version, outlined in green so
it does not read as the same card a sixth time.

Once somebody has signed up, the signup box never appears again. They just see
the call to action. Nobody gets asked twice.

**Sharing** uses the phone's own share sheet where there is one, falls back to
copying to the clipboard, and falls back again to a box with the text already
selected. The wording lives in the `SHARE` block in `js/config.js`, where
`{pack}`, `{solved}`, `{total}`, `{points}`, `{streak}` and `{url}` are
swapped for real numbers. Keep it short enough to paste into a WhatsApp
status.

---

## The share picture

When someone shares the link on WhatsApp, LinkedIn or X, they should see a
picture, not a bare link. That picture is a file called `og.png` sitting next
to `index.html`.

**To create or update it:**

1. Open `og.html` (in this folder) in Chrome. It draws the card for you.
2. Press `F12` to open developer tools.
3. Press `Ctrl+Shift+P` (`Cmd+Shift+P` on a Mac), type `screenshot`, and pick
   **Capture node screenshot**, having first clicked the black card.
4. Save the image as **`og.png`**, right next to `index.html`, and upload it.

It must be exactly **1200 x 630** pixels. `og.html` is already that size, so a
node screenshot gives you the right dimensions automatically.

To change the wording on the card, edit the text inside `og.html` and repeat.

---

## Seeing how many people play

Nothing is tracked by default. No cookies, no consent banner, nothing loaded.

To switch it on, sign up with **Plausible** (plausible.io) or **Umami**
(umami.is), both privacy friendly, then fill in the `ANALYTICS` block in
`js/config.js`. The comments in that file tell you exactly which boxes to
fill for each service. Leave `provider` empty and nothing is ever loaded.

Once on, you will see these moments in your dashboard:

| Event | What it means |
| --- | --- |
| `game_started` | Someone pressed start on the welcome screen |
| `pack_started` | Someone opened a pack |
| `word_solved` | Someone solved a word |
| `pack_completed` | Someone finished a whole pack |
| `cta_clicked` | Someone clicked through to your site |
| `email_submitted` | Someone actually joined the list |
| `result_shared` | Someone shared their score |

The two that matter for the business are `cta_clicked` and `email_submitted`.

---

## Moving to your own web address

The game's address is written in **two** places, and both must match:

1. `SITE_ORIGIN` in `js/config.js`
2. The `canonical`, `og:url`, `og:image` and `twitter:image` tags near the top
   of `index.html`

They are in two places because social networks read `index.html` directly
without running any code, so the address has to be spelled out there. If the
two ever disagree, the game prints a warning in the browser console telling
you so.

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
