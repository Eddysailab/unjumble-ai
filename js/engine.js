/* ============================================================================
   UNJUMBLE AI - ENGINE (the unjumble mechanic)
   ----------------------------------------------------------------------------
   One puzzle at a time. The player taps scrambled letter tiles to spell the
   term, guided only by a short clue. There are no lives and no timer, so the
   only way this ends is by getting it right.

   The app hands us a context (ctx) with:
     ctx.solved(points, anchorEl)  -> record the win and update the score strip
     ctx.next()                    -> move on to the next word
     ctx.index, ctx.total          -> where we are in the pack
     ctx.category                  -> the pack this word belongs to
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

(function () {
  var el = UNJUMBLE.dom.el;
  var clear = UNJUMBLE.dom.clear;
  var icon = UNJUMBLE.icon;

  UNJUMBLE.runPuzzle = function (term, container, ctx) {
    var C = UNJUMBLE.copy;
    var cfg = UNJUMBLE.config;

    var answer = term.term.toUpperCase();
    var chars = answer.split("");          // spaces included, they are fixed gaps
    var letterIdx = [];                    // positions that need a letter
    chars.forEach(function (c, i) { if (c !== " ") letterIdx.push(i); });

    var fill = chars.map(function () { return null; });   // slot -> tile
    var tiles = letterIdx.map(function (i, n) {
      return { id: n, ch: chars[i], placedAt: null, locked: false };
    });

    // Scramble the tray, and do not hand the player the answer in order.
    var tray = UNJUMBLE.dom.shuffle(tiles.slice());
    var target = letterIdx.map(function (i) { return chars[i]; }).join("");
    for (var guard = 0; guard < 20 && trayString() === target; guard++) {
      UNJUMBLE.dom.shuffle(tray);
    }
    function trayString() {
      return tray.map(function (t) { return t.ch; }).join("");
    }

    var revealsUsed = 0;
    var definitionUsed = false;
    var solved = false;
    var busy = false;   // true while the shake animation plays

    /* ------------------------------ layout ------------------------------ */
    var card = el("div", "card puzzle-card fade-up");

    var cat = UNJUMBLE.categories.filter(function (c) { return c.id === term.category; })[0];
    var head = el("div", "puz-head");
    head.appendChild(el("span", "puz-cat accent-" + (cat ? cat.accent : "green"),
      '<span class="ui-ic">' + icon(cat ? cat.icon : "sparks") + '</span>' + (cat ? cat.title : "")));
    head.appendChild(el("span", "puz-count", "Word " + (ctx.index + 1) + " of " + ctx.total));
    card.appendChild(head);

    var clueBox = el("div", "clue-box");
    clueBox.appendChild(el("span", "clue-label",
      '<span class="ui-ic">' + icon("light-bulb") + '</span>' + C.clueLabel));
    clueBox.appendChild(el("p", "clue-text", null, { text: term.clue }));
    // The meaning starts hidden. The player can buy it if the clue is not enough.
    var meaningBox = el("div", "clue-meaning");
    meaningBox.appendChild(el("span", "clue-label",
      '<span class="ui-ic">' + icon("book") + '</span>' + C.defineLabel));
    meaningBox.appendChild(el("p", "clue-meaning-text", null, { text: term.definition }));
    clueBox.appendChild(meaningBox);
    card.appendChild(clueBox);

    var track = el("div", "track", "", { "aria-label": "Your answer so far" });
    card.appendChild(track);

    var nudge = el("div", "puz-nudge", "", { "aria-live": "polite" });
    card.appendChild(nudge);

    var trayWrap = el("div", "tray", "", { "aria-label": "Scrambled letters" });
    card.appendChild(trayWrap);

    var actions = el("div", "puz-actions");
    var revealBtn = el("button", "btn ghost",
      '<span class="btn-ic">' + icon("light-bulb") + '</span>' + C.revealBtn, { type: "button" });
    var defineBtn = el("button", "btn ghost",
      '<span class="btn-ic">' + icon("book") + '</span>' + C.defineBtn, { type: "button" });
    var clearBtn = el("button", "btn ghost",
      '<span class="btn-ic">' + icon("refresh-double") + '</span>' + C.clearBtn, { type: "button" });
    revealBtn.addEventListener("click", reveal);
    defineBtn.addEventListener("click", showMeaning);
    clearBtn.addEventListener("click", clearBoard);
    actions.appendChild(revealBtn);
    actions.appendChild(defineBtn);
    actions.appendChild(clearBtn);

    /* Skip sends the word to the back of this pack's queue. It is not solved
       and it is not lost, it just comes round again later. Only offered when
       there is something else to move on to, otherwise it would hand back the
       same word and look broken. */
    if (ctx.canSkip) {
      var skipBtn = el("button", "link-btn skip-btn",
        C.skipBtn + '<span class="ui-ic">' + icon("nav-arrow-right") + '</span>', { type: "button" });
      skipBtn.addEventListener("click", function () {
        if (solved || busy) return;
        UNJUMBLE.audio.play("click");
        ctx.skip();
      });
      actions.appendChild(skipBtn);
    }
    card.appendChild(actions);

    // Say up front what each hint costs, so the choice is never a surprise.
    card.appendChild(el("p", "puz-cost", null, {
      text: C.revealCostNote
        .replace("{n}", cfg.POINTS.perRevealCost)
        .replace("{d}", cfg.POINTS.definitionCost)
    }));

    var revealCard = el("div", "reveal-card");
    card.appendChild(revealCard);

    container.appendChild(card);
    render();

    /* ---------------------------- keyboard -----------------------------
       Tapping still works exactly as before. This is purely an addition for
       anyone on a laptop, where tabbing through eighteen tiles is miserable.

       The listener lives on the document and removes itself as soon as its
       own card leaves the page, so puzzles never stack up listeners.
    --------------------------------------------------------------------- */
    function onKey(e) {
      if (!card.isConnected) { document.removeEventListener("keydown", onKey); return; }

      // Never steal a keystroke meant for a text field, and leave browser and
      // operating system shortcuts alone.
      var t = e.target || {};
      var tag = (t.tagName || "").toUpperCase();
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (solved) {
        // The Next button already has focus, so let the browser click it
        // rather than advancing twice.
        if (e.key === "Enter" && tag !== "BUTTON") {
          e.preventDefault();
          ctx.next();
        }
        return;
      }
      if (busy) return;

      if (e.key === "Backspace") { e.preventDefault(); takeBackLast(); return; }
      if (e.key === "Escape") { e.preventDefault(); clearBoard(); return; }

      if (e.key && e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
        var want = e.key.toUpperCase();
        var free = tiles.filter(function (x) { return x.ch === want && x.placedAt === null; })[0];
        if (free) place(free);
        else setNudge(C.noSuchLetter.replace("{letter}", want));
      }
    }

    // Undo the most recently placed tile, leaving revealed letters alone.
    function takeBackLast() {
      var newest = null;
      tiles.forEach(function (x) {
        if (x.placedAt === null || x.locked) return;
        if (!newest || x.placedAt > newest.placedAt) newest = x;
      });
      if (newest) takeBack(newest.placedAt);
    }

    document.addEventListener("keydown", onKey);

    /* ----------------------------- rendering ---------------------------- */
    function render() {
      renderTrack();
      renderTray();
      clearBtn.disabled = solved || !anyRemovable();
    }

    function renderTrack() {
      clear(track);
      var group = el("div", "word-group");
      chars.forEach(function (c, i) {
        if (c === " ") {
          track.appendChild(group);
          track.appendChild(el("span", "word-gap"));
          group = el("div", "word-group");
          return;
        }
        var t = fill[i];
        var slot = el("button", "slot", null, { type: "button" });
        if (t) {
          slot.classList.add("filled");
          slot.textContent = t.ch;
          if (t.locked) {
            slot.classList.add("locked");
            slot.disabled = true;
            slot.setAttribute("aria-label", "Letter " + t.ch + ", revealed for you");
          } else if (solved) {
            slot.disabled = true;
            slot.setAttribute("aria-label", "Letter " + t.ch);
          } else {
            slot.setAttribute("aria-label", "Letter " + t.ch + ", tap to take it back");
            slot.addEventListener("click", function () { takeBack(i); });
          }
        } else {
          slot.disabled = true;
          slot.setAttribute("aria-label", "Empty space");
        }
        if (solved) slot.classList.add("good");
        group.appendChild(slot);
      });
      track.appendChild(group);
    }

    function renderTray() {
      clear(trayWrap);
      tray.forEach(function (t) {
        var b = el("button", "tile", null, { type: "button" });
        b.textContent = t.ch;
        b.setAttribute("aria-label", "Letter " + t.ch);
        if (t.placedAt !== null) {
          b.classList.add("used");
          b.disabled = true;
          b.setAttribute("aria-hidden", "true");
        } else if (solved) {
          b.disabled = true;
        } else {
          b.addEventListener("click", function () { place(t); });
        }
        trayWrap.appendChild(b);
      });
    }

    /* ------------------------------ actions ----------------------------- */
    function firstEmpty() {
      for (var i = 0; i < chars.length; i++) {
        if (chars[i] !== " " && fill[i] === null) return i;
      }
      return -1;
    }

    function anyRemovable() {
      return tiles.some(function (t) { return t.placedAt !== null && !t.locked; });
    }

    function place(t) {
      if (solved || busy || t.placedAt !== null) return;
      var i = firstEmpty();
      if (i === -1) return;
      fill[i] = t;
      t.placedAt = i;
      // The pitch climbs as the word fills up.
      UNJUMBLE.audio.play("tap", placedCount() - 1);
      setNudge("");
      render();
      if (firstEmpty() === -1) check();
    }

    function placedCount() {
      return tiles.filter(function (t) { return t.placedAt !== null; }).length;
    }

    function takeBack(i) {
      if (solved || busy) return;
      var t = fill[i];
      if (!t || t.locked) return;
      fill[i] = null;
      t.placedAt = null;
      UNJUMBLE.audio.play("back");
      setNudge("");
      render();
    }

    // Put every tile the player placed back in the tray. Revealed letters stay.
    function clearBoard() {
      if (solved || busy) return;
      var had = anyRemovable();
      tiles.forEach(function (t) {
        if (t.placedAt !== null && !t.locked) { fill[t.placedAt] = null; t.placedAt = null; }
      });
      if (had) UNJUMBLE.audio.play("back");
      setNudge("");
      render();
    }

    function reveal() {
      if (solved || busy) return;
      if (firstEmpty() === -1) clearBoard();
      var i = firstEmpty();
      if (i === -1) return;
      var want = chars[i];

      // Prefer a tile still sitting in the tray, otherwise borrow a placed one.
      var t = tiles.filter(function (x) { return x.ch === want && x.placedAt === null; })[0];
      if (!t) {
        var borrowed = tiles.filter(function (x) { return x.ch === want && !x.locked; })[0];
        if (borrowed) {
          fill[borrowed.placedAt] = null;
          borrowed.placedAt = null;
          t = borrowed;
        }
      }
      if (!t) return;

      fill[i] = t;
      t.placedAt = i;
      t.locked = true;
      revealsUsed++;
      UNJUMBLE.audio.play("reveal");
      setNudge("");
      render();
      if (firstEmpty() === -1) check();
    }

    // Buy the meaning. For a beginner this is often the difference between
    // guessing blindly at letters and actually recognising the word.
    function showMeaning() {
      if (solved || definitionUsed) return;
      definitionUsed = true;
      clueBox.classList.add("with-meaning");
      defineBtn.disabled = true;
      UNJUMBLE.audio.play("reveal");
      meaningBox.scrollIntoView({
        behavior: UNJUMBLE.reducedMotion() ? "auto" : "smooth", block: "nearest"
      });
    }

    function setNudge(text) {
      nudge.textContent = text || "";
      nudge.classList.toggle("show", !!text);
    }

    /* ------------------------------ checking ---------------------------- */
    function check() {
      var got = chars.map(function (c, i) {
        return c === " " ? " " : (fill[i] ? fill[i].ch : "");
      }).join("");
      if (got === answer) win(); else miss();
    }

    function miss() {
      busy = true;
      UNJUMBLE.state.breakStreak();
      UNJUMBLE.audio.play("wrong");
      if (ctx.onMiss) ctx.onMiss();
      track.classList.add("shake");
      setNudge(UNJUMBLE.copy.wrongNudge);
      setTimeout(function () {
        track.classList.remove("shake");
        busy = false;
        clearBoard();
      }, 620);
    }

    function win() {
      solved = true;
      var P = cfg.POINTS;

      /* If every single letter was revealed, the word was handed over rather
         than solved. That still counts as learning it, so it still completes
         and still shows the meaning, but it earns the minimum, earns no
         streak bonus, and ends the streak. Otherwise revealing everything
         would out-score honest effort. */
      var gaveUp = revealsUsed >= letterIdx.length;
      var streakBonus = 0;
      var points;

      if (gaveUp) {
        points = P.minimum;
      } else {
        var spent = revealsUsed * P.perRevealCost + (definitionUsed ? P.definitionCost : 0);
        var base = Math.max(P.minimum, P.solve - spent);
        streakBonus = Math.min(UNJUMBLE.state.get().streak, 5) * P.streakBonus;
        points = base + streakBonus;
      }

      setNudge("");
      render();
      revealBtn.disabled = true;
      defineBtn.disabled = true;
      clearBtn.disabled = true;

      UNJUMBLE.audio.play("win");
      UNJUMBLE.confetti(gaveUp ? 30 : 70);
      UNJUMBLE.floatPoints("+" + points, track);
      ctx.solved(term, points, track, { gaveUp: gaveUp });

      showReveal(points, streakBonus, gaveUp);
    }

    /* --------------------- the payoff, after solving --------------------- */
    function showReveal(points, streakBonus, gaveUp) {
      clear(revealCard);
      revealCard.className = "reveal-card show";

      revealCard.appendChild(el("div", "rv-head",
        '<span class="ui-ic">' + icon(gaveUp ? "book" : "check-circle") + '</span>' +
        (gaveUp ? UNJUMBLE.copy.allRevealedNote : UNJUMBLE.copy.solvedHead)));

      revealCard.appendChild(el("div", "rv-term", null, { text: term.term }));

      var pts = el("div", "rv-points");
      pts.appendChild(el("span", "rv-pt", "+" + points + " points"));
      if (revealsUsed > 0) {
        pts.appendChild(el("span", "rv-cost",
          '<span class="ui-ic">' + icon("light-bulb") + '</span>' +
          revealsUsed + " revealed, minus " + (revealsUsed * cfg.POINTS.perRevealCost) + " percent"));
      }
      if (definitionUsed) {
        pts.appendChild(el("span", "rv-cost",
          '<span class="ui-ic">' + icon("book") + '</span>' +
          "meaning used, minus " + cfg.POINTS.definitionCost + " percent"));
      }
      if (streakBonus > 0) {
        pts.appendChild(el("span", "rv-streak",
          '<span class="ui-ic">' + icon("fire-flame") + '</span>' + streakBonus + " streak bonus"));
      }
      revealCard.appendChild(pts);

      // Warmly, not tellingly off. There is still no way to lose here.
      if (gaveUp) {
        revealCard.appendChild(el("p", "rv-gaveup", null, { text: UNJUMBLE.copy.gaveUpNote }));
      }

      var meaning = el("div", "rv-block");
      meaning.appendChild(el("span", "rv-label", UNJUMBLE.copy.meansLabel));
      meaning.appendChild(el("p", "rv-body", null, { text: term.definition }));
      revealCard.appendChild(meaning);

      var example = el("div", "rv-block rv-example");
      example.appendChild(el("span", "rv-label",
        '<span class="ui-ic">' + icon(term.icon || "sparks") + '</span>' + UNJUMBLE.copy.exampleLabel));
      example.appendChild(el("p", "rv-body", null, { text: term.example }));
      revealCard.appendChild(example);

      var last = ctx.index === ctx.total - 1;
      var next = el("button", "btn primary big",
        (last ? UNJUMBLE.copy.lastBtn : UNJUMBLE.copy.nextBtn) +
        '<span class="btn-ic">' + icon("nav-arrow-right") + '</span>', { type: "button" });
      next.addEventListener("click", function () { ctx.next(); });
      revealCard.appendChild(next);

      revealCard.scrollIntoView({ behavior: UNJUMBLE.reducedMotion() ? "auto" : "smooth", block: "nearest" });
      next.focus();
    }
  };
})();
