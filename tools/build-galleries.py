#!/usr/bin/env python3
"""
Baut die Galerie-Unterseiten aus photos.js.

Warum ein Generator und keine handgeschriebenen Seiten: die Fotolisten
stehen ohnehin in photos.js, und jede Galerie hat denselben Aufbau. So
kann man Fotos nachlegen und die Seite neu erzeugen, ohne HTML zu tippen.

  python3 tools/build-galleries.py

Läuft aus dem Projektstamm. Überschreibt die Galerie-HTML-Dateien.
"""

import json
import os
import re
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

# ── Stammdaten je Galerie ────────────────────────────────────────────
# liste     : Name der Konstante in photos.js
# hero      : drei Fotos für den Auftakt (hinten, vorne, klein) als Index
GALERIEN = [
 dict(
  datei='hochzeit-umbrien-italien.html',
  liste='GAL_UMBRIEN',
  wort='Umbrien',
  ort='Umbrien, Italien',
  h2='Zwei Tage in den Hügeln Umbriens',
  titel='Hochzeit in Umbrien — freie Trauung auf einem Weingut',
  meta='Zweitägige Hochzeit in Umbrien: Trauung mit dem Bürgermeister im Bergdorf, Alfa Romeo Spider, lange Tafel über den Weinbergen. Fotografiert von Antonia Valladares.',
  satz='Eine Autostunde hinter der toskanischen Grenze liegt ein Bergdorf, in dem der '
       'Bürgermeister persönlich traut und die Nachbarin vom Fenster aus zusieht. Zwei Tage, '
       'ein weißer Alfa Romeo Spider über Kopfsteinpflaster, eine Tafel, die sich bis zum '
       'Talrand zieht, und Kinder, die zwischen den Olivenbäumen barfuß laufen. Umbrien macht '
       'aus einer Hochzeit ein langes Wochenende, an das sich alle erinnern.',
  fakten=['Tenuta Vitalonga', 'Freie Trauung &amp; Standesamt', '57 Bilder'],
  hero=[10, 22, 30]),
 dict(
  datei='hochzeit-tegernsee-regenhochzeit.html',
  liste='REEL',
  wort='Tegernsee',
  ort='Tegernsee, Oberbayern',
  h2='Wunderschöne Regenhochzeit am See',
  titel='Regenhochzeit am Tegernsee — Standesamt mit Seeblick',
  meta='Regenhochzeit am Tegernsee: Standesamt, First Look im Regen, Feier mit Seeblick. Hochzeitsfotografin Antonia Valladares.',
  satz='Regen macht eine Hochzeit nicht kleiner, er macht sie weicher. Das Licht wird ruhig, '
       'die Farben werden satt, und unter zwei schwarzen Schirmen entsteht eine Nähe, die an '
       'einem strahlenden Tag so nie zustande käme. Wer sich vorher auf einheitliche Schirme '
       'einigt, bekommt statt eines Notfalls ein Bildmotiv.',
  fakten=['Tegernsee', 'Standesamt &amp; Feier', '12 Bilder'],
  hero=[5, 9, 0]),

 dict(
  datei='hochzeit-schloss-blutenburg.html',
  liste='GAL_BLUTENBURG',
  wort='Blutenburg',
  ort='Schloss Blutenburg, München',
  h2='Eine freie Trauung im Schlosshof',
  titel='Hochzeit Schloss Blutenburg München — freie Trauung',
  meta='Freie Trauung auf Schloss Blutenburg in München: Sektempfang im Innenhof unter der alten Linde, Fest im Festsaal. 73 Bilder von Antonia Valladares.',
  satz='Gibt es etwas Schöneres, als von jemandem getraut zu werden, der die eigene '
       'Geschichte jahrelang hautnah miterlebt hat? Der sie noch einmal aus einer ganz '
       'eigenen Perspektive erzählen kann? Genau so war diese freie Trauung im Schloss '
       'Blutenburg in München.',
  zwischen={
   27: ['Nach dieser berührenden freien Trauung ging es zum Sektempfang im Innenhof unter '
        'der alten Linde, wo alle Gäste mit einem fantastischen flying buffet verköstigt wurden.',
        'Das war dann nach den Gratulationen für uns auch der perfekte Zeitpunkt, uns kurz für '
        'ein Paarshooting davonzustehlen. Das Licht stand am späten Nachmittag so perfekt, dass '
        'wir uns diese Sonnenstunden einfach nicht entgehen lassen wollten.'],
   45: ['Besonders schön fand ich die Verbindung mit dem Brautpaar: unser Kennenlerngespräch '
        'fand bei den beiden zu Hause statt. Ich hatte schon das '
        '<a href="/hochzeit-standesamt-mandlstrasse.html">Standesamt in der Mandlstraße</a> '
        'fotografiert und wusste genau, was den beiden wichtig ist. Man kann es nicht anders '
        'sagen, wir waren bei der freien Trauung einfach schon ein eingespieltes Team.',
        'Auch für die Gäste blieb Zeit: wer wollte, konnte sich vor dem Holzhexagon '
        'fotografieren lassen.'],
   56: ['Richtung Abend hat sich die gesamte Gesellschaft dann zum mehrgängigen Dinner im '
        'wunderschön dekorierten Festsaal eingefunden. Dort gab es dann auch Spiel, eine '
        'Vorstellung der Gäste und vor allem einen Heidenspaß.',
        'Das war auch unser Moment, um noch einmal Fotos während der blauen Stunde zu machen, '
        'die ich vor dem wunderschönen See auf keinen Fall verpassen wollte. Fotos in der blauen '
        'Stunde haben einfach immer ein wunderschönes Licht. An eurer Hochzeit könnt ihr euch zu '
        'jedem Zeitpunkt sicher sein: es ist meine Aufgabe, solche Feinheiten zu planen und auf '
        'dem Schirm zu haben.'],
   65: ['Nach dem kurzen Ausflug zum See und durch die Schlossschänke ging es wieder zurück, der '
        'Dancefloor wurde mit dem Paartanz eröffnet und dann ging die Party so richtig los.'],
  },
  fakten=['Schloss Blutenburg', 'München-Obermenzing', 'Freie Trauung', '73 Bilder'],
  hero=[24, 28, 59]),
 dict(
  datei='hochzeit-standesamt-mandlstrasse.html',
  liste='GAL_MANDLSTRASSE',
  wort='Mandlstraße',
  ort='Standesamt Mandlstraße, München',
  h2='Standesamt, U-Bahn und E-Kutsche durch München',
  titel='Hochzeit Standesamt Mandlstraße München — Bilder',
  meta='Standesamtliche Hochzeit in der Mandlstraße in München: First Look, Weg zur U-Bahn, Großmarkthalle und E-Kutsche. 65 Bilder von Antonia Valladares.',
  satz='Keine aufgesetzten Hochzeitsfotos, das war den beiden wichtig. Da bin ich sofort dabei! '
       'Nachdem ich die beiden mit ihrem süßen Nachwuchs im Café in München kennengelernt habe, '
       'haben wir den Hochzeitstag fotografisch mit einem First Look vor dem Standesamt in der '
       'Mandlstraße begonnen. Nach der Trauung in der Mandlstraße liefen wir gemütlich hinunter '
       'zur U-Bahn, auf dem Weg haben wir wunderschöne Fotos gemacht. Zu unserem Glück fuhr unten '
       'auch noch eine alte Bahn vorbei; das Foto davor ist bis heute eines meiner Lieblingsbilder. '
       'Vor dem Mittagessen in der Großmarkthalle haben wir einen Abstecher zur Tafel gemacht, die '
       'anderen Helfer begrüßten sie freudig mit den Ehrenschürzen - ist das nicht eine wundervolle '
       'Geschichte?\n\n'
       'Nach dem Hochzeitsschmaus in der Großmarkthalle ging\'s dann in der E-Kutsche durch München '
       'weiter, um den Tag noch gebührend zu zelebrieren...',
  mehr=[
   ('Standesamt Mandlstraße in München',
    ['Ihr plant eure Trauung im Standesamt in der Mandlstraße? Als Hochzeitsfotografin in '
     'München bin ich oft dort und begleite euch von der Trauung bis zu den Orten, die euch '
     'am Herzen liegen. Schreibt mir einfach.']),
  ],
  fakten=['Standesamt Mandlstraße', 'München', 'Standesamtliche Trauung', '65 Bilder'],
  hero=[14, 17, 24]),
 dict(
  datei='verlobungsshooting-vietnam.html',
  liste='GAL_VIETNAM',
  wort='Vietnam',
  ort='Ho-Chi-Minh-Stadt, Vietnam',
  h2='Verlobungsshooting zwischen Museum und Motorrollern',
  titel='Verlobungsshooting in Vietnam — Ho-Chi-Minh-Stadt',
  meta='Verlobungsshooting in Ho-Chi-Minh-Stadt: koloniale Fassaden, Motorroller, Schwarzweiß. Fotografiert von Antonia Valladares.',
  satz='Ho-Chi-Minh-Stadt steht nie still. Genau das macht sie zur Kulisse: Vor dem Fine Arts '
       'Museum ziehen die Roller zu Hunderten vorbei, und mittendrin stehen zwei Menschen '
       'vollkommen ruhig. Schwarzweiß, weil die Stadt in Farbe alles überstrahlen würde, was '
       'zwischen den beiden passiert.',
  fakten=['Ho-Chi-Minh-Stadt', 'Verlobung &amp; Elopement', '12 Bilder'],
  hero=[3, 7, 1]),
 dict(
  datei='hochzeit-standesamt-kufstein.html',
  liste='GAL_KUFSTEIN',
  wort='Kufstein',
  ort='Kufstein, Tirol',
  h2='Standesamt Kufstein und ein feines Gasthaus',
  titel='Hochzeit am Standesamt Kufstein — Rathaus in Tirol',
  meta='Standesamtliche Hochzeit in Kufstein: Einzug mit dem Vater durch das gewölbte Foyer, Trauung im Rathaus, Feier im Gasthaus. Fotografiert von Antonia Valladares.',
  satz='Das Rathaus in Kufstein hat ein Gewölbe, in dem jeder Schritt hallt, und ein Portal, '
       'durch das an diesem Morgen genau das richtige Licht fiel. Kleine Hochzeit, enger Kreis, '
       'blaue Hortensien im Strauß — und danach Weißwein im Gasthaus. Nicht jede Trauung '
       'braucht dreihundert Gäste, um groß zu sein.',
  fakten=['Rathaus Kufstein', 'Standesamt &amp; Gasthaus', '36 Bilder'],
  hero=[0, 12, 10]),
]

# Reihenfolge der Kacheln auf der Portfolio-Seite, für „weiter zur nächsten"
NAV = [
 ('/hochzeit-umbrien-italien.html', 'Umbrien', 'portfolio/cover/italy-wedding-umbria-weinberge-oldtimer-valladares.jpg'),
 ('/hochzeit-standesamt-kufstein.html', 'Kufstein', 'portfolio/cover/standesamt-kufstein-gasthaus-valladares.jpg'),
 ('/hochzeit-tegernsee-regenhochzeit.html', 'Tegernsee', 'portfolio/cover/tegernsee-standesamt-regenhochzeit-paar-mit-regenschirmen-valladares.jpg'),
 ('/verlobungsshooting-vietnam.html', 'Vietnam', 'portfolio/cover/vietnam-ho-chi-minh-verlobungsshooting-elopement-bw-valladares.jpg'),
]


def lies_liste(js, name):
    """Holt eine Fotoliste aus photos.js. Kein JSON — deshalb per Muster."""
    start = js.index('const ' + name + ' = [')
    block = js[start:]
    block = block[:block.index('\n];')]
    treffer = re.findall(r"\['([^']+)',\s*([\d.]+),\s*\"((?:[^\"\\]|\\.)*)\"", block)
    return [(p, float(r), a.replace('\\"', '"')) for p, r, a in treffer]


def masse(pfad):
    with Image.open('assets/img/' + pfad) as im:
        return im.size


def picture(pfad, alt, sizes, klasse='', lazy=True, w=None, h=None):
    base = 'assets/img/' + pfad.rsplit('.', 1)[0]
    if w is None:
        w, h = masse(pfad)
    laden = 'lazy' if lazy else 'eager'
    prio = '' if lazy else ' fetchpriority="high"'
    return (f'<picture><source type="image/webp" sizes="{sizes}" '
            f'srcset="{base}-320.webp 320w, {base}-640.webp 640w, {base}-1280.webp 1280w">'
            f'<img src="assets/img/{pfad}" alt="{alt}" width="{w}" height="{h}" '
            f'sizes="{sizes}" loading="{laden}" decoding="async"{prio}></picture>')


def bau(g, js, teile):
    fotos = lies_liste(js, g['liste'])
    if not fotos:
        raise SystemExit('Liste leer: ' + g['liste'])

    # ── Auftakt: der Ortsname riesig, drei Fotos überlappen die Lettern.
    #    Der Name ist echter Text — Google liest ihn als H1, kein Bild.
    h = g['hero']
    hero_bilder = []
    for i, (idx, pos, klasse) in enumerate([(h[0], 'b1', 'hinten'), (h[1], 'b2', 'vorne'), (h[2], 'b3', 'hinten')]):
        f = fotos[idx % len(fotos)]
        w, hh = masse(f[0])
        hero_bilder.append(
            f'    <figure class="gal-hero-bild gal-hero-bild--{klasse} gal-hero-{pos}" data-tiefe="{0.12 + i * 0.06:.2f}">'
            + picture(f[0], f[2], '(max-width: 900px) 38vw, min(22vw, 330px)', lazy=(i > 0), w=w, h=hh)
            + '</figure>')

    # ── Raster: Querformate nehmen sich beide Spalten, das gibt Rhythmus
    raster = []
    zwischen = g.get('zwischen', {})
    for nr_f, (pfad, ratio, alt) in enumerate(fotos):
        if nr_f in zwischen:
            absaetze = ''.join(f'<p>{a}</p>' for a in zwischen[nr_f])
            raster.append(f'    <div class="gal-einschub">{absaetze}</div>')
        w, hh = masse(pfad)
        klasse = 'gal-fig gal-fig--quer' if ratio > 1.1 else 'gal-fig'
        sizes = ('(max-width: 900px) 94vw, min(46vw, 600px)' if ratio <= 1.1
                 else '(max-width: 900px) 94vw, min(92vw, 1216px)')
        raster.append(f'    <figure class="{klasse} lb-fig" role="button" tabindex="0" '
                      f'data-full="assets/img/{pfad}" data-alt="{alt}">'
                      + picture(pfad, alt, sizes, w=w, h=hh) + '</figure>')

    # ── Weiter zur nächsten Hochzeit: hält Besucher auf der Seite und
    #    verteilt Linkkraft zwischen den Galerien
    weiter = []
    for url, name, cover in NAV:
        if url.endswith(g['datei']):
            continue
        w, hh = masse(cover)
        weiter.append(f'    <a href="{url}">'
                      + picture(cover, f'Zur Galerie {name}', '(max-width: 900px) 94vw, min(30vw, 400px)', w=w, h=hh)
                      + f'<span class="label">{name}</span></a>')
        if len(weiter) == 3:
            break

    # ── Strukturierte Daten
    bilder_ld = ['https://antoniavalladares.com/assets/img/' + f[0] for f in fotos[:12]]
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "ImageGallery",
             "@id": f"https://antoniavalladares.com/{g['datei']}#gallery",
             "url": f"https://antoniavalladares.com/{g['datei']}",
             "name": g['titel'],
             "description": re.sub(r'\s+', ' ', g['satz']),
             "inLanguage": "de-DE",
             "contentLocation": {"@type": "Place", "name": g['ort']},
             "numberOfItems": len(fotos),
             "image": bilder_ld,
             "author": {"@id": "https://antoniavalladares.com/#business"},
             "isPartOf": {"@id": "https://antoniavalladares.com/portfolio.html#page"}},
            {"@type": "BreadcrumbList",
             "itemListElement": [
                 {"@type": "ListItem", "position": 1, "name": "Start", "item": "https://antoniavalladares.com/"},
                 {"@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://antoniavalladares.com/portfolio.html"},
                 {"@type": "ListItem", "position": 3, "name": g['wort'], "item": f"https://antoniavalladares.com/{g['datei']}"}]}]}

    og = 'https://antoniavalladares.com/assets/img/' + fotos[h[0] % len(fotos)][0]
    mehr = ''
    if g.get('mehr'):
        teile_mehr = []
        for titel, absaetze in g['mehr']:
            p = ''.join(f'\n      <p>{a}</p>' for a in absaetze)
            teile_mehr.append(f'    <section class="gal-mehr-block">\n      <h2>{titel}</h2>{p}\n    </section>')
        mehr = '\n  <div class="gal-mehr">\n' + '\n'.join(teile_mehr) + '\n  </div>\n'

    fakten = ''.join(f'<li class="label">{x}</li>' for x in g['fakten'])
    # Ein Absatz je Leerzeile im Text (zwei Zeilenumbrüche hintereinander)
    saetze = '\n    '.join(f'<p class="gal-satz">{a}</p>' for a in g['satz'].split('\n\n'))

    html = f'''<!DOCTYPE html>
<html lang="de" data-font="a">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>{g['titel']} | Antonia Valladares</title>
<meta name="description" content="{g['meta']}">
<link rel="canonical" href="https://antoniavalladares.com/{g['datei']}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="author" content="Antonia Valladares">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="theme-color" content="#FBF9F7">
<meta name="format-detection" content="telephone=no">

<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests">

<meta property="og:type" content="article">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="Antonia Valladares">
<meta property="og:url" content="https://antoniavalladares.com/{g['datei']}">
<meta property="og:title" content="{g['titel']}">
<meta property="og:description" content="{g['meta']}">
<meta property="og:image" content="{og}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="assets/logo/favicon.png" sizes="180x180">
<link rel="apple-touch-icon" href="assets/logo/favicon.png">
<link rel="manifest" href="site.webmanifest">

<link rel="preload" as="image" href="assets/logo/logo-dark.png" fetchpriority="high">
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/cormorant-garamond-latin-300-normal.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/jost-latin-300-normal.woff2" crossorigin>

<link rel="stylesheet" href="assets/css/fonts.css">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/portfolio.css">

<script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
</script>
</head>

<body class="gal">

<a class="skip-link" href="#inhalt">Zum Inhalt springen</a>

{teile['header']}

<main id="inhalt">

  <nav class="gal-zurueck" aria-label="Brotkrumen">
    <a class="link zur" href="/portfolio.html#weddings"><span class="arrow" aria-hidden="true">&larr;</span>&nbsp;&nbsp;Alle Galerien</a>
  </nav>

  <header class="gal-hero">
{chr(10).join(hero_bilder)}
    <h1 class="gal-hero-wort len-{max(5, min(13, len(g['wort'])))}">{g['wort']}<span class="sr-only"> — {g['h2']}</span></h1>
  </header>

  <div class="gal-kopf">
    <p class="label gal-ort">{g['ort']}</p>
    <h2 class="gal-h2">{g['h2']}</h2>
    {saetze}
    <ul class="gal-fakten">{fakten}</ul>
  </div>

  <div class="gal-raster">
{chr(10).join(raster)}
  </div>

{mehr}
  <div class="gal-weiter-kopf"><p class="label">Weitere Galerien</p></div>
  <nav class="gal-weiter" aria-label="Weitere Galerien">
{chr(10).join(weiter)}
  </nav>

  <nav class="gal-zurueck gal-zurueck--unten" aria-label="Weiter">
    <a class="link zur" href="/portfolio.html#weddings"><span class="arrow" aria-hidden="true">&larr;</span>&nbsp;&nbsp;Alle Galerien</a>
    <a class="link" href="/kontakt.html">Termin anfragen<span class="arrow" aria-hidden="true">&rarr;</span></a>
  </nav>

</main>

{teile['footer']}

{teile['bar']}

{teile['menu']}<button class="to-top" type="button" aria-label="Zurück nach oben"><span aria-hidden="true">&uarr;</span></button>
<div class="grain" aria-hidden="true"></div>

<script src="assets/js/photos.js" defer></script>
<script src="assets/js/main.js" defer></script>
<script src="assets/js/galerie.js" defer></script>
</body>
</html>
'''
    with open(g['datei'], 'w') as fh:
        fh.write(html)
    return len(fotos)


def main():
    js = open('assets/js/photos.js').read()
    idx = open('index.html').read()
    teile = {
        'header': idx[idx.index('<header class="site-header">'):idx.index('</header>') + len('</header>')],
        'footer': idx[idx.index('<footer class="site-footer">'):idx.index('</footer>') + len('</footer>')],
        'bar':    idx[idx.index('<aside class="bookings-bar"'):idx.index('</aside>') + len('</aside>')],
        'menu':   idx[idx.index('<!-- MENÜ -->'):idx.index('<button class="to-top"')],
    }
    for g in GALERIEN:
        n = bau(g, js, teile)
        print(f'  {g["datei"]:44s} {n:3d} Fotos')
    print('Galerien gebaut.')


if __name__ == '__main__':
    main()
