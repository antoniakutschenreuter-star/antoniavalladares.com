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
window.AV_masonry = function (raster) {
  'use strict';
  if (!raster || raster.dataset.masonry === 'ja') { return; }
  raster.dataset.masonry = 'ja';
  var kinder = [].slice.call(raster.children);
  if (!kinder.length) { return; }
  var nr = 0;
  kinder.forEach(function (k) { if (k.classList.contains('lb-fig')) { k.dataset.nr = nr++; } });
  var mq = window.matchMedia('(min-width: 1000px)');
  var aktuell = 0;

  /* Höhe jedes Fotos in Spaltenbreiten, Abstand eingerechnet.
     Der Abstand wird gemessen und nicht geschätzt: mit einem geratenen
     Wert endeten die Spalten trotz Ausgleich noch um eine halbe Bildhöhe
     versetzt. */
  function hoehen_von(figs, lueck) {
    return figs.map(function (f) {
      var img = f.querySelector('img');
      var r = img && img.getAttribute('width')
        ? img.getAttribute('height') / img.getAttribute('width') : 1.4;
      return r + lueck;
    });
  }

  function luecke(spalte) {
    var b = spalte.getBoundingClientRect().width;
    if (!b) { return 0.12; }
    var g = parseFloat(window.getComputedStyle(spalte).rowGap);
    return (g > 0 ? g : 0) / b;
  }

  /* Fotos auf die Spalten verteilen.
     Nur der Reihe nach in die jeweils kürzeste Spalte zu legen, lässt die
     Spalten unterschiedlich tief enden — bis zu einer ganzen Bildhöhe. Unter
     dem Raster klaffte dadurch eine Lücke, bevor der nächste Zwischentext kam.
     Die letzten Fotos werden deshalb durchprobiert: die Aufteilung, bei der
     alle Spalten am gleichmäßigsten enden, gewinnt. Dadurch steht jeder
     Zwischentext dicht unter den Bildern. */
  function verteile(h, n) {
    var wahl = [], stand = [], i, j, m;
    for (i = 0; i < n; i++) { stand.push(0); }
    var frei = Math.min(h.length, n === 2 ? 12 : 9);
    var fest = h.length - frei;
    for (i = 0; i < fest; i++) {
      m = 0;
      for (j = 1; j < n; j++) { if (stand[j] < stand[m] - 0.001) { m = j; } }
      wahl.push(m); stand[m] += h[i];
    }
    if (!frei) { return wahl; }

    var bestes = null, bestWert = Infinity;
    var versuch = new Array(frei);
    function tiefer(k, s) {
      if (k === frei) {
        var max = s[0], min = s[0];
        for (var q = 1; q < n; q++) {
          if (s[q] > max) { max = s[q]; }
          if (s[q] < min) { min = s[q]; }
        }
        if (min === 0 && h.length >= n) { return; }   /* keine leere Spalte */
        if (max - min < bestWert - 0.0005) {
          bestWert = max - min; bestes = versuch.slice();
        }
        return;
      }
      for (var c = 0; c < n; c++) {
        versuch[k] = c;
        s[c] += h[fest + k];
        tiefer(k + 1, s);
        s[c] -= h[fest + k];
      }
    }
    tiefer(0, stand.slice());
    return bestes ? wahl.concat(bestes) : wahl;
  }

  /* Rest ausgleichen: was an einer kürzeren Spalte unten fehlt, wird auf
     ihre Zwischenräume verteilt, damit alle Spalten auf derselben Linie
     enden. Nur solange der Zuschlag den normalen Abstand nicht übersteigt
     — sonst risse die Spalte auseinander und der Rest bleibt stehen. */
  function ausgleichen(spalten) {
    var hoehen = spalten.map(function (c) { return c.getBoundingClientRect().height; });
    var tief = Math.max.apply(null, hoehen);
    spalten.forEach(function (c, i) {
      var fehlt = tief - hoehen[i];
      var n = c.children.length - 1;
      if (fehlt < 2 || n < 1) { return; }
      var g = parseFloat(window.getComputedStyle(c).rowGap) || 0;
      if (fehlt / n > g) { return; }
      c.style.rowGap = (g + fehlt / n).toFixed(1) + 'px';
    });
  }

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
      /* erst leer einhängen, damit die Spaltenbreite messbar ist */
      raster.appendChild(seg);
      var wahl = verteile(hoehen_von(s.figs, luecke(spalten[0])), n);
      for (var k = 0; k < s.figs.length; k++) { spalten[wahl[k]].appendChild(s.figs[k]); }
      ausgleichen(spalten);
    });
  }
  raster.classList.add('ist-masonry');
  bauen();
  if (mq.addEventListener) { mq.addEventListener('change', bauen); }
  else if (mq.addListener) { mq.addListener(bauen); }
};

/* Alle Raster, die beim Laden schon gefüllt im HTML stehen. Raster, die
   erst per Skript gefüllt werden (Portfolio), rufen AV_masonry selbst. */
[].forEach.call(document.querySelectorAll('.gal-raster'), function (r) {
  if (r.children.length) { window.AV_masonry(r); }
});
