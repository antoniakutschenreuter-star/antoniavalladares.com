# -*- coding: utf-8 -*-
"""Prüft jede Seite auf die Fehler, die man im Code nicht sieht:
   1) fehlende CSS- oder JS-Einbindung   2) mehr oder weniger als ein H1
   3) Bilder ohne alt, width oder height  4) Inline-Styles und Inline-Skripte
   5) tote interne Links                  6) fehlende Pflichtangaben im Kopf

   python3 tools/check-seiten.py     ·  Rückgabe 1, wenn etwas fehlt.
"""
import glob
import os
import re
import sys

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

# Diese Dateien braucht jede Seite, sonst steht sie nackt im Browser.
PFLICHT_CSS = ['assets/css/fonts.css', 'assets/css/style.css']
PFLICHT_JS = ['assets/js/main.js']
PFLICHT_KOPF = ['<title>', 'name="description"', 'rel="canonical"',
                'name="viewport"', 'rel="icon"']

fehler = []
seiten = sorted(f for f in glob.glob('*.html') if not f.startswith('mockup-'))

for f in seiten:
    h = open(f, encoding='utf-8').read()
    sag = lambda t: fehler.append(f'{f}: {t}')

    for css in PFLICHT_CSS:
        if f'href="{css}"' not in h:
            sag(f'Stylesheet fehlt — {css}')
    for js in PFLICHT_JS:
        if f'src="{js}"' not in h:
            sag(f'Skript fehlt — {js}')
    for teil in PFLICHT_KOPF:
        if teil not in h:
            sag(f'Kopfangabe fehlt — {teil}')

    if h.count('<h1') != 1:
        sag(f'{h.count("<h1")} H1-Überschriften statt genau einer')

    for tag in re.findall(r'<img\b[^>]*>', h):
        if 'alt=' not in tag:
            sag('Bild ohne alt: ' + tag[:70])
        if 'width=' not in tag or 'height=' not in tag:
            sag('Bild ohne Maße (springt beim Laden): ' + tag[:70])

    if re.search(r'<[a-z][^>]*\sstyle="', h):
        sag('Inline-Style — die CSP blockiert ihn im Browser')
    if re.search(r'<script(?![^>]*src)(?![^>]*ld\+json)', h):
        sag('Inline-Skript — die CSP blockiert es im Browser')

    for ziel in re.findall(r'href="/([^"#?]+)"', h):
        if ziel and not os.path.exists(ziel):
            sag('toter Link → /' + ziel)

print('Seiten geprüft :', len(seiten))
print()
for e in fehler:
    print('FEHLER  ', e)
print()
print('ERGEBNIS:', 'alles in Ordnung' if not fehler else f'{len(fehler)} Problem(e)')
sys.exit(1 if fehler else 0)
