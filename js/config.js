/* ============================================================================
   UNJUMBLE AI - CONFIG
   ----------------------------------------------------------------------------
   This is the ONE file to edit for setup. Everything below is plain text you
   can safely change. Keep the quotes and the commas.
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

UNJUMBLE.config = {

  /* --------------------------------------------------------------------------
     EMAIL CAPTURE ENDPOINT
     --------------------------------------------------------------------------
     Leave this as "" (empty) and emails are only saved in the player's browser.
     To collect emails for real, paste a form endpoint URL between the quotes.

     Where to get one (all free tiers work):
       - Formspree:  make a form, copy the URL that looks like
                     https://formspree.io/f/abcdwxyz
       - ConvertKit / Mailchimp: use their "custom form action" / API URL.

     When set, Unjumble AI sends { email, solved, score } to this URL on signup.
  -------------------------------------------------------------------------- */
  FORM_ENDPOINT: "",

  /* --------------------------------------------------------------------------
     YOUR SITE URL (used on the call to action button)
  -------------------------------------------------------------------------- */
  SITE_URL: "https://www.eddysailab.com",
  SITE_URL_LABEL: "www.eddysailab.com",

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
