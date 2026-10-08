/* =====================================================================
   antoniavalladares.com — Portfolio

   Gleiche Regeln wie auf der Startseite:
     · genau EINE requestAnimationFrame-Schleife
     · im Frame wird NIE Layout gelesen — alle Maße liegen im Cache
     · geschrieben wird nur transform und opacity, und nur bei Änderung
     · Seitenverhältnisse kommen aus photos.js, nichts wird nachgemessen

   Hochzeiten sind ein Raster und stehen fest im HTML — auch ohne
   JavaScript sichtbar und für Suchmaschinen lesbar. Familien und
   Business sind ein Foto-Flug mit einer Querstrecke in der Mitte; die
   Bilder werden hier erzeugt, weil ihre Position gerechnet wird.

   01 Werkzeug · 02 Bildausgabe · 03 Flug · 04 Querstrecke
   05 Reiter · 06 Taktgeber
   ===================================================================== */
(function () {
  'use strict';

  var P = window.AV_PHOTOS;
  if (!P) { return; }

  var IMG = 'assets/img/';
  var MOTION_OK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PINNED = MOTION_OK && window.matchMedia('(min-width: 901px) and (hover: hover)').matches;

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
  function media(src, alt, sizes) {
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
    img.loading = 'lazy';
    pic.appendChild(source);
    pic.appendChild(img);
    return pic;
  }
  function lbFigure(entry, sizes) {
    var fig = document.createElement('figure');
    fig.className = 'lb-fig';
    fig.dataset.full = IMG + entry[0];
    fig.dataset.alt = entry[2];
    fig.setAttribute('role', 'button');
    fig.tabIndex = 0;
    fig.appendChild(media(entry[0], entry[2], sizes));
    return fig;
  }

  /* ── 03 FOTO-FLUG ────────────────────────────────────────────────────
     Zwei bis drei Spuren mit gemeinsamem Cursor, dadurch überlappt
     garantiert nichts. Der Streifen wird einmal aufgebaut und einmal
     geklont, damit der Durchlauf nahtlos von vorn beginnt.
     Gegenüber der Startseite: weniger Spuren, breitere Bilder,
     langsamere Grunddrift. */
  /* Deutlich größer als auf der Startseite — hier sollen die Bilder
     wirken, nicht nur vorbeiziehen. Wie viele Spuren, richtet sich nach
     der Menge: wenige Fotos auf drei Spuren wirken verloren. */
  var LANES_3 = [
    { l0: 2,  l1: 12, w0: 26, w1: 34 },
    { l0: 34, l1: 44, w0: 28, w1: 37 },
    { l0: 64, l1: 74, w0: 24, w1: 33 }
  ];
  var LANES_2 = [
    { l0: 3,  l1: 13, w0: 40, w1: 50 },
    { l0: 48, l1: 58, w0: 36, w1: 46 }
  ];

  function Flow(section, list, seed) {
    this.sec = section;
    this.stage = section.querySelector('.pf-flow-stage');
    this.track = section.querySelector('.pf-flow-track');
    this.list = list;
    this.seed = seed;
    this.pos = 0; this.band = 0;
    this.top = 0; this.height = 0;
    this.build();
  }

  Flow.prototype.build = function () {
    var W = this.stage.clientWidth || window.innerWidth;
    var H = this.stage.clientHeight || window.innerHeight;
    if (!W) { return; }

    /* Unter zehn Fotos zwei Spuren, sonst drei. So bleibt die Fläche
       gefüllt, egal wie viel Material vorliegt. */
    var lanes = (W < 1000 || this.list.length < 10) ? LANES_2 : LANES_3;
    var rng = prng(this.seed * 977 + 13);
    var items = [];
    var cursor = H * 0.30;

    for (var i = 0; i < this.list.length; i++) {
      var entry = this.list[i];
      var ratio = entry[1];
      var lane = lanes[i % lanes.length];

      var w = (lane.w0 + rng() * (lane.w1 - lane.w0)) * W / 100;
      var h = w / ratio;
      var left = (lane.l0 + rng() * (lane.l1 - lane.l0)) * W / 100;
      left = clamp(left, 8, Math.max(8, W - w - 8));
      var gap = (2 + rng() * 5) * H / 100;

      items.push({ entry: entry, x: left, y: cursor, w: w, h: h });
      cursor += h * 0.52 + gap;
    }

    this.band = cursor + H * 0.24;

    var frag = document.createDocumentFragment();
    for (var pass = 0; pass < 2; pass++) {
      for (var k = 0; k < items.length; k++) {
        var it = items[k];
        var fig = lbFigure(it.entry, Math.round(it.w / window.innerWidth * 100) + 'vw');
        fig.style.cssText =
          'left:' + it.x.toFixed(1) + 'px;top:' + (it.y + pass * this.band).toFixed(1) +
          'px;width:' + it.w.toFixed(1) + 'px;height:' + it.h.toFixed(1) + 'px;';
        if (pass === 1) {
          fig.setAttribute('aria-hidden', 'true');
          fig.removeAttribute('tabindex');
          var im = fig.querySelector('img');
          if (im) { im.alt = ''; }
        }
        frag.appendChild(fig);
      }
    }
    this.track.textContent = '';
    this.track.appendChild(frag);

    /* Scrollweg richtet sich nach der Menge der Fotos — mehr Bilder,
       längere Strecke. Ohne Pinning bleibt die Sektion so hoch wie ihr
       Inhalt, dafür sorgt das CSS. */
    if (PINNED) {
      var vh = window.innerHeight;
      this.sec.style.height = Math.round(vh + clamp(this.list.length * 0.55, 1.6, 6) * vh) + 'px';
    } else {
      this.sec.style.height = '';
    }
  };

  Flow.prototype.measure = function () {
    this.top = this.sec.offsetTop;
    this.height = this.sec.offsetHeight;
  };

  Flow.prototype.step = function (dt, dy, y, vh) {
    if (!PINNED || this.band < 10) { return; }
    if (y + vh < this.top || y > this.top + this.height) { return; }
    /* Grunddrift plus scrollgekoppelter Anteil. Langsamer als auf der
       Startseite: dort vh/26, hier vh/40. */
    this.pos += (vh / 40) * dt + dy * 0.22;
    this.pos = ((this.pos % this.band) + this.band) % this.band;
    setStyle(this.track, 'transform', 'translate3d(0,' + (-this.pos).toFixed(1) + 'px,0)');
  };

  /* ── 04 QUERSTRECKE ─────────────────────────────────────────────── */
  function Reel(section, list) {
    this.sec = section;
    this.track = section.querySelector('.pf-reel-track');
    this.bar = section.querySelector('.pf-reel-progress i');
    this.span = 0; this.top = 0; this.height = 0;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < list.length; i++) {
      var fig = lbFigure(list[i], '(max-width: 900px) 74vw, 34vw');
      fig.style.aspectRatio = String(list[i][1]);
      frag.appendChild(fig);
    }
    this.track.textContent = '';
    this.track.appendChild(frag);
  }

  Reel.prototype.measure = function () {
    if (!PINNED) { this.sec.style.height = ''; this.span = 0; return; }
    var vw = window.innerWidth, vh = window.innerHeight;
    this.span = Math.max(0, this.track.scrollWidth - vw);
    var travel = clamp(this.span, vh * 1.2, vw * 2.0);
    this.sec.style.height = (vh + travel) + 'px';
    this.top = this.sec.offsetTop;
    this.height = this.sec.offsetHeight;
  };

  Reel.prototype.step = function (y, vh) {
    if (!PINNED || this.span <= 0) { return; }
    if (y + vh < this.top || y > this.top + this.height) { return; }
    var q = clamp((y - this.top) / Math.max(1, this.height - vh), 0, 1);
    setStyle(this.track, 'transform', 'translate3d(' + (-q * this.span).toFixed(1) + 'px,0,0)');
    if (this.bar) { setStyle(this.bar, 'width', (q * 100).toFixed(1) + '%'); }
  };

  /* ── 05 REITER ──────────────────────────────────────────────────── */
  var body = document.body;
  var tabs = [].slice.call(document.querySelectorAll('.pf-tab'));
  var panels = [].slice.call(document.querySelectorAll('.pf-panel'));
  var lead = document.querySelector('.pf-lead');

  var LEADS = {
    hochzeiten: 'Neun ausgewählte Hochzeiten, von der Blitzhochzeit im Standesamt bis zu zwei Tagen in den Weinbergen Umbriens. Wählt eine Hochzeit aus.',
    familien:   'Babybauch, die ersten Tage und alles danach. Scrollt einfach weiter — die Bilder ziehen von selbst vorbei.',
    business:   'Portraits und Teams, die nach euch aussehen und nicht nach Bestandsfoto. Scrollt einfach weiter.'
  };
  var ANKER = { weddings: 'hochzeiten', couples: 'hochzeiten',
                families: 'familien',  newborn: 'familien',
                business: 'business' };
  var HASH = { hochzeiten: 'weddings', familien: 'families', business: 'business' };

  var gebaut = {};
  var flows = [], reels = [];

  function baueBereich(name) {
    if (gebaut[name]) { return; }
    gebaut[name] = true;
    var panel = document.querySelector('.pf-panel[data-panel="' + name + '"]');
    if (!panel) { return; }
    var flowSecs = panel.querySelectorAll('.pf-flow');
    var listen = name === 'familien' ? [P.FLOW_FAMILIEN] : [P.FLOW_BUSINESS];
    for (var i = 0; i < flowSecs.length && i < listen.length; i++) {
      flows.push(new Flow(flowSecs[i], listen[i], name === 'familien' ? 2 : 3));
    }
    var reelSec = panel.querySelector('.pf-reel');
    if (reelSec) {
      reels.push(new Reel(reelSec, name === 'familien' ? P.REEL_BABYBAUCH : P.REEL_KRANZ));
    }
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

  /* ── 06 TAKTGEBER ───────────────────────────────────────────────── */
  var metrics = { vh: window.innerHeight, vw: window.innerWidth };

  function messen() {
    metrics.vh = window.innerHeight;
    metrics.vw = window.innerWidth;
    for (var i = 0; i < flows.length; i++) { flows[i].measure(); }
    for (var j = 0; j < reels.length; j++) { reels[j].measure(); }
    /* Reihenfolge: Reel verändert die Höhe, danach müssen die Flüge neu */
    for (var k = 0; k < flows.length; k++) { flows[k].measure(); }
  }

  var y = window.scrollY || 0, lastY = y, lastT = 0;
  window.addEventListener('scroll', function () { y = window.scrollY || 0; }, { passive: true });

  var REIN = 40, RAUS = 180;

  function frame(now) {
    var dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0.016;
    lastT = now;
    var dy = y - lastY; lastY = y;
    var vh = metrics.vh;

    for (var i = 0; i < flows.length; i++) { flows[i].step(dt, dy, y, vh); }
    for (var j = 0; j < reels.length; j++) { reels[j].step(y, vh); }

    /* Die linke Spalte fährt hinaus, sobald man in Familien oder
       Business zu scrollen beginnt, und kommt beim Zurückscrollen
       wieder herein. Zwei Schwellen, damit es an der Grenze nicht
       flackert. Bei Hochzeiten bleibt sie immer stehen. */
    if (body.dataset.tab === 'hochzeiten') {
      setClass(body, 'is-wide', false);
    } else if (!body.classList.contains('is-wide') && y > RAUS) {
      setClass(body, 'is-wide', true);
    } else if (body.classList.contains('is-wide') && y < REIN) {
      setClass(body, 'is-wide', false);
    }

    requestAnimationFrame(frame);
  }

  /* Aufbau */
  var hash = (location.hash || '').replace('#', '');
  if (ANKER[hash] && ANKER[hash] !== 'hochzeiten') { setTab(ANKER[hash], false); }

  messen();
  requestAnimationFrame(frame);

  var rebuildTimer;
  window.addEventListener('resize', function () {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(function () {
      if (window.innerWidth !== metrics.vw) {
        for (var i = 0; i < flows.length; i++) { flows[i].build(); }
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

  /* Ausstiege aus der Querstrecke, wie auf der Startseite */
  (function () {
    var zonen = document.querySelectorAll('.pf-escape');
    if (!zonen.length) { return; }
    var mode = null, springt = false;

    function raus(dir, sec) {
      if (springt) { return; }
      springt = true;
      var top = sec.offsetTop, hoehe = sec.offsetHeight;
      var ziel = dir === 'up' ? Math.max(0, top - metrics.vh * 0.9) : top + hoehe + 2;
      window.scrollTo({ top: ziel, behavior: MOTION_OK ? 'smooth' : 'auto' });
      setTimeout(function () { springt = false; mode = null; }, 900);
    }

    [].forEach.call(zonen, function (el) {
      var dir = el.classList.contains('pf-escape--top') ? 'up' : 'down';
      var sec = el.closest('.pf-reel');
      el.addEventListener('pointerenter', function () { mode = { dir: dir, sec: sec }; });
      el.addEventListener('pointerleave', function () { mode = null; });
      el.addEventListener('click', function () { raus(dir, sec); });
      el.addEventListener('focus', function () { mode = { dir: dir, sec: sec }; });
      el.addEventListener('blur', function () { mode = null; });
    });

    window.addEventListener('wheel', function (e) {
      if (!mode || !PINNED) { return; }
      if (mode.dir === 'down' && e.deltaY <= 0) { return; }
      if (mode.dir === 'up' && e.deltaY >= 0) { return; }
      e.preventDefault();
      raus(mode.dir, mode.sec);
    }, { passive: false });
  })();
})();
