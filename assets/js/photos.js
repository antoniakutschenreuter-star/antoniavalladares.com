/* =====================================================================
   FOTO-MANIFEST — antoniavalladares.com
   Einzige Quelle der Wahrheit. Format: [pfad, breite/hoehe, alt]
   Jede Datei aus assets/img/ steht hier genau einmal.
   tools/check-images.py meldet jede Datei, die fehlt oder doppelt ist.
   ===================================================================== */

/* EINE Hochzeit, horizontale Strecke. PLATZHALTER: Tegernsee-Galerie. */
const REEL = [
  ['portfolio/galerie-tegernsee-LS/braut-detail-sw.jpg',0.6667,"Detailaufnahme der Braut in Schwarzweiß – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/anstecker-detail-sw.jpg',1.5004,"Anstecker des Bräutigams als Detail in Schwarzweiß – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/first-look-regen.jpg',0.6665,"First Look des Brautpaars im Regen – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/umarmung-brautstrauss-regen.jpg',1.5004,"Brautpaar umarmt sich mit Brautstrauß im Regen – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/eheringe-lachen.jpg',0.6665,"Lachendes Brautpaar beim Ringtausch – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/paar-regenschirme-seepromenade.jpg',0.6665,"Brautpaar mit Regenschirmen an der Seepromenade – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/paar-portrait-sw.jpg',0.6680,"Brautpaar-Portrait in Schwarzweiß – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/gruppe-steg-see.jpg',1.5004,"Hochzeitsgesellschaft auf dem Steg am See – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/gruppe-balkon-lachen.jpg',1.5004,"Lachende Hochzeitsgesellschaft auf dem Balkon – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/kuss-balkon-seeblick.jpg',1.5004,"Brautpaar küsst sich auf dem Balkon mit Seeblick – Hochzeit am Tegernsee"],
  ['portfolio/galerie-tegernsee-LS/seeblick-balkon-paar.jpg',1.5004,"Brautpaar auf dem Balkon mit Blick auf den Tegernsee – Hochzeitsfotografie"],
  ['portfolio/galerie-tegernsee-LS/luftballons-see.jpg',1.5004,"Luftballons vor der Seekulisse bei der Hochzeitsfeier – Tegernsee"]
];

/* PLATZHALTER: durch die echten Instagram-Fotos ersetzen. */
const TILES = [
  ['m_haende.jpg',0.6667,"Hände des Brautpaars halten sich zärtlich – Hochzeitsfotografie München"],
  ['m_schuhe.jpg',1.5013,"Elegante Brautschuhe auf Parkettboden – Hochzeitsdetails München"],
  ['m_balishoot.jpg',0.6667,"Paarshooting auf Bali – Destination Wedding Fotografin Antonia Valladares"],
  ['m_vietnam.jpg',1.5013,"Verlobungsshooting in Vietnam – Paarfotografie Antonia Valladares"],
  ['g_aquazurra.jpg',1.5000,"Brautschuhe von Aquazzura als Detailaufnahme – Hochzeitsdetails München"],
  ['portfolio/familie-kind-blume-detail.jpg',0.6665,"Kind hält eine Blume in den Händen – Familienfotografie München"]
];

/* Portrait neben dem Text — das beige. */
const PORTRAIT = [
  ['antonia-valladares-photographer-munich.jpeg',1.4969,"Antonia Valladares, Fotografin aus München, im Sonnenlicht"]
];

/* Vier Fotos im Menue. */
const MENU_SHOTS = [
  ['menu-hintergrund.jpg',0.6665,"Brautpaar küsst sich in der U-Bahn – Hochzeitsreportage mitten in München"],
  ['hochzeit-umbria-wedding-guests.jpg',1.5009,"Hochzeitsgäste bei einer Hochzeit in Umbrien, Italien – Destination Wedding Fotografin"],
  ['hero3.jpg',1.5009,"Brautpaar umarmt sich im Türrahmen mit Buntglasfenstern – Hochzeitsfotografie München"],
  ['portfolio/reisen-regenbogen-daemmerung.jpg',0.5625,"Regenbogen über einer Straße in der Dämmerung – Reisefotografie"]
];

/* Fliegende Fotos, Hero. */
const FLOW_A = [
  ['cta_bg.jpg',0.9009,"Bräutigam hilft der Braut in einen weißen Oldtimer vor italienischer Steinfassade – Destination Wedding"],
  ['destination-wedding-muenchen-preise.jpg',1.0000,"Festlich gedeckte Hochzeitstafel im Freien zur blauen Stunde – Destination Wedding Preise"],
  ['g_brideback.jpg',1.3997,"Rückenansicht der Braut im Hochzeitskleid – Hochzeitsfotografie München"],
  ['g_candybar.jpg',1.5000,"Brautpaar an der Candybar der Hochzeitsfeier – Hochzeitsreportage"],
  ['g_champagne.jpg',0.6667,"Anstoßen mit Champagner bei der Hochzeitsfeier – Hochzeitsreportage"],
  ['g_kronleuchter.jpg',0.6667,"Hochzeitslocation mit Kronleuchter im Kerzenlicht – Hochzeitsfotografie Bayern"],
  ['g_oldtimer.jpg',0.6667,"Brautpaar vor einem Oldtimer – Hochzeitsreportage München"],
  ['g_spiegel.jpg',1.5000,"Braut im Spiegel beim Getting Ready – Hochzeitsmorgen in München"],
  ['groups.jpg',2.6786,"Brautpaar mit Gästen am Seeufer in Schwarzweiß – Hochzeitsreportage am See"],
  ['hochzeit-couple-innige-umarmung.jpg',1.5009,"Innige Umarmung des Brautpaars nach der Trauung – Hochzeitsfotografie München"],
  ['hochzeit-hero-toskana-hochzeit.jpg',1.5009,"Brautpaar bei einer Hochzeit in der Toskana – Destination Wedding Fotografin"],
  ['hochzeit-moet-champagner-calla-lilie-editorial.jpg',1.5009,"Champagnerflasche und Calla-Lilie editorial arrangiert – Hochzeitsdetails von Hochzeitsfotografin Antonia Valladares"],
  ['m_firstlook.jpg',0.6667,"First Look des Brautpaars vor der Zeremonie – Hochzeitsfotografin München"],
  ['portfolio/editorial-braut-natur.jpg',0.6665,"Braut in der Natur, editorial fotografiert – Hochzeitsfotografie München"],
  ['portfolio/freie-trauung-weisse-stuehle-garten.jpg',1.5009,"Freie Trauung mit weißen Stühlen im Garten – Hochzeitsfotografin München"],
  ['portfolio/hochzeit-dinner-anstossen-toskana.jpg',0.6665,"Anstoßen beim Hochzeitsdinner in der Toskana – Destination Wedding"],
  ['portfolio/rezension-hochzeit-kloster-seeon.jpg',1.5004,"Brautpaar in Tracht auf einem Holzsteg am See – Hochzeit im Kloster Seeon"],
  ['tband.jpg',2.4194,"Brautpaar zwischen Bäumen in Schwarzweiß – Hochzeitsfotografie München"],
  ['editorial/aperitif-negroni-hochzeit-detail-muenchen.jpg',1.5003,"Negroni im Glas vor einer Bar, Aperitif am Hochzeitstag – Hochzeitsfotografie München"],
  ['editorial/brautstrauss-hochzeit-am-see-schwarzweiss.jpg',0.6669,"Hochgehaltener Brautstrauß aus Farn und Schleierkraut vor dem See, Schwarzweiß – Hochzeitsfotografin München"],
  ['editorial/hochzeitstanz-brautpaar-festsaal-schwarzweiss.jpg',1.4994,"Brautpaar dreht sich beim Hochzeitstanz im Festsaal, Schwarzweiß – Hochzeitsfotografie München"],
  ['editorial/hochzeitsgeschenke-fensterbank-olivenbaum-italien.jpg',0.6665,"Geschenkkorb und Olivenbäumchen am Fenster im Abendlicht – Hochzeit in Italien"],
  ['editorial/eheringe-holzschatulle-kirchliche-trauung.jpg',1.5003,"Eheringe in einer Holzschatulle auf rotem Samtkissen – kirchliche Trauung"],
  ['editorial/standesamt-muenchen-regen-brautpaar-schwarzweiss.jpg',0.6669,"Brautpaar läuft im Regen unter einem Schirm die Stufen zum Standesamt hinauf, Schwarzweiß – Standesamt München"],
  ['editorial/sektempfang-champagner-einschenken-hochzeit.jpg',1.5003,"Champagner wird beim Sektempfang in ein Glas eingeschenkt – Hochzeitsfotografie München"],
  ['editorial/brautschuhe-spiegel-ankleide-schwarzweiss.jpg',0.6665,"Beine der Braut in hohen Schuhen vor dem Spiegel beim Getting Ready, Schwarzweiß – Hochzeitsfotografin München"],
];

/* Fliegende Fotos, zweiter Abschnitt. */
const FLOW_B = [
  ['dest.jpg',0.7170,"Lange Hochzeitstafel im Abendlicht vor einem Landhaus in Italien – Destination Wedding"],
  ['g_bridesmaids.jpg',0.6667,"Braut mit ihren Brautjungfern vor der Trauung – Hochzeitsreportage München"],
  ['g_candybar2.jpg',0.6667,"Süßigkeitenbar bei der Hochzeitsfeier – Hochzeitsreportage München"],
  ['g_festsaal.jpg',0.6667,"Festsaal mit gedeckten Tischen und Kronleuchter vor der Hochzeitsfeier – Hochzeitslocation"],
  ['g_schleier.jpg',0.6667,"Brautschleier weht im Wind über dem Kleid – Hochzeitsfotografie München"],
  ['gay-couple-artsy.jpg',1.5009,"Gleichgeschlechtliches Paar bei der Hochzeit, editorial fotografiert – Hochzeitsfotografin München"],
  ['hochzeit-couple-artsy-atmosphaerisch.jpg',1.5009,"Braut und Bräutigam Hand in Hand auf einer Marmortreppe – atmosphärische Hochzeitsfotografie"],
  ['hochzeit-freie-trauung.jpg',1.5009,"Lachendes Brautpaar bei der freien Trauung – Hochzeitsfotografin München"],
  ['hochzeit-kirchliche-trauung.jpg',1.5009,"Kirchliche Trauung mit Blick durch das Kirchenschiff – Hochzeitsfotografin München"],
  ['hochzeit-standesamt-muenchen-auszug.jpg',1.5009,"Auszug des Brautpaars aus dem Standesamt im Konfettiregen – Standesamt München"],
  ['m_jacquemus.jpg',1.5013,"Braut mit Strohhut im editorialen Stil – Hochzeitsfotografie Antonia Valladares"],
  ['portfolio/reisen-comer-see-boote.jpg',0.5625,"Boote am Comer See in Italien – Reisefotografie und Destination Weddings"],
  ['portfolio/schloss-blutenburg-hochzeit-muenchen-braut.jpg',0.6665,"Braut im Innenhof von Schloss Blutenburg – Hochzeitsfotografin München"],
  ['verlobungsshooting-muenchen-preise.jpg',1.0000,"Hände mit Verlobungsring und Ehering übereinandergelegt – Verlobungsshooting München"],
  ['editorial/brautpaar-tuerrahmen-gegenlicht-schwarzweiss.jpg',0.6665,"Brautpaar im Türrahmen im Gegenlicht, Schwarzweiß – Hochzeitsfotografie München"],
  ['editorial/brautpaar-haende-treppe-tuell-hochzeit.jpg',1.4996,"Hände greifen nacheinander auf einer alten Treppe, Tüllrock der Braut – Hochzeitsfotografie"],
  ['editorial/hochzeitsfeier-lichterkette-pavillon-abend.jpg',0.6665,"Lichterketten über dem Pavillon und gedeckter Tisch am Abend – Hochzeitsfeier"],
  ['editorial/brautpaar-beine-kopfsteinpflaster-schwarzweiss.jpg',1.5003,"Brautpaar geht über Kopfsteinpflaster, nur die Beine im Bild, Schwarzweiß – Standesamt München"],
  ['editorial/hochzeit-italien-tomaten-pasta-detail.jpg',0.6665,"Tomaten, Knoblauch und Olivenöl als Gastgeschenk im Sonnenlicht – Hochzeit in Italien"],
  ['editorial/hochzeitsfeier-erdbeeren-etagere-abend.jpg',1.5003,"Erdbeeren auf einer Etagere werden nachgefüllt, Hochzeitsfeier am Abend – Hochzeitsfotografie München"],
  ['editorial/brautpaar-spaziergang-allee-schwarzweiss.jpg',0.6665,"Brautpaar spaziert Hand in Hand durch eine Allee im Gegenlicht, Schwarzweiß – Hochzeitsfotografin München"],
  ['editorial/hochzeitsauto-oldtimer-rosen-spiegel-detail.jpg',0.6665,"Weiße Rosen am Außenspiegel eines grünen Oldtimers – Hochzeitsauto, Hochzeitsfotografie München"],
];

/* Bewusst NICHT auf der Startseite: Fotos von Antonia selbst, Business,
   Bueros und Einzelportraits. Gehoeren auf Portfolio bzw. About.
   Hier nur gefuehrt, damit kein Foto verloren geht. */
const NICHT_STARTSEITE = [
  ['a1.jpg',0.6667,"Frau im blauen Strickpullover vor Backsteinwand – Portraitshooting München"],
  ['a2.jpg',0.6667,"Portrait einer lächelnden Frau vor Backsteinmauer – Portraitfotografie München"],
  ['a3.jpg',0.6667,"Schwarzweiß-Portrait einer lächelnden Frau im Freien – Portraitfotografie München"],
  ['hochzeitsfotografin-antonia-valladares-muenchen.jpg',0.6665,"Antonia Valladares, Hochzeitsfotografin aus München, mit ihrer Kamera"],
];

/* Preise-Seite. Das Toskana-Foto der Hochzeitskachel kommt aus FLOW_A
   und wird auf beiden Seiten verwendet. */
/* ── PORTFOLIO ─────────────────────────────────────────────────────────
   Ab hier alles, was die Portfolio-Seite und die Galerien brauchen.
   Format bleibt [pfad, breite/hoehe, alt].
   ─────────────────────────────────────────────────────────────────── */

/* Die neun Kacheln der Hochzeiten. Reihenfolge = Reihenfolge auf der Seite. */
const PF_HOCHZEITEN = [
  ['portfolio/cover/italy-wedding-umbria-weinberge-oldtimer-valladares.jpg',0.6666,"Brautpaar im weißen Oldtimer-Cabrio im Abendlicht zwischen Zypressen – Hochzeit in Umbrien, Italien",'Umbrien','2 Days in Umbria · Pre Party and Wedding in the Vineyards','/hochzeit-umbrien-italien.html'],
  ['portfolio/cover/standesamt-kufstein-gasthaus-valladares.jpg',0.6667,"Brautpaar Hand in Hand im Park, Schwarzweiß – Hochzeit am Standesamt Kufstein",'Kufstein','Standesamt Kufstein und feines Gasthaus','/hochzeit-standesamt-kufstein.html'],
  ['portfolio/cover/freie-trauung-pfalz-weinberge-hochzeitspaar-valladares.jpg',0.6667,"Bräutigam küsst die Braut in der Beuge vor Efeuwand und Rebzeilen – freie Trauung in der Pfalz",'Pfalz','Freie Trauung inmitten von Weinbergen',''],
  ['portfolio/cover/freie-trauung-bad-toelz-hochzeitspaar-braut-getragen.jpg',0.6667,"Bräutigam trägt die Braut mit Brautstrauß durch den Festsaal – freie Trauung im Kurhaus Bad Tölz",'Bad Tölz','Freie Trauung im wunderschönen Kurhaus',''],
  ['portfolio/cover/freie-trauung-schloss-blutenburg-hochzeitspaar-valladares.jpg',0.6667,"Brautpaar geht Hand in Hand über das Kopfsteinpflaster an der Schlosskapelle – Hochzeit Schloss Blutenburg München",'München','Schloss Blutenburg – Hochzeit vom Feinsten','/hochzeit-schloss-blutenburg.html'],
  ['portfolio/cover/moet-champagner-editorial-hochzeit-mandlstrasse-standesamt-valladares.jpg',0.6667,"Champagnerflasche, Callas und Gläser im Streiflicht – editorial Hochzeit am Standesamt Mandlstraße München",'München','Standesamt Mandlstraße und ein Tag in der Stadt','/hochzeit-standesamt-mandlstrasse.html'],
  ['portfolio/cover/tegernsee-standesamt-regenhochzeit-paar-mit-regenschirmen-valladares.jpg',0.6666,"Brautpaar mit schwarzen Regenschirmen an der Seepromenade vor dem Ausflugsboot – Regenhochzeit am Tegernsee",'Tegernsee','Wunderschöne Regenhochzeit','/hochzeit-tegernsee-regenhochzeit.html'],
  ['portfolio/cover/vietnam-ho-chi-minh-verlobungsshooting-elopement-bw-valladares.jpg',0.6667,"Paar vor dem Fine Arts Museum in Ho-Chi-Minh-Stadt, verwischte Roller, Schwarzweiß – Verlobungsshooting Vietnam",'Vietnam','Verlobungsshooting im Museum','/verlobungsshooting-vietnam.html'],
  ['portfolio/cover/kirchliche-trauung-harburg-schwaben-hochzeitspaar.jpg',0.6666,"Brautpaar unter der alten Eiche am Weiher im Gegenlicht – kirchliche Trauung in Harburg, Donau-Ries",'Donau-Ries','Kirchliche Trauung in Harburg und Monheim','']
];

/* Galerie Umbrien — 58 Fotos, Reihenfolge erzählt den Tag. */
const GAL_UMBRIEN = [
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-007.jpg',0.6667,"Bestuhlte Zeremonie auf der Terrasse mit Pianist und Blick über die umbrischen Hügel – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-065.jpg',0.6667,"Katze läuft über den Mittelgang zwischen den Holzstühlen vor der freien Trauung in Umbrien – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-053.jpg',1.5000,"Floristin steckt die letzten Rosen in den Blumenbogen – Hochzeit in Umbrien – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-006.jpg',0.6667,"Blumensäulen aus Rosen und Eukalyptus rahmen die Trauung über dem Tal – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-010.jpg',1.5000,"Trauzeugin steckt dem Bräutigam die Anstecknadel an – Hochzeit in Umbrien – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-066.jpg',0.6667,"Gäste versammeln sich auf dem Dorfplatz vor der Trauung in Umbrien – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-011.jpg',1.5000,"Bräutigam wartet lächelnd mit dem Trauzeugen auf die Braut – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-063.jpg',1.5000,"Bürgermeister mit italienischer Schärpe begrüßt den Trauzeugen – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-017.jpg',0.6665,"Bürgermeister und Trauzeuge verlesen die Trauungsurkunde auf der Terrasse – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-016.jpg',1.4999,"Bräutigam lacht seinem Trauzeugen zu, im Rücken der Blumenbogen – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-070.jpg',0.6666,"Weißer Alfa Romeo Spider fährt durch die Gassen des Bergdorfs zur Trauung – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-052.jpg',0.6667,"Bräutigam öffnet der Braut die Tür des weißen Alfa Romeo Spider – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-051.jpg',0.6665,"Braut steigt mit Brautstrauß aus dem Oldtimer, der Schleier fällt über die Tür – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-054.jpg',0.6667,"Detail des Brautkleids mit Blattstickerei und wehendem Schleier am Oldtimer – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-018.jpg',0.6665,"Braut und Bräutigam lachen sich beim Einzug an – freie Trauung in Umbrien – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-019.jpg',1.5000,"Brautpaar hält sich an den Händen während der Zeremonie über dem Tal – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-022.jpg',1.4998,"Braut strahlt ihren Bräutigam während des Eheversprechens an – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-023.jpg',1.5000,"Junge mit roten Haaren lacht in der Stuhlreihe während der Trauung – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-024.jpg',1.5000,"Hochzeitsgäste mit Hüten und Fascinator verfolgen die Zeremonie – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-025.jpg',0.6667,"Trauzeugen halten die italienische Trauungsurkunde in den Händen – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-002.jpg',0.6666,"Brautpaar jubelt mit erhobenen Armen nach dem Jawort – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-062.jpg',0.6667,"Taubenschwarm steigt über der Hochzeitsgesellschaft auf – Umbrien – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-026.jpg',1.5000,"Großes Gruppenbild der Hochzeitsgesellschaft vor der Steintreppe – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-009.jpg',0.6665,"Nachbarin schaut aus dem Fenster des Steinhauses auf die Hochzeitsgesellschaft – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-008.jpg',0.6665,"Bräutigam begrüßt lachend eine Hochzeitsgästin auf dem Dorfplatz – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-012.jpg',1.5000,"Lachender Hochzeitsgast im hellblauen Leinensakko beim Apéro – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-005.jpg',0.6667,"Barkeeper an der Steinwand öffnet eine Flasche beim Apéro in Umbrien – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-029.jpg',0.6667,"Antipasti mit Prosciutto auf dem Holzbrett der Tenuta Vitalonga – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-030.jpg',0.6667,"Parmesanchips und Panzanella auf dem Apéro-Buffet der Hochzeit – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-028.jpg',0.6667,"Hochzeitsgästin im pinken Kleid mit Weinglas und Teller beim Apéro – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-045.jpg',0.6667,"Kinder tragen sich lachend huckepack über den Kiesweg – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-061.jpg',0.6666,"Kinder sitzen mit Tellern im Gras beim Apéro in der Abendsonne – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-004.jpg',1.5000,"Hochzeitsgäste am Pool mit Blick über die umbrischen Hügel – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-031.jpg',0.6667,"Lange weiße Hochzeitstafel auf der Terrasse über den Weinbergen – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-046.jpg',0.6667,"Weiße Chiavari-Stühle und gedeckte Tafel im Gegenlicht – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-047.jpg',1.5000,"Gedeckte Hochzeitstafel an der Steinmauer in der Abendsonne – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-033.jpg',0.6667,"Frau richtet die Hochzeitstafel unter der Zypresse, Schwarzweiß – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-034.jpg',1.4999,"Kerzenständer, Eukalyptus und Rosen auf der weißen Hochzeitstafel – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-048.jpg',0.6667,"Gläser im Gegenlicht auf der gedeckten Tafel – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-049.jpg',0.6667,"Gläserreihe in Bewegung, Schwarzweiß – Hochzeitsdetail – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-050.jpg',0.6667,"Hochzeitsgesellschaft an der langen Tafel über dem Tal in der Dämmerung – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-064.jpg',1.4997,"Gäste stoßen im Kerzenlicht an der langen Tafel an – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-071.jpg',0.6667,"Blick über die beleuchtete Hochzeitstafel auf das Weingut in der Dämmerung – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-055.jpg',0.6667,"Gästinnen in roten Kleidern gehen im Gegenlicht an der Tafel vorbei – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-020.jpg',0.6667,"Steinhaus der Tenuta Vitalonga mit Blick über die Weinberge Umbriens – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-013.jpg',0.6667,"Fensterläden mit Spitzengardine an der Steinfassade im Bergdorf – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-014.jpg',1.5000,"Weiß gedeckter Tisch vor der Steinwand mit Briefkästen im Dorf – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-056.jpg',1.5004,"Weiß gedeckter Tisch im Innenhof des umbrischen Bergdorfs – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-015.jpg',0.6667,"Braut und Bräutigam sitzen im weißen Alfa Romeo Spider im Abendlicht – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-003.jpg',1.5000,"Hochzeitsgäste mit Strohhüten und Rotwein vor blauem Himmel – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-027.jpg',1.5000,"Braut winkt mit dem Brautstrauß neben dem Alfa Romeo Spider – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-032.jpg',0.6667,"Weißer Alfa Romeo Spider fährt in der Abendsonne davon – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-035.jpg',1.0000,"Blick über die Hochzeitstafel in die Hügel Umbriens – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-037.jpg',0.6667,"Braut steigt mit Hilfe des Bräutigams in den Oldtimer, Schwarzweiß – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-038.jpg',0.6666,"Brautstrauß und Schleier am geöffneten Oldtimer, Schwarzweiß – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-039.jpg',1.5000,"Bräutigam hilft der Braut in den Oldtimer, umringt von Gästen – Hochzeit in Umbrien, Italien"],
  ['portfolio/galerie-umbrien-italien/umbrien-hochzeit-freie-trauung-antonia-valladares-040.jpg',1.4998,"Rückenansicht der Braut mit Schleier und Brautstrauß, Schwarzweiß – Hochzeit in Umbrien, Italien"]
];

/* Querstrecke Business: die Schauspielportraits. */
const FLOW_SCHAUSPIEL = [
  ['portfolio/schauspieler-portrait-michael-kranz.jpg',1.5004,"Schauspielerportrait vor farbigem Hintergrund – Portraitfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz001.jpg',0.6667,"Schauspielportrait im Flanellhemd vor heller Wand, draußen – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz002.jpg',0.6665,"Schauspieler sitzt auf einer Treppe im rostroten Rippshirt – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz003.jpg',0.6667,"Nahes Schauspielportrait mit Schnauzer vor weißen Kacheln – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz004.jpg',0.6667,"Schauspielportrait im grünen Hemd vor ockerfarbenem Grund – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz005.jpg',0.6667,"Schauspielportrait im grünen Hemd vor Holzwand – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz006.jpg',0.6668,"Ernstes Schauspielportrait im grünen Hemd – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz007.jpg',0.6666,"Lachendes Schauspielportrait vor beigem Hintergrund – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz008.jpg',0.6667,"Schauspielportrait im schwarzen Rollkragenpullover – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz009.jpg',0.6667,"Schauspieler mit der Hand an der Schläfe vor weißem Grund – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz010.jpg',0.6667,"Schauspielportrait mit zerzaustem Haar im schwarzen Shirt – Schauspielerfotografie München"],
  ['portfolio/galerie-schauspiel-kranz/schauspielportraits-muenchen-antonia-valladares-michael-kranz011.jpg',0.6667,"Schauspielportrait mit zurückgekämmtem Haar in Collegejacke – Schauspielerfotografie München"]
];

/* Querstrecke Familien: die Babybauch-Serie mit Kornblumen. */
const REEL_BABYBAUCH = [
  ['portfolio/babybauch-wildblumenwiese.jpg',1.5004,"Schwangere im Häkeloberteil auf der Kornblumenwiese – Babybauchshooting München"],
  ['portfolio/familie-schwangere-mutter-kind-portrait.jpg',0.6670,"Schwangere Mutter mit ihrer kleinen Tochter auf dem Arm zwischen Kornblumen"],
  ['portfolio/familie-schwangere-mutter-kind-wildblumen.jpg',0.6663,"Schwangere Mutter und Tochter lachen auf der Wildblumenwiese"],
  ['portfolio/familie-mutter-kind-babybauch-naehe.jpg',1.5004,"Kleines Mädchen küsst den Babybauch ihrer Mutter"],
  ['portfolio/familie-mutter-kind-lachen.jpg',1.5004,"Mutter und Tochter lachen sich auf der Sommerwiese an"],
  ['portfolio/familie-babyfuesse-detail.jpg',0.6665,"Hände auf dem Babybauch als Detail in Schwarzweiß"],
  ['portfolio/babybauch-detail-verlobungsring.jpg',1.5004,"Hand mit Ring auf dem Spitzenkleid, Detail in Schwarzweiß"]
];

/* Flug Familien — alles außer der Querstrecke. */
const FLOW_FAMILIEN = [
  ['portfolio/babyfoto-muenchen-familienfotografie.jpg',1.5,"Ohr und Hand eines Neugeborenen ganz nah – Newborn-Fotografie München"],
  ['portfolio/familie-babyfuesse-detail-farbe.jpg',0.6665,"Hände umfassen den Babybauch im warmen Licht – Babybauchfotografie München"],
  ['portfolio/familie-mutter-kind-wiese.jpg',1.5009,"Mutter hebt ihr Kind auf einer Sommerwiese hoch, Schwarzweiß – Familienfotografie München"],
  ['portfolio/babybauch-portrait-olivenbaum.jpg',0.6663,"Schwangere Frau am Olivenbaum – Babybauchshooting von Antonia Valladares"],
  ['familie-haende-babyfuesse-muenchen.jpg',1.5009,"Elternhände halten winzige Babyfüße – Neugeborenenfotografie München"],
  ['g_motherchild.jpg',0.6667,"Schwangere Mutter hält ihr Kind auf einer Wildblumenwiese – Familienfotografie München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-001.jpg',0.6665,"Schwangere im weißen Leinenhemd vor einer Palme im Gewächshaus – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-004.jpg',0.6665,"Schwangere im Gegenlicht zwischen Palmwedeln – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-009.jpg',0.6665,"Schwangere schaut lachend auf ihren Babybauch, Schwarzweiß – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-002.jpg',1.5003,"Schwangere hält ihren Babybauch, Palmen im Gegenlicht – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-007.jpg',0.6665,"Schwangere im Profil mit Hand auf dem Bauch, Schwarzweiß – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-010.jpg',0.6665,"Palmenschatten auf dem Babybauch – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-003.jpg',1.5003,"Schwangere zwischen zwei Palmen im Gewächshaus – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-012.jpg',0.6665,"Babybauch mit Palmenschatten als Detail in Schwarzweiß – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-005.jpg',0.6665,"Schwangere lacht unter einem Palmwedel – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-011.jpg',1.5003,"Babybauch mit Palmenschatten, Detail – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-008.jpg',0.6665,"Schwangere mit Blick über die Schulter im Gewächshaus – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-014.jpg',0.6665,"Schwangere im weißen Kleid auf einem Weg zwischen hohen Hecken – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-006.jpg',1.5003,"Schwangere lacht, Palmwedel im Vordergrund – Babybauchshooting München"],
  ['portfolio/babybauch-gewaechshaus/babybauch-shooting-gewaechshaus-muenchen-antonia-valladares-013.jpg',1.5003,"Hände auf dem Babybauch im Gegenlicht, Schwarzweiß – Babybauchshooting München"],
  ['portfolio/newborn/newborn-fotografie-muenchen-babyfuesse-bett.jpg',1.5003,"Füße eines Neugeborenen auf hellem Leinen – Newborn-Fotografie München"],
  ['portfolio/newborn/newborn-fotografie-muenchen-elternhaende-babyfuesse-schwarzweiss.jpg',0.6665,"Elternhände halten die Füße des Neugeborenen, Schwarzweiß – Newborn-Fotografie München"],
];

/* Flug Business — alles außer der Querstrecke. */
const FLOW_BUSINESS = [
  ['portfolio/business/business-portraits-bewerbungsfoto-muenchen-antonia-valladares001.jpg',0.6667,"Business-Portrait einer Frau im karierten Blazer vor Steinmauer – Bewerbungsfoto und Businessfotografie München"],
  ['portfolio/business/business-portraits-bewerbungsfoto-muenchen-antonia-valladares002.jpg',1.5000,"Business-Portrait vor dunkelgrauer Wand, Querformat – Bewerbungsfoto und Businessfotografie München"],
  ['portfolio/business/business-portraits-bewerbungsfoto-muenchen-antonia-valladares003.jpg',1.5000,"Business-Portrait im Grünen am Wasser – Bewerbungsfoto und Businessfotografie München"],
  ['portfolio/business/business-portraits-bewerbungsfoto-muenchen-antonia-valladares004.jpg',1.5000,"Business-Portrait im hellen Blazer vor Frühlingsgrün – Bewerbungsfoto und Businessfotografie München"],
  ['business-portrait-fotografie-muenchen.jpg',1.5009,"Business-Portrait einer Frau im Tageslicht – Businessfotografin München"],
  ['businessfotografie-fotografie-muenchen-valladares001.jpg',1.5004,"Lachende Coachin in ihrem hellen Arbeitsraum – Personal Branding Fotografie München"],
  ['business-fotografie-steuerkanzlei-muenchen.jpg',1.5009,"Teamfoto einer Steuerkanzlei in München – Businessfotografie Antonia Valladares"],
];

/* Galerie Kufstein — 36 Fotos, Reihenfolge erzählt den Tag. */
const GAL_KUFSTEIN = [
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen004.jpg',0.6665,"Braut mit Brautstrauß auf der Treppe im gewölbten Foyer des Standesamts, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen005.jpg',1.5004,"Braut wartet mit ihrem Vater am geöffneten Portal auf den Einzug, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen007.jpg',0.6665,"Vater führt die Braut durch das Foyer zur Trauung – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen006.jpg',1.5004,"Die goldenen Eheringe auf dem Ringkissen aus Tüll – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen020.jpg',0.6665,"Der leere Trauungssaal des Rathauses mit gedecktem Tisch und Blumen – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen008.jpg',1.5004,"Einzug der Braut in den Trauungssaal, die Gäste stehen auf, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen010.jpg',1.5004,"Brautpaar steht vor den Gästen im Gewölbesaal, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen009.jpg',1.5004,"Weiter Blick in den Trauungssaal, die Gäste sitzen im Halbrund – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen011.jpg',0.6665,"Brautpaar sieht sich während der Trauung an, die Braut hält den Strauß aus Hortensien und Callas – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen014.jpg',1.4996,"Die Braut nimmt den Ehering vom weißen Ringkissen, daneben der Brautstrauß, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen015.jpg',0.6665,"Braut und Bräutigam halten Händchen, der Strauß mit blauen Hortensien liegt auf dem Kleid – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen013.jpg',1.5004,"Ringtausch: der Bräutigam streift der lachenden Braut den Ehering an – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen012.jpg',0.6665,"Der erste Kuss als Ehepaar, die Gäste applaudieren, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen022.jpg',0.6665,"Die Gäste sehen der Trauung zu, im Vordergrund weiße Rosen – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen018.jpg',1.5004,"Brautpaar sitzt Hand in Hand nebeneinander, dahinter die Familie, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen016.jpg',0.6665,"Der Bräutigam unterschreibt die Heiratsurkunde, die Standesbeamtin sieht zu – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen017.jpg',0.6665,"Blick über den Trauungssaal während der Unterzeichnung – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen021.jpg',1.5004,"Blick über die Schulter der Standesbeamtin auf Brautpaar und Gäste – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen019.jpg',0.6665,"Die Braut unterschreibt die Heiratsurkunde, die Standesbeamtin steht daneben – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen023.jpg',0.6665,"Die Standesbeamtin gratuliert, die Braut lacht und hält die Urkunde – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen024.jpg',0.6665,"Brautpaar allein im leeren Trauungssaal, Blick zueinander, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen025.jpg',1.5004,"Auszug aus dem Rathaus durch das Spalier der Gäste mit Bänderstäben, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen027.jpg',0.6665,"Frisch getrautes Paar im Portal des Rathauses, ringsum wehende Bänder – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen028.jpg',1.5004,"Brautpaar geht Hand in Hand über das Kopfsteinpflaster durch das Spalier – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen029.jpg',0.6665,"Brautpaar geht durch die Kufsteiner Altstadt, die Braut im Tweedjäckchen, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen030.jpg',0.6665,"Ein Glas Sekt wird beim Empfang im Garten des Gasthauses gereicht – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen031.jpg',1.5004,"Anstoßen mit Sekt im Garten unter orangen Sonnenschirmen – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen032.jpg',1.5004,"Der Bräutigam im Gespräch mit einem Gast beim Sektempfang – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen033.jpg',1.5004,"Detail: die Hände des Paares ineinander, am Finger der neue Ehering, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen037.jpg',1.5004,"Brautpaar lacht beim Sektempfang unter blühenden Bäumen, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen035.jpg',0.6665,"Die lange gedeckte Tafel unter dem Kronleuchter im Gasthaus – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen036.jpg',0.6665,"Blick durch die Flügeltür auf die gedeckte Tafel im Saal – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen038.jpg',1.5004,"Brautpaar tanzt lachend auf der Sommerwiese hinter dem Gasthaus, Schwarzweiß – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen003.jpg',1.5004,"Trauzeugen unterhalten sich lachend vor dem Standesamt – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen001.jpg',0.6665,"Braut im weißen Tweedjäckchen mit blauem Hortensienstrauß vor dem Rathaus – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-kufstein-standesamt/standesamt-hochzeit-kufstein-gasthaus-antonia-valladares-muenchen002.jpg',0.6665,"Brautpaar vor dem Rundbogenportal des Rathauses Kufstein – Standesamt Kufstein, Hochzeitsfotografin Antonia Valladares"]
];




/* Galerie Schloss Blutenburg — 73 Fotos. */
const GAL_BLUTENBURG = [
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-001.jpg',0.6665,"Sektempfang im Innenhof unter der alten Linde – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-002.jpg',1.5004,"Blick über die Schlossanlage mit den Gästen im Hof – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-003.jpg',1.5004,"Der Bräutigam lacht beim Empfang im Hof – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-004.jpg',1.5004,"Detail der alten Fensterläden an der Schlossmauer – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-006.jpg',1.5004,"Gäste stehen mit Sektgläsern im Grünen – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-007.jpg',1.5004,"Die Braut wartet neben der schweren Holztür – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-008.jpg',1.5004,"Brautpaar vor der weiß getünchten Schlossmauer, Schwarzweiß – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-009.jpg',1.5004,"Gäste vor der spätgotischen Schlosskapelle – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-010.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-011.jpg',0.6665,"Braut mit Schleppe vor der Kapelle, Schwarzweiß – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-012.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-013.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-014.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-016.jpg',0.6665,"Brautpaar am Schlossweiher im Gegenlicht, Schwarzweiß – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-017.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-018.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-019.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-020.jpg',1.5004,"Detail der hochgesteckten Brautfrisur – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-021.jpg',0.6665,"Die gedeckte Tafel im Hof, festlich geschmückt – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-022.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-023.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-024.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-025.jpg',0.6665,"Freie Trauung unter dem Bogen im Schlossgarten – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-026.jpg',0.6665,"Ein langjähriger Freund hält die freie Traurede – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-027.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-028.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-029.jpg',1.5004,"Der Kuss nach der freien Trauung unter dem Bogen – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-030.jpg',0.6665,"Wimpel und Bänder wehen über der Zeremonie – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-031.jpg',1.5004,"Gäste unter Sonnenschirmen im Innenhof – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-032.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-033.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-034.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-035.jpg',1.5004,"Wunderkerzen leuchten um das Brautpaar – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-036.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-037.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-038.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-039.jpg',0.6665,"Das Brautpaar im Torbogen der Schlossanlage – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-040.jpg',0.6665,"Blick durch das schmiedeeiserne Tor, Schwarzweiß – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-041.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-042.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-043.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-044.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-045.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-046.jpg',0.6665,"Die Braut im Abendlicht unter dem alten Baum – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-047.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-048.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-049.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-050.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-051.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-052.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-053.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-054.jpg',1.5004,"Ein Fächer gegen die Sommerhitze – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-055.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-056.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-057.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-058.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-059.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-060.jpg',0.6665,"Brautpaar am Schlossweiher in der blauen Stunde – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-061.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-062.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-063.jpg',0.6665,"Das Paar am Wasser, hinter ihnen der Weiher – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-064.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-065.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-066.jpg',1.5004,"Der Festsaal füllt sich für die Party – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-067.jpg',0.6665,"Das Schild der Schlossschänke Blutenburg, Schwarzweiß – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-068.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-069.jpg',0.6665,"Der Eröffnungstanz im Festsaal – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-070.jpg',0.6665,"Brautpaar tanzt, die Gäste stehen im Kreis – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-071.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-072.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-074.jpg',1.5004,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-076.jpg',0.6665,"Hochzeit auf Schloss Blutenburg in München – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-schloss-blutenburg/freie-trauung-schloss-blutenburg-hochzeit-muenchen-077.jpg',1.5004,"Die Tafel am späten Abend, Kerzenlicht, Schwarzweiß – Schloss Blutenburg, Hochzeitsfotografin Antonia Valladares"]
];

/* Galerie Standesamt Mandlstraße — 65 Fotos. */
const GAL_MANDLSTRASSE = [
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-001.jpg',0.6665,"Der Bräutigam mit Brautstrauß vor dem Standesamt in der Mandlstraße – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-002.jpg',0.6665,"Warten zwischen den Säulen des Standesamts, Schwarzweiß – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-003.jpg',1.5004,"Die Braut geht über die winterliche Straße – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-004.jpg',1.5004,"Brautpaar im Eingang des Standesamts – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-005.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-006.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-007.jpg',0.6665,"Die Braut an der Säule, Schwarzweiß – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-008.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-009.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-010.jpg',1.5004,"Der Ringtausch im Trauzimmer – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-011.jpg',1.5004,"Detail: die Hände mit den frischen Eheringen – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-012.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-013.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-014.jpg',1.5004,"Ein Lebkuchenherz als Gruß der Gäste – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-015.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-016.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-017.jpg',0.6665,"Das Trauzimmer mit Blick in den winterlichen Garten – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-018.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-019.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-020.jpg',1.5004,"Brautpaar im Trauzimmer, Schwarzweiß – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-021.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-022.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-023.jpg',1.5004,"Die Unterschrift unter die Heiratsurkunde – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-024.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-025.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-026.jpg',0.6665,"Der Kuss nach der Trauung – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-027.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-028.jpg',1.5004,"Auszug durch das Spalier der Gäste mit Konfetti – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-029.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-030.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-031.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-032.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-033.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-034.jpg',0.6665,"Herzballons vor dem Standesamt – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-035.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-036.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-037.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-038.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-039.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-040.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-041.jpg',0.6665,"Die Braut im ersten Schnee des Jahres, Schwarzweiß – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-042.jpg',1.5004,"Der Weg hinunter in den U-Bahnhof, Schwarzweiß – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-043.jpg',0.6665,"Brautpaar auf dem Bahnsteig – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-044.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-045.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-046.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-047.jpg',1.5004,"Eine alte Bahn fährt vorbei, das Paar bleibt scharf, Schwarzweiß – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-048.jpg',1.5004,"Die einfahrende Bahn zieht am Brautpaar vorbei – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-049.jpg',1.5004,"Quatsch machen in der U-Bahn – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-050.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-051.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-052.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-053.jpg',1.5004,"Kuss vor dem Graffiti an der Großmarkthalle – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-054.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-055.jpg',0.6665,"Die ehrenamtlichen Helferinnen und Helfer der Tafel – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-056.jpg',1.5004,"Die Ehrenschürzen der Tafel, für ein paar Fotos übergezogen – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-057.jpg',0.6665,"Brautpaar in den Schürzen der Tafel, dort haben sie sich kennengelernt – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-058.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-059.jpg',0.6665,"Das Schild der Großmarkthalle – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-060.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-061.jpg',1.5004,"Eine Kutsche wartet am Straßenrand, Schwarzweiß – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-062.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-063.jpg',0.6665,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-064.jpg',1.5004,"Standesamtliche Hochzeit in der Mandlstraße in München – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"],
  ['portfolio/galerie-mandlstrasse-standesamt/standesamt-mandlstrasse-hochzeit-muenchen-065.jpg',1.5004,"Brautpaar in der Kutsche – Standesamt Mandlstraße München, Hochzeitsfotografin Antonia Valladares"]
];


/* Galerie Vietnam — 12 Fotos, aus mehreren Listen zusammengeführt. */
const GAL_VIETNAM = [
  ['portfolio/galerie-vietnam-verlobung/getting-ready-braut-vorbereitung.jpg',0.6665,"Vorbereitung vor dem Shooting, Getting Ready – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/braut-treppe-tuellkleid.jpg',0.6665,"Frau im Tüllkleid auf der Treppe – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/paar-treppe-editorial.jpg',0.6665,"Paar auf geschwungener Treppe, editorial – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/museum-fassade.jpg',0.6663,"Paar vor kolonialer Museumsfassade – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/museum-strasse-sw.jpg',0.6663,"Paar vor einem Museum auf der Straße, Schwarzweiß – Verlobungsshooting Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/kleid-bewegung-sw.jpg',0.6665,"Kleid in Bewegung, Schwarzweiß – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/er-traegt-sie.jpg',1.5009,"Er trägt sie lachend auf den Armen – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/tanz-balkon-sw.jpg',0.6665,"Tanzendes Paar auf dem Balkon in Schwarzweiß – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/paar-balkon-umarmung-sw.jpg',1.5004,"Umarmung auf dem Balkon in Schwarzweiß – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/balkon-lachen.jpg',1.5004,"Lachendes Paar auf dem Balkon – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/portrait-mann-fenster.jpg',1.5004,"Portrait eines Mannes am Fenster – Verlobungsshooting in Vietnam"],
  ['portfolio/galerie-vietnam-verlobung/haende-merci-detail.jpg',4.1841,"Detailaufnahme von Händen – Verlobungsshooting in Vietnam"]
];

/* ---------------------------------------------------------------------
   Durchmischen: Fotos aus demselben Shooting tragen denselben Dateinamen
   mit fortlaufender Nummer. Die Nummer fällt weg, der Rest ist die
   Motivgruppe. Danach wird reihum aus der jeweils größten Gruppe
   genommen, die nicht gerade dran war — so stehen nie zwei fast gleiche
   Aufnahmen nebeneinander. Zusätzlich wechseln sich hoch und quer ab.
   Die Galerien der einzelnen Hochzeiten bleiben unberührt, dort erzählt
   die Reihenfolge die Geschichte.
   ------------------------------------------------------------------ */
window.AV_mischen = function (liste) {
  if (!liste || liste.length < 3) { return liste || []; }
  var gruppen = {}, namen = [];
  for (var i = 0; i < liste.length; i++) {
    var g = liste[i][0].replace(/^.*\//, '').replace(/\.[^.]+$/, '').replace(/[-_]?\d+$/, '');
    if (!gruppen[g]) { gruppen[g] = []; namen.push(g); }
    gruppen[g].push(liste[i]);
  }
  var aus = [], letzte = '', vorletzte = '', letztQuer = null, offen = liste.length;
  while (offen > 0) {
    var beste = null, bestwert = -1e9;
    for (var k = 0; k < namen.length; k++) {
      var n = namen[k];
      if (!gruppen[n].length) { continue; }
      /* Die Gruppengröße wiegt am schwersten: wer viele Bilder hat, kommt
         zuerst dran, sonst bleibt am Ende ein Klumpen übrig. */
      var wert = gruppen[n].length * 1000;
      if (n === letzte) { wert -= 1e9; }
      if (n === vorletzte) { wert -= 400; }
      if (letztQuer !== null && (gruppen[n][0][1] > 1) === letztQuer) { wert -= 60; }
      if (wert > bestwert) { bestwert = wert; beste = n; }
    }
    var e = gruppen[beste].shift();
    aus.push(e); offen--;
    vorletzte = letzte; letzte = beste; letztQuer = e[1] > 1;
  }
  return aus;
};

window.AV_PHOTOS = { REEL, TILES, PORTRAIT, MENU_SHOTS, FLOW_A, FLOW_B, NICHT_STARTSEITE,
  PF_HOCHZEITEN, GAL_UMBRIEN, GAL_KUFSTEIN, GAL_VIETNAM, GAL_BLUTENBURG, GAL_MANDLSTRASSE, REEL_BABYBAUCH, FLOW_SCHAUSPIEL, FLOW_FAMILIEN, FLOW_BUSINESS };
