/* ============================================================================
   UNJUMBLE AI - MASCOT
   ----------------------------------------------------------------------------
   The little robot who turns up between words to cheer the player on.

   He is drawn as inline SVG rather than an image file, for three reasons:
     1. Nothing to download, so he works offline like the rest of the game.
     2. He stays sharp at any size on any screen.
     3. He can actually move: he waves, he blinks, and his head rocks gently
        from side to side. Those are CSS animations, see the mascot block in
        css/styles.css, and they all stop under prefers-reduced-motion.

   Use with UNJUMBLE.mascot({ size: 190 }).
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

(function () {
  var INK = "#131A0E";     // the dark outline
  var SHELL = "#FFFFFF";   // his white casing
  var SCREEN = "#1B2416";  // the dark panel on his chest
  var LIME = "#C6FF3A";    // the letter tiles

  // One letter tile on his chest screen, tilted so the set looks jumbled.
  function tile(letter, x, y, rot) {
    return '<g transform="rotate(' + rot + ' ' + x + ' ' + y + ')">' +
      '<rect x="' + (x - 8) + '" y="' + (y - 8) + '" width="16" height="16" rx="4.5" fill="' + LIME + '"/>' +
      '<text x="' + x + '" y="' + (y + 4.2) + '" text-anchor="middle" fill="#16210E" ' +
        'font-family="Fredoka, Nunito, system-ui, sans-serif" font-size="11.5" font-weight="700">' +
        letter + '</text></g>';
  }

  // An outlined limb: a fat dark stroke with a thinner white stroke on top.
  function limb(d, outer, inner) {
    return '<path d="' + d + '" stroke="' + INK + '" stroke-width="' + outer +
             '" fill="none" stroke-linecap="round"/>' +
           '<path d="' + d + '" stroke="' + SHELL + '" stroke-width="' + inner +
             '" fill="none" stroke-linecap="round"/>';
  }

  UNJUMBLE.mascot = function (opts) {
    opts = opts || {};
    var size = opts.size || 190;
    var id = "mglow" + Math.random().toString(36).slice(2, 8);

    return '' +
    '<svg class="mascot" width="' + size + '" height="' + size + '" viewBox="0 0 200 200" ' +
         'fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +

      '<defs>' +
        '<filter id="' + id + '" x="-35%" y="-35%" width="170%" height="170%">' +
          '<feDropShadow dx="0" dy="0" stdDeviation="5.5" flood-color="#8FE01C" flood-opacity="0.55"/>' +
        '</filter>' +
      '</defs>' +

      '<g filter="url(#' + id + ')">' +

        /* ---- the arm that stays down, drawn behind the body ---- */
        limb("M62 126 L42 150", 14, 9.5) +
        '<circle cx="36" cy="158" r="11.5" fill="' + SHELL + '" stroke="' + INK + '" stroke-width="3.4"/>' +
        limb("M31 152 L26 143", 7.5, 4) +
        limb("M39 149 L37 139", 7.5, 4) +

        /* ---- the waving arm, drawn behind the body, animated ---- */
        '<g class="mascot-wave">' +
          limb("M138 124 L160 104", 14, 9.5) +
          '<circle cx="168" cy="95" r="12.5" fill="' + SHELL + '" stroke="' + INK + '" stroke-width="3.4"/>' +
          /* four fingers and a thumb, fanned open */
          limb("M161 88 L156 74", 8, 4.4) +
          limb("M167 85 L165 70", 8, 4.4) +
          limb("M173 86 L175 71", 8, 4.4) +
          limb("M178 90 L183 78", 8, 4.4) +
          limb("M158 99 L147 96", 8, 4.4) +
        '</g>' +

        /* ---- body ---- */
        '<rect x="55" y="97" width="90" height="80" rx="30" fill="' + SHELL + '" stroke="' + INK + '" stroke-width="3.6"/>' +
        /* the shoulder seams either side */
        '<path d="M62 112 Q57 128 62 146" stroke="' + INK + '" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".55"/>' +
        '<path d="M138 112 Q143 128 138 146" stroke="' + INK + '" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".55"/>' +

        /* ---- chest screen, with the letters still jumbled ---- */
        '<rect x="70" y="112" width="60" height="50" rx="12" fill="' + SCREEN + '" stroke="' + INK + '" stroke-width="3.2"/>' +
        '<g class="mascot-bits">' +
          tile("U", 86, 126, -16) +
          tile("N", 111, 125, 13) +
          tile("J", 98, 142, -7) +
          tile("M", 82, 150, 15) +
          tile("B", 114, 148, -13) +
        '</g>' +

        /* ---- head, rocking gently side to side ---- */
        '<g class="mascot-head">' +
          '<ellipse cx="100" cy="58" rx="44" ry="40" fill="' + SHELL + '" stroke="' + INK + '" stroke-width="3.6"/>' +
          /* the little highlight arc across the top */
          '<path d="M76 34 Q100 21 124 34" stroke="#E4E9DD" stroke-width="5" fill="none" stroke-linecap="round"/>' +

          /* eyes, each blinking around its own centre */
          '<g class="mascot-eye" style="transform-origin:84px 58px">' +
            '<ellipse cx="84" cy="58" rx="13" ry="15" fill="' + SHELL + '" stroke="' + INK + '" stroke-width="3.4"/>' +
            '<ellipse cx="84" cy="58" rx="7.4" ry="9" fill="' + INK + '"/>' +
            '<circle cx="81.2" cy="54" r="2.4" fill="#FFFFFF"/>' +
          '</g>' +
          '<g class="mascot-eye" style="transform-origin:116px 58px">' +
            '<ellipse cx="116" cy="58" rx="13" ry="15" fill="' + SHELL + '" stroke="' + INK + '" stroke-width="3.4"/>' +
            '<ellipse cx="116" cy="58" rx="7.4" ry="9" fill="' + INK + '"/>' +
            '<circle cx="113.2" cy="54" r="2.4" fill="#FFFFFF"/>' +
          '</g>' +

          /* smile */
          '<path d="M89 79 Q100 88 111 79" stroke="' + INK + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
        '</g>' +

      '</g>' +
    '</svg>';
  };
})();
