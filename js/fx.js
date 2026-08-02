/* ============================================================================
   UNJUMBLE AI - FX (atmosphere and feedback)
   ----------------------------------------------------------------------------
   - Drifting letters in the background, a nod to the jumble itself.
   - Confetti burst when a word is solved.
   - Floating "+points" burst.
   All of it respects prefers-reduced-motion.
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

(function () {

  UNJUMBLE.reducedMotion = function () {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) { return false; }
  };

  /* -------------------------- Drifting letters bg ------------------------- */
  var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  UNJUMBLE.initBackground = function () {
    var host = document.getElementById("bg-letters");
    if (!host) return;
    if (UNJUMBLE.reducedMotion()) { host.innerHTML = ""; return; }

    var count = window.innerWidth < 640 ? 16 : 30;
    var html = "";
    for (var i = 0; i < count; i++) {
      var ch = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      var left = Math.round(Math.random() * 96);
      var dur = 18 + Math.random() * 22;
      var delay = -Math.random() * dur;
      var size = 16 + Math.random() * 26;
      html += '<span class="bg-letter" style="left:' + left + '%;' +
              'animation-duration:' + dur.toFixed(1) + 's;' +
              'animation-delay:' + delay.toFixed(1) + 's;' +
              'font-size:' + size.toFixed(0) + 'px;">' + ch + '</span>';
    }
    host.innerHTML = html;
  };

  /* ------------------------------ Confetti ------------------------------- */
  UNJUMBLE.confetti = function (amount) {
    if (UNJUMBLE.reducedMotion()) return;
    var colors = ["#C6FF3A", "#3AE8FF", "#FFB13A", "#A970FF", "#8FBE1F"];
    var layer = document.createElement("div");
    layer.className = "confetti-layer";
    document.body.appendChild(layer);
    var n = amount || 70;
    for (var i = 0; i < n; i++) {
      var p = document.createElement("i");
      p.className = "confetti-bit";
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = (1.6 + Math.random() * 1.4) + "s";
      p.style.animationDelay = (Math.random() * 0.3) + "s";
      p.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      p.style.width = (6 + Math.random() * 6) + "px";
      p.style.height = (8 + Math.random() * 8) + "px";
      layer.appendChild(p);
    }
    setTimeout(function () { layer.remove(); }, 3400);
  };

  /* ------------------------ Animated hero wordmark ------------------------
     Shows the game's own name doing the thing the game asks you to do: the
     letters sit scrambled, glitch, then snap into the right order, on a loop.
     Under reduced motion it simply shows the solved word and stops.
  ------------------------------------------------------------------------ */
  UNJUMBLE.heroWord = function (host, word) {
    word = word || "UNJUMBLE AI";
    var chars = word.split("");
    var nodes = [];

    var group = document.createElement("div");
    group.className = "hero-word-group";
    chars.forEach(function (c) {
      if (c === " ") {
        host.appendChild(group);
        var gap = document.createElement("span");
        gap.className = "hero-word-gap";
        host.appendChild(gap);
        group = document.createElement("div");
        group.className = "hero-word-group";
        return;
      }
      var tile = document.createElement("span");
      tile.className = "hero-tile";
      tile.textContent = c;
      group.appendChild(tile);
      nodes.push(tile);
    });
    host.appendChild(group);

    var solvedLetters = nodes.map(function (n) { return n.textContent; });

    function paint(list, isSolved) {
      nodes.forEach(function (n, k) {
        n.textContent = list[k];
        n.classList.toggle("solved", !!isSolved);
      });
    }

    if (UNJUMBLE.reducedMotion()) { paint(solvedLetters, true); return; }

    function scrambled() {
      var s = solvedLetters.slice();
      var guard = 0;
      do { UNJUMBLE.dom.shuffle(s); guard++; }
      while (s.join("") === solvedLetters.join("") && guard < 20);
      return s;
    }

    function cycle() {
      // Only keep animating while the wordmark is still on screen.
      if (!host.isConnected) return;
      paint(scrambled(), false);
      setTimeout(function () {
        if (!host.isConnected) return;
        // Glitch, and swap to the solved word part way through the flicker.
        nodes.forEach(function (n) {
          n.style.setProperty("--gd", (Math.random() * 0.16).toFixed(2) + "s");
        });
        host.classList.add("glitching");
        setTimeout(function () { paint(solvedLetters, true); }, 240);
        setTimeout(function () { host.classList.remove("glitching"); }, 560);
        setTimeout(cycle, 2800);
      }, 1700);
    }
    cycle();
  };

  /* --------------------------- Floating points --------------------------- */
  UNJUMBLE.floatPoints = function (text, anchorEl) {
    var burst = document.createElement("div");
    burst.className = "points-burst";
    burst.textContent = text;
    var x = window.innerWidth / 2, y = window.innerHeight / 2;
    if (anchorEl && anchorEl.getBoundingClientRect) {
      var r = anchorEl.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    burst.style.left = x + "px";
    burst.style.top = y + "px";
    document.body.appendChild(burst);
    setTimeout(function () { burst.remove(); }, 1100);
  };
})();
