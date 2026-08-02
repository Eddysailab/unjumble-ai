/* ============================================================================
   UNJUMBLE AI - APP (screen flow and glue)
   ----------------------------------------------------------------------------
   Screens: welcome -> packs -> puzzle (repeating) -> pack complete -> finish.
   Everything renders into #screen. The score strip and top bar live outside it.
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

(function () {
  var el = UNJUMBLE.dom.el;
  var clear = UNJUMBLE.dom.clear;
  var icon = UNJUMBLE.icon;

  var screen, hud, brandbar, themeBtn, soundBtn;
  var session = null;        // { category, list, index }
  var sinceNudge = 0;        // words solved since the mascot last showed up
  var lastNudge = -1;        // so he does not repeat the same line twice running

  /* ------------------------------- setup ------------------------------- */
  function init() {
    screen = document.getElementById("screen");
    hud = document.getElementById("hud");
    brandbar = document.getElementById("brandbar");
    themeBtn = document.getElementById("theme-toggle");
    soundBtn = document.getElementById("sound-toggle");

    applyTheme(UNJUMBLE.state.get().theme);
    themeBtn.addEventListener("click", toggleTheme);

    renderSoundBtn();
    soundBtn.addEventListener("click", function () {
      UNJUMBLE.audio.toggle();
      renderSoundBtn();
    });

    renderBrand();
    UNJUMBLE.initBackground();
    showWelcome();
  }

  function renderSoundBtn() {
    var muted = UNJUMBLE.audio.isMuted();
    soundBtn.innerHTML = icon(muted ? "sound-off" : "sound-high");
    soundBtn.classList.toggle("off", muted);
    soundBtn.setAttribute("aria-pressed", muted ? "true" : "false");
    soundBtn.setAttribute("aria-label", muted ? "Turn sound on" : "Turn sound off");
  }

  function renderBrand() {
    var B = UNJUMBLE.config.BRAND;
    clear(brandbar);
    var mark = el("button", "brand", null, { type: "button", "aria-label": "Back to the start" });
    mark.appendChild(el("span", "brand-mark", icon("sparks")));
    var words = el("span", "brand-words");
    words.appendChild(el("span", "brand-name", null, { text: B.productName }));
    words.appendChild(el("span", "brand-tag", null, { text: B.tagline }));
    mark.appendChild(words);
    mark.addEventListener("click", showWelcome);
    brandbar.appendChild(mark);
  }

  /* ------------------------------- theme ------------------------------- */
  function systemDark() {
    try { return window.matchMedia("(prefers-color-scheme: dark)").matches; }
    catch (e) { return false; }
  }

  function applyTheme(theme) {
    var dark = theme ? theme === "dark" : systemDark();
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    if (themeBtn) {
      themeBtn.innerHTML = icon(dark ? "sun-light" : "half-moon");
      themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0D120A" : "#EEF5E4");
  }

  function toggleTheme() {
    var now = document.documentElement.getAttribute("data-theme") === "dark";
    var next = now ? "light" : "dark";
    UNJUMBLE.state.setTheme(next);
    applyTheme(next);
  }

  /* -------------------------------- HUD -------------------------------- */
  function renderHud(show) {
    if (!show) { hud.hidden = true; return; }
    var s = UNJUMBLE.state.get();
    hud.hidden = false;
    hud.innerHTML =
      '<span class="hud-stat"><span class="ui-ic">' + icon("star") + '</span>' +
        '<b>' + s.score + '</b> points</span>' +
      '<span class="hud-stat"><span class="ui-ic">' + icon("check-circle") + '</span>' +
        '<b>' + UNJUMBLE.state.totalSolved() + '</b> of ' + UNJUMBLE.terms.length + ' words</span>' +
      '<span class="hud-stat' + (s.streak > 1 ? " hot" : "") + '"><span class="ui-ic">' + icon("fire-flame") + '</span>' +
        '<b>' + s.streak + '</b> streak</span>';
  }

  /* ---------------------------- screen: welcome ------------------------ */
  function showWelcome() {
    session = null;
    clear(screen);
    var started = UNJUMBLE.state.totalSolved() > 0;
    renderHud(started);

    var C = UNJUMBLE.copy;
    var wrap = el("div", "hero fade-up");

    // The game's name, scrambling and unscrambling itself on a loop. The
    // animation is kicked off after the screen is mounted, further down.
    var mark = el("div", "hero-word", "", { "aria-label": UNJUMBLE.config.BRAND.productName, role: "img" });
    wrap.appendChild(mark);

    wrap.appendChild(el("div", "hero-badge",
      '<span class="ui-ic">' + icon("sparks") + '</span>' + UNJUMBLE.terms.length + " AI words to crack"));
    wrap.appendChild(el("h1", "hero-title", null, { text: C.welcomeTitle }));
    wrap.appendChild(el("p", "hero-lead", null, { text: C.welcomeLead }));

    var go = el("button", "btn primary big",
      (started ? C.welcomeContinue : C.welcomeStart) +
      '<span class="btn-ic">' + icon("nav-arrow-right") + '</span>', { type: "button" });
    go.addEventListener("click", showPacks);
    wrap.appendChild(go);

    var how = el("div", "how-card");
    how.appendChild(el("div", "how-title",
      '<span class="howto-ic">' + icon("light-bulb") + '</span>' + C.welcomeHowTitle));
    var ul = el("ul", "how-list");
    C.welcomeHow.forEach(function (line) {
      ul.appendChild(el("li", null, null, { text: line }));
    });
    how.appendChild(ul);
    wrap.appendChild(how);

    screen.appendChild(wrap);
    // Now that the wordmark is on the page, let it start scrambling.
    UNJUMBLE.heroWord(mark, UNJUMBLE.config.BRAND.productName);
  }

  /* ----------------------------- screen: packs ------------------------- */
  function showPacks() {
    session = null;
    clear(screen);
    renderHud(true);

    var C = UNJUMBLE.copy;
    var wrap = el("div", "packs fade-up");
    wrap.appendChild(el("h2", "screen-title", null, { text: C.packsTitle }));
    wrap.appendChild(el("p", "screen-lead", null, { text: C.packsLead }));

    var grid = el("div", "pack-grid");
    var cards = [];

    UNJUMBLE.categories.forEach(function (cat) {
      var total = UNJUMBLE.state.termsIn(cat.id).length;
      var done = UNJUMBLE.state.solvedCountIn(cat.id);
      var unlocked = UNJUMBLE.state.isCategoryUnlocked(cat.id);
      var complete = UNJUMBLE.state.isCategoryComplete(cat.id);

      var b = el("button", "pack-card accent-" + cat.accent + (unlocked ? "" : " locked"),
        null, { type: "button" });

      var top = el("div", "pack-top");
      top.appendChild(el("span", "pack-icon", icon(unlocked ? cat.icon : "lock", { size: 26 })));
      if (complete) {
        top.appendChild(el("span", "pack-done", '<span class="ui-ic">' + icon("check-circle") + '</span>Done'));
      }
      b.appendChild(top);

      b.appendChild(el("span", "pack-title", null, { text: cat.title }));
      b.appendChild(el("span", "pack-blurb", null, { text: unlocked ? cat.blurb : C.lockedNote }));

      var bar = el("span", "pack-bar");
      bar.appendChild(el("span", "pack-fill", "", {
        style: "width:" + (total ? Math.round((done / total) * 100) : 0) + "%"
      }));
      b.appendChild(bar);
      b.appendChild(el("span", "pack-count", done + " of " + total + " solved"));

      if (unlocked) b.addEventListener("click", function () { startPack(cat.id); });
      else { b.disabled = true; b.setAttribute("aria-disabled", "true"); }

      cards.push(b);
      grid.appendChild(b);
    });

    wrap.appendChild(grid);

    if (UNJUMBLE.state.allComplete()) {
      var fin = el("button", "btn primary big",
        '<span class="btn-ic">' + icon("trophy") + '</span>See your finish card', { type: "button" });
      fin.addEventListener("click", showFinish);
      wrap.appendChild(fin);
    }

    screen.appendChild(wrap);
    UNJUMBLE.dom.stagger(cards, 70);
  }

  /* ---------------------------- screen: puzzle ------------------------- */
  function startPack(categoryId) {
    var list = UNJUMBLE.state.termsIn(categoryId);
    var start = 0;
    for (var i = 0; i < list.length; i++) {
      if (!UNJUMBLE.state.isSolved(list[i])) { start = i; break; }
    }
    session = { category: categoryId, list: list, index: start };
    sinceNudge = 0;
    showPuzzle();
  }

  function showPuzzle() {
    clear(screen);
    renderHud(true);

    var term = session.list[session.index];

    var bar = el("div", "backbar");
    var back = el("button", "link-btn",
      '<span class="ui-ic">' + icon("arrow-left") + '</span>All packs', { type: "button" });
    back.addEventListener("click", showPacks);
    bar.appendChild(back);
    screen.appendChild(bar);

    var host = el("div", "puzzle-host");
    screen.appendChild(host);

    UNJUMBLE.runPuzzle(term, host, {
      index: session.index,
      total: session.list.length,
      category: session.category,
      solved: function (t, points) {
        UNJUMBLE.state.markSolved(t, points);
        renderHud(true);
      },
      onMiss: function () { renderHud(true); },
      next: function () {
        session.index++;
        if (session.index >= session.list.length) { showPackDone(); return; }
        // The mascot drops in between words, but only now and then.
        if (shouldNudge()) showNudge(showPuzzle);
        else showPuzzle();
      }
    });
  }

  /* --------------------- screen: the mascot's nudge --------------------
     He shows up between words to say the player is doing well and to point
     at what is still locked. He is deliberately rationed: never before the
     player has some momentum, never twice close together, and only about a
     third of the time even when he is allowed. That works out at roughly
     three appearances across a twenty word pack.
  --------------------------------------------------------------------- */
  function shouldNudge() {
    if (!session) return false;
    var i = session.index;                       // the word about to be shown
    if (i <= 1 || i >= session.list.length) return false;

    sinceNudge++;
    var halfway = Math.floor(session.list.length / 2);

    // Always mark the halfway point of a pack, if he has been quiet a while.
    if (i === halfway && sinceNudge >= 3) return true;
    // Otherwise, occasionally, and never fewer than four words apart.
    if (sinceNudge >= 4 && Math.random() < 0.34) return true;
    return false;
  }

  // A line about where the player actually is, under the headline.
  function nudgeProgressLine() {
    var s = UNJUMBLE.state.get();
    var list = session.list;
    var done = list.filter(UNJUMBLE.state.isSolved).length;
    var left = list.length - done;

    var cat = UNJUMBLE.categories.filter(function (c) { return c.id === session.category; })[0];
    var next = UNJUMBLE.categories[UNJUMBLE.categories.indexOf(cat) + 1];

    // Nearly done with the pack beats everything else, it is the best push.
    if (left > 0 && left <= 3) {
      return "Only " + left + " word" + (left === 1 ? "" : "s") + " left in this pack.";
    }

    // Otherwise gather everything true right now and pick one, so a player on
    // a long clean run does not read the same sentence every single time.
    var options = [];
    if (s.streak >= 5) {
      options.push(s.streak + " in a row. Every one you get without a reveal is worth more.");
    }
    if (next && !UNJUMBLE.state.isCategoryUnlocked(next.id)) {
      options.push("Finish this pack and you unlock " + next.title + ".");
    }
    options.push(done + " of " + list.length + " done in this pack, and " +
                 UNJUMBLE.state.totalSolved() + " of " + UNJUMBLE.terms.length + " overall.");
    options.push(left + " more and this pack is yours.");

    return options[Math.floor(Math.random() * options.length)];
  }

  function showNudge(afterFn) {
    sinceNudge = 0;
    clear(screen);
    renderHud(true);

    var C = UNJUMBLE.copy;
    // Pick a line, but not the one he used last time.
    var i = Math.floor(Math.random() * C.nudges.length);
    if (C.nudges.length > 1 && i === lastNudge) i = (i + 1) % C.nudges.length;
    lastNudge = i;

    var wrap = el("div", "nudge fade-up");
    wrap.appendChild(el("div", "mascot-wrap", UNJUMBLE.mascot({ size: 186 })));
    wrap.appendChild(el("h2", "nudge-title", null, { text: C.nudges[i] }));
    wrap.appendChild(el("p", "nudge-sub", null, { text: nudgeProgressLine() }));

    var go = el("button", "btn primary big",
      C.nudgeBtn + '<span class="btn-ic">' + icon("nav-arrow-right") + '</span>', { type: "button" });
    go.addEventListener("click", function () {
      UNJUMBLE.audio.play("click");
      afterFn();
    });
    wrap.appendChild(go);

    screen.appendChild(wrap);
    go.focus();
  }

  /* -------------------------- screen: pack done ------------------------ */
  function showPackDone() {
    clear(screen);
    renderHud(true);

    var C = UNJUMBLE.copy;
    var cat = UNJUMBLE.categories.filter(function (c) { return c.id === session.category; })[0];
    var idx = UNJUMBLE.categories.indexOf(cat);
    var nextCat = UNJUMBLE.categories[idx + 1];

    UNJUMBLE.audio.play("complete");
    UNJUMBLE.confetti(110);

    var wrap = el("div", "hero fade-up");
    wrap.appendChild(el("div", "hero-badge accent-" + cat.accent,
      '<span class="ui-ic">' + icon("trophy") + '</span>' + C.packDoneTitle));
    wrap.appendChild(el("h1", "hero-title", null, { text: cat.title }));
    wrap.appendChild(el("p", "hero-lead", null, { text: C.packDoneLead }));

    // A quick recap of every word in the pack.
    var recap = el("div", "recap");
    session.list.forEach(function (t) {
      recap.appendChild(el("span", "recap-chip",
        '<span class="ui-ic">' + icon(t.icon || "check-circle") + '</span>' +
        UNJUMBLE.dom.escape(t.term)));
    });
    wrap.appendChild(recap);

    if (UNJUMBLE.state.allComplete()) {
      var fin = el("button", "btn primary big",
        '<span class="btn-ic">' + icon("trophy") + '</span>See your finish card', { type: "button" });
      fin.addEventListener("click", showFinish);
      wrap.appendChild(fin);
    } else if (nextCat && UNJUMBLE.state.isCategoryUnlocked(nextCat.id)) {
      var go = el("button", "btn primary big",
        C.nextPack + '<span class="btn-ic">' + icon("nav-arrow-right") + '</span>', { type: "button" });
      go.addEventListener("click", function () { startPack(nextCat.id); });
      wrap.appendChild(go);
    }

    var backBtn = el("button", "btn ghost", C.backToPacks, { type: "button" });
    backBtn.addEventListener("click", showPacks);
    wrap.appendChild(backBtn);

    screen.appendChild(wrap);
  }

  /* ---------------------------- screen: finish ------------------------- */
  function showFinish() {
    session = null;
    clear(screen);
    renderHud(true);

    var C = UNJUMBLE.copy;
    var cfg = UNJUMBLE.config;
    var s = UNJUMBLE.state.get();

    UNJUMBLE.audio.play("complete");
    UNJUMBLE.confetti(140);

    var wrap = el("div", "hero fade-up");
    wrap.appendChild(el("div", "mascot-wrap", UNJUMBLE.mascot({ size: 170 })));
    wrap.appendChild(el("div", "hero-badge",
      '<span class="ui-ic">' + icon("trophy") + '</span>Every word solved'));
    wrap.appendChild(el("h1", "hero-title", null, { text: C.finishTitle }));
    wrap.appendChild(el("p", "hero-lead", null, { text: C.finishLead }));

    var stats = el("div", "finish-stats");
    stats.appendChild(statTile("star", s.score, "points"));
    stats.appendChild(statTile("check-circle", UNJUMBLE.state.totalSolved(), "words"));
    stats.appendChild(statTile("fire-flame", s.bestStreak, "best streak"));
    wrap.appendChild(stats);

    // Call to action back to the site.
    var cta = el("div", "cta-card");
    cta.appendChild(el("p", "cta-text", null, { text: cfg.CTA.text }));
    var ctaBtn = el("a", "btn primary big",
      cfg.CTA.buttonLabel + '<span class="btn-ic">' + icon("nav-arrow-right") + '</span>',
      { href: cfg.CTA.href, target: "_blank", rel: "noopener" });
    cta.appendChild(ctaBtn);
    wrap.appendChild(cta);

    wrap.appendChild(buildEmailForm());

    var again = el("button", "link-btn",
      '<span class="ui-ic">' + icon("refresh-double") + '</span>' + C.playAgain, { type: "button" });
    again.addEventListener("click", function () {
      UNJUMBLE.state.reset();
      showWelcome();
    });
    wrap.appendChild(again);

    screen.appendChild(wrap);
  }

  function statTile(iconName, value, label) {
    var t = el("div", "stat-tile");
    t.appendChild(el("span", "stat-ic", icon(iconName, { size: 22 })));
    t.appendChild(el("span", "stat-num", null, { text: String(value) }));
    t.appendChild(el("span", "stat-lab", null, { text: label }));
    return t;
  }

  function buildEmailForm() {
    var C = UNJUMBLE.copy;
    var cfg = UNJUMBLE.config;
    var box = el("div", "email-card");
    box.appendChild(el("p", "email-label", null, { text: C.emailLabel }));

    var form = el("form", "email-form");
    var input = el("input", "email-input", null, {
      type: "email", required: "required", placeholder: C.emailPlaceholder, "aria-label": "Your email address"
    });
    var send = el("button", "btn primary", C.emailBtn, { type: "submit" });
    form.appendChild(input);
    form.appendChild(send);

    var note = el("p", "email-note", "", { "aria-live": "polite" });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = input.value.trim();
      if (!value) return;
      UNJUMBLE.state.setEmail(value);
      send.disabled = true;
      input.disabled = true;
      note.textContent = C.emailThanks;

      if (cfg.FORM_ENDPOINT) {
        try {
          window.fetch(cfg.FORM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
              email: value,
              solved: UNJUMBLE.state.totalSolved(),
              score: UNJUMBLE.state.get().score
            })
          })["catch"](function () { /* saved locally either way */ });
        } catch (err) { /* saved locally either way */ }
      }
    });

    box.appendChild(form);
    box.appendChild(note);
    return box;
  }

  UNJUMBLE.app = { init: init, showWelcome: showWelcome, showPacks: showPacks };
})();
