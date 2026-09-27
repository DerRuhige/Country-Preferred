# Datenschutzerklärung — Country Preferred

**Letzte Aktualisierung:** 28. Juni 2026

## Kurzfassung

Country Preferred sammelt, speichert oder übermittelt keine personenbezogenen Daten. Die Erweiterung funktioniert vollständig lokal in deinem Browser.

## Welche Daten werden gespeichert?

Die Erweiterung speichert ausschließlich folgende Einstellungen über die `chrome.storage.sync`-API des Browsers:

- die von dir gewählten bevorzugten Länder (ISO-2-Codes)
- der Aktiv/Inaktiv-Status der Erweiterung
- die Liste der ausgenommenen Webseiten (Blacklist)

Diese Daten verbleiben innerhalb deines Browser-Profils. Wenn du in deinem Browser mit einem Konto angemeldet bist (z. B. einem Google- oder Microsoft-Konto) und die Synchronisierung aktiviert hast, gleicht der Browser selbst diese Einstellungen zwischen deinen Geräten ab — das ist eine Funktion des Browsers, nicht der Erweiterung. Country Preferred hat darauf keinen Einblick und keinen Einfluss.

## Was die Erweiterung NICHT tut

- Sie sendet keine Daten an externe Server.
- Sie verwendet keine Analyse- oder Tracking-Dienste.
- Sie liest keine Formulareingaben, Passwörter oder persönlichen Informationen.
- Sie erstellt kein Nutzungsprofil und führt keine Telemetrie durch.
- Sie verändert ausschließlich die Anzeigereihenfolge von Länder-Dropdowns — die Auswahl selbst trifft weiterhin der Nutzer.

## Welche Berechtigungen werden angefordert und warum?

| Berechtigung | Zweck |
|---|---|
| `storage` | Speichert deine Einstellungen lokal im Browser |
| `<all_urls>` (Host-Berechtigung) | Notwendig, damit die Erweiterung Länder-Dropdowns auf jeder Webseite erkennen kann, auf der du sie nutzen möchtest |

Die Host-Berechtigung wird ausschließlich zum Erkennen und Umsortieren von Dropdown-Elementen im Seiten-DOM verwendet. Es werden keine Seiteninhalte ausgelesen, gespeichert oder weitergeleitet.

## Open Source

Der vollständige Quellcode der Erweiterung ist einsehbar. Jeder kann nachvollziehen, dass die hier beschriebenen Datenschutzgrundsätze eingehalten werden.

## Änderungen an dieser Erklärung

Sollten sich die Datenpraktiken der Erweiterung ändern, wird diese Datei entsprechend aktualisiert und das Änderungsdatum oben angepasst.

## Kontakt

Bei Fragen zum Datenschutz wende dich über die Kontaktmöglichkeiten im Chrome Web Store-Eintrag der Erweiterung oder über das verlinkte Quellcode-Repository.
