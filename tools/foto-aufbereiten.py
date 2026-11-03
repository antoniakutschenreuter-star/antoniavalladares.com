# -*- coding: utf-8 -*-
"""Macht aus einem Foto das Original (JPG, höchstens 2000 px breit) und die
drei WebP-Größen 320 / 640 / 1280 — so wie alle anderen Fotos der Seite.
Aufruf:  python3 tools/foto-aufbereiten.py quelle.png assets/img/ordner/name
(ohne Endung; es entstehen name.jpg, name-320.webp, name-640.webp, name-1280.webp)"""
import sys, os
from PIL import Image

def prep(src, ziel, maxw=2000):
    im = Image.open(src).convert('RGB')
    if im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    os.makedirs(os.path.dirname(ziel) or '.', exist_ok=True)
    im.save(ziel + '.jpg', quality=88, optimize=True, progressive=True)
    for w in (320, 640, 1280):
        w2 = min(w, im.width)
        im.resize((w2, round(im.height * w2 / im.width)), Image.LANCZOS).save(f'{ziel}-{w}.webp', quality=78, method=6)
    return im.width, im.height, round(im.width / im.height, 4)

if __name__ == '__main__':
    print(prep(sys.argv[1], sys.argv[2]))
