/* =====================================================================
   antoniavalladares.com — Startseite

   LEITGEDANKE FÜR DIE PERFORMANCE
   Das Ruckeln der alten Fassung kam daher, dass pro Bild pro Frame
   Layout gelesen und geschrieben wurde. Hier gilt strikt:

     · genau EINE requestAnimationFrame-Schleife für die ganze Seite
     · im Frame wird NIE Layout gelesen (kein offsetTop, kein
       getBoundingClientRect) — alle Maße liegen im Cache
     · geschrieben wird nur transform und opacity, und nur dann,
       wenn sich der Wert tatsächlich geändert hat
     · Seitenverhältnisse kommen aus photos.js, es wird also nichts
       nachgemessen und nichts springt beim Nachladen

   AUFBAU
     01 Werkzeug        06 Zitat + Wortmarke
     02 Bildausgabe     07 Intro-Vorhang
     03 Foto-Flug       08 Menü
     04 Reel            09 Lightbox
     05 Taktgeber       10 Schriftschalter
   ===================================================================== */
(function () {
  'use strict';

  var P = window.AV_PHOTOS;
  if (!P) { return; }

  var IMG   = 'assets/img/';
  var MOTION_OK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 01 WERKZEUG ────────────────────────────────────────────────── */
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function seg(v, a, b)   { return clamp((v - a) / (b - a), 0, 1); }

  /* Deterministischer Zufall: gleiches Layout bei jedem Aufruf */
  function prng(seed) {
    var s = (seed >>> 0) + 1;
    return function () {
      s += 0x6D2B79F5;
      var t = Math.imul(s ^ (s >>> 15), s | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Schreibt nur, wenn sich der Wert geändert hat */
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
  /* Liefert ein <picture> mit WebP in zwei Breiten und JPG als Rückfall.
     Das Original-JPG bleibt für die Lightbox erhalten. */
  function media(src, alt, sizes, eager) {
    var base = src.replace(/\.[^.]+$/, '');
    var pic  = document.createElement('picture');

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
    if (eager) { img.setAttribute('fetchpriority', 'high'); }

    pic.appendChild(source);
    pic.appendChild(img);
    return pic;
  }

  /* Bildkachel, die die Lightbox öffnen kann */
  function lbFigure(entry, sizes, eager) {
    var fig = document.createElement('figure');
    fig.className = 'lb-fig';
    fig.dataset.full = IMG + entry[0];
    fig.dataset.alt  = entry[2];
    fig.appendChild(media(entry[0], entry[2], sizes, eager));
    return fig;
  }

  /* ── 03 FOTO-FLUG ───────────────────────────────────────────────── */
  /* Drei Spuren, gemeinsamer Cursor: dadurch überlappt garantiert nichts.
     Der Streifen wird einmal aufgebaut und einmal geklont, damit der
     Durchlauf nahtlos wieder von vorn beginnt. */
  var LANES_3 = [
    { l0: 1,  l1: 20, w0: 17, w1: 25 },
    { l0: 33, l1: 52, w0: 19, w1: 28 },
    { l0: 64, l1: 81, w0: 16, w1: 24 }
  ];
  var LANES_2 = [
    { l0: 2,  l1: 13, w0: 36, w1: 46 },
    { l0: 50, l1: 61, w0: 34, w1: 44 }
  ];

  function Flow(section, list, seed) {
    this.sec   = section;
    this.stage = section.querySelector('.flow-stage');
    this.track = section.querySelector('.flow-track');
    /* durchmischt, damit nie zwei fast gleiche Aufnahmen nebeneinander stehen */
    this.list  = window.AV_mischen ? window.AV_mischen(list) : list;
    this.seed  = seed;
    this.pos   = 0;
    this.band  = 0;
    this.top = 0; this.height = 0;
    this.build();
  }

  Flow.prototype.build = function () {
    var W = this.stage.clientWidth;
    var H = this.stage.clientHeight;
    if (!W || !H) { return; }

    var lanes = W < 760 ? LANES_2 : LANES_3;
    var rng   = prng(this.seed * 977 + 13);
    var items = [];
    var cursor = H * 0.34;          /* startet unterhalb des Schleiers */

    for (var i = 0; i < this.list.length; i++) {
      var entry = this.list[i];
      var ratio = entry[1];
      var lane  = lanes[i % lanes.length];

      var w = (lane.w0 + rng() * (lane.w1 - lane.w0)) * W / 100;
      var h = w / ratio;
      var left = (lane.l0 + rng() * (lane.l1 - lane.l0)) * W / 100;
      left = clamp(left, 8, W - w - 8);
      var gap = (2 + rng() * 5) * H / 100;

      items.push({ entry: entry, x: left, y: cursor, w: w, h: h, i: i });
      cursor += h * 0.55 + gap;
    }

    this.band = cursor + H * 0.28;

    var frag = document.createDocumentFragment();
    for (var pass = 0; pass < 2; pass++) {
      for (var k = 0; k < items.length; k++) {
        var it = items[k];
        var eager = (pass === 0 && this.seed === 0 && it.i < 3);
        var fig = lbFigure(
          it.entry,
          Math.round(it.w / window.innerWidth * 100) + 'vw',
          eager
        );
        fig.style.cssText =
          'left:' + it.x.toFixed(1) + 'px;' +
          'top:'  + (it.y + pass * this.band).toFixed(1) + 'px;' +
          'width:' + it.w.toFixed(1) + 'px;' +
          'height:' + it.h.toFixed(1) + 'px;';
        if (pass === 1) {
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

  Flow.prototype.measure = function () {
    this.top    = this.sec.offsetTop;
    this.height = this.sec.offsetHeight;
  };

  /* dt = Sekunden seit letztem Frame, dy = Scroll-Delta in Pixeln */
  Flow.prototype.step = function (dt, dy, y, vh) {
    /* außerhalb des Sichtfelds wird gar nicht gerechnet */
    if (y + vh < this.top || y > this.top + this.height) { return; }
    if (this.band < 10) { return; }

    /* Grunddrift plus scrollgekoppelter Anteil: die Fotos fliegen
       durchgehend weiter, auch während das Zitat steht.
       Wer Bewegung reduziert hat, bekommt ein ruhendes Bild. */
    if (!MOTION_OK) { return; }
    this.pos += (vh / 26) * dt + dy * 0.26;
    this.pos = ((this.pos % this.band) + this.band) % this.band;
    setStyle(this.track, 'transform', 'translate3d(0,' + (-this.pos).toFixed(1) + 'px,0)');
  };

  /* ── 04 REEL — horizontale Galerie ──────────────────────────────── */
  /* Die Bilder des Reels stehen fest im HTML — auch ohne JavaScript
     sichtbar und für Suchmaschinen lesbar. Hier wird nur bewegt. */
  function Reel(section) {
    this.sec   = section;
    this.track = section.querySelector('.reel-track');
    this.pinned = false;
    this.span = 0; this.top = 0; this.height = 0;
  }

  Reel.prototype.measure = function () {
    /* auf Touch/schmal läuft das Reel nativ horizontal — kein Pinning */
    this.pinned = MOTION_OK && window.matchMedia('(min-width: 901px) and (hover: hover)').matches;
    if (!this.pinned) {
      this.sec.style.height = '';
      setStyle(this.track, 'transform', 'translate3d(0,0,0)');
      this.span = 0;
      return;
    }
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var full = this.track.scrollWidth;
    this.span = Math.max(0, full - vw);
    /* Scrollweg deckeln: die ganze Reihe läuft in höchstens ~3 Bildschirmen durch */
    var travel = clamp(this.span, vh * 1.2, vw * 2.2);
    this.sec.style.height = (vh + travel) + 'px';
    this.top    = this.sec.offsetTop;
    this.height = this.sec.offsetHeight;
  };

  Reel.prototype.step = function (y, vh) {
    if (!this.pinned || this.span <= 0) { return; }
    if (y + vh < this.top || y > this.top + this.height) { return; }
    var q = clamp((y - this.top) / Math.max(1, this.height - vh), 0, 1);
    setStyle(this.track, 'transform', 'translate3d(' + (-q * this.span).toFixed(1) + 'px,0,0)');
  };

  /* ── 05 TAKTGEBER ───────────────────────────────────────────────── */
  var hero      = document.getElementById('hero');
  var flow2     = document.getElementById('flow2');
  var reelSec   = document.getElementById('reel');
  var wordmark  = document.querySelector('.hero-wordmark');
  var headMark  = document.querySelector('.header-mark');
  var quote     = document.querySelector('.flow-quote');
  var heroVeil  = hero ? hero.querySelector('.flow-veil:not(.flow-veil--bottom)') : null;
  var portraitFig = document.querySelector('.intro-figure');
  var portraitImg = portraitFig ? portraitFig.querySelector('img') : null;
  var portraitTop = 0, portraitH = 0;
  var bar       = document.querySelector('.bookings-bar');

  var flows = [];
  if (hero)  { flows.push(new Flow(hero,  P.FLOW_A, 0)); }
  if (flow2) { flows.push(new Flow(flow2, P.FLOW_B, 1)); }
  var reel = reelSec ? new Reel(reelSec) : null;

  /* Parallax-Kandidaten */
  var paraEls = [].slice.call(document.querySelectorAll('[data-parallax]')).map(function (el) {
    return { el: el, strength: parseFloat(el.dataset.parallax) || 24, top: 0, h: 0, active: false };
  });

  var metrics = { vh: 0, vw: 0, heroTop: 0, heroSpan: 1 };

  function measureAll() {
    metrics.vh = window.innerHeight;
    metrics.vw = window.innerWidth;
    for (var i = 0; i < flows.length; i++) { flows[i].measure(); }
    if (reel) { reel.measure(); }
    if (hero) {
      metrics.heroTop  = hero.offsetTop;
      metrics.heroSpan = Math.max(1, hero.offsetHeight - metrics.vh);
    }
    if (portraitFig) {
      var pr0 = portraitFig.getBoundingClientRect();
      portraitTop = pr0.top + window.scrollY;
      portraitH = pr0.height;
    }
    for (var p = 0; p < paraEls.length; p++) {
      var r = paraEls[p].el.getBoundingClientRect();
      paraEls[p].top = r.top + window.scrollY;
      paraEls[p].h   = r.height;
    }
  }

  /* Parallax nur berechnen, solange das Element wirklich sichtbar ist */
  if ('IntersectionObserver' in window && MOTION_OK) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        for (var i = 0; i < paraEls.length; i++) {
          if (paraEls[i].el === e.target) { paraEls[i].active = e.isIntersecting; }
        }
      });
    }, { rootMargin: '10% 0px' });
    paraEls.forEach(function (p) { io.observe(p.el); });
  }

  var y = window.scrollY || 0;
  var lastY = y;
  var lastT = 0;

  window.addEventListener('scroll', function () {
    y = window.scrollY || 0;
  }, { passive: true });

  function frame(now) {
    var dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0.016;
    lastT = now;
    var dy = y - lastY;
    lastY = y;

    var vh = metrics.vh;

    for (var i = 0; i < flows.length; i++) { flows[i].step(dt, dy, y, vh); }
    if (reel) { reel.step(y, vh); }

    /* ── 06 ZITAT UND WORTMARKE ───────────────────────────────────
       Das Zitat blendet früh ein, steht dann lange (Plateau von
       0,30 bis 0,74 des Hero-Scrollwegs ≈ zweieinhalb Bildschirme)
       und geht erst spät wieder. Die Fotos fliegen die ganze Zeit
       weiter, weil der Flug eine eigene Grunddrift hat. */
    if (hero && quote) {
      var p    = clamp((y - metrics.heroTop) / metrics.heroSpan, 0, 1);
      var into = seg(p, 0.36, 0.44);
      var away = seg(p, 0.80, 0.88);
      var op   = into * (1 - away);

      setStyle(quote, 'opacity', op.toFixed(3));
      var lift = (1 - into) * 5 - away * 5;   /* dezent, kein Springen */
      setStyle(quote, 'transform', 'translate(-50%, calc(-50% + ' + lift.toFixed(2) + 'vh))');

      /* Wortmarke: verabschiedet sich, sobald das Zitat kommt, und
         rückt gleichzeitig fest in die Kopfzeile ein. */
      var docked = p > 0.32;
      setClass(wordmark, 'is-hidden', docked);
      setClass(headMark, 'is-docked', docked);

      /* Der Schleier schützt die Wortmarke. Sobald sie oben angedockt
         ist, wird er zurückgenommen — die Fotos dürfen atmen. */
      if (heroVeil) { setStyle(heroVeil, 'opacity', docked ? '0.5' : '1'); }
    }

    /* Booking-Leiste nur über den Flug-Abschnitten */
    if (bar) {
      var onFlow = false;
      for (var f = 0; f < flows.length; f++) {
        var fl = flows[f];
        if (y + vh * 0.5 > fl.top && y < fl.top + fl.height - vh * 0.2) { onFlow = true; }
      }
      /* Nicht über der Bildstrecke — dort steht schon „See Gallery“ */
      if (reel && reel.height && y + vh > reel.top && y < reel.top + reel.height) { onFlow = false; }
      setClass(bar, 'is-visible', onFlow);
    }

    /* Parallax */
    if (MOTION_OK) {
      for (var q2 = 0; q2 < paraEls.length; q2++) {
        var it = paraEls[q2];
        if (!it.active) { continue; }
        var prog = clamp((y + vh - it.top) / (vh + it.h), 0, 1);
        setStyle(it.el, 'transform', 'translate3d(0,' + ((prog - 0.5) * -it.strength).toFixed(1) + 'px,0)');
      }

      /* Portrait: das Bild wandert innerhalb seines Rahmens, der Rahmen
         selbst bleibt bündig zum Text stehen. */
      if (portraitImg && portraitFig) {
        var pr = clamp((y + vh - portraitTop) / (vh + portraitH), 0, 1);
        setStyle(portraitImg, 'transform', 'translate3d(0,' + ((0.5 - pr) * 6).toFixed(2) + '%,0)');
      }
    }

    requestAnimationFrame(frame);
  }

  /* Aufbau und Neuvermessung */
  var rebuildTimer;
  function rebuild() {
    for (var i = 0; i < flows.length; i++) { flows[i].build(); }
    measureAll();
  }
  window.addEventListener('resize', function () {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(function () {
      /* Reine Höhenänderung (Mobile-Adressleiste) nicht neu aufbauen */
      if (window.innerWidth !== metrics.vw) { rebuild(); } else { measureAll(); }
    }, 200);
  }, { passive: true });

  measureAll();
  requestAnimationFrame(frame);

  /* Schriften und Bilder verändern die Höhe — danach einmal nachmessen */
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(measureAll); }
  window.addEventListener('load', measureAll);

  /* Jahreszahl in der Fußzeile aktuell halten (kein Inline-Skript → CSP) */
  var jahr = document.getElementById('jahr');
  if (jahr) { jahr.textContent = String(new Date().getFullYear()); }


  /* ── AUSSTIEGE AUS DER BILDSTRECKE ──────────────────────────────────
     Die gepinnte Strecke verbraucht rund drei Bildschirme vertikalen
     Scrollweg. Damit man nicht festhängt: liegt der Zeiger in der Zone
     am oberen oder unteren Bildrand, wird der Scroll durchgereicht —
     mit Faktor, sodass man in normalem Tempo aus der Strecke heraus
     kommt. Ein Klick springt direkt darüber oder darunter. */
  (function () {
    if (!reelSec) { return; }
    var zoneUp   = reelSec.querySelector('.reel-escape--top');
    var zoneDown = reelSec.querySelector('.reel-escape--bottom');
    if (!zoneUp || !zoneDown) { return; }

    var mode = null;   /* 'up' | 'down' | null */
    var springt = false;

    function raus(dir) {
      if (springt) { return; }
      springt = true;
      var ziel = dir === 'up'
        ? Math.max(0, reel.top - metrics.vh * 0.9)
        : reel.top + reel.height + 2;
      window.scrollTo({ top: ziel, behavior: MOTION_OK ? 'smooth' : 'auto' });
      setTimeout(function () { springt = false; mode = null; }, 900);
    }

    function bind(el, dir) {
      el.addEventListener('pointerenter', function () { mode = dir; });
      el.addEventListener('pointerleave', function () { if (mode === dir) { mode = null; } });
      el.addEventListener('click', function () { raus(dir); });
      el.addEventListener('focus', function () { mode = dir; });
      el.addEventListener('blur', function () { if (mode === dir) { mode = null; } });
    }
    bind(zoneUp, 'up');
    bind(zoneDown, 'down');

    /* Eine Radbewegung in einer der Zonen bringt direkt aus der Strecke
       heraus — nicht nur schneller, sondern ganz raus. */
    window.addEventListener('wheel', function (e) {
      if (!mode || !reel.pinned) { return; }
      if (mode === 'down' && e.deltaY <= 0) { return; }
      if (mode === 'up'   && e.deltaY >= 0) { return; }
      e.preventDefault();
      raus(mode);
    }, { passive: false });
  })();

  /* ── ZURÜCK NACH OBEN ───────────────────────────────────────────── */
  (function () {
    var btn = document.querySelector('.to-top');
    if (!btn) { return; }
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: MOTION_OK ? 'smooth' : 'auto' });
    });
    window.addEventListener('scroll', function () {
      setClass(btn, 'is-visible', (window.scrollY || 0) > metrics.vh * 1.8);
    }, { passive: true });
  })();

  /* ── 07 INTRO-VORHANG ───────────────────────────────────────────── */
  (function () {
    var curtain = document.querySelector('.curtain');
    if (!curtain) { return; }

    var seen = false;
    try { seen = sessionStorage.getItem('av-intro') === '1'; } catch (e) { seen = false; }

    if (seen || !MOTION_OK) {
      curtain.parentNode.removeChild(curtain);
      document.body.classList.add('intro-done');
      return;
    }

    document.body.classList.add('has-intro');
    try { sessionStorage.setItem('av-intro', '1'); } catch (e) { /* privater Modus */ }

    var lifted = false;
    function lift() {
      if (lifted) { return; }
      lifted = true;
      curtain.classList.add('is-lifting');
      document.body.classList.remove('has-intro');
      document.body.classList.add('intro-done');
      setTimeout(function () {
        if (curtain.parentNode) { curtain.parentNode.removeChild(curtain); }
        measureAll();
      }, 900);
    }
    setTimeout(lift, 2100);
    /* Notausgang: klicken oder scrollen überspringt den Auftakt */
    curtain.addEventListener('click', lift);
    window.addEventListener('wheel', lift, { once: true, passive: true });
    window.addEventListener('touchstart', lift, { once: true, passive: true });
    window.addEventListener('keydown', lift, { once: true });
  })();

  /* ── 08 MENÜ ────────────────────────────────────────────────────── */
  (function () {
    var overlay = document.getElementById('menu');
    if (!overlay) { return; }
    var opener = document.querySelector('[data-open-menu]');
    var closer = overlay.querySelector('.overlay-close');
    var lastFocus = null;

    /* Menü-Fotos erst einsetzen, wenn sie gebraucht werden */
    var shots = overlay.querySelector('.overlay-shots');
    var loaded = false;
    function fillShots() {
      if (loaded || !shots) { return; }
      loaded = true;
      for (var i = 0; i < P.MENU_SHOTS.length; i++) {
        var fig = document.createElement('figure');
        fig.className = 'shot-' + (i + 1);
        fig.appendChild(media(P.MENU_SHOTS[i][0], '', '24vw', false));
        fig.setAttribute('aria-hidden', 'true');
        shots.appendChild(fig);
      }
    }

    function focusables() {
      return [].slice.call(overlay.querySelectorAll('a[href], button'))
        .filter(function (el) { return el.offsetParent !== null; });
    }

    function open() {
      lastFocus = document.activeElement;
      fillShots();
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      if (opener) { opener.setAttribute('aria-expanded', 'true'); }
      document.documentElement.style.overflow = 'hidden';
      if (closer) { closer.focus(); }
      document.addEventListener('keydown', onKey);
    }
    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      if (opener) { opener.setAttribute('aria-expanded', 'false'); }
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
    }
    function onKey(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') { return; }
      var list = focusables();
      if (!list.length) { return; }
      var first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    if (opener) { opener.addEventListener('click', open); }
    if (closer) { closer.addEventListener('click', close); }
    /* Vorladen, sobald die Maus in die Nähe kommt */
    if (opener) { opener.addEventListener('pointerenter', fillShots, { once: true }); }
  })();

  /* ── 09 LIGHTBOX ────────────────────────────────────────────────────
     Verhalten bleibt wie gehabt: Klick auf ein Foto öffnet es groß,
     Klick daneben schließt, kein X. Neu: Pfeiltasten und Wischen
     blättern durch die jeweilige Gruppe, und der Fokus bleibt drin. */
  (function () {
    var ov = document.createElement('div');
    ov.className = 'lb-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Foto in groß');
    ov.setAttribute('aria-hidden', 'true');

    var wrap = document.createElement('div');
    wrap.className = 'lb-img-wrap';
    wrap.tabIndex = -1;

    var img = document.createElement('img');
    img.alt = '';
    wrap.appendChild(img);
    ov.appendChild(wrap);
    document.body.appendChild(ov);

    var group = [];
    var index = 0;
    var lastFocus = null;

    function show(i) {
      index = (i + group.length) % group.length;
      var fig = group[index];
      var voll = fig.dataset.full;
      var basis = voll.replace(/\.[^.]+$/, '');
      /* Normale Bildschirme bekommen die kleine WebP, hochauflösende das
         scharfe Original — der Browser entscheidet selbst. */
      img.srcset = basis + '-1280.webp 1280w, ' + voll + ' 2000w';
      img.sizes = '88vw';
      img.src = voll;
      img.alt = fig.dataset.alt || '';
    }
    function open(fig) {
      var parent = (fig.closest && fig.closest('.gal-raster')) || fig.parentNode;
      group = [].slice.call(parent.querySelectorAll('.lb-fig'))
        .filter(function (f) { return f.getAttribute('aria-hidden') !== 'true'; });
      if (parent.classList && parent.classList.contains('ist-masonry')) {
        group.sort(function (a, b) { return a.dataset.nr - b.dataset.nr; });
      }
      if (!group.length) { group = [fig]; }
      var start = group.indexOf(fig);
      lastFocus = document.activeElement;
      show(start < 0 ? 0 : start);
      ov.classList.add('is-open');
      ov.setAttribute('aria-hidden', 'false');
      wrap.focus();
      document.addEventListener('keydown', onKey);
    }
    function close() {
      ov.classList.remove('is-open');
      ov.setAttribute('aria-hidden', 'true');
      document.removeEventListener('keydown', onKey);
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
      setTimeout(function () { if (!ov.classList.contains('is-open')) { img.removeAttribute('src'); img.removeAttribute('srcset'); } }, 350);
    }
    function onKey(e) {
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowRight') { show(index + 1); }
      else if (e.key === 'ArrowLeft')  { show(index - 1); }
      else if (e.key === 'Tab') { e.preventDefault(); }
    }

    ov.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) { close(); }
    });

    document.addEventListener('click', function (e) {
      var fig = e.target.closest ? e.target.closest('.lb-fig') : null;
      if (!fig || !fig.dataset.full) { return; }
      e.preventDefault();
      open(fig);
    });

    /* Tastatur: die Galerie-Kacheln sind mit Tab erreichbar */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') { return; }
      var fig = e.target.closest ? e.target.closest('.lb-fig[tabindex]') : null;
      if (!fig || !fig.dataset.full) { return; }
      e.preventDefault();
      open(fig);
    });

    /* Wischen auf dem Handy */
    var x0 = null;
    ov.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    ov.addEventListener('touchend', function (e) {
      if (x0 === null) { return; }
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { show(index + (dx < 0 ? 1 : -1)); }
      x0 = null;
    }, { passive: true });
  })();

  /* ── 10 SCHRIFTSCHALTER ─────────────────────────────────────────────
     Nur sichtbar mit ?schrift in der Adresse. Die Wahl wird gemerkt,
     damit sich die ganze Seite in einer Variante durchsehen lässt. */
  (function () {
    var root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem('av-font'); } catch (e) { saved = null; }
    if (saved === 'a' || saved === 'b') { root.setAttribute('data-font', saved); }

    if (location.search.indexOf('schrift') === -1) { return; }
    document.body.classList.add('show-font-switch');

    var box = document.querySelector('.font-switch');
    if (!box) { return; }
    var btns = box.querySelectorAll('button');

    function sync() {
      var cur = root.getAttribute('data-font') || 'a';
      for (var i = 0; i < btns.length; i++) {
        btns[i].setAttribute('aria-pressed', String(btns[i].dataset.font === cur));
      }
    }
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        root.setAttribute('data-font', this.dataset.font);
        try { localStorage.setItem('av-font', this.dataset.font); } catch (e) { /* egal */ }
        sync();
        measureAll();
      });
    }
    sync();
  })();

})();
