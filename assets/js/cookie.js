/* Cookie-Hinweis in der Optik der Seite.
   Solange die Seite weder Reichweitenmessung noch Werbe-Pixel nutzt,
   bleibt er aus (AKTIV = false). Das ist der einzige Schalter.
   Vorschau ohne etwas zu speichern: Adresse mit ?cookie=zeigen aufrufen.
   Sobald ein Messdienst dazukommt: AKTIV auf true stellen und den Dienst
   erst laden, wenn das Ereignis "av:einwilligung" mit ok === true kommt. */
(function () {
  'use strict';
  var AKTIV = false;
  var KEY = 'av-cookie';

  var vorschau = /[?&]cookie=zeigen\b/.test(location.search);
  function lesen() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function schreiben(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* ohne Speicher bleibt es bei dieser Sitzung */ } }
  function melden(ok) {
    try { document.dispatchEvent(new CustomEvent('av:einwilligung', { detail: { ok: ok } })); } catch (e) { /* alte Browser */ }
  }

  var box = null;
  function schliessen(ok) {
    if (!vorschau) { schreiben(ok ? 'ja' : 'nein'); melden(ok); }
    if (box) { box.classList.remove('ist-da'); setTimeout(function () { if (box && box.parentNode) { box.parentNode.removeChild(box); } box = null; }, 400); }
  }

  function zeigen() {
    if (box) { return; }
    box = document.createElement('div');
    box.id = 'av-cookie';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Cookies');
    box.innerHTML =
      '<svg class="avc-ico" viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
      '<path d="M16 3.2a12.8 12.8 0 1 0 12.8 12.8 6.2 6.2 0 0 1-6.4-5.6 6.2 6.2 0 0 1-6.4-7.2z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<circle cx="11" cy="14" r="1.2"/><circle cx="16.5" cy="20.5" r="1.2"/><circle cx="21.5" cy="17" r="1"/><circle cx="10.5" cy="21" r=".9"/></svg>' +
      '<div class="avc-txt"><p class="avc-h">Ein kleiner Keks?</p>' +
      '<p class="avc-p">Mit deinem Ja messe ich anonym, welche Seiten dir gefallen. Ohne dein Ja bleibt alles aus. <a href="/datenschutz.html">Datenschutz</a></p></div>' +
      '<div class="avc-btn"><button class="avc-ja" type="button">Gern</button><button class="avc-nein" type="button">Nein danke</button></div>';
    document.body.appendChild(box);
    box.querySelector('.avc-ja').addEventListener('click', function () { schliessen(true); });
    box.querySelector('.avc-nein').addEventListener('click', function () { schliessen(false); });
    requestAnimationFrame(function () { box.classList.add('ist-da'); });
  }

  function start() {
    var stand = lesen();
    if (vorschau || (AKTIV && !stand)) { zeigen(); }
    else if (AKTIV && stand) { melden(stand === 'ja'); }
    /* Fußzeilen-Link: Auswahl ändern */
    var links = document.querySelectorAll('[data-cookie-settings]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) { e.preventDefault(); zeigen(); });
    }
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }
})();
