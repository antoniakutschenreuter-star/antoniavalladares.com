/* =====================================================================
   antoniavalladares.com — Portfolio

   Hochzeiten sind ein Kachelraster und stehen fest im HTML — auch ohne
   JavaScript sichtbar und für Suchmaschinen lesbar.

   Familien, Business und Schauspiel sind Flugstrecken wie auf der
   Startseite, nur ruhiger: feste Spurbreiten, gleichmäßige Abstände,
   mittelgroße Bilder. Die Fotos werden hier erzeugt, weil ihre Position
   gerechnet wird; ohne JavaScript steht in jedem Bereich ein Textblock
   mit demselben Inhalt für Suchmaschinen.

   01 Werkzeug · 02 Bildausgabe · 03 Flugstrecke · 04 Reiter · 05 Takt
   ===================================================================== */
(function () {
  'use strict';

  var P = window.AV_PHOTOS;
  if (!P) { return; }

  var IMG = 'assets/img/';
  var MOTION_OK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 01 WERKZEUG ────────────────────────────────────────────────── */
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function prng(seed) {
    var s = (seed >>> 0) + 1;
    return function () {
      s += 0x6D2B79F5;
      var t = Math.imul(s ^ (s >>> 15), s | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function setStyle(el, prop, value) {
    if (el.__last === undefined) { el.__last = {}; }
    if (el.__last[prop] === value) { return; }
    el.__last[prop] = value;
    el.style[prop] = value;
  }
  function setClass(el, name, on) {
    if (!el) { return; }
    if (el.classList.contains(name) !== on) { el.classList.toggle(name, on); }
  }

  /* ── 02 BILDAUSGABE ─────────────────────────────────────────────── */
  function media(src, alt, sizes, eager) {
    var base = src.replace(/\.[^.]+$/, '');
    var pic = document.createElement('picture');
    var source = document.createElement('source');
    source.type = 'image/webp';
    source.srcset = IMG + base + '-320.webp 320w, ' + IMG + base + '-640.webp 640w, ' +
                    IMG + base + '-1280.webp 1280w';
    source.sizes = sizes;
    var img = document.createElement('img');
    img.src = IMG + src;
    img.alt = alt;
    img.sizes = sizes;
    img.decoding = 'async';
    img.loading = eager ? 'eager' : 'lazy';
    pic.appendChild(source);
    pic.appendChild(img);
    return pic;
  }
  function lbFigure(entry, sizes, eager) {
    var fig = document.createElement('figure');
    fig.className = 'lb-fig';
    fig.dataset.full = IMG + entry[0];
    fig.dataset.alt = entry[2];
    fig.setAttribute('role', 'button');
    fig.tabIndex = 0;
    fig.appendChild(media(entry[0], entry[2], sizes, eager));
    return fig;
  }

  /* ── 03 FLUGSTRECKE ──────────────────────────────────────────────────
     Drei Spuren (auf dem Handy zwei) mit fester Breite und gleichem
     Abstand. Alle Bilder sind gleich breit, nur die Höhe folgt dem
     Seitenverhältnis — dadurch wirkt die Strecke ruhiger als auf der
     Startseite. Der Streifen wird einmal gebaut und einmal geklont,
     damit der Durchlauf nahtlos von vorn beginnt. */
  var SPUREN_3 = [4, 39, 74];      /* linke Kante in Prozent der Bühne */
  var SPUREN_2 = [11, 55];         /* wenige Fotos: zwei Spuren, sonst wirkt es leer */
  var SPUREN_HANDY = [5, 53];
  var BREITE_3 = 22;               /* Bildbreite in Prozent der Bühne */
  var BREITE_2 = 31;
  var BREITE_HANDY = 41;
  var KOPPLUNG = 0.55;             /* wie stark das Scrollen die Fotos zieht */

  function Flug(section, liste, seed) {
    this.sec = section;
    this.stage = section.querySelector('.pf-flow-stage');
    this.track = section.querySelector('.pf-flow-track');
    /* durchmischt, damit nie zwei fast gleiche Aufnahmen nebeneinander stehen */
    this.liste = window.AV_mischen ? window.AV_mischen(liste) : liste;
    this.seed = seed;
    this.pos = 0; this.band = 0;
    this.top = 0; this.height = 0;
    this.bauen();
  }

  Flug.prototype.bauen = function () {
    var W = this.stage.clientWidth || this.sec.clientWidth || window.innerWidth;
    /* Auf dem Handy steht die Bühne still und hat keine eigene Höhe —
       dann rechnen wir mit der Fensterhöhe, sonst entsteht gar nichts. */
    var H = this.stage.clientHeight || window.innerHeight;
    if (!W) { return; }

    var schmal = W < 760;
    var wenig = this.liste.length <= 9;
    var spuren = schmal ? SPUREN_HANDY : (wenig ? SPUREN_2 : SPUREN_3);
    var breite = (schmal ? BREITE_HANDY : (wenig ? BREITE_2 : BREITE_3)) * W / 100;
    var rng = prng(this.seed * 977 + 13);
    var stuecke = [];
    /* Jede Spur hat ihren eigenen Stand. Ein neues Foto kommt immer in
       die Spur, die gerade am weitesten oben endet — so überlappt nichts
       und der Abstand bleibt überall gleich. */
    var abstand = H * 0.075;
    var stand = [];
    for (var j = 0; j < spuren.length; j++) { stand.push(H * 0.1 + j * abstand * 0.6); }

    for (var i = 0; i < this.liste.length; i++) {
      var eintrag = this.liste[i];
      var hoehe = breite / eintrag[1];
      var spur = 0;
      for (var m = 1; m < stand.length; m++) { if (stand[m] < stand[spur] - 0.5) { spur = m; } }
      /* winzige Abweichung, damit es nicht wie ein Raster aussieht */
      var links = (spuren[spur] + (rng() - 0.5) * 2.4) * W / 100;
      links = clamp(links, 8, W - breite - 8);
      stuecke.push({ eintrag: eintrag, x: links, y: stand[spur], w: breite, h: hoehe, i: i });
      stand[spur] += hoehe + abstand;
    }
    var tiefste = stand[0];
    for (var n = 1; n < stand.length; n++) { if (stand[n] > tiefste) { tiefste = stand[n]; } }
    this.band = tiefste + H * 0.05;

    var frag = document.createDocumentFragment();
    for (var lauf = 0; lauf < 2; lauf++) {
      for (var k = 0; k < stuecke.length; k++) {
        var s = stuecke[k];
        var fig = lbFigure(s.eintrag,
          Math.round(s.w / window.innerWidth * 100) + 'vw',
          lauf === 0 && s.i < 3);
        fig.style.cssText =
          'left:' + s.x.toFixed(1) + 'px;' +
          'top:' + (s.y + lauf * this.band).toFixed(1) + 'px;' +
          'width:' + s.w.toFixed(1) + 'px;' +
          'height:' + s.h.toFixed(1) + 'px;';
        if (lauf === 1) {
          fig.setAttribute('aria-hidden', 'true');
          var im = fig.querySelector('img');
          if (im) { im.alt = ''; }
        }
        frag.appendChild(fig);
      }
    }
    this.track.textContent = '';
    this.track.appendChild(frag);
  };

  Flug.prototype.messen = function () {
    /* Der Abschnitt ist so hoch, dass alle Fotos genau einmal durchlaufen */
    if (this.band > 10) {
      this.sec.style.height = Math.round(window.innerHeight + this.band / KOPPLUNG) + 'px';
    }
    this.top = this.sec.offsetTop;
    this.height = this.sec.offsetHeight;
  };

  Flug.prototype.schritt = function (dt, dy, y, vh) {
    if (y + vh < this.top || y > this.top + this.height) { return; }
    if (this.band < 10 || !MOTION_OK) { return; }
    this.pos += (vh / 34) * dt + dy * KOPPLUNG;
    this.pos = ((this.pos % this.band) + this.band) % this.band;
    setStyle(this.track, 'transform', 'translate3d(0,' + (-this.pos).toFixed(1) + 'px,0)');
  };

  /* ── 04 REITER ──────────────────────────────────────────────────── */
  var body = document.body;
  var tabs = [].slice.call(document.querySelectorAll('.pf-tab'));
  var panels = [].slice.call(document.querySelectorAll('.pf-panel'));
  var lead = document.querySelector('.pf-lead');

  var LISTEN = {
    familien: ['FLOW_FAMILIEN', 'REEL_BABYBAUCH'],
    business: ['FLOW_BUSINESS'],
    schauspiel: ['FLOW_SCHAUSPIEL']
  };

  var LEADS = {
    hochzeiten: 'Neun ausgewählte Hochzeiten, vom Standesamt in der Mandlstraße bis zu zwei Tagen in den Weinbergen Umbriens. Wählt eine Hochzeit aus.',
    familien:   'Babybauch, Neugeborene und Familien, fotografiert in München, Donauwörth und dort, wo ihr zu Hause seid.',
    business:   'Business-Portraits und Teamfotos aus München, für Website, LinkedIn und Bewerbung.',
    schauspiel: 'Schauspielportraits für die Kartei: mehrere Typen an einem Nachmittag, vorher in Ruhe besprochen.'
  };
  var ANKER = { weddings: 'hochzeiten', couples: 'hochzeiten',
                families: 'familien',  newborn: 'familien',
                business: 'business',  acting: 'schauspiel' };
  var HASH = { hochzeiten: 'weddings', familien: 'families',
               business: 'business',  schauspiel: 'acting' };

  var gebaut = {};
  var fluege = [];

  function baueBereich(name) {
    if (gebaut[name]) { return; }
    gebaut[name] = true;
    var sec = document.querySelector('.pf-panel[data-panel="' + name + '"] .pf-flow');
    if (!sec) { return; }
    var liste = [];
    (LISTEN[name] || []).forEach(function (s) { liste = liste.concat(P[s] || []); });
    if (!liste.length) { return; }
    fluege.push(new Flug(sec, liste, Object.keys(gebaut).length));
    messen();
  }

  function setTab(name, scroll) {
    if (body.dataset.tab === name) { return; }
    body.dataset.tab = name;
    body.classList.remove('is-wide');
    tabs.forEach(function (t) { t.setAttribute('aria-current', String(t.dataset.tab === name)); });
    panels.forEach(function (p) { p.classList.toggle('is-active', p.dataset.panel === name); });
    if (lead) { lead.textContent = LEADS[name] || ''; }
    if (name !== 'hochzeiten') { baueBereich(name); }
    if (scroll) { window.scrollTo({ top: 0, behavior: MOTION_OK ? 'smooth' : 'auto' }); }
    messen();
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      setTab(t.dataset.tab, true);
      if (history.replaceState) { history.replaceState(null, '', '#' + HASH[t.dataset.tab]); }
    });
  });

  /* ── 05 TAKTGEBER ───────────────────────────────────────────────── */
  var metrics = { vh: window.innerHeight, vw: window.innerWidth };

  function messen() {
    metrics.vh = window.innerHeight;
    metrics.vw = window.innerWidth;
    for (var i = 0; i < fluege.length; i++) { fluege[i].messen(); }
  }

  var y = window.scrollY || 0, lastY = y, lastT = 0;
  window.addEventListener('scroll', function () { y = window.scrollY || 0; }, { passive: true });

  var REIN = 40, RAUS = 180;

  function frame(now) {
    var dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0.016;
    lastT = now;
    var dy = y - lastY; lastY = y;

    for (var i = 0; i < fluege.length; i++) { fluege[i].schritt(dt, dy, y, metrics.vh); }

    /* Die linke Spalte fährt hinaus, sobald man in einem Bildbereich zu
       scrollen beginnt. Zwei Schwellen, damit nichts flackert. */
    if (body.dataset.tab === 'hochzeiten') { setClass(body, 'is-wide', false); }
    else if (!body.classList.contains('is-wide') && y > RAUS) { setClass(body, 'is-wide', true); }
    else if (body.classList.contains('is-wide') && y < REIN) { setClass(body, 'is-wide', false); }

    requestAnimationFrame(frame);
  }

  var hash = (location.hash || '').replace('#', '');
  if (ANKER[hash] && ANKER[hash] !== 'hochzeiten') { setTab(ANKER[hash], false); }

  messen();
  requestAnimationFrame(frame);

  var neuTimer;
  window.addEventListener('resize', function () {
    clearTimeout(neuTimer);
    neuTimer = setTimeout(function () {
      if (window.innerWidth !== metrics.vw) {
        for (var i = 0; i < fluege.length; i++) { fluege[i].bauen(); }
      }
      messen();
    }, 200);
  }, { passive: true });

  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(messen); }
  window.addEventListener('load', messen);

  /* Rückweg zu den Kategorien */
  var back = document.querySelector('.pf-back');
  if (back) {
    back.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: MOTION_OK ? 'smooth' : 'auto' });
    });
  }

  /* Kacheln ohne Galerie führen nirgendwohin */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('.pf-tile[aria-disabled="true"]') : null;
    if (a) { e.preventDefault(); }
  });
})();
