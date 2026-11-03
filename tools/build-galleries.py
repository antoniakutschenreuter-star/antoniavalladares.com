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
  h2='Zwei Tage in den H\u00fcgeln Umbriens',
  titel='Hochzeit in Umbrien, Italien',
  meta='Mehrt\u00e4gige Hochzeit in Umbrien: Pre-Party am Haus, Trauung mit Blick auf die Weinberge, Fest auf dem Weingut bis in die Nacht. Fotografiert von Antonia Valladares.',
  satz=(
   'Was f\u00fcr ein rauschendes, mehrt\u00e4giges Fest! S&amp;D wurden in Italien auf mich '
   'aufmerksam und haben mich prompt gefragt, ob ich die Hochzeit fotografieren m\u00f6chte. '
   '\u00dcberm\u00e4\u00dfig gestellte, klassische Hochzeitsfotos kamen f\u00fcr die beiden nicht in Frage. Als '
   'sie meinen Stil sahen und ich ihnen versichert habe, dass sie mich an ihrem Hochzeitstag '
   'kaum bemerken werden, haben sie mich direkt engagiert.'
   '\n\n'
   'Begonnen hat die Feier in ihrem h\u00fcbschen, frisch renovierten Haus in Umbrien, wo ich die '
   'Pre-Party begleiten und Fotos vor einem Luftballonbogen f\u00fcrs G\u00e4stebuch machen durfte. An '
   'Tag zwei ging es weiter: Niemand Geringerer als Frans Timmermans und der B\u00fcrgermeister '
   'des Dorfes haben die beiden getraut. Nach der wundersch\u00f6nen Trauung mit Blick auf die '
   'Weinberge im urigen D\u00f6rfchen ging es weiter aufs Weingut, wo vom Feinsten gespeist wurde '
   'und das rauschende Fest bis in die Nacht ging.'
  ),
  fakten=['Tenuta Vitalonga', 'Freie Trauung &amp; Standesamt', 'Destination Wedding', 'Dokumentarisch &amp; ungestellt'],
  hero=[10, 22, 30]),
 dict(
  datei='hochzeit-tegernsee-regenhochzeit.html',
  liste='GAL_TEGERNSEE',
  wort='Tegernsee',
  ort='Tegernsee, Oberbayern',
  h2='Standesamt am See, Balkonfotos und Tafel im Aran',
  titel='Regenhochzeit am Tegernsee',
  meta='Standesamt Tegernsee im Rathaus direkt am See: Trauung bei Regen, Fotos auf dem Balkon mit Seeblick, Feier im Aran nebenan. Hochzeitsfotografin Antonia Valladares.',
  satz=(
   'L&amp;S haben im Standesamt am Tegernsee geheiratet, im Rathaus direkt am Wasser. Ein Haus, das auch dann '
   'eine Kulisse hergibt, wenn der See grau ist und es den ganzen Tag durchregnet — und genau '
   'so war dieser Tag.'
   '\n\n'
   'Nach der Trauung ging es hinaus auf den Balkon des Rathauses, mit dem See im Rücken. Von '
   'dort waren es nur ein paar Schritte ins Aran nebenan, wo die lange Tafel schon auf die '
   'Hochzeitsgesellschaft gewartet hat.'
   '\n\n'
   'Mein Tipp für jede Hochzeit: Schaut euch ein paar Tage vorher den Wetterbericht an und '
   'legt euch vorsorglich einheitliche Schirme zurecht. Ob schwarz, durchsichtig oder bunt, '
   'ist ganz eure Sache — ich bin ein großer Fan von schlichten, eleganten schwarzen Schirmen. '
   'Eine Gesellschaft mit gleichen Schirmen wirkt auf den Bildern sofort ruhig, und aus dem '
   'Regen wird ein Motiv.'
  ),
  fakten=['Rathaus Tegernsee', 'Standesamt &amp; Feier', 'Intime Regenhochzeit', 'Dokumentarisch am See'],
  hero=[12, 49, 25]),

 dict(
  datei='hochzeit-freie-trauung-pfalz.html',
  liste='GAL_PFALZ',
  wort='Pfalz',
  ort='Weinberge in Rheinland-Pfalz',
  h2='Das Wingertsheisel mitten in den Weinbergen',
  titel='Freie Trauung in der Pfalz',
  meta='Freie Trauung in den Weinbergen von Rheinland-Pfalz: First Look zwischen den Rebzeilen, Traurede von einer Freundin, Spielenachmittag und Tanz bis in die Nacht.',
  satz=(
   'Die Hochzeit von J&amp;M h\u00e4tte sch\u00f6ner nicht sein k\u00f6nnen. Mitten in den Weinbergen von '
   'Rheinland-Pfalz haben die beiden einen absoluten Schatz zum Heiraten aufgetan: das '
   'Wingertsheisel. Morgens sah es noch nach Regen aus \u2014 beim First Look zwischen den '
   'Rebzeilen hat uns das nicht gest\u00f6rt.'
   '\n\n'
   'Das Besondere: Au\u00dfer beim Essen gab es fast keine Dienstleister. Die Traurede hat eine '
   'gute Freundin der beiden gehalten, die Cousins haben die Bar und das DJ-Pult gerockt. '
   'Nachmittags gab es eine Spielerunde, bei der einige G\u00e4ste h\u00f6chstes '
   'schauspielerisches Talent bewiesen haben \u2014 ich habe selten so gelacht. So kann man\u2019s '
   'eben auch machen.'
   '\n\n'
   'Die G\u00e4ste kamen aus ganz Deutschland angereist, und weil die beiden echte Foodies sind, '
   'war kulinarisch rundum gesorgt: Eiswagen, Kaffeewagen, Foodtruck und viel Selbstgemachtes.'
   '\n\n'
   'So eine gro\u00dfe Feier trotzdem so intim und vertraut zu gestalten, war wirklich ein '
   'sch\u00f6nes Erlebnis. Danke, dass ich eure Liebsten, euch und eure Liebe fotografieren '
   'durfte \U0001F979'
  ),
  fakten=['Weingut in Rheinland-Pfalz', 'Freie Trauung', 'Hochzeit im Weinberg', 'Dokumentarisch &amp; verspielt'],
  hero=[39, 115, 120]),

 dict(
  datei='hochzeit-schloss-blutenburg.html',
  liste='GAL_BLUTENBURG',
  wort='Blutenburg',
  ort='Schloss Blutenburg, München',
  h2='Schloss Blutenburg, Paartanz und Feier bis in die Nacht',
  titel='Hochzeit Schloss Blutenburg München',
  meta='Freie Trauung im Schloss Blutenburg in M\u00fcnchen: Zeremonie im Hof, Paarfotos am Schloss, Paartanz und Feier bis in die Nacht. Fotografiert von Antonia Valladares.',
  satz=(
   'Einfach eine richtige Traumhochzeit in M\u00fcnchen. F\u00fcr mich war es super besonders, L&amp;D '
   'schon bei der ersten, standesamtlichen Hochzeit begleitet zu haben: eine wundersch\u00f6ne, '
   'intime Winterhochzeit im <a href="/hochzeit-standesamt-mandlstrasse.html">Standesamt in der '
   'Mandlstra\u00dfe</a> in M\u00fcnchen, und dann noch die zweite im Schloss Blutenburg. Kennengelernt '
   'haben wir uns ein Jahr vorher, als ich die beiden auf einen Kaffee zu Hause besucht habe '
   'und direkt einen ersten Eindruck vom Stil der beiden bekommen konnte. Eins war klar: sie '
   'mochten Schnappsch\u00fcsse, ungestellte, authentische Candid-Fotos, dazu ein paar sanft '
   'angeleitete im Editorial Style.'
   '\n\n'
   'Bei den Paarfotos waren wir dann schon ein richtig eingespieltes Team, das hat einfach nur '
   'Spa\u00df gemacht. Ich habe die ganze Feier bis in die Nacht begleitet, so sind auch noch '
   'sch\u00f6ne Aufnahmen von der Party und vom Paartanz entstanden.'
  ),
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
  fakten=['Schloss Blutenburg', 'München-Obermenzing', 'Freie Trauung', 'Candid &amp; Editorial', 'Feier bis in die Nacht'],
  hero=[24, 28, 59]),
 dict(
  datei='hochzeit-standesamt-mandlstrasse.html',
  liste='GAL_MANDLSTRASSE',
  wort='Mandlstraße',
  ort='Standesamt Mandlstraße, München',
  h2='Standesamt, U-Bahn und E-Kutsche durch München',
  titel='Standesamt Mandlstraße München',
  meta='Standesamtliche Hochzeit in der Mandlstraße in München: First Look, Weg zur U-Bahn, Großmarkthalle und E-Kutsche. 65 Bilder von Antonia Valladares.',
  satz='Keine aufgesetzten Hochzeitsfotos, das war L&amp;D wichtig. Da bin ich sofort dabei! '
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
  fakten=['Standesamt Mandlstraße', 'München', 'Standesamtliche Trauung', 'Dokumentarisch mitten in München'],
  hero=[14, 17, 24]),
 dict(
  datei='verlobungsshooting-vietnam.html',
  liste='GAL_HOCHIMINH',
  wort='Ho Chi Minh',
  ort='Ho-Chi-Minh-Stadt, Vietnam',
  h2='Verlobungsshooting im Fine Arts Museum',
  titel='Verlobungsshooting in Ho-Chi-Minh-Stadt',
  meta='Verlobungsshooting im Fine Arts Museum in Ho-Chi-Minh-Stadt: Buntglasfenster, '
       'geschwungene Treppen und ein Antrag. Fotografiert von Antonia Valladares.',
  satz=(
   'Ho-Chi-Minh-Stadt, eine Stadt, die niemals schläft! V&amp;B bin ich beim Reisen '
   'begegnet, und als sie hörten, dass ich Hochzeitsfotografin bin, waren sie sofort Feuer '
   'und Flamme: Sie hatten sich frisch verlobt und wollten die Verlobung unbedingt festhalten. '
   'Und an welchem schöneren Ort könnte man das tun als im Fine Arts Museum?'
   '\n\n'
   'Die Vision für das Shooting war klar: dreamy, sanft, die Zärtlichkeit der beiden '
   'miteinander einfangen. Genau so ist der Stil geworden.'
   '\n\n'
   'Wir hatten wahnsinnig viel Spaß beim Fotografieren — und bei diesen Bildern sind '
   'einige meiner liebsten dabei, die ich bisher gemacht habe.'
  ),
  fakten=['Fine Arts Museum', 'Ho-Chi-Minh-Stadt', 'Verlobungsshooting', 'Dreamy &amp; zart', 'Editorial im Museum'],
  hero=[12, 4, 2]),
 dict(
  datei='hochzeit-freie-trauung-out-of-office-muenchen.html',
  liste='GAL_OUTOFOFFICE',
  wort='Out of Office',
  ort='Out of Office, München',
  h2='Freie Trauung über den Dächern Münchens',
  titel='Freie Trauung im Out of Office München',
  meta='Freie Trauung im Out of Office München: First Look im Englischen Garten, Zeremonie auf '
       'der Dachterrasse mit Blick auf die Frauenkirche, Feier bis in die Nacht.',
  satz=(
   'Was für eine schöne symbolische Hochzeit über den Dächern Münchens! J&amp;M '
   'durfte ich schon bei ihrer standesamtlichen Trauung im '
   '<a href="/hochzeit-standesamt-mandlstrasse.html">Standesamt in der Mandlstraße</a> '
   'begleiten, ganz in Tracht. Der Vibe bei der freien Trauung war ein ganz anderer, aber '
   'genauso besonders.'
   '\n\n'
   'An einem herrlichen Sonnentag haben sie im Out of Office noch einmal ihre Liebe besiegelt '
   '— und ich glaube, das ist eine der süßesten Liebesgeschichten, die ich je '
   'gehört habe.'
   '\n\n'
   'Gestartet sind wir im Englischen Garten mit einem First Look direkt am Wasser. Die beiden '
   'haben sich Liebesbriefe vorgelesen, und ich habe das aus der Ferne für sie dokumentiert. '
   'Danach ging es weiter in die Location, die auch direkt am Englischen Garten liegt. Dort gab '
   'es noch einen First Look mit dem Vater der Braut — das war so schön.'
   '\n\n'
   'Getraut wurde auf der Dachterrasse, mit der Frauenkirche im Rücken. Danach wurde oben '
   'weitergefeiert, und der DJ hat bis in die Nacht eingeheizt.'
  ),
  fakten=['Out of Office', 'München', 'Freie Trauung', 'Rooftop-Hochzeit', 'Dokumentarisch &amp; emotional'],
  hero=[11, 42, 34]),
 dict(
  datei='hochzeit-standesamt-kufstein.html',
  liste='GAL_KUFSTEIN',
  wort='Kufstein',
  ort='Kufstein, Tirol',
  h2='Standesamt Kufstein und Feier im Unterwirt',
  titel='Hochzeit am Standesamt Kufstein',
  meta='Intime standesamtliche Trauung in Kufstein: Gew\u00f6lbe im Rathaus, Paarshooting vor dem Bergpanorama, Feier im Lokal Unterwirt. Fotografiert von Antonia Valladares.',
  satz=(
   'J&amp;J haben sich f\u00fcr eine intime standesamtliche Trauung in Kufstein entschieden, die '
   'feiner nicht h\u00e4tte sein k\u00f6nnen. Das h\u00fcbsche Standesamt Kufstein kannte ich schon aus dem '
   'Vorjahr, deshalb war ich umso erfreuter, wieder in diesem sch\u00f6nen Gew\u00f6lbe fotografieren '
   'zu d\u00fcrfen. Gefeiert wurde diesmal im Lokal Unterwirt.'
   '\n\n'
   'Das wundersch\u00f6ne Bergpanorama und die ungem\u00e4hte Wiese waren der perfekte Ort f\u00fcr das '
   'Paarshooting. Der Sektempfang war im Garten des sch\u00f6nen Lokals, weiter ging es mit den '
   'feinen Speisen, bis der sch\u00f6ne Tag feierlich seinen Ausklang fand. Die '
   '<a href="/hochzeit-freie-trauung-bad-toelz.html">freie Trauung der beiden in Bad T\u00f6lz</a> '
   'durfte ich sp\u00e4ter auch begleiten.'
  ),
  fakten=['Rathaus Kufstein', 'Standesamt &amp; Gasthaus', 'Elopement im Bergpanorama', 'Fein &amp; klein'],
  hero=[0, 12, 10]),
 dict(
  datei='hochzeit-freie-trauung-bad-toelz.html',
  liste='GAL_BAD_TOELZ',
  wort='Bad T\u00f6lz',
  ort='Kurhaus Bad T\u00f6lz, Oberbayern',
  h2='Getting Ready, First Look und freie Trauung im Kurhaus',
  titel='Freie Trauung im Kurhaus Bad T\u00f6lz',
  meta='Freie Trauung im Kurhaus Bad T\u00f6lz: Getting Ready, First Look in der Pergola, Handfasting, '
       'Tortenanschnitt und Party. 91 Bilder von Antonia Valladares.',
  satz=(
   'Die standesamtliche Trauung von J&amp;J durfte ich schon '
   '<a href="/hochzeit-standesamt-kufstein.html">in Kufstein</a> begleiten, deshalb waren wir '
   'bei der freien Trauung in Bad T\u00f6lz schon richtig vertraut. F\u00fcr mich begann der Tag beim '
   'Getting Ready. Ich mag es richtig gern, das Getting Ready f\u00fcr die Paare zu fotografieren: '
   'Es ist der eine Moment des Tages, den der jeweils andere nicht miterlebt. Auf den Bildern '
   'kann jeder hinterher doch noch sehen, wie es beim anderen abgelaufen ist.'
   '\n\n'
   'Dann ging es weiter mit dem First Look, sehr klassisch in der wundersch\u00f6nen Pergola des '
   'Kurhauses in Bad T\u00f6lz. Die freie Trauung war unfassbar feierlich, mit dem sch\u00f6nen Ritual '
   'des Handfastings: Den beiden wurde ein Band um die H\u00e4nde gelegt und mit einem Knoten der '
   'Bund noch einmal symbolisch besiegelt.'
   '\n\n'
   'Ein kleines Paarshooting, Familienfotos, Tortenanschnitt. Der Tag lief so wundersch\u00f6n, '
   'entspannt und unaufgeregt ab und war doch so feierlich. Und bei der Party hat DJane Anna '
   'Geilano aus M\u00fcnchen eingeheizt. Ich liebe die Fotos vom Dancefloor.'
  ),
  mehr=[
   ('Freie Trauung im Kurhaus Bad T\u00f6lz',
    ['Ihr plant eure freie Trauung im Kurhaus in Bad T\u00f6lz oder im Oberland? Als '
     'Hochzeitsfotografin aus M\u00fcnchen bin ich gern den ganzen Tag dabei, vom Getting Ready '
     'bis zum Dancefloor. Schreibt mir einfach.']),
  ],
  fakten=['Kurhaus Bad T\u00f6lz', 'Oberbayern', 'Freie Trauung', 'Handfasting-Ritual', 'Vom Getting Ready bis zum Dancefloor'],
  hero=[6, 37, 51]),
]

# Reihenfolge der Kacheln auf der Portfolio-Seite, für „weiter zur nächsten"
# Reihenfolge wie die Kacheln auf der Portfolio-Seite
NAV = [
 ('/hochzeit-freie-trauung-pfalz.html', 'Pfalz', 'portfolio/cover/freie-trauung-pfalz-weinberge-hochzeitspaar-valladares.jpg'),
 ('/hochzeit-freie-trauung-bad-toelz.html', 'Bad Tölz', 'portfolio/cover/freie-trauung-bad-toelz-paartanz-festsaal-schwarzweiss.jpg'),
 ('/hochzeit-freie-trauung-out-of-office-muenchen.html', 'Out of Office', 'portfolio/cover/freie-trauung-out-of-office-muenchen-brautpaar-traubogen.jpg'),
 ('/hochzeit-schloss-blutenburg.html', 'Blutenburg', 'portfolio/cover/freie-trauung-schloss-blutenburg-hochzeitspaar-valladares.jpg'),
 ('/hochzeit-umbrien-italien.html', 'Umbrien', 'portfolio/cover/italy-wedding-umbria-weinberge-oldtimer-valladares.jpg'),
 ('/hochzeit-standesamt-mandlstrasse.html', 'Mandlstraße', 'portfolio/cover/standesamt-mandlstrasse-hochzeitspaar-fenster-schwarzweiss-valladares.jpg'),
 ('/hochzeit-tegernsee-regenhochzeit.html', 'Tegernsee', 'portfolio/cover/tegernsee-standesamt-regenhochzeit-paar-mit-regenschirmen-valladares.jpg'),
 ('/verlobungsshooting-vietnam.html', 'Ho Chi Minh', 'portfolio/cover/vietnam-ho-chi-minh-verlobungsshooting-elopement-bw-valladares.jpg'),
 ('/hochzeit-standesamt-kufstein.html', 'Kufstein', 'portfolio/cover/standesamt-kufstein-gasthaus-valladares.jpg'),
]


def lies_liste(js, name):
    """Holt eine Fotoliste aus photos.js. Kein JSON — deshalb per Muster."""
    start = js.index('const ' + name + ' = [')
    block = js[start:]
    block = block[:block.index('\n];')]
    treffer = re.findall(r"\['([^']+)',\s*([\d.]+),\s*\"((?:[^\"\\]|\\.)*)\"", block)
    return [(p, float(r), a.replace('\\"', '"')) for p, r, a in treffer]


_MASSE_AUS_HTML = None
_SEITE = None


def _masse_aus_html():
    """Breite und Höhe, die schon einmal ins HTML geschrieben wurden.

    Die Originalfotos liegen nicht immer vollständig vor. Dann werden die
    Werte aus den bestehenden Seiten übernommen, damit sich am Seitenbau
    nichts verschiebt."""
    global _MASSE_AUS_HTML
    if _MASSE_AUS_HTML is None:
        _MASSE_AUS_HTML = {}
        import glob as _g
        # Die Seite, die gerade gebaut wird, zuerst: ihre eigenen Werte
        # gelten, sonst erbt sie Maße aus einer anderen Seite.
        dateien = ([_SEITE] if _SEITE and os.path.exists(_SEITE) else []) + \
                  [d for d in sorted(_g.glob('*.html')) if d != _SEITE]
        for datei in dateien:
            for m in re.finditer(r'<img src="assets/img/([^"]+)"[^>]*?width="(\d+)" height="(\d+)"',
                                 open(datei, encoding='utf-8').read()):
                _MASSE_AUS_HTML.setdefault(m.group(1), (int(m.group(2)), int(m.group(3))))
    return _MASSE_AUS_HTML


def masse(pfad, ratio=None):
    try:
        with Image.open('assets/img/' + pfad) as im:
            return im.size
    except (FileNotFoundError, OSError):
        pass
    bekannt = _masse_aus_html().get(pfad)
    if bekannt:
        return bekannt
    if ratio:
        return (2000, round(2000 / ratio)) if ratio >= 1 else (round(2000 * ratio), 2000)
    raise SystemExit('Bilddatei fehlt und keine Maße bekannt: assets/img/' + pfad)


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
    global _MASSE_AUS_HTML, _SEITE
    _SEITE, _MASSE_AUS_HTML = g['datei'], None
    fotos = lies_liste(js, g['liste'])
    if not fotos:
        raise SystemExit('Liste leer: ' + g['liste'])

    # ── Auftakt: der Ortsname riesig, drei Fotos überlappen die Lettern.
    #    Der Name ist echter Text — Google liest ihn als H1, kein Bild.
    # Die Plätze haben kein festes Seitenverhältnis mehr, aber die
    # Komposition lebt davon, dass links und in der Mitte Hochformate
    # stehen und rechts ein Querformat. Passt ein Index nicht, wird das
    # nächste Foto mit der richtigen Lage genommen — so verrutscht nichts
    # mehr, wenn später Fotos in die Liste eingefügt werden.
    def passend(idx, quer):
        n = len(fotos)
        for schritt in range(n):
            f = fotos[(idx + schritt) % n]
            if (f[1] > 1) == quer:
                return f
        return fotos[idx % n]

    h = g['hero']
    hero_bilder = []
    for i, (idx, pos, klasse) in enumerate([(h[0], 'b1', 'hinten'), (h[1], 'b2', 'hinten'), (h[2], 'b3', 'vorne')]):
        f = passend(idx, pos == 'b2')
        w, hh = masse(f[0], f[1])
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
        w, hh = masse(pfad, ratio)
        klasse = 'gal-fig gal-fig--quer' if ratio > 1.1 else 'gal-fig'
        sizes = ('(max-width: 900px) 94vw, min(46vw, 600px)' if ratio <= 1.1
                 else '(max-width: 900px) 94vw, min(92vw, 1216px)')
        raster.append(f'    <figure class="{klasse} lb-fig" role="button" tabindex="0" '
                      f'data-full="assets/img/{pfad}" data-alt="{alt}">'
                      + picture(pfad, alt, sizes, w=w, h=hh) + '</figure>')

    # ── Weiter zur nächsten Hochzeit: hält Besucher auf der Seite und
    #    verteilt Linkkraft zwischen den Galerien
    weiter = []
    # Ab der eigenen Position weiterzählen: so zeigt jede Galerie andere
    # Nachbarn statt immer der ersten drei aus der Liste.
    start = next((i for i, n in enumerate(NAV) if n[0].endswith(g['datei'])), -1) + 1
    for url, name, cover in NAV[start:] + NAV[:start]:
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
             "description": re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', g['satz'])),
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

    # Facebook und WhatsApp schneiden das Vorschaubild auf etwa 1,91:1 —
    # ein Hochformat verliert dabei oben und unten fast alles. Deshalb
    # das Querformat des Auftakts.
    og_foto = passend(h[1], True)
    og = 'https://antoniavalladares.com/assets/img/' + og_foto[0]
    og_w, og_h = masse(og_foto[0], og_foto[1])
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
<meta property="og:image:width" content="{og_w}">
<meta property="og:image:height" content="{og_h}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="assets/logo/favicon.png" sizes="180x180">
<link rel="apple-touch-icon" href="assets/logo/favicon.png">
<link rel="manifest" href="site.webmanifest">

<link rel="preload" as="image" href="assets/logo/logo-dark.png" fetchpriority="high">
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/cormorant-garamond-latin-300-normal.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/jost-latin-300-normal.woff2" crossorigin>

<link rel="stylesheet" href="assets/css/fonts.css?v=20261103g">
<link rel="stylesheet" href="assets/css/style.css?v=20261103g">
<link rel="stylesheet" href="assets/css/portfolio.css?v=20261103g">

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

<script src="assets/js/photos.js?v=20261103g" defer></script>
<script src="assets/js/main.js?v=20261103g" defer></script>
<script src="assets/js/galerie.js?v=20261103g" defer></script>
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
