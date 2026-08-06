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
  var sinceNudge = 0;        // words solved since the last encouragement screen
  var lastNudge = -1;        // so he does not repeat the same line twice running

  /* ------------------------------ analytics -----------------------------
     One funnel event helper. When ANALYTICS.provider in config.js is empty
     this does nothing at all, so the game is identical with tracking off.
     It never throws, because losing a stat must never break a game.
  --------------------------------------------------------------------- */
  function track(name, props) {
    var a = (UNJUMBLE.config && UNJUMBLE.config.ANALYTICS) || {};
    if (!a.provider) return;
    try {
      if (window.plausible) {
        window.plausible(name, props ? { props: props } : undefined);
      } else if (window.umami && typeof window.umami.track === "function") {
        window.umami.track(name, props || {});
      }
    } catch (e) { /* analytics is never worth an error */ }
  }
  UNJUMBLE.track = track;   // so engine.js can report a solved word

  /* Warn if the share URL in config has drifted from the tags social
     networks actually read out of index.html. */
  function checkOrigin() {
    try {
      var canonical = document.querySelector('link[rel="canonical"]');
      var cfgOrigin = UNJUMBLE.config.SITE_ORIGIN;
      if (canonical && cfgOrigin && canonical.href !== cfgOrigin && window.console && console.warn) {
        console.warn("[Unjumble AI] SITE_ORIGIN in js/config.js (" + cfgOrigin + ") does not match " +
          "the canonical link in index.html (" + canonical.href + "). Update both when the game moves.");
      }
    } catch (e) { /* nothing worth breaking for */ }
  }

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
    checkOrigin();
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
    go.addEventListener("click", function () {
      track("game_started", { returning: started });
      showPacks();
    });
    wrap.appendChild(go);

    var how = el("div", "how-card");
    how.appendChild(el("div", "how-title",
      '<span class="howto-ic">' + icon("light-bulb") + '</span>' + C.welcomeHowTitle));
    var ul = el("ul", "how-list");
    var P = UNJUMBLE.config.POINTS;
    C.welcomeHow.forEach(function (line) {
      // Costs come from config, so this list can never claim a hint is free.
      ul.appendChild(el("li", null, null, {
        text: line.replace("{n}", P.perRevealCost).replace("{d}", P.definitionCost)
      }));
    });
    how.appendChild(ul);
    wrap.appendChild(how);

    screen.appendChild(wrap);
    // Now that the wordmark is on the page, let it start scrambling.
    UNJUMBLE.heroWord(mark, UNJUMBLE.config.BRAND.productName);
  }

  /* Tells a locked pack exactly what it is waiting for, using the real
     numbers rather than a hardcoded sentence. */
  function lockedNoteFor(categoryId) {
    var prev = UNJUMBLE.state.previousCategory(categoryId);
    if (!prev) return UNJUMBLE.copy.lockedNote;
    return UNJUMBLE.copy.lockedNote
      .replace("{n}", UNJUMBLE.state.unlockTargetFor(prev.id))
      .replace("{total}", UNJUMBLE.state.termsIn(prev.id).length);
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
      b.appendChild(el("span", "pack-blurb", null, { text: unlocked ? cat.blurb : lockedNoteFor(cat.id) }));

      var bar = el("span", "pack-bar");
      bar.appendChild(el("span", "pack-fill", "", {
        style: "transform:scaleX(" + (total ? (done / total).toFixed(3) : 0) + ")"
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
    track("pack_started", { pack: categoryId });
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
      // Nothing to skip to if this is the last word left in the queue.
      canSkip: session.index < session.list.length - 1,
      skip: function () {
        // Move it to the back of the queue. The next word slides into place,
        // so the index stays where it is. No points, no streak change.
        var moved = session.list.splice(session.index, 1)[0];
        session.list.push(moved);
        showPuzzle();
      },
      solved: function (t, points, anchorEl, opts) {
        UNJUMBLE.state.markSolved(t, points, opts);
        track("word_solved", {
          pack: session.category, term: t.term, points: points,
          gaveUp: !!(opts && opts.gaveUp)
        });
        renderHud(true);
      },
      onMiss: function () { renderHud(true); },
      next: function () {
        session.index++;
        if (session.index >= session.list.length) { showPackDone(); return; }
        // A short encouragement screen drops in, but only now and then.
        if (shouldNudge()) showNudge(showPuzzle);
        else showPuzzle();
      }
    });
  }

  /* ---------------------- screen: the encouragement --------------------
     A short screen between words telling the player they are doing well and
     pointing at what is still locked. It is deliberately rationed: never
     before the player has some momentum, never twice close together, and
     only about a third of the time even when allowed. That works out at
     two to four appearances across a twenty word pack.
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
    wrap.appendChild(el("div", "nudge-badge", icon("fire-flame", { size: 34 })));
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

    track("pack_completed", { pack: session.category });
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

    // Share while the win is still fresh, then the pitch.
    wrap.appendChild(buildShareButton(session.category));
    appendLeadCapture(wrap, session.category);

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
    wrap.appendChild(el("div", "hero-badge",
      '<span class="ui-ic">' + icon("trophy") + '</span>Every word solved'));
    wrap.appendChild(el("h1", "hero-title", null, { text: C.finishTitle }));
    wrap.appendChild(el("p", "hero-lead", null, {
      text: C.finishLead.replace("{total}", UNJUMBLE.terms.length)
    }));

    var stats = el("div", "finish-stats");
    stats.appendChild(statTile("star", s.score, "points"));
    stats.appendChild(statTile("check-circle", UNJUMBLE.state.totalSolved(), "words"));
    stats.appendChild(statTile("fire-flame", s.bestStreak, "best streak"));
    wrap.appendChild(stats);

    // Sharing first: this is the biggest brag the game ever offers.
    wrap.appendChild(buildShareButton(null));

    // Then the strongest call to action, marked out from the per pack ones.
    var cta = buildCta(null);
    cta.classList.add("cta-final");
    wrap.appendChild(cta);

    if (!UNJUMBLE.state.get().email) wrap.appendChild(buildEmailForm("finish"));

    var again = el("button", "link-btn",
      '<span class="ui-ic">' + icon("refresh-double") + '</span>' + C.playAgain, { type: "button" });
    again.addEventListener("click", function () {
      UNJUMBLE.state.reset();
      showWelcome();
    });
    wrap.appendChild(again);

    screen.appendChild(wrap);
  }

  /* ------------------------------- sharing ------------------------------
     Reach is the whole point of this game existing, so sharing has to work
     everywhere. Three levels, best first:
       1. The real share sheet (phones, and some desktops).
       2. Copy to clipboard.
       3. A readonly box with the text selected, for old browsers and for
          pages not served over https, where the clipboard is blocked.
  --------------------------------------------------------------------- */
  function shareText(packId) {
    var cfg = UNJUMBLE.config;
    var s = UNJUMBLE.state.get();
    var S = cfg.SHARE || {};
    var cat = packId && UNJUMBLE.categories.filter(function (c) { return c.id === packId; })[0];
    var template = cat ? (S.pack || "") : (S.finish || S.pack || "");
    return template
      .replace("{pack}", cat ? cat.title : cfg.BRAND.productName)
      .replace("{solved}", UNJUMBLE.state.totalSolved())
      .replace("{total}", UNJUMBLE.terms.length)
      .replace("{points}", s.score)
      .replace("{streak}", s.bestStreak)
      .replace("{url}", cfg.SITE_ORIGIN);
  }

  function buildShareButton(packId) {
    var C = UNJUMBLE.copy;
    var box = el("div", "share-box");

    var btn = el("button", "btn ghost",
      '<span class="btn-ic">' + icon("share-android") + '</span>' + C.shareBtn, { type: "button" });
    // Announced to screen readers when the text lands on the clipboard.
    var note = el("p", "share-note", "", { "aria-live": "polite" });

    function fallbackSelect(text) {
      var field = box.querySelector(".share-field");
      if (!field) {
        field = el("input", "share-field", null, { type: "text", readonly: "readonly", "aria-label": "Your score, ready to copy" });
        box.insertBefore(field, note);
      }
      field.value = text;
      field.focus();
      field.select();
      try {
        // Deprecated, but it is the only thing that works on old browsers.
        var ok = document.execCommand && document.execCommand("copy");
        note.textContent = ok ? C.shareCopied : C.shareSelectHint;
      } catch (e) {
        note.textContent = C.shareSelectHint;
      }
    }

    btn.addEventListener("click", function () {
      var text = shareText(packId);
      UNJUMBLE.audio.play("click");
      track("result_shared", { pack: packId || "finish" });

      if (navigator.share) {
        navigator.share({ title: UNJUMBLE.config.SHARE.title, text: text })
          ["catch"](function () { /* they closed the sheet, nothing to say */ });
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          note.textContent = C.shareCopied;
        })["catch"](function () { fallbackSelect(text); });
        return;
      }
      fallbackSelect(text);
    });

    box.appendChild(btn);
    box.appendChild(note);
    return box;
  }

  /* --------------------------- the lead capture -------------------------
     The CTA, and the email form when we do not already have their address.
     This is the reason the game exists, so it now appears on every pack
     complete screen rather than only at the very end.
  --------------------------------------------------------------------- */
  function buildCta(packId) {
    var cfg = UNJUMBLE.config;
    var byPack = (cfg.CTA_BY_PACK || {})[packId];
    var copy = byPack || cfg.CTA;

    var cta = el("div", "cta-card");
    cta.appendChild(el("p", "cta-text", null, { text: copy.text }));
    var btn = el("a", "btn primary big",
      copy.buttonLabel + '<span class="btn-ic">' + icon("nav-arrow-right") + '</span>',
      { href: copy.href || cfg.CTA.href, target: "_blank", rel: "noopener" });
    btn.addEventListener("click", function () {
      track("cta_clicked", { from: packId || "finish" });
    });
    cta.appendChild(btn);
    return cta;
  }

  // Once we have their address, stop asking. Show the CTA on its own.
  function appendLeadCapture(wrap, packId) {
    wrap.appendChild(buildCta(packId));
    if (!UNJUMBLE.state.get().email) {
      wrap.appendChild(buildEmailForm(packId || "finish"));
    }
  }

  function statTile(iconName, value, label) {
    var t = el("div", "stat-tile");
    t.appendChild(el("span", "stat-ic", icon(iconName, { size: 22 })));
    t.appendChild(el("span", "stat-num", null, { text: String(value) }));
    t.appendChild(el("span", "stat-lab", null, { text: label }));
    return t;
  }

  /* Email capture. The one rule here: never tell a player they are on a list
     unless their address actually reached somewhere it can be read. */
  function buildEmailForm(source) {
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

    var privacy = el("p", "email-privacy", null, { text: C.emailPrivacy });
    var note = el("p", "email-note", "", { "aria-live": "polite" });

    function say(text, kind) {
      note.className = "email-note" + (kind ? " " + kind : "");
      note.textContent = text;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = input.value.trim();
      if (!value) return;

      // Nowhere to send it. Say so plainly rather than faking a signup.
      if (!cfg.FORM_ENDPOINT) {
        if (window.console && console.warn) {
          console.warn("[Unjumble AI] A player submitted \"" + value + "\" but FORM_ENDPOINT " +
            "is empty in js/config.js, so it was NOT collected and is now lost. " +
            "Paste your form endpoint there to start capturing leads.");
        }
        say(C.emailNoEndpoint, "warn");
        return;
      }

      send.disabled = true;
      input.disabled = true;
      say(C.emailSending);

      function failed() {
        send.disabled = false;
        input.disabled = false;
        say(C.emailRetry, "warn");
      }

      if (!window.fetch) { failed(); return; }

      try {
        window.fetch(cfg.FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            email: value,
            solved: UNJUMBLE.state.totalSolved(),
            score: UNJUMBLE.state.get().score,
            pack: source || "",
            source: "unjumble-ai"
          })
        }).then(function (res) {
          if (!res || !res.ok) { failed(); return; }
          // Only now is it true.
          UNJUMBLE.state.setEmail(value);
          say(C.emailThanks, "good");
          track("email_submitted", { pack: source || "finish" });
        })["catch"](failed);
      } catch (err) { failed(); }
    });

    box.appendChild(form);
    box.appendChild(privacy);
    box.appendChild(note);
    return box;
  }

  UNJUMBLE.app = { init: init, showWelcome: showWelcome, showPacks: showPacks };
})();
