/* ============================================================================
   UNJUMBLE AI - COPY
   ----------------------------------------------------------------------------
   Small bits of on screen text, all in one place so they are easy to reword.
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

UNJUMBLE.copy = {
  // Welcome screen
  welcomeTitle: "Everyone is throwing AI words around.",
  welcomeLead: "Here is the game that makes them stick. Unscramble the word, then find out what it actually means, in plain English.",
  welcomeStart: "Start unjumbling",
  welcomeContinue: "Keep going",
  welcomeHowTitle: "How it works",
  welcomeHow: [
    "Read the clue, then tap the letters in the right order.",
    "Stuck? Reveal a letter. It is free, and you can do it as often as you like.",
    "Get it wrong and nothing bad happens. The letters just go back.",
    "Solve it and you get the meaning, plus a real example of it in use."
  ],

  // Category picker
  packsTitle: "Pick a pack",
  packsLead: "Work through them in order. Each one unlocks the next.",
  lockedNote: "Finish the pack above to open this one.",

  // Puzzle screen
  clueLabel: "The clue",
  revealBtn: "Reveal a letter",
  clearBtn: "Clear",
  defineBtn: "What does it mean?",
  defineLabel: "The meaning",
  // {n} and {d} are filled in from POINTS in config.js
  revealCostNote: "A letter costs {n} percent, the meaning costs {d}. Use as many as you need.",
  solvedHead: "You got it",
  meansLabel: "What it means",
  exampleLabel: "In real life",
  nextBtn: "Next word",
  lastBtn: "Finish this pack",
  wrongNudge: "Not that one. Try a different order.",
  allRevealedNote: "Revealed for you. Read it, then move on.",

  /* --------------------------------------------------------------------------
     THE MASCOT'S NUDGES
     --------------------------------------------------------------------------
     He turns up between words now and then to keep the player going. One of
     these headlines is picked at random each time, so add as many as you like.
     Keep them short, warm, and never smug.
  -------------------------------------------------------------------------- */
  nudgeBtn: "Keep going",
  nudges: [
    "You are on a roll.",
    "Look at you go.",
    "That is another one you will not forget.",
    "You are getting quick at this.",
    "Nice work. Keep it rolling.",
    "You are building real vocabulary here.",
    "Every word here is one you will actually hear.",
    "This is the good stuff. Keep going.",
    "You are further along than you think.",
    "Somebody has been paying attention."
  ],

  // Pack complete
  packDoneTitle: "Pack complete",
  packDoneLead: "You just added these words to your vocabulary for good.",
  backToPacks: "Back to the packs",
  nextPack: "Start the next pack",

  // Finish screen
  finishTitle: "You unjumbled every last one.",
  finishLead: "One hundred AI words, decoded. You can now read the headlines, sit in the meetings, and know exactly what people mean.",
  emailLabel: "Want more where this came from?",
  emailPlaceholder: "your@email.com",
  emailBtn: "Send it over",
  emailThanks: "You are on the list.",
  playAgain: "Play again from scratch"
};
