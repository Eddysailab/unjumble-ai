/* ============================================================================
   UNJUMBLE AI - STATE
   ----------------------------------------------------------------------------
   The single place progress is read and written. Everything lives in the
   player's own browser, so there are no accounts and nothing leaves the device.
   To sync across devices later, point load() and save() at an API instead.
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

(function () {
  var KEY = function () { return UNJUMBLE.config.STORAGE_PREFIX + "progress"; };

  var blank = {
    solved: {},     // { termId: true }
    score: 0,
    streak: 0,
    bestStreak: 0,
    theme: null,    // "light" | "dark" | null (follow the system)
    muted: false,   // sound on by default
    email: ""
  };

  var data = null;

  function load() {
    if (data) return data;
    data = { solved: {}, score: 0, streak: 0, bestStreak: 0, theme: null, muted: false, email: "" };
    try {
      var raw = window.localStorage.getItem(KEY());
      if (raw) {
        var parsed = JSON.parse(raw);
        for (var k in blank) {
          if (parsed[k] !== undefined) data[k] = parsed[k];
        }
      }
    } catch (e) { /* private mode or storage off, play without saving */ }
    return data;
  }

  function save() {
    try { window.localStorage.setItem(KEY(), JSON.stringify(load())); }
    catch (e) { /* nothing we can do, the game still plays */ }
  }

  UNJUMBLE.state = {
    get: load,
    save: save,

    // A stable id for a term, built from the word itself.
    termId: function (term) {
      return term.term.toLowerCase().replace(/[^a-z]+/g, "-");
    },

    isSolved: function (term) {
      return !!load().solved[UNJUMBLE.state.termId(term)];
    },

    markSolved: function (term, points) {
      var s = load();
      var id = UNJUMBLE.state.termId(term);
      if (!s.solved[id]) {
        s.solved[id] = true;
        s.score += points;
        s.streak += 1;
        if (s.streak > s.bestStreak) s.bestStreak = s.streak;
        save();
      }
      return s;
    },

    breakStreak: function () {
      var s = load();
      if (s.streak !== 0) { s.streak = 0; save(); }
    },

    // How many letters a player actually has to place (spaces are free).
    letterCount: function (term) {
      return term.term.replace(/ /g, "").length;
    },

    /* Every term in a category, easiest first.
       Short words open a pack and the long ones come last, so a beginner gets
       a run of quick wins before meeting anything like ACCOUNTABILITY. Length
       is the honest measure of how hard a word is to unscramble, whatever the
       idea behind it. Ties keep the order they have in terms.js, so any words
       you add slot themselves into the ramp automatically. */
    termsIn: function (categoryId) {
      var list = UNJUMBLE.terms.filter(function (t) { return t.category === categoryId; });
      return list
        .map(function (t, i) { return { term: t, i: i }; })
        .sort(function (a, b) {
          var d = UNJUMBLE.state.letterCount(a.term) - UNJUMBLE.state.letterCount(b.term);
          return d !== 0 ? d : a.i - b.i;
        })
        .map(function (x) { return x.term; });
    },

    solvedCountIn: function (categoryId) {
      return UNJUMBLE.state.termsIn(categoryId).filter(UNJUMBLE.state.isSolved).length;
    },

    isCategoryComplete: function (categoryId) {
      var list = UNJUMBLE.state.termsIn(categoryId);
      return list.length > 0 && UNJUMBLE.state.solvedCountIn(categoryId) === list.length;
    },

    // The first pack is always open. Every other pack needs the one before it.
    isCategoryUnlocked: function (categoryId) {
      var cats = UNJUMBLE.categories;
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].id !== categoryId) continue;
        if (i === 0) return true;
        return UNJUMBLE.state.isCategoryComplete(cats[i - 1].id);
      }
      return false;
    },

    // The next unsolved term in a pack, or null when the pack is done.
    nextTermIn: function (categoryId) {
      var list = UNJUMBLE.state.termsIn(categoryId);
      for (var i = 0; i < list.length; i++) {
        if (!UNJUMBLE.state.isSolved(list[i])) return list[i];
      }
      return null;
    },

    allComplete: function () {
      return UNJUMBLE.categories.every(function (c) {
        return UNJUMBLE.state.isCategoryComplete(c.id);
      });
    },

    totalSolved: function () {
      return UNJUMBLE.terms.filter(UNJUMBLE.state.isSolved).length;
    },

    setTheme: function (theme) { load().theme = theme; save(); },
    setMuted: function (muted) { load().muted = !!muted; save(); },
    setEmail: function (email) { load().email = email; save(); },

    // Wipes progress but keeps the player's theme and sound preferences.
    reset: function () {
      var keepTheme = load().theme, keepMuted = load().muted;
      data = { solved: {}, score: 0, streak: 0, bestStreak: 0, theme: keepTheme, muted: keepMuted, email: "" };
      save();
    }
  };
})();
