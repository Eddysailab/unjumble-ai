/* ============================================================================
   UNJUMBLE AI - CONFIG
   ----------------------------------------------------------------------------
   This is the ONE file to edit for setup. Everything below is plain text you
   can safely change. Keep the quotes and the commas.
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

UNJUMBLE.config = {

  /* ==========================================================================
     !! READ THIS FIRST !!  EMAIL CAPTURE ENDPOINT
     ==========================================================================
     WHILE THIS IS EMPTY ("") NO EMAIL ADDRESS IS EVER COLLECTED. NOTHING IS
     SENT ANYWHERE, NOTHING IS STORED FOR YOU, AND EVERY SIGNUP IS LOST.

     The game will tell players that signup is not live yet, rather than
     thanking them for joining a list that does not exist. It also prints a
     warning in the browser console every time someone tries.

     To start collecting leads for real, paste a form endpoint between the
     quotes below. All of these have a free tier:
       - Formspree:  make a form, copy the URL that looks like
                     https://formspree.io/f/abcdwxyz
       - ConvertKit / Mailchimp: use their "custom form action" / API URL.

     When set, Unjumble AI sends { email, solved, score, pack, source } to
     that URL, and only then thanks the player.
  ========================================================================== */
  FORM_ENDPOINT: "",

  /* --------------------------------------------------------------------------
     YOUR SITE URL (used on the call to action button)
  -------------------------------------------------------------------------- */
  SITE_URL: "https://www.eddysailab.com",
  SITE_URL_LABEL: "www.eddysailab.com",

  /* --------------------------------------------------------------------------
     WHERE THIS GAME LIVES
     --------------------------------------------------------------------------
     Used for share links. This MUST match the og:url and canonical tags in
     index.html. If you move the game to a custom domain you have to change
     it in BOTH places, because social networks read the tags in index.html
     without ever running this file. The game warns in the browser console if
     the two ever drift apart.
  -------------------------------------------------------------------------- */
  SITE_ORIGIN: "https://eddysailab.github.io/unjumble-ai/",

  /* --------------------------------------------------------------------------
     ANALYTICS (optional, privacy friendly, no cookies, no consent banner)
     --------------------------------------------------------------------------
     Leave provider as "" and NOTHING is loaded and nothing is tracked. The
     game works exactly the same, you just cannot see how many people played.

     To switch it on, pick one:

       Plausible (plausible.io)
         provider: "plausible"
         domain:   "eddysailab.github.io"        <- the domain you registered
         src:      "https://plausible.io/js/script.js"

       Umami (umami.is)
         provider:  "umami"
         websiteId: "the id from your Umami dashboard"
         src:       "https://cloud.umami.is/script.js"

     Events sent: game_started, pack_started, word_solved, pack_completed,
     cta_clicked, email_submitted, result_shared.
  -------------------------------------------------------------------------- */
  ANALYTICS: {
    provider: "",     // "plausible", "umami", or "" for off
    domain: "",       // Plausible only
    websiteId: "",    // Umami only
    src: ""           // the script URL from your provider
  },

  /* --------------------------------------------------------------------------
     BRAND (change these to rebrand the whole game later)
  -------------------------------------------------------------------------- */
  BRAND: {
    productName: "UNJUMBLE AI",
    tagline: "BY EDDY'S AI LAB",
    maker: "Eddy's AI Lab"
  },

  /* --------------------------------------------------------------------------
     CALL TO ACTION
     --------------------------------------------------------------------------
     This is the fallback, and it is also the one used on the final finish
     screen. CTA_BY_PACK below overrides the wording per pack.
  -------------------------------------------------------------------------- */
  CTA: {
    text: "Now you speak the language. Ready to actually build with AI?",
    buttonLabel: "Start here",
    href: "https://www.eddysailab.com"
  },

  /* --------------------------------------------------------------------------
     CALL TO ACTION, WORDED PER PACK
     --------------------------------------------------------------------------
     Shown on the screen a player sees when they finish each pack. Keyed by the
     pack id from js/data/categories.js. Any pack with no entry here falls back
     to the CTA block above, so you can delete any of these safely.

     Each one picks up the thread of what they just learned. Keep them short,
     and keep the promise honest.
  -------------------------------------------------------------------------- */
  CTA_BY_PACK: {
    basics: {
      text: "You know the words now. The next step is using the tools without guessing.",
      buttonLabel: "See the beginner course",
      href: "https://www.eddysailab.com"
    },
    ml: {
      text: "That is what is under the hood of every AI tool you touch. Want to see it properly?",
      buttonLabel: "Go deeper",
      href: "https://www.eddysailab.com"
    },
    genai: {
      text: "These are the tools you can actually build with. We will show you how.",
      buttonLabel: "Start building",
      href: "https://www.eddysailab.com"
    },
    ethics: {
      text: "This is exactly what businesses are hiring for right now.",
      buttonLabel: "See what we teach",
      href: "https://www.eddysailab.com"
    },
    work: {
      text: "You are ready for the real thing. Come and put it to work.",
      buttonLabel: "Start here",
      href: "https://www.eddysailab.com"
    }
  },

  /* --------------------------------------------------------------------------
     SHARING
     --------------------------------------------------------------------------
     The text a player sends to friends. Keep it SHORT, it has to survive being
     pasted into a WhatsApp status or a TikTok comment.

     You can use any of these placeholders, and they are swapped for real
     numbers when the player taps share:
       {pack}    the pack they just finished, or "Unjumble AI" at the end
       {solved}  how many words they have solved
       {total}   how many words there are in total
       {points}  their score
       {streak}  their best streak
       {url}     the link to the game
  -------------------------------------------------------------------------- */
  SHARE: {
    title: "Unjumble AI",
    pack: "I just finished {pack} on Unjumble AI. {solved}/{total} AI words, {points} points. Think you can beat that? {url}",
    finish: "I unjumbled all {total} AI words. {points} points, best streak {streak}. Your turn. {url}"
  },

  /* --------------------------------------------------------------------------
     HOW MUCH OF A PACK OPENS THE NEXT ONE
     --------------------------------------------------------------------------
     0.7 means a player only has to solve 70 percent of a pack before the next
     one opens, so one word they cannot face never blocks the whole game.
     Set it to 1 to require every word. The first pack is always open.
  -------------------------------------------------------------------------- */
  UNLOCK_THRESHOLD: 0.7,

  /* --------------------------------------------------------------------------
     SCORING (kept gentle on purpose, there are no lives and no way to lose)
  -------------------------------------------------------------------------- */
  POINTS: {
    solve: 100,           // a word is worth 100 percent if you get it unaided
    perRevealCost: 2,     // each letter you reveal costs 2 percent of that 100
    definitionCost: 10,   // showing the meaning before you solve costs 10 percent
    minimum: 20,          // you always keep at least this much
    streakBonus: 10       // extra points per term in your current streak
  },

  /* --------------------------------------------------------------------------
     STORAGE KEY PREFIX (bump this to reset ALL saved progress for every player)
  -------------------------------------------------------------------------- */
  STORAGE_PREFIX: "unjumble.v1."
};
