/* =====================================================================
   antoniavalladares.com — Galerie-Unterseiten

   Nur eine Aufgabe: die drei Fotos im Auftakt wandern beim Scrollen
   leicht gegen den Ortsnamen. Gleiche Regeln wie überall — eine
   rAF-Schleife, im Frame kein Layout lesen, nur transform schreiben.
   Lightbox und Menü kommen aus main.js.
   ===================================================================== */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }

  var hero = document.querySelector('.gal-hero');
  if (!hero) { return; }
  var bilder = [].slice.call(hero.querySelectorAll('.gal-hero-bild'));
  if (!bilder.length) { return; }

  var top = 0, hoehe = 0, vh = window.innerHeight;
  var y = window.scrollY || 0;
  var letzte = [];

  function messen() {
    vh = window.innerHeight;
    top = hero.offsetTop;
    hoehe = hero.offsetHeight;
  }

  window.addEventListener('scroll', function () { y = window.scrollY || 0; }, { passive: true });
  window.addEventListener('resize', messen, { passive: true });
  window.addEventListener('load', messen);
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(messen); }

  function frame() {
    if (y < top + hoehe && y + vh > top) {
      var q = (y - top + vh) / (hoehe + vh);   /* 0 … 1 */
      for (var i = 0; i < bilder.length; i++) {
        var tiefe = parseFloat(bilder[i].dataset.tiefe) || 0.15;
        var v = ((q - 0.5) * vh * tiefe).toFixed(1);
        if (letzte[i] !== v) {
          letzte[i] = v;
          bilder[i].style.transform = 'translate3d(0,' + v + 'px,0)';
        }
      }
    }
    requestAnimationFrame(frame);
  }

  messen();
  requestAnimationFrame(frame);
})();

/* Masonry: Fotos laufen in 3 (Handy: 2) Spalten, jedes Foto kommt in die
   gerade kürzeste Spalte, so bleibt die Erzählreihenfolge ungefähr erhalten.
   Die Höhen kommen aus width/height der Bilder, es springt nichts. Zwischentexte
   teilen das Raster in Kapitel. Ohne Skript bleibt ein ruhiges 2-Spalten-Raster. */
(function () {
  'use strict';
  var raster = document.querySelector('.gal-raster');
  if (!raster) { return; }
  var kinder = [].slice.call(raster.children);
  var nr = 0;
  kinder.forEach(function (k) { if (k.classList.contains('lb-fig')) { k.dataset.nr = nr++; } });
  var mq = window.matchMedia('(min-width: 1000px)');
  var aktuell = 0;

  function bauen() {
    var n = mq.matches ? 3 : 2;
    if (n === aktuell) { return; }
    aktuell = n;
    var stapel = [];
    kinder.forEach(function (k) {
      if (k.classList.contains('gal-einschub')) { stapel.push({ text: k }); }
      else {
        if (!stapel.length || stapel[stapel.length - 1].text) { stapel.push({ figs: [] }); }
        stapel[stapel.length - 1].figs.push(k);
      }
    });
    raster.textContent = '';
    stapel.forEach(function (s) {
      if (s.text) { raster.appendChild(s.text); return; }
      var seg = document.createElement('div');
      seg.className = 'gal-seg';
      var spalten = [], hoehen = [];
      for (var i = 0; i < n; i++) {
        var c = document.createElement('div'); c.className = 'gal-spalte';
        spalten.push(c); hoehen.push(0); seg.appendChild(c);
      }
      s.figs.forEach(function (f) {
        var img = f.querySelector('img');
        var r = img && img.getAttribute('width') ? img.getAttribute('height') / img.getAttribute('width') : 1.4;
        var m = 0;
        for (var j = 1; j < n; j++) { if (hoehen[j] < hoehen[m] - 0.001) { m = j; } }
        spalten[m].appendChild(f); hoehen[m] += r + 0.12;
      });
      raster.appendChild(seg);
    });
  }
  raster.classList.add('ist-masonry');
  bauen();
  if (mq.addEventListener) { mq.addEventListener('change', bauen); }
  else if (mq.addListener) { mq.addListener(bauen); }
})();
