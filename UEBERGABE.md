# Übergabe — antoniavalladares.com

**Stand 12.08.2026.** Diese Datei zusammen mit dem ZIP in den neuen Chat laden.
Damit ist der vollständige Kontext übergeben.

---

## 1 · Was fertig ist

Sieben Seiten, alle geprüft: genau ein H1, kein Bild ohne Alt-Text, strukturierte
Daten, keine Konsolenfehler, kein Querscroll auf dem Handy.

| Seite | Inhalt |
|---|---|
| `index.html` | Startseite (unverändert) |
| `preise.html` | Preise (unverändert) |
| `portfolio.html` | **neu** — drei Kategorien |
| `hochzeit-umbrien-italien.html` | **neu** — 58 Fotos |
| `hochzeit-standesamt-kufstein.html` | **neu** — 8 Fotos |
| `hochzeit-tegernsee-regenhochzeit.html` | **neu** — 12 Fotos |
| `verlobungsshooting-vietnam.html` | **neu** — 12 Fotos |

**Neue Dateien:** `assets/css/portfolio.css`, `assets/js/portfolio.js`,
`assets/js/galerie.js`, `tools/build-galleries.py`. `photos.js` wurde um sieben
Listen erweitert. `sitemap.xml` und `tools/check-images.py` sind aktualisiert.
Die Mockups sind gelöscht.

---

## 2 · Wie die Portfolio-Seite funktioniert

**Hochzeiten.** Fläche in CI-Rotorange `#BE420D`, Schrift Creme. Linke Spalte steht
fest, rechts scrollt das Raster. Neun Kacheln 2:3, unbeschnitten. Hover blendet das
Foto auf die Fläche zurück, Ort groß in Cormorant, Untertitel klein in Jost. Die
Kacheln stehen **fest im HTML** — sichtbar ohne JavaScript, lesbar für Google.
Vier führen in ihre Galerie, fünf zeigen „Bald" und sind nicht klickbar.

**Familien und Business.** Fläche bleibt Creme. Kein Raster, sondern ein Foto-Flug
wie auf der Startseite: langsamer (vh/40 statt vh/26), größere Bilder, weniger
Spuren. Die linke Spalte fährt beim Scrollen hinaus und beim Zurückscrollen wieder
herein. Mittendrin steht je eine Serie still und läuft waagerecht durch — bei
Business die elf Schauspielportraits, bei Familien die Babybauch-Serie. Jedes Foto
öffnet per Klick die Lightbox aus `main.js`.

**Zwei Fallen, die schon behoben sind** (nicht erneut hineinlaufen):
Der Flug muss aus der Spalte **ausbrechen** (`width: 100vw; margin-left: calc(50% - 50vw)`),
sonst rechnet er mit halber Breite und die Bilder bleiben zu klein. Und die Größe
des Ortsnamens auf den Galerien hängt an einer **Klasse** `len-8`, nicht an einem
Inline-Style — die CSP verbietet `style=""` am Element.

**Handy und Reduced Motion.** Kein Pinning, kein seitliches Schieben. Der Flug wird
zu einer normalen Liste, die Querstrecke zu einem nativ scrollbaren Streifen mit
Snap. Kacheln einspaltig, Beschriftung ruhig unter dem Foto statt im Hover.

---

## 3 · Die Galerien

Alle vier werden von `tools/build-galleries.py` aus `photos.js` erzeugt:

```
python3 tools/build-galleries.py
```

**Auftakt:** der Ortsname riesig über die volle Breite, drei Fotos überlappen die
Buchstaben — eines dahinter, eines davor. Beim Scrollen wandern sie leicht gegen
die Schrift (`galerie.js`). Der Name ist echter Text im `<h1>`, kein Bild, also
für Google lesbar. Die Größe skaliert mit der Wortlänge, damit auch „Donau-Ries"
auf dem Handy nicht über den Rand läuft.

Darunter: Ort, Untertitel, ein SEO-Satz, Eckdaten, dann das Raster (Querformate
über beide Spalten), dann „Weitere Galerien" mit drei Querverweisen, dann
„← Alle Galerien" und „Termin anfragen".

**Eine neue Galerie anlegen:** Fotos nach `assets/img/portfolio/galerie-NAME/`
legen, WebP in 320/640/1280 erzeugen, Liste in `photos.js` ergänzen, Eintrag in
`GALERIEN` in `build-galleries.py` schreiben, Skript laufen lassen, Sitemap und
die Kachel-URL in `PF_HOCHZEITEN` ergänzen.

---

## 4 · Fotobestand

**183 Fotos, alle 183 referenziert, 549/549 WebP.** `check-images.py` ist grün.

| Ordner | Fotos | Zweck |
|---|---|---|
| `portfolio/cover/` | 9 | Kacheln Hochzeiten |
| `portfolio/galerie-umbrien-italien/` | 58 | Galerie Umbrien |
| `portfolio/galerie-tegernsee-LS/` | 12 | Galerie Tegernsee, auch Reel Startseite |
| `portfolio/galerie-vietnam-verlobung/` | 12 | Galerie Vietnam |
| `portfolio/galerie-kufstein-standesamt/` | 8 | Galerie Kufstein |
| `portfolio/galerie-schauspiel-kranz/` | 11 | Querstrecke Business |
| `portfolio/business/` | 4 | Flug Business |

Umbrien: Tenuta Vitalonga. Die Dateien hießen beim
Upload `toskana-…` und wurden bewusst auf `umbrien-…` umbenannt — die Hochzeit
fand in Umbrien statt, ein falscher Ortsname schadet dem Ranking. Das Wort Toskana
steht einmal ehrlich im Fließtext.

---

## 5 · Ladegewicht

| Seite | erste Ansicht |
|---|---|
| `portfolio.html` | 492 KB |
| `hochzeit-standesamt-kufstein.html` | 408 KB |
| `verlobungsshooting-vietnam.html` | 636 KB |
| `hochzeit-umbrien-italien.html` | 702 KB |

Umbrien lag zuerst bei 1146 KB. Ursache war ein falsches `sizes`-Attribut: das
Raster forderte die 1280er Datei an, obwohl der Container auf 1280 px begrenzt ist
und ein Hochformat nie breiter als 600 px erscheint. Mit `min(46vw, 600px)` greift
der Browser zur 640er — knapp 40 % gespart, ohne sichtbaren Unterschied. **Diese
Regel gilt für jedes neue Bild in einem begrenzten Container.**

Ordnergröße 130 MB, davon 95 MB Original-JPGs. Die lädt kein Besucher, sie sind
Rückfall und Lightbox-Quelle. Fürs Hochladen ist es viel. **Empfehlung, wenn alle
Galerien stehen:** je Galeriefoto eine 2000-px-WebP erzeugen und die JPGs aus den
`galerie-`-Ordnern entfernen — spart etwa 60 MB. Vorher nicht, damit nichts
verloren geht.

---

## 6 · Was noch fehlt

**Fünf Galerien:** Pfalz, Bad Tölz, Schloss Blutenburg, Mandlstraße, Donau-Ries.
Kachel und Titel stehen, es fehlen nur die Fotos. Sobald sie da sind: Ordner
anlegen, Liste in `photos.js`, Eintrag in `build-galleries.py`, URL in
`PF_HOCHZEITEN` eintragen, Sitemap ergänzen.

**Mehr Material für Familien und Business.** Aktuell 6 bzw. 9 Fotos im Flug plus
die Querstrecken. Ab zehn Fotos schaltet der Flug automatisch von zwei auf drei
Spuren. Zwanzig bis dreißig je Kategorie wären der Zielwert.

**`a1.jpg`, `a2.jpg`, `a3.jpg`** stehen im Manifest als „gehören auf About". Sie
sind bewusst nicht im Business-Portfolio. Bitte entscheiden.

**Booking-Seite** (`/kontakt.html`) — noch nicht gebaut. Vorher entscheiden:
Fremddienst wie Formspree/Netlify Forms (dann muss die CSP um genau diese Domain
erweitert werden) oder `mailto:` ohne Fremddienst (kein DSGVO-Thema, öffnet aber
das Mailprogramm und ist auf dem Handy unzuverlässig). Felder nach Vorbild:
Who · Email · Phone · When · Where · Planner · Budget · Source · Vision.

**`/about.html` und `/impressum.html`** fehlen ebenfalls — im Footer verlinkt.

---

## 7 · Wenn im neuen Chat Fotos hochgeladen werden

So gehören sie zugeordnet:

| Dateiname beginnt mit | Ziel |
|---|---|
| `standesamt-hochzeit-kufstein-…` | `galerie-kufstein-standesamt/` (8 liegen schon) |
| `toskana-hochzeit-freie-trauung-…` | **Umbrien**, umbenennen auf `umbrien-…` |
| `schauspielportraits-…-michael-kranz…` | `galerie-schauspiel-kranz/`, Querstrecke Business |
| `business-portraits-bewerbungsfoto-…` | `portfolio/business/`, Flug Business |
| `freie-trauung-pfalz-…` | neue Galerie Pfalz |
| `freie-trauung-bad-toelz-…` | neue Galerie Bad Tölz |
| `…schloss-blutenburg…` | neue Galerie Schloss Blutenburg |
| `…mandlstrasse…` | neue Galerie Mandlstraße |
| `kirchliche-trauung-harburg-…` | neue Galerie Donau-Ries |
| Babybauch, Familie, Newborn | `portfolio/`, Liste `FLOW_FAMILIEN` oder `REEL_BABYBAUCH` |

**Immer gleicher Ablauf:** Original nach `assets/img/…` kopieren, WebP in
320/640/1280 erzeugen (Qualität 78, method 5), Zeile `[pfad, breite/höhe, alt]`
in `photos.js` ergänzen, Alt-Text beschreibend und mit Ort, dann
`build-galleries.py` und `check-images.py` laufen lassen.

---

## 8 · Regeln, die nicht verhandelbar sind

Kein Framework, kein Build-Schritt. CSP `default-src 'self'`, **kein Inline-Script
und kein Inline-Style**. Genau eine rAF-Schleife je Seite, im Frame nie Layout
lesen, nur `transform` und `opacity` schreiben und nur bei Änderung.
Seitenverhältnisse kommen aus `photos.js`, es wird nichts nachgemessen. Jedes Bild
als `<picture>` mit WebP, korrektem `sizes`, `width`, `height` und `loading="lazy"`.
Reduced Motion, Touch und No-JS müssen bedient bleiben. `check-images.py` muss
nach jeder Änderung grün sein.

Farben `--bg #FBF9F7` · `--ink #12100F` · `--accent #BE420D`. Schrift Cormorant
Garamond 300 und Jost 300. Genau ein Linkstil: Jost, Versalien, `.26em` gesperrt,
Gewicht 600, nie unterstrichen, Hover in Accent.
