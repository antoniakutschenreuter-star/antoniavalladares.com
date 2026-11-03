# Übergabe — antoniavalladares.com

**Stand: 3. November 2026.**
Diese Datei zusammen mit dem Code-ZIP in einen neuen Chat laden. Damit ist der
vollständige Kontext übergeben.

---

## 0 · Das Wichtigste in zehn Zeilen

- Statische Website auf GitHub Pages. Kein Build, kein Framework, kein npm.
  HTML + CSS + Vanilla-JS, fertig.
- Antonia ist **keine Programmiererin**. Sie gibt Anweisungen, bekommt fertige
  ZIPs, entpackt sie in ihr Repo und drückt in GitHub Desktop auf Commit + Push.
  **Niemals zusätzliche Handarbeit, Umbenennungen oder Prüfaufgaben einplanen.**
- Antworten auf Deutsch, knapp, ohne Floskeln und ohne Werbesprache.
- Die Galerie-Unterseiten werden **generiert**, nicht von Hand geschrieben:
  `python3 tools/build-galleries.py`.
- Einzige Quelle für alle Fotos: `tools/photos-quelle.js`. Daraus erzeugt
  `build-galleries.py` die schlanken Laufzeitdateien `assets/js/photos.js`
  (Menü, Startseite, 9 KB) und `assets/js/photos-portfolio.js` (nur Portfolio).
  Diese beiden nie von Hand ändern.
- Nach jeder Änderung: `tools/check-seiten.py` und `tools/check-images.py`.
- Cache-Buster `?v=JJJJMMTT<buchstabe>` in **allen** HTML-Dateien hochzählen,
  sonst sehen Besucher die alte CSS/JS-Version.
- Die Paare werden mit **Initialen** genannt (J&M, L&D …). Das ist gewollt.
- Babygesichter dürfen nicht erkennbar sein.
- Der Zurück-Button darf nie die Seite verlassen, solange ein Menü oder eine
  Lightbox offen ist (`AV_verlauf` in `main.js`).

---

## 1 · Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero-Flug, Bildstrecke (Reel), zweiter Flug, Zitat, CTA |
| `portfolio.html` | Vier Kategorien: Hochzeiten (Kachelraster) · Familien · Business · Schauspiel (Flugstrecken) |
| `preise.html` | „Investment“ |
| `about.html` | Über Antonia |
| `kontakt.html` | Kontakt (nur Links, **kein Formular** — siehe offene Punkte) |
| `impressum.html`, `datenschutz.html` | Pflichtseiten |
| **Galerien (generiert)** | |
| `hochzeit-freie-trauung-pfalz.html` | 136 Fotos — J&M, Weinberge Rheinland-Pfalz |
| `hochzeit-freie-trauung-bad-toelz.html` | 91 Fotos — J&J, Kurhaus Bad Tölz |
| `hochzeit-freie-trauung-out-of-office-muenchen.html` | 74 Fotos — J&M, Out of Office München |
| `hochzeit-schloss-blutenburg.html` | 73 Fotos — L&D, Schloss Blutenburg |
| `hochzeit-umbrien-italien.html` | 57 Fotos — S&D, Umbrien |
| `hochzeit-standesamt-mandlstrasse.html` | 65 Fotos — L&D, Standesamt Mandlstraße |
| `hochzeit-tegernsee-regenhochzeit.html` | 76 Fotos — L&S, Regenhochzeit Tegernsee |
| `verlobungsshooting-vietnam.html` | 43 Fotos — V&B, Ho-Chi-Minh-Stadt |
| `hochzeit-standesamt-kufstein.html` | 36 Fotos — J&J, Standesamt Kufstein |

Kachelreihenfolge im Portfolio (von Antonia festgelegt):

```
Pfalz        Bad Tölz     Out of Office München
Blutenburg   Umbrien      Mandlstraße
Tegernsee    Ho Chi Minh  Kufstein
```

Donau-Ries (kirchliche Trauung Harburg) ist vorbereitet, aber **nicht sichtbar** —
das Titelbild liegt unter `portfolio/cover/kirchliche-trauung-harburg-…`, die
Kachel kommt rein, sobald die Fotos da sind.

---

## 2 · Dateien

```
assets/css/   style.css (global) · portfolio.css (Portfolio + Galerien)
              about.css · kontakt.css · fonts.css
assets/js/    photos.js    ← GENERIERT (Menü + Startseite), photos-portfolio.js ebenso
              cookie.js    ← Cookie-Hinweis, ist ausgeschaltet (AKTIV = false)
              main.js      ← Startseite, Menü, Lightbox, Bildrettung, Verlauf
              portfolio.js ← Reiter und Flugstrecken der Portfolio-Seite
              galerie.js   ← Masonry und Lightbox der Galerieseiten
              uebergang.js ← Seitenübergänge
assets/img/   alle Fotos, je Foto vier Dateien (siehe Abschnitt 4)
assets/fonts/ Cormorant Garamond (Serif) + Jost (UI), lokal eingebunden
tools/        photos-quelle.js ← das eigentliche Fotomanifest
              build-galleries.py · check-seiten.py · check-images.py
              foto-aufbereiten.py ← macht aus einem Foto JPG + 3 WebP-Größen
```

---

## 3 · Fotomanifest (tools/photos-quelle.js)

Bearbeitet wird nur `tools/photos-quelle.js`, danach `python3 tools/build-galleries.py`.

Format jeder Zeile: `['pfad/zum/foto.jpg', breite/hoehe, "Alt-Text"]`.
Der Pfad ist relativ zu `assets/img/`. Das Seitenverhältnis wird gebraucht,
damit nichts springt, bevor die Bilder geladen sind.

Listen:

| Liste | wo sie erscheint |
|---|---|
| `REEL` | Bildstrecke der Startseite (15 Fotos, Out of Office München) |
| `FLOW_A`, `FLOW_B` | die beiden Flugstrecken der Startseite |
| `PORTRAIT`, `MENU_SHOTS` | Portrait neben dem Text, Menühintergrund |
| `PF_HOCHZEITEN` | Manifest der Portfolio-Kacheln (die Kacheln selbst stehen im HTML) |
| `GAL_*` | je eine Galerie |
| `FLOW_FAMILIEN`, `FLOW_BUSINESS`, `FLOW_SCHAUSPIEL`, `REEL_BABYBAUCH` | Portfolio-Flugstrecken |

**Achtung:** Beim Einfügen per Skript entsteht leicht ein `],,` — ein doppeltes
Komma. JavaScript macht daraus ein Loch im Array, der Flug stirbt beim ersten
`undefined`, und die ganze Startseite ist tot. Prüfen mit:

```
node -e "global.window={};require('./assets/js/photos.js');require('./assets/js/photos-portfolio.js');
let n=0;for(const k in window.AV_PHOTOS)window.AV_PHOTOS[k].forEach(e=>{if(!e||!e[0])n++});
console.log('Löcher:',n)"
```

---

## 4 · Fotos aufbereiten

Jedes Foto liegt viermal vor:

```
name.jpg          lange Kante 2000 px, Qualität 86, progressiv
name-320.webp     Qualität 78
name-640.webp
name-1280.webp
```

Das HTML liefert `<picture>` mit WebP-`srcset` und JPG-Fallback. **Wichtig:**
Browser fallen *nicht* automatisch auf das JPG zurück, wenn eine WebP-Datei
fehlt oder kaputt ist — dann sieht man nur den Alt-Text. Dafür gibt es in
`main.js` (Abschnitt 01b) die Bildrettung: sie wirft die `<source>`-Elemente weg
und lädt das JPG nach.

Aufbereitungsskript: `/home/claude/work/bilder*.py` (Pillow, LANCZOS).

---

## 5 · Galerien bauen

Alles Inhaltliche steht in `tools/build-galleries.py` im Dict `GALERIEN`:

| Feld | Bedeutung |
|---|---|
| `datei` | Dateiname der Seite |
| `liste` | Name der Fotoliste in `photos.js` |
| `wort` | das riesige Wort im Auftakt (echter Text, kein Bild) |
| `ort`, `h2`, `titel`, `meta` | Kopfzeile und SEO |
| `satz` | der Einleitungstext; `\n\n` trennt Absätze, HTML-Links erlaubt |
| `zwischen` | `{index: [absätze]}` — Textblöcke mitten im Bilderstrom |
| `mehr` | Textblöcke am Seitenende |
| `fakten` | die kleine Zeile unter dem Text: Ort, Art, **Stichworte** |
| `hero` | drei Indizes: [links hoch, rechts quer, klein hoch] |

`fakten` enthält **keine Bilderzahl mehr** — stattdessen Stichworte zur Vision
der Hochzeit („Dokumentarisch & verspielt“, „Editorial im Museum“). Das war eine
ausdrückliche Vorgabe von Antonia und hilft gleichzeitig der Suche.

`NAV` darunter bestimmt die Reihenfolge von „Weitere Galerien“ und muss zur
Kachelreihenfolge passen.

Danach: `python3 tools/build-galleries.py`

---

## 6 · Besonderheiten im Code

**Durchmischen (`AV_mischen` in `photos.js`).** Die Reihenfolge der Listen ist
bewusst gesetzt und wird nicht neu gewürfelt — sie bestimmt, was oben in der
Flugstrecke steht. Die Funktion entklumpt nur: kein Foto aus demselben Shooting
innerhalb von drei Plätzen, hoch und quer im Wechsel.

**Masonry (`galerie.js`).** Die Galeriefotos werden in zwei bzw. drei Spalten
verteilt. Die letzten Fotos jedes Abschnitts werden durchprobiert
(`verteile()`), damit alle Spalten gleich tief enden — sonst klafft vor jedem
Zwischentext eine Lücke von bis zu einer ganzen Bildhöhe. Ein kleiner Rest wird
auf die Zwischenräume der kürzeren Spalten verteilt (`ausgleichen()`).

**Zweitschrift im Auftakt der Galerien.** Alle drei Hero-Fotos liegen VOR dem
Ortsnamen (z-index 3, das Wort hat 2). In jedem Foto steckt eine zweite Kopie
des Wortes (`.gal-hero-echo`), die das Foto selbst zurechtschneidet: auf dem Foto
ist der Buchstabe weiß (oder Akzentrot, Klasse `--rot`, wenn das Foto hell ist),
daneben bleibt die schwarze Schrift stehen. Ein Buchstabe wird so genau an der
Fotokante geteilt und ist nie verdeckt. Damit beide Kopien exakt übereinander
liegen, ist `.gal-hero` ein Größen-Container (`container-type: size`, feste
Höhe, kein Innenabstand), die Geometrie steht in `cqw`/`cqh`, und `--len` steht
am Auftakt, nicht am Wort. Die Parallaxe in `galerie.js` zieht der Kopie die
Verschiebung des Fotos wieder ab. Die Farbe wählt `galerie.js` beim Laden an den
echten Pixeln unter dem Wort (Canvas, Kontrast Weiß gegen Rot); der Generator
setzt nur einen Startwert (`wort_helligkeit()`), falls die Datei im Arbeitsordner
liegt.

**Startseite, Flugstrecke.** Die Fotos stehen verstreut (links und rechts im
Wechsel, verschieden groß), aber nie überlappend: jedes Foto wird an die
tiefste Stelle gesetzt, an der es zu allen anderen den Mindestabstand hält
(`MX` seitlich, `MY` oben/unten in `Flow.build`). Die Schleifenlänge `band`
ergibt sich aus dem Abstand zwischen Ende und Anfang der nächsten Runde. Es
gibt keine festen Spalten, ausdrücklicher Wunsch von Antonia. Die Strecke
beginnt direkt unter der Wortmarke. Hinter dem Zitat gibt es
keinen Kasten: die Fotos werden stattdessen schwächer (`track.opacity`).
Die Booking-Leiste ist nur sichtbar, solange die Flug-Bühne den ganzen
Bildschirm füllt.

**Handy im Desktop-Modus.** Zeigt Chrome auf dem Handy die Desktop-Version
(⋮ → „Desktop-Website"), sieht man das Desktop-Layout verkleinert. Dann
greifen die Handy-Regeln nie. Zuerst das prüfen, bevor man Handy-CSS ändert.
Zum Testen: Playwright mit `is_mobile=True`.

**Seitenverhältnisse.** Kein Foto wird irgendwo in ein fremdes Format
geschnitten. Hero-Fotos, Menüfotos und die Fotos auf der Preise-Seite bekommen
nur eine Breite, die Höhe ergibt sich aus `width`/`height` der Datei. Bewusste
Ausnahmen: das breite Band auf der Kontaktseite, das quadratische
Instagram-Raster der Startseite und die Bildbänder der About-Seite.

**Bildstrecke der Startseite.** Jede Figur bekommt `reel-hoch` (2:3) oder
`reel-quer` (3:2) als Klasse und daraus ihr `aspect-ratio`. Ohne das zieht sich
die Figur auf die Originalbreite des Bildes und schneidet Hochformate zu breiten
Streifen zurecht. Die Reihenfolge wechselt bewusst hochkant/quer und setzt nie
zwei Schwarzweiße nebeneinander.

**Auftakt (`kontakt.html`, `preise.html`).** Drei Fotos um das große Wort. Ihre
`top`-Werte beginnen bei `var(--header-h)`, weil die Kopfzeile fest über der
Seite liegt und sonst das obere Stück der Fotos verdeckt. Die Fotos enden
bewusst auf drei verschiedenen Höhen.

**CSP.** `default-src 'self'`, kein `unsafe-inline`. Also **keine** Inline-Styles
und **keine** Inline-Skripte. Stil über Klassen, nicht über `style="…"`.
(`element.style.x = …` aus JavaScript ist erlaubt.)

**Zurück-Button.** `AV_verlauf` in `main.js` schiebt einen History-Eintrag, wenn
Menü oder Lightbox aufgehen. Zurück schließt dann nur das Overlay.

---

## 7 · Arbeitsablauf mit Antonia

1. Änderungen in `/home/claude/site` machen.
2. `python3 tools/build-galleries.py`
3. `python3 tools/check-seiten.py` und `python3 tools/check-images.py`
   (dass viele Fotos lokal „fehlen“, ist normal — im Arbeitsordner liegen nur
   die zuletzt neu angelegten Ordner, das Repo hat alle.)
4. Cache-Version in allen HTML-Dateien hochzählen.
5. ZIPs bauen: Code getrennt von Fotos, Fotopakete unter ~25 MB halten.
6. Mit `SendUserFile` schicken, dazu die Entpackzeilen:

```
unzip -o ~/Desktop/zips/NAME.zip -d .
```

Antonia öffnet dafür in GitHub Desktop **Repository → Open in Terminal**, fügt
den Block ein und drückt danach **Commit to main** und **Push origin**.

---

## 7a · Fallen, die schon zugeschlagen haben

- **Veraltete `nth-child`-Regeln.** Am Ende von `style.css` stand ein Block
  `.reel-track figure:nth-child(n) { aspect-ratio: … }` aus einer alten
  Reihenfolge. Er hat die Klassen überstimmt und jedem Platz der Bildstrecke
  ein falsches Format aufgezwungen. Entfernt. Niemals Formate an Positionen
  binden, immer an Klassen.
- **Referenzen ohne Datei.** `photos.js` enthielt fünfzehn `editorial/`-Fotos,
  die es im Repo nie gab — auf der Seite blieb nur der Alt-Text. Entfernt.
  `check-images.py` meldet das nur, wenn die Dateien lokal liegen; im
  Arbeitsordner liegen aber nie alle. Vor dem Ausliefern also prüfen, ob eine
  neue Referenz auch wirklich eine Datei hat.
- **Doppelte Fotos auf einer Seite.** Die Liste `TILES` in `photos.js` wurde von
  keinem Skript ausgegeben — die sechs Fotos standen aber fest im
  Instagram-Raster von `index.html`. Wer sie „wieder sichtbar macht“, zeigt sie
  zweimal auf derselben Seite.

## 8 · Offene Punkte

- **Kontaktseite:** es gibt kein Formular, nur vier Links. Die kompletten
  Formularstile liegen ungenutzt in `kontakt.css`. Auf GitHub Pages bräuchte es
  einen Dienst wie Formspree.
- **Donau-Ries:** Fotos fehlen, Kachel ist deshalb ausgeblendet.
- **Newborn:** die zwei fehlenden Fotos (`…babyfuesse-bett`, `…elternhaende-babyfuesse-schwarzweiss`) sind aus dem Manifest entfernt.
- **Pfalz:** sechs Fotos wurden entfernt, weil Kindergesichter zu sehen waren.
  Sobald es Versionen mit abgedeckten Gesichtern gibt, kommen sie zurück.
- **Preise-Seite:** für ein Foto fehlen im Arbeitsordner die Maße; im Repo ist
  es vorhanden.


## 9 · Cookie-Hinweis und 404

- `assets/js/cookie.js` zeigt den Hinweis nur, wenn dort `AKTIV = true` steht.
  Solange keine Reichweitenmessung und keine Werbe-Pixel laufen, bleibt er aus
  (die Datenschutzseite sagt dann auch wahrheitsgemäß, dass nichts gesetzt wird).
  Vorschau: `https://antoniavalladares.com/?cookie=zeigen`.
  Kommt ein Messdienst dazu: `AKTIV = true`, den Dienst erst laden, wenn das Ereignis
  `av:einwilligung` mit `detail.ok === true` kommt, CSP und Datenschutzseite anpassen,
  in der Fußzeile `<a href="#" data-cookie-settings>Cookies</a>` ergänzen.
- `404.html` liegt im Hauptordner, GitHub Pages zeigt sie bei unbekannten Adressen.
  Sie nutzt absolute Pfade (`/assets/...`) und ist von `check-seiten.py` ausgenommen.
- Menü: Handy zeigt 3 Fotos, Desktop 4. Unterpunkte unter Portfolio nur am Desktop.
- Kontakt: Instagram nur als Zeichen, kein Google-Link (auch nicht in den
  strukturierten Daten).
