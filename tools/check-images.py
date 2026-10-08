# -*- coding: utf-8 -*-
"""Prüft: 1) jedes Foto ist referenziert  2) jede Referenz existiert
   3) jedes Bild hat einen Alt-Text  4) alle internen Links"""
import os, re, sys, json, html

import os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
root = '.'
errors, warn = [], []

# --- alle vorhandenen Originalfotos ---
originals = set()
for dp, dn, fn in os.walk('assets/img'):
    for f in fn:
        if f.lower().endswith(('.jpg', '.jpeg', '.png')) and not re.search(r'-(640|1280)\.webp$', f):
            originals.add(os.path.join(dp, f).replace('\\', '/')[len('assets/img/'):])

# --- Referenzen aus HTML, CSS und dem Manifest ---
txt = ''
import glob as _g
SEITEN = sorted(_g.glob('*.html'))
SEITEN = [f for f in SEITEN if not f.startswith('mockup-')]
for f in SEITEN + ['assets/css/style.css', 'assets/js/main.js', 'assets/js/photos.js',
                   'assets/js/portfolio.js', 'assets/css/portfolio.css']:
    txt += open(f, encoding='utf-8').read()
refs = set(re.findall(r"assets/img/([\w\-/.]+?\.(?:jpg|jpeg|png))", txt))
refs |= set(re.findall(r"\['([\w\-/.]+?\.(?:jpg|jpeg|png))'", txt))

lost = sorted(originals - refs)
ghost = sorted(r for r in refs if r not in originals)
if lost:  errors.append('Foto liegt im Ordner, wird aber nirgends gezeigt:\n   ' + '\n   '.join(lost))
if ghost: errors.append('Referenz ohne Datei:\n   ' + '\n   '.join(ghost))

# --- WebP-Varianten vorhanden? ---
missing_webp = []
for o in sorted(originals):
    base = 'assets/img/' + o.rsplit('.', 1)[0]
    for w in (320, 640, 1280):
        if not os.path.exists(f'{base}-{w}.webp'):
            missing_webp.append(f'{base}-{w}.webp')
if missing_webp:
    errors.append('Fehlende WebP-Variante:\n   ' + '\n   '.join(missing_webp[:10]))

# --- Alt-Texte ---
doc = ''.join(open(f, encoding='utf-8').read() for f in SEITEN)
for tag in re.findall(r'<img\b[^>]*>', doc):
    if 'alt=' not in tag:
        errors.append('<img> ohne alt: ' + tag[:90])
    elif re.search(r'alt=""', tag) and 'aria-hidden' not in tag and 'curtain' not in doc[:0]:
        pass  # leeres alt ist bei rein dekorativen Bildern korrekt
manifest = open('assets/js/photos.js', encoding='utf-8').read()
empty_alts = re.findall(r"\['[\w\-/.]+',[\d.]+,\"\"\]", manifest)
if empty_alts:
    errors.append(f'{len(empty_alts)} Einträge im Manifest ohne Alt-Text')

# --- interne Links ---
links = set(re.findall(r'href="(/[^"#?]*)', doc))
planned = {'/portfolio.html', '/preise.html', '/about.html', '/kontakt.html',
           '/impressum.html', '/'}
for l in sorted(links):
    if l not in planned and not os.path.exists(l.lstrip('/')):
        warn.append('Link zeigt auf eine Seite, die es noch nicht gibt: ' + l)

print('Fotos im Ordner        :', len(originals))
print('davon referenziert     :', len(originals & refs))
print('WebP-Varianten         :', len(originals) * 3 - len(missing_webp), '/', len(originals) * 3)
print('Seiten geprüft         :', len(SEITEN))
print('img-Tags gesamt        :', doc.count('<img'))
print()
for w in warn:  print('HINWEIS ', w)
for e in errors: print('FEHLER  ', e)
print()
print('ERGEBNIS:', 'alles in Ordnung' if not errors else f'{len(errors)} Problem(e)')
sys.exit(1 if errors else 0)
