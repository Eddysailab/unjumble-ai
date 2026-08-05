/* ============================================================================
   UNJUMBLE AI - CATEGORIES
   ----------------------------------------------------------------------------
   The five themed packs, played in this order. A pack unlocks once enough of
   the pack before it has been solved, set by UNLOCK_THRESHOLD in config.js.
   The first one is always unlocked.

   To add a pack: add a block here, then add terms with a matching "category"
   value in terms.js. The order in this file is the order players see.
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

UNJUMBLE.categories = [
  {
    id: "basics",
    title: "AI Basics",
    icon: "brain",
    accent: "green",
    blurb: "The words you hear every day. Start here if AI still sounds like another language."
  },
  {
    id: "ml",
    title: "Machine Learning",
    icon: "task-list",
    accent: "cyan",
    blurb: "How machines actually learn from examples, and what goes wrong when they learn badly."
  },
  {
    id: "genai",
    title: "Generative AI",
    icon: "sparks",
    accent: "purple",
    blurb: "The words behind the tools that write, draw, and talk. This is the stuff in the headlines."
  },
  {
    id: "ethics",
    title: "AI Ethics and Safety",
    icon: "lock",
    accent: "amber",
    blurb: "What can go wrong, who is responsible, and the words you need to talk about it."
  },
  {
    id: "work",
    title: "AI at Work",
    icon: "trophy",
    accent: "coral",
    blurb: "The words that come up in meetings, tool demos, and job ads. The practical end."
  }
];
