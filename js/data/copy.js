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
    "On a computer you can just type. Backspace undoes, Escape clears.",
    "Stuck? Reveal a letter, or ask what the word means. Both cost a little.",
    "Get it wrong and nothing bad happens. The letters just go back.",
    "Solve it and you get the meaning, plus a real example of it in use."
  ],

  // Category picker
  packsTitle: "Pick a pack",
  packsLead: "Work through them in order. Each one unlocks the next.",
  // {n} is how many words are needed, {total} is how many the pack above holds.
  // Both are worked out from UNLOCK_THRESHOLD in config.js, never hardcoded.
  lockedNote: "Solve {n} of {total} in the pack above to open this one.",

  // Puzzle screen
  clueLabel: "The clue",
  revealBtn: "Reveal a letter",
  clearBtn: "Clear",
  defineBtn: "What does it mean?",
  defineLabel: "The meaning",
  skipBtn: "Skip for now",
  // Shown when a player revealed every letter of a word.
  gaveUpNote: "Every letter was revealed on that one, so it scores the minimum and the streak resets. You still learned the word, which is the point.",
  // {n} and {d} are filled in from POINTS in config.js
  revealCostNote: "A letter costs {n} percent, the meaning costs {d}. Use as many as you need.",
  solvedHead: "You got it",
  meansLabel: "What it means",
  exampleLabel: "In real life",
  nextBtn: "Next word",
  lastBtn: "Finish this pack",
  wrongNudge: "Not that one. Try a different order.",
  // {letter} is the key they pressed that is not in this word.
  noSuchLetter: "No {letter} left in this word.",
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

  // Sharing
  shareBtn: "Share your score",
  shareCopied: "Copied. Paste it anywhere.",
  shareSelectHint: "Press copy on your keyboard to grab this.",
  shareFailed: "Could not copy automatically. Select the text above.",

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
  emailPrivacy: "We will only email you about AI training. Unsubscribe any time.",
  emailSending: "Sending...",
  emailThanks: "You are on the list.",
  // Shown when FORM_ENDPOINT in config.js is still empty. Never thank someone
  // for joining a list that does not exist.
  emailNoEndpoint: "Signup is not live yet. Nothing was sent, please check back soon.",
  emailRetry: "That did not send. Please try again in a moment.",
  playAgain: "Play again from scratch"
};
