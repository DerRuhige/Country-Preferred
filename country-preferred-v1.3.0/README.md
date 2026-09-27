# Country Preferred – Browser-Erweiterung

**Version 1.3.0**

Verschiebt dein bevorzugtes Land automatisch an die erste Stelle von Länder-Dropdowns auf jeder Webseite.

---

## Funktionen

- **249 Länder** mit ISO-2/ISO-3-Codes und Namen in vielen Sprachen
- **Mehrsprachige Oberfläche** mit automatischer Spracherkennung
- Erkennt **native `<select>`-Elemente** sowie **Select2** und **Choices.js**
- **Echte Umsortierung** auch bei React-Select & anderen Custom-Dropdowns (nicht nur Hervorhebung)
- **Visueller Trenner** zwischen bevorzugten Ländern und der restlichen Liste
- **MutationObserver** für dynamisch nachgeladene Formulare und SPAs
- Bis zu **5 bevorzugte Länder** mit Prioritätsreihenfolge
- **Drag-to-Reorder** auf der Einstellungsseite
- **Blacklist** für bestimmte Webseiten
- **Import / Export** der Einstellungen als JSON
- **Dark Mode** (folgt der Systemeinstellung)
- Barrierearmes, kontraststarkes Interface mit sichtbaren Fokus-Zuständen
- Keine Cloud-Anbindung, keine Telemetrie – alles lokal

---

## Changelog

**1.3.0**
- Mehrsprachige Oberfläche (EN, DE, FR, ES, IT, PT, NL, PL) – Sprache wird automatisch aus der Browsersprache gewählt, Fallback Englisch
- Ländernamen werden in der Browsersprache angezeigt
- Länder-Dropdowns werden jetzt auch auf Webseiten in vielen weiteren Sprachen erkannt (Namen über `Intl.DisplayNames`)
- Neue Sprache hinzufügen: Ordner in `_locales/` anlegen und `messages.json` übersetzen

**1.2.0**
- Custom-Dropdowns (React-Select etc.) werden jetzt umsortiert statt nur hervorgehoben
- Visueller Trenner (─────) nach den bevorzugten Ländern in jedem Dropdown
- Neue, einheitliche Icons
- Datenschutzerklärung ergänzt ([PRIVACY.md](./PRIVACY.md))

**1.1.1**
- Überarbeitetes, barrierefreundlicheres Interface (Systemschrift, höherer Kontrast, Fokusringe)

**1.1.0**
- Design-Überarbeitung der Einstellungsseite und des Popups

**1.0.0**
- Erstveröffentlichung

---

## Installation (Chrome / Brave / Edge / Opera / Vivaldi)

### Entwicklermodus (empfohlen für Tests)

1. Erweiterungsordner entpacken
2. Browser öffnen → Adressleiste: `chrome://extensions` (oder `edge://extensions` etc.)
3. Oben rechts **„Entwicklermodus"** aktivieren
4. **„Entpackte Erweiterung laden"** klicken
5. Den Ordner `country-preferred/` auswählen
6. Erweiterung erscheint in der Toolbar → **Icon anklicken → Einstellungen öffnen**

### Chrome Web Store (zukünftige Verteilung)

Um die Erweiterung im Chrome Web Store zu veröffentlichen:
```
zip -r country-preferred.zip country-preferred/
```
→ ZIP-Datei im [Chrome Web Store Dashboard](https://chrome.google.com/webstore/devconsole) hochladen.

---

## Installation (Safari – macOS/iOS)

Voraussetzung: **Xcode** (kostenlos im App Store)

```bash
# Konvertierung mit dem Safari Web Extension Converter
xcrun safari-web-extension-converter /pfad/zum/country-preferred/

# Das Xcode-Projekt öffnet sich automatisch
# → Product → Run (⌘R) → Safari öffnen
# Safari → Einstellungen → Erweiterungen → "Country Preferred" aktivieren
```

> **Hinweis:** Für die Verteilung über den App Store ist ein Apple-Developer-Account (99 $/Jahr) erforderlich.

---

## Einrichtung

1. **Erweiterungssymbol** in der Toolbar anklicken
2. **„⚙ Einstellungen"** öffnen
3. Im Suchfeld ein Land eingeben (z. B. „Österreich", „AT", „Austria")
4. Land aus der Vorschlagsliste auswählen
5. **„Einstellungen speichern"** klicken

Ab sofort wird das bevorzugte Land auf allen Webseiten automatisch nach oben verschoben.

---

## Projektstruktur

```
country-preferred/
├── manifest.json          Manifest V3
├── background.js          Service Worker (Initialisierung)
├── content.js             Hauptlogik: Erkennung + Umsortierung
├── options.html / .js / .css   Einstellungsseite
├── popup.html / .js / .css     Toolbar-Popup
├── data/
│   └── countries.js       249 Länder mit ISO-Codes & Namen (DE/EN)
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
└── PRIVACY.md
```

---

## Erkennungslogik

Der Content Script bewertet jedes `<select>`-Element mit einem **Score-System**:

| Signal | Punkte |
|---|---|
| `autocomplete="country"` oder `"country-name"` | +90 |
| Name/ID enthält `country`, `land`, `staat`, `pays`, … | +55 |
| 50–300 Optionen (typischer Länder-Bereich) | +20 |
| >65 % der Optionen haben ISO-2/3-Werte | +40 |
| >50 % der Optionen sind bekannte Ländernamen | +35 |

Ab einem Score von **45** wird das Element als Länder-Dropdown behandelt.

---

## Datenschutz

- Keine Daten werden gesendet oder gespeichert (außer lokal in `chrome.storage.sync`)
- Kein Tracking, keine Telemetrie, keine externen Anfragen
- Quellcode vollständig offen und einsehbar
- Vollständige Datenschutzerklärung: [PRIVACY.md](./PRIVACY.md)

---

## Browser-Kompatibilität

| Browser | Unterstützt |
|---|---|
| Google Chrome 88+ | ✅ |
| Microsoft Edge 88+ | ✅ |
| Brave | ✅ |
| Opera 74+ | ✅ |
| Vivaldi | ✅ |
| Firefox | ⚠️ MV3 in Beta (MV2-Port möglich) |
| Safari 14+ (macOS/iOS) | ✅ via Xcode-Konvertierung |

---

## Lizenz

MIT License – frei verwendbar, änderbar und verteilbar.
