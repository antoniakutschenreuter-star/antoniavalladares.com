# Website zusammensetzen und hochladen

## 1 · Die Pakete zusammenführen
Die Website kommt in mehreren ZIPs, weil sie für eine einzelne Datei zu groß ist.
**Alle Teile in denselben Ordner entpacken.** Jedes Paket enthält denselben
Hauptordner `antoniavalladares-website`, die Teile ergänzen sich also
gegenseitig. Reihenfolge egal.

Danach muss der Ordner 1506 Dateien enthalten. Zum Prüfen genügt ein Blick in
`assets/img/portfolio` — dort müssen sechs `galerie-…`-Ordner liegen.

## 2 · Was noch von Dir kommen muss
- **Impressum:** Anschrift eintragen, dazu Umsatzsteuer-Nummer oder der Hinweis
  auf die Kleinunternehmerregelung (erledigt).
- **Datenschutz:** Anschrift eintragen.
- **Kontaktseite:** die Zeile in eckigen Klammern schreiben.

## 3 · Auf GitHub laden
Im Repository müssen `index.html`, `assets`, `CNAME` usw. **direkt** liegen,
nicht in einem Unterordner.

1. Repository `antoniavalladares.com`, Sichtbarkeit **Public**.
2. Settings → Pages → Deploy from a branch, `main`, `/ (root)`.
3. Custom domain eintragen, danach **Enforce HTTPS** anhaken.
4. DNS: vier A-Records auf 185.199.108.153, .109.153, .110.153, .111.153,
   dazu ein CNAME für `www` auf `deinbenutzername.github.io`.
   Bei Cloudflare diese Einträge auf **DNS only** stellen (graue Wolke).
5. Search Console: `https://antoniavalladares.com/sitemap.xml` einreichen.

## 4 · Nach jeder Änderung prüfen
    python3 tools/check-seiten.py     # Seitenstruktur, Links, Einbindungen
    python3 tools/check-images.py     # Fotos, Alt-Texte, WebP
    python3 tools/build-galleries.py  # Galerien neu erzeugen

`check-seiten.py` findet unter anderem fehlende CSS-Einbindungen — genau der
Fehler, der die About-Seite unformatiert aussehen ließ.

## 5 · Formular
Kommt später. Wenn es kommt, zwei Stellen anfassen: in `kontakt.html` die
CSP-Zeile um die Domain des Dienstes erweitern (`form-action`) und Abschnitt 4
der Datenschutzerklärung ergänzen.
