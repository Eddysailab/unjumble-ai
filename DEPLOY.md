# Put Unjumble AI online (one page, non-technical)

Unjumble AI is a plain static website, so hosting is free and takes a few
minutes. It is already set up to publish itself from GitHub, which is the
first option below.

---

## Option 1: GitHub Pages (already set up)

This repo publishes automatically. **Every time a change is pushed to the
`main` branch, the live site updates by itself**, usually within a minute.

The live address is:

```
https://eddysailab.github.io/unjumble-ai/
```

You do not have to do anything for this to keep working. If the page ever
says "There isn't a GitHub Pages site here", Pages was switched off. Turn it
back on in the repo under **Settings > Pages**, choosing branch `main` and
folder `/ (root)`.

---

## Option 2: Netlify Drop (drag and drop, no account needed)

1. Go to **https://app.netlify.com/drop** in your browser.
2. Open your file explorer and find the **`unjumble-ai`** folder.
3. **Drag the whole folder** onto the Netlify Drop page.
4. Wait a few seconds. Netlify gives you a live link like
   `https://your-random-name.netlify.app`.

To use a nicer address, create a free Netlify account (a "Claim" button
appears after your first drop), then under **Site settings > Domain** you can
rename it or connect something like `play.eddysailab.com`.

**To update it later:** make your edits, then drag the folder on again.

---

## Hosting it under your existing website

If you already run **www.eddysailab.com**, you can host the game at
`www.eddysailab.com/unjumble-ai` by uploading the folder into your website's
files (via your host's file manager or FTP), next to your existing pages. All
the links inside the game are relative, so it works fine in a subfolder.

---

## After it is live: a 3 point checklist

1. **Turn on email collection.** Open `js/config.js`, paste your form endpoint
   into `FORM_ENDPOINT` (see README), and push the change. Without this,
   signups are only saved in the player's own browser.
2. **Check the link.** The "Start here" button points to `CTA.href` in
   `js/config.js`. Make sure that is your real site.
3. **Play it once on your phone, with the sound on.** The game is built for
   phones, which is where most people will play and share it.

That is it. A free game online that teaches AI and sends people to your site.
