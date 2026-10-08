/* =====================================================================
   ÜBERGANG — zwei kleine Dinge für die ganze Seite:
   1) Seitenwechsel: die Fläche zieht über den Bildschirm, kein Weiß.
   2) Fotos mit der Klasse .wisch werden aufgezogen, sobald sie kommen.
   Nur transform, opacity und clip-path. Kein Layout-Lesen im Frame.
   ===================================================================== */
(function () {
  'use strict';

  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1 Seitenwechsel ───────────────────────────────────────────── */
  if (!ruhig) {
    var vorhang = document.createElement('div');
    vorhang.className = 'vorhang-seite';
    vorhang.setAttribute('aria-hidden', 'true');
    document.body.appendChild(vorhang);

    document.body.classList.add('kommt');
    window.setTimeout(function () { document.body.classList.remove('kommt'); }, 700);

    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      var ziel = a.getAttribute('href') || '';
      if (!ziel || ziel.charAt(0) === '#') return;
      if (/^(mailto:|tel:|javascript:)/i.test(ziel)) return;
      if (a.hostname && a.hostname !== window.location.hostname) return;

      e.preventDefault();
      document.body.classList.add('geht');
      window.setTimeout(function () { window.location.href = ziel; }, 480);
    });

    window.addEventListener('pageshow', function (e) {
      if (e.persisted) document.body.classList.remove('geht');
    });
  }

  /* ── 2 Fotos aufziehen ─────────────────────────────────────────── */
  var bilder = [].slice.call(document.querySelectorAll('.wisch'));
  if (!bilder.length) return;

  if (ruhig || !('IntersectionObserver' in window)) {
    bilder.forEach(function (b) { b.classList.add('ist-da'); });
    return;
  }

  var beobachter = new IntersectionObserver(function (eintraege) {
    for (var i = 0; i < eintraege.length; i++) {
      if (eintraege[i].isIntersecting) {
        eintraege[i].target.classList.add('ist-da');
        beobachter.unobserve(eintraege[i].target);
      }
    }
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  bilder.forEach(function (b) { beobachter.observe(b); });

})();

/* ── Kopfzeile: umschalten, wo der Grund hell wird ────────────────── */
(function () {
  var hell = document.querySelector('.cta-section, .site-footer');
  if (!hell || !document.body.classList.contains('ab')) return;
  if (!('IntersectionObserver' in window)) { document.body.classList.add('kopf-hell'); return; }
  var kopfhoehe = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--header-h')) || 86;
  var beobachter = new IntersectionObserver(function (eintraege) {
    document.body.classList.toggle('kopf-hell', eintraege[0].isIntersecting);
  }, { rootMargin: (-kopfhoehe) + 'px 0px 0px 0px', threshold: 0 });
  beobachter.observe(hell);
})();
