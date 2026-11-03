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
- Einzige Quelle für alle Fotos: `assets/js/photos.js`.
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
| `hochzeit-freie-trauung-pfalz.html` | 134 Fotos — J&M, Weinberge Rheinland-Pfalz |
| `hochzeit-freie-trauung-bad-toelz.html` | 91 Fotos — J&J, Kurhaus Bad Tölz |
| `hochzeit-freie-trauung-out-of-office-muenchen.html` | 74 Fotos — J&M, Out of Office München |
| `hochzeit-schloss-blutenburg.html` | 73 Fotos — L&D, Schloss Blutenburg |
| `hochzeit-umbrien-italien.html` | 57 Fotos — Umbrien (**Initialen fehlen noch**) |
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
assets/js/    photos.js    ← Fotomanifest, einzige Quelle der Wahrheit
              main.js      ← Startseite, Menü, Lightbox, Bildrettung, Verlauf
              portfolio.js ← Reiter und Flugstrecken der Portfolio-Seite
              galerie.js   ← Masonry und Lightbox der Galerieseiten
              uebergang.js ← Seitenübergänge
assets/img/   alle Fotos, je Foto vier Dateien (siehe Abschnitt 4)
assets/fonts/ Cormorant Garamond (Serif) + Jost (UI), lokal eingebunden
tools/        build-galleries.py · check-seiten.py · check-images.py
```

---

## 3 · photos.js

Format jeder Zeile: `['pfad/zum/foto.jpg', breite/hoehe, "Alt-Text"]`.
Der Pfad ist relativ zu `assets/img/`. Das Seitenverhältnis wird gebraucht,
damit nichts springt, bevor die Bilder geladen sind.

Listen:

| Liste | wo sie erscheint |
|---|---|
| `REEL` | Bildstrecke der Startseite (15 Fotos, Out of Office München) |
| `FLOW_A`, `FLOW_B` | die beiden Flugstrecken der Startseite |
| `TILES`, `PORTRAIT`, `MENU_SHOTS` | Kleinteile, Menühintergrund |
| `PF_HOCHZEITEN` | Manifest der Portfolio-Kacheln (die Kacheln selbst stehen im HTML) |
| `GAL_*` | je eine Galerie |
| `FLOW_FAMILIEN`, `FLOW_BUSINESS`, `FLOW_SCHAUSPIEL`, `REEL_BABYBAUCH` | Portfolio-Flugstrecken |

**Achtung:** Beim Einfügen per Skript entsteht leicht ein `],,` — ein doppeltes
Komma. JavaScript macht daraus ein Loch im Array, der Flug stirbt beim ersten
`undefined`, und die ganze Startseite ist tot. Prüfen mit:

```
node -e "global.window={};require('./assets/js/photos.js');
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

**Masonry (`galerie.js`).** Die Galeriefotos werden in zwei bzw. drei Spalten
verteilt. Die letzten Fotos jedes Abschnitts werden durchprobiert
(`verteile()`), damit alle Spalten gleich tief enden — sonst klafft vor jedem
Zwischentext eine Lücke von bis zu einer ganzen Bildhöhe. Ein kleiner Rest wird
auf die Zwischenräume der kürzeren Spalten verteilt (`ausgleichen()`).

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

## 8 · Offene Punkte

- **Umbrien:** die Initialen des Paares fehlen — als einzige Galerie.
- **Kontaktseite:** es gibt kein Formular, nur vier Links. Die kompletten
  Formularstile liegen ungenutzt in `kontakt.css`. Auf GitHub Pages bräuchte es
  einen Dienst wie Formspree.
- **Donau-Ries:** Fotos fehlen, Kachel ist deshalb ausgeblendet.
- **Pfalz:** sechs Fotos wurden entfernt, weil Kindergesichter zu sehen waren.
  Sobald es Versionen mit abgedeckten Gesichtern gibt, kommen sie zurück.
- **Preise-Seite:** für ein Foto fehlen im Arbeitsordner die Maße; im Repo ist
  es vorhanden.
