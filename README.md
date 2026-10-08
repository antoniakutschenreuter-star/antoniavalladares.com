# antoniavalladares.com — Startseite

Statische Seite. Kein Framework, kein Build-Schritt, keine externen Dienste.
Ordner hochladen, fertig.

```
index.html              Startseite
preise.html             Preise-Seite
robots.txt · sitemap.xml · site.webmanifest
assets/css/fonts.css    Schriften, zwei Varianten
assets/css/style.css    gesamtes Layout
assets/js/photos.js     FOTO-MANIFEST — zentrale Liste aller Bilder
assets/js/main.js       Foto-Flug, Reel, Menü, Lightbox, Intro
assets/fonts/           11 WOFF2-Dateien, lokal (224 KB)
assets/img/             88 Fotos, je zusätzlich 320/640/1280 px als WebP
assets/logo/            Wortmarke, Monogramm, Favicon
tools/check-images.py   Prüfskript
```

## Texte

Alle sichtbaren Texte stammen aus der bisherigen Website oder wurden
wörtlich vorgegeben. Es wurde nichts übersetzt und nichts hinzugedichtet.

| Stelle | Text |
|---|---|
| Zitat im Hero | Fotos, die euch diesen Tag noch einmal fühlen lassen. |
| in der Hochzeitsstrecke | See Gallery |
| neben dem Portrait | Ich liebe diesen Beruf. … (wörtlich übernommen) |
| Link darunter | Meet your photographer |
| Abschluss | Ready to create memories? · Contact me |
| Leiste unten | Bookings open for 2026 & 2027 … (Original) |
| Menü | Home · Portfolio · Preise · About · Kontakt |
| Fußzeile | About · Portfolio · Preise · Kontakt · Impressum |

## Preise-Seite

Aufbau: Bild-Auftakt mit Slogan · Spontan-Block · Abteilung Hochzeit &
Familie (eine große, drei kleine Kacheln) · Abteilung Business (dito) ·
Steuer- und Anfahrtshinweis · 21 FAQs als Akkordeon · Kundenstimme J&J ·
See Gallery · Ready to create memories.

Strukturierte Daten: `WebPage` mit Breadcrumb, `OfferCatalog` mit acht
Angeboten und Preisen, `FAQPage` mit allen 21 Fragen (Google kann einzelne
Antworten direkt in den Suchergebnissen ausspielen), `Review` für J&J.

Die Fragen stehen bewusst in der Serifenschrift, die Antworten in der
Groteske — sonst wirkt die lange Liste zu glatt.

Das Akkordeon ist mit `<details>`/`<summary>` gebaut — es funktioniert ohne
JavaScript, ist per Tastatur bedienbar und Suchmaschinen lesen die Antworten
auch im geschlossenen Zustand.

Fünf Fotos sind neu dazugekommen: Tracht (Auftakt), Regenhochzeit an der
Mandlstraße (Spontan-Block), Coaching (Personal Branding) und zwei
Aufnahmen der Wiesen-Hochzeit in Kufstein, davon eine im Einsatz. Das
Toskana-Foto teilt sich die Seite mit der Startseite.

## Offene Punkte

**Hochzeitsstrecke (horizontal).** Zurzeit liegen dort die 12 Fotos der
Tegernsee-Galerie als Platzhalter — das ist der einzige geschlossene Satz
einer einzelnen Hochzeit im Bestand. Sobald die gewünschten Bilder da sind:
Dateien nach `assets/img/`, WebP erzeugen, in `photos.js` die Liste `REEL`
ersetzen, in `index.html` den Block `.reel-track` austauschen.

**Instagram-Kacheln.** Instagram sperrt automatisierte Zugriffe, die Fotos
lassen sich technisch nicht von dort holen. Dort liegen sechs Platzhalter,
Liste `TILES` in `photos.js`.

**Fotos von Antonia.** `a1.jpg`, `a2.jpg`, `a3.jpg` und das Kamera-Portrait
sind bewusst aus allen Arbeitsgalerien heraus (Liste `AV_ONLY`) — sie gehören
auf die About-Seite, nicht in eine Hochzeitsstrecke. Im Manifest bleiben sie
geführt, damit sie nicht verloren gehen.

**Unterseiten.** `/portfolio.html`, `/about.html`,
`/kontakt.html`, `/impressum.html` sind verlinkt, existieren aber noch nicht.
BOOKING oben rechts führt ebenfalls auf `/kontakt.html`.
Impressum ist Pflicht, sobald die Seite live ist.

**Deutsche URLs für Preise und Kontakt.** In Deutschland wird nach
„Hochzeitsfotograf München Preise" gesucht — deshalb `/preise.html` und
`/kontakt.html` statt englischer Adressen. Die URL ist der Rankingfaktor,
nicht das Label allein.

## Kein Foto geht verloren

`assets/js/photos.js` ist die einzige Quelle der Wahrheit. Jede Datei aus
`assets/img/` steht dort genau einmal. `python3 tools/check-images.py` meldet
jede Datei, die fehlt oder doppelt ist. Aktueller Stand: 88 von 88 Fotos
erfasst, 264 von 264 WebP-Varianten vorhanden.

Neues Foto: Datei ablegen → WebP erzeugen → Zeile in `photos.js` →
bei Reel, Kacheln oder Portrait zusätzlich in `index.html` (diese Bereiche
stehen fest im HTML, damit sie ohne JavaScript sichtbar und für Google
lesbar sind) → Prüfskript laufen lassen.

```bash
python3 - <<'EOF'
from PIL import Image
f = 'assets/img/DEIN-FOTO.jpg'
im = Image.open(f).convert('RGB'); w, h = im.size
for t in (320, 640, 1280):
    tw = min(t, w); th = round(h * tw / w)
    im.resize((tw, th), Image.LANCZOS).save(f.rsplit('.',1)[0] + f'-{t}.webp', 'WEBP', quality=78, method=5)
EOF
```

## Schriften

Beide Varianten liegen lokal, kein Google-CDN, kein Cookie-Banner nötig.

| | Wortmarke, Zitate, Menü | Links und Kleinschrift |
|---|---|---|
| **A** (aktiv) | Cormorant Garamond | Jost |
| **B** | Bodoni Moda | Inter |

**Linkstil:** Es gibt genau einen. Serifenlos, Versalien, gesperrt,
Gewicht 600, ohne Unterstreichung, beim Überfahren Wechsel auf die
CI-Farbe. Gilt für Kopfzeile, Handlungsaufrufe, Fußzeile, Buchungsleiste
und Instagram. Einzige Ausnahme: die große Navigation im Menü-Overlay,
die bewusst Serifen trägt.

Vergleichen: `index.html?schrift=1` → Umschalter unten rechts.
Festlegen: `data-font="a"` oder `"b"` in Zeile 2 von `index.html`, danach die
`<link rel="preload">` im `<head>` anpassen und die ungenutzten Schriftdateien
löschen.

## Stellschrauben

| Was | Wo |
|---|---|
| Dauer des Zitats | `main.js`, Abschnitt 06: `seg(p, 0.36, 0.44)` und `seg(p, 0.80, 0.88)` |
| Länge des Hero | `style.css`: `#hero { height: 800vh }`, Handy 620vh |
| Scrollweg der Hochzeitsstrecke | `main.js`: `clamp(this.span, vh * 1.2, vw * 2.2)` |
| Höhe der Ausstiegszonen | `style.css`: `.reel-escape { height: 11vh }` |
| Tempo beim Ausstieg | `main.js`: `e.deltaY * 6` |
| Corporate Color | `style.css`: `--accent` (wirkt auch als Menühintergrund) |
| Linkgewicht | `fonts.css`: `--link-weight` |

## Lokales SEO — noch offen

Zwei Standorte sind hinterlegt, jeweils nur mit Ort ohne Straße: München
und Harburg (Schwaben). Der Seitentitel der Startseite nennt beide Orte.

Im strukturierten Datenblatt beider Seiten steht `areaServed` mit
19 Einträgen: München, Starnberger See, Ammersee, Schliersee, Tegernsee,
Chiemsee, Kufstein, Donau-Ries, Donauwörth, Nördlingen, Harburg (Schwaben),
Mönchsdeggingen, Monheim, Wemding, Oberbayern, Schwaben, Bayern,
Deutschland, Österreich. Das ist unsichtbar für Besucher und wird von
Suchmaschinen gelesen.

Das allein bringt aber keine Platzierung. Was wirklich rankt:

1. **Google Unternehmensprofil** mit beiden Standorten und hinterlegten
   Einzugsgebieten. Kostenlos und der stärkste Hebel für „Hochzeitsfotograf
   Donauwörth" und Ähnliches. Ohne das nützt die beste Website wenig.
2. **Eigene Seiten je Region**, etwa `/hochzeitsfotografin-donau-ries.html`
   und `/hochzeitsfotografin-starnberger-see.html`, jeweils mit eigenem
   Titel, eigenem Text und Fotos, die dort entstanden sind. Eine Seite pro
   Region schlägt eine Ortsliste auf einer Seite deutlich.
3. **Alt-Texte mit Ortsangabe** bei Fotos, die dort entstanden sind — beim
   Kufstein- und Tegernsee-Material bereits so hinterlegt.

Eine bloße Aufzählung von Ortsnamen im Fließtext wäre Keyword-Stuffing und
kann schaden. Deshalb steht sie nicht drin.

## Vor dem Livegang

HTTP-Header setzen (wirken nur als echter Header, nicht im HTML):

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

`assets/` verträgt `Cache-Control: public, max-age=31536000, immutable`.
Bei Änderungen an CSS oder JS im `<link>`/`<script>` ein `?v=2` anhängen.

## Ausstieg aus der Hochzeitsstrecke

Die gepinnte Strecke verbraucht rund drei Bildschirme vertikalen Scrollweg.
Damit niemand darin festhängt, gibt es zwei unsichtbare Zonen von je 11 vh
am oberen und unteren Bildrand:

- Zeiger in einer Zone → das Mausrad scrollt mit sechsfachem Weg vertikal
  weiter, man ist in ein bis zwei Radbewegungen draußen
- Klick auf eine Zone → Sprung direkt über oder unter die Strecke
- Beim Überfahren erscheint ein feiner Pfeil als Hinweis

Auf Touchgeräten und bei „Bewegung reduzieren" gibt es kein Pinning,
deshalb sind die Zonen dort ausgeblendet. Zusätzlich blendet sich unten
rechts ein Zurück-nach-oben-Knopf ein, sobald knapp zwei Bildschirme
gescrollt wurden.

## Bildgrößen und Ladegewicht

Der Ordner ist rund 37 MB groß, davon 22 MB Original-JPGs. Die lädt ein
Besucher im Normalfall nie: Sie sind nur Rückfall für Browser ohne WebP und
die scharfe Quelle für hochauflösende Bildschirme in der Lightbox.

Nachgemessen wurde, was wirklich über die Leitung geht:

| | erste Ansicht |
|---|---|
| Startseite Desktop | 0,39 MB |
| Startseite Handy | 0,45 MB |
| Preise Desktop | 0,45 MB |
| Preise Handy | 0,69 MB |

Größtes Element sichtbar nach 330 bis 860 ms. Google bewertet alles unter
2,5 Sekunden als gut.

**Die Originale werden nicht nachkomprimiert.** Ein Test mit vier
Beispieldateien hat gezeigt, dass eine Neucodierung bei Qualität 85 drei von
vier Dateien sogar vergrößert (PSNR 42–52 dB, also kein sichtbarer
Unterschied, aber auch kein Gewinn). Sie sind bereits optimal komprimiert.

Die Lightbox nutzt stattdessen ein `srcset`: normale Bildschirme laden die
1280er WebP mit rund 100 KB, hochauflösende das Original. Rund 60 % weniger
Daten ohne neue Dateien.

## Getestet

Chromium, 1440 · 1024 · 768 · 390 px. Keine Konsolenfehler.
Bildlauf 60 fps im Median, auch mit vierfach gedrosselter CPU.
Ohne JavaScript bleiben alle Hochzeitsfotos, Kacheln und Links nutzbar.
Ausstiege gemessen: über den Fotos 300 px pro Radbewegung, in den Zonen 1800 px.
Bild und Text am Portrait schließen auf 1 px genau bündig ab (pixelgemessen).
Farbkontraste erfüllen WCAG AA.
