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
     FINAL CALL TO ACTION (shown on the finish screen)
  -------------------------------------------------------------------------- */
  CTA: {
    text: "Now you speak the language. Ready to actually build with AI?",
    buttonLabel: "Start here",
    href: "https://www.eddysailab.com"
  },

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
