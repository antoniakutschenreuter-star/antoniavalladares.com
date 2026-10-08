/* =====================================================================
   ABOUT — die Fakten-Bühne wird festgehalten, ein Fakt je Bildschirm.
   Eine einzige rAF-Schleife. Im Frame wird kein Layout gelesen,
   geschrieben werden nur Klassen, und nur bei Wechsel.
   ===================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('hat-js');

  var abschnitt = document.querySelector('.ab-abschnitt');
  if (!abschnitt) return;

  var fakten = [].slice.call(abschnitt.querySelectorAll('.ab-item')),
      n = fakten.length;
  if (!n) return;

  var SCHRITT = 2.6;              /* Scrollweg je Fakt, in Fensterhöhen */

  var an = false, laeuft = false, aktiv = -1, oben = 0, weg = 1;

  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)'),
      gross = window.matchMedia('(min-width: 901px)');

  function messen() {
    var r = abschnitt.getBoundingClientRect();
    oben = r.top + (window.pageYOffset || document.documentElement.scrollTop);
    weg  = Math.max(1, abschnitt.offsetHeight - window.innerHeight);
  }

  function setzen(i) {
    for (var k = 0; k < n; k++) {
      var c = 'ab-item' + (k === i ? ' ist-aktiv' : k < i ? ' ist-vorher' : ' ist-nachher');
      if (fakten[k].className !== c) fakten[k].className = c;
    }
    aktiv = i;
  }

  function anschalten() {
    abschnitt.style.height = (n * SCHRITT * 100 + 100) + 'svh';
    an = true; aktiv = -1;
    messen(); zeichnen();
  }

  function ausschalten() {
    abschnitt.style.height = '';
    for (var k = 0; k < n; k++) fakten[k].className = 'ab-item';
    an = false; aktiv = -1;
  }

  function pruefen() {
    var soll = gross.matches && !ruhig.matches;
    if (soll && !an) anschalten();
    else if (!soll && an) ausschalten();
    else if (an) { messen(); zeichnen(); }
  }

  function zeichnen() {
    laeuft = false;
    if (!an) return;
    var y = window.pageYOffset || document.documentElement.scrollTop,
        p = (y - oben) / weg;
    p = p < 0 ? 0 : p > 1 ? 1 : p;
    var i = Math.min(n - 1, Math.floor(p * n * 0.9999));
    if (i !== aktiv) setzen(i);
  }

  function anstupsen() { if (!laeuft) { laeuft = true; requestAnimationFrame(zeichnen); } }

  window.addEventListener('scroll', anstupsen, { passive: true });
  window.addEventListener('resize', pruefen);
  if (gross.addEventListener) {
    gross.addEventListener('change', pruefen);
    ruhig.addEventListener('change', pruefen);
  }

  /* Abschluss blendet ein, sobald er ins Bild kommt */
  (function () {
    var schluss = document.querySelector('.ab-schluss');
    if (!schluss) return;
    if (!('IntersectionObserver' in window)) { schluss.classList.add('ist-da'); return; }
    var beobachter = new IntersectionObserver(function (eintraege) {
      for (var i = 0; i < eintraege.length; i++) {
        if (eintraege[i].isIntersecting) {
          eintraege[i].target.classList.add('ist-da');
          beobachter.unobserve(eintraege[i].target);
        }
      }
    }, { threshold: 0.28 });
    beobachter.observe(schluss);
  })();

  pruefen();
})();
