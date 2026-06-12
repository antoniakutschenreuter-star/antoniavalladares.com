/* ============================================================
   ANTONIA VALLADARES — script.js
   Mobile nav · hero carousel · STRONG parallax · scroll reveals
   Vanilla JS, no dependencies. Performance-first (rAF + passive).
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = function () { return window.innerWidth <= 860; };

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector('.nav-burger');
  var overlay = document.querySelector('.m-overlay');
  if (burger && overlay) {
    burger.addEventListener('click', function () { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; });
    overlay.querySelectorAll('a, .m-close').forEach(function (el) {
      el.addEventListener('click', function () { overlay.classList.remove('open'); document.body.style.overflow = ''; });
    });
  }

  /* ---------- hero carousel + Ken Burns ---------- */
  var slidesWrap = document.querySelector('.hero-slides');
  if (slidesWrap) {
    var slides = slidesWrap.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.hdot');
    var idx = 0, timer;
    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('on', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
    }
    dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); restart(); }); });
    function restart() { clearInterval(timer); timer = setInterval(function () { show(idx + 1); }, 4400); }
    if (slides.length > 1) restart();
  }

  /* ---------- nav over-hero <-> solid ---------- */
  var nav = document.querySelector('.nav.over-hero');
  function navState() {
    if (!nav) return;
    if (window.scrollY > window.innerHeight * 0.72) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }

  /* ---------- STRONG parallax (transform / GPU) ---------- */
  var bands = Array.prototype.slice.call(document.querySelectorAll('[data-par]'));
  function parallax() {
    if (reduce) return;
    var vh = window.innerHeight, m = isMobile() ? 0.55 : 1;
    if (slidesWrap) {
      // measure real vertical overflow so we can push parallax as far as possible without gaps
      var heroEl = document.querySelector('.hero');
      var heroImg = slidesWrap.querySelector('.hero-slide img');
      var room = heroImg && heroEl ? (heroImg.offsetHeight - heroEl.clientHeight) / 2 - 4 : 60;
      var hy = Math.min(window.scrollY * (isMobile() ? 0.22 : 0.40), Math.max(0, room));
      slidesWrap.style.transform = 'translate3d(0,' + hy + 'px,0)';
    }
    for (var i = 0; i < bands.length; i++) {
      var img = bands[i], band = img.parentElement;
      var r = band.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) continue;          // off-screen: skip
      var off = ((r.top + r.height / 2) - vh / 2) / vh;          // -0.5 .. 0.5 in view
      var amp = parseFloat(img.getAttribute('data-par')) * m;
      img.style.transform = 'translate3d(0,' + (-off * amp).toFixed(1) + 'px,0)';
    }
  }

  /* ---------- scroll reveals ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq').forEach(function (f) {
    f.querySelector('.faq-q').addEventListener('click', function () { f.classList.toggle('open'); });
  });

  /* ---------- contact form -> mailto ---------- */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? encodeURIComponent(el.value) : ''; };
      var body = 'Name: ' + g('name') + '%0D%0AE-Mail: ' + g('email') + '%0D%0ADatum: ' + g('date') +
        '%0D%0AOrt: ' + g('place') + '%0D%0A%0D%0A' + g('message');
      window.location.href = 'mailto:helloantoniavalladares@gmail.com?subject=' +
        encodeURIComponent('Anfrage über die Website') + '&body=' + body;
    });
  }

  /* ---------- scroll loop (rAF throttled) ---------- */
  var ticking = false;
  function onScroll() { if (!ticking) { requestAnimationFrame(function () { navState(); parallax(); ticking = false; }); ticking = true; } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { parallax(); });
  navState(); parallax();

  /* ---------- lightbox (click to enlarge, arrow keys, prev/next) ---------- */
  (function () {
    var imgs = Array.prototype.slice.call(document.querySelectorAll('.gal img, .work-grid img, .ports-g img'));
    if (!imgs.length) return;
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Schließen"><svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg></button>' +
      '<button class="lb-btn lb-prev" aria-label="Zurück"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<img class="lb-img" alt="">' +
      '<button class="lb-btn lb-next" aria-label="Weiter"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>' +
      '<div class="lb-count"></div>';
    document.body.appendChild(box);
    var lbImg = box.querySelector('.lb-img');
    var lbCount = box.querySelector('.lb-count');
    var cur = 0;
    function show(i) {
      cur = (i + imgs.length) % imgs.length;
      lbImg.src = imgs[cur].src;
      lbCount.textContent = (cur + 1) + ' / ' + imgs.length;
    }
    function open(i) { show(i); box.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { box.classList.remove('open'); document.body.style.overflow = ''; }
    imgs.forEach(function (im, i) {
      var trigger = im.closest('a') || im;
      trigger.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    });
    box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
    box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
    box.querySelector('.lb-close').addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'ArrowRight') show(cur + 1);
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'Escape') close();
    });
  })();

})();
