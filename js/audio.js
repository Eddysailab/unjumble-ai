/* ============================================================================
   UNJUMBLE AI - AUDIO
   ----------------------------------------------------------------------------
   Every sound in the game is generated live in the browser with the Web Audio
   API. That means no sound files to download, nothing to load, and the game
   still works fully offline.

   Browsers will not let a page make noise until the player has interacted with
   it, so the audio engine is only switched on at the first tap.

   Sounds are deliberately short and soft. Muting is remembered between visits.
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

(function () {
  var ctx = null;
  var master = null;

  function ready() {
    if (ctx) return true;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    } catch (e) { return false; }
    return true;
  }

  // One note. freq in Hz, start and dur in seconds from now.
  function tone(freq, start, dur, type, level) {
    if (!ready()) return;
    var t0 = ctx.currentTime + start;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    // A quick fade in and out, so nothing clicks or pops.
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(level || 0.18, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  // A note that slides from one pitch to another.
  function slide(from, to, start, dur, type, level) {
    if (!ready()) return;
    var t0 = ctx.currentTime + start;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(from, t0);
    osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(level || 0.18, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  // A short noise burst, used for the "nope" sound.
  function thud(start, dur, level) {
    if (!ready()) return;
    var t0 = ctx.currentTime + start;
    var frames = Math.floor(ctx.sampleRate * dur);
    var buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < frames; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
    }
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    var filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    var gain = ctx.createGain();
    gain.gain.value = level || 0.14;
    src.connect(filter); filter.connect(gain); gain.connect(master);
    src.start(t0);
  }

  // A pentatonic ladder, so any run of notes sounds pleasant.
  var LADDER = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];

  var SOUNDS = {
    // Placing a letter. The pitch climbs as the word fills up, which makes
    // solving a long word feel like it is building to something.
    tap: function (step) {
      var n = LADDER[Math.min(step || 0, LADDER.length - 1)];
      tone(n, 0, 0.11, "triangle", 0.16);
    },
    // Taking a letter back.
    back: function () { slide(420, 260, 0, 0.11, "triangle", 0.12); },
    // Revealing a letter: a soft two note hint.
    reveal: function () {
      tone(880, 0, 0.1, "sine", 0.13);
      tone(1174.66, 0.07, 0.16, "sine", 0.11);
    },
    // Wrong order. Low and short, never harsh.
    wrong: function () {
      thud(0, 0.16, 0.12);
      slide(220, 150, 0, 0.2, "sawtooth", 0.09);
    },
    // Solved a word.
    win: function () {
      [523.25, 659.25, 783.99, 1046.50].forEach(function (f, i) {
        tone(f, i * 0.075, 0.28, "triangle", 0.17);
      });
    },
    // Finished a whole pack.
    complete: function () {
      [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98].forEach(function (f, i) {
        tone(f, i * 0.085, 0.42, "triangle", 0.16);
      });
      tone(261.63, 0, 0.7, "sine", 0.1);
    },
    // Generic button press.
    click: function () { tone(660, 0, 0.06, "triangle", 0.1); }
  };

  UNJUMBLE.audio = {
    // Called on the first real interaction, so the browser lets us make sound.
    wake: function () {
      if (!ready()) return;
      if (ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    },

    isMuted: function () { return !!UNJUMBLE.state.get().muted; },

    setMuted: function (muted) {
      UNJUMBLE.state.setMuted(!!muted);
      if (!muted) UNJUMBLE.audio.wake();
    },

    toggle: function () {
      UNJUMBLE.audio.setMuted(!UNJUMBLE.audio.isMuted());
      if (!UNJUMBLE.audio.isMuted()) UNJUMBLE.audio.play("click");
      return UNJUMBLE.audio.isMuted();
    },

    play: function (name, arg) {
      if (UNJUMBLE.audio.isMuted()) return;
      var fn = SOUNDS[name];
      if (!fn) return;
      UNJUMBLE.audio.wake();
      try { fn(arg); } catch (e) { /* audio is never worth breaking the game for */ }
    }
  };
})();
