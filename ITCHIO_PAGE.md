# Country Preferred

**Stop scrolling through 250 countries. Your country is always at the top.**

Every checkout, sign-up and shipping form asks for your country — and then makes you scroll past Afghanistan, Albania, Algeria… every single time. **Country Preferred** is a small, free browser extension that automatically moves your country (or up to five of them) to the top of every country dropdown on every website.

Pick your country once. Never search for it again.

---

## Features

- **Works everywhere** – on any website with a country selector
- **Up to 5 preferred countries** in your own priority order (drag to reorder)
- **Real reordering**, not just highlighting – works with normal dropdowns as well as Select2, Choices.js, React-Select and other custom dropdowns
- **Clear separator line** between your favourites and the rest of the list
- **Works on dynamic pages** – forms that load later or single-page apps are detected automatically
- **249 countries** – search by English or German name, or by ISO code (e.g. "Austria", "Österreich", "AT", "AUT")
- **Site blacklist** – turn it off for specific websites
- **Import / export** your settings as JSON
- **Dark mode** – follows your system setting
- **Accessible interface** – high contrast, visible focus rings, keyboard friendly

## Privacy

- **No tracking, no analytics, no telemetry**
- **No data leaves your browser** – no external servers, no network requests
- Does not read form input, passwords or personal information
- Only the display order of country dropdowns is changed – you still make the choice yourself
- Settings (your countries, on/off state, blacklist) are stored locally via the browser's storage
- Open source under the MIT License

**Why does it ask for access to "all websites"?** So it can find country dropdowns on any page you visit. It only reorders those dropdowns and never reads, stores or sends page content.

---

## Installation

Download **country-preferred-v1.2.0.zip** below and **unzip it** first. You will get a folder that contains `manifest.json` — that is the folder you select during installation.

> **Keep the folder!** The browser loads the extension from that folder. If you delete or move it, the extension stops working. Put it somewhere permanent, e.g. `Documents/Extensions/country-preferred`.

### Windows, Linux & macOS – Chrome, Edge, Brave, Opera, Vivaldi

1. Unzip the download to a permanent location.
2. Open your browser's extension page by typing into the address bar:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Brave: `brave://extensions`
   - Opera: `opera://extensions`
   - Vivaldi: `vivaldi://extensions`
3. Turn on **Developer mode** (switch at the top right; in Edge it's on the left side).
4. Click **Load unpacked**.
5. Select the unzipped folder (the one containing `manifest.json`).
6. Click the puzzle-piece icon in the toolbar and **pin** Country Preferred.
7. Click the icon → **⚙ Settings**, type your country, select it and click **Save settings**. Done!

*Note: Chrome may occasionally show a notice about extensions in developer mode. That is normal for extensions installed outside the Chrome Web Store — just dismiss it.*

**Updating:** download the new version, replace the folder contents, then click the ↻ reload button on the extension card.

### macOS – Safari

Safari only accepts extensions wrapped in a Mac app, so this takes a few extra steps and requires **Xcode** (free in the Mac App Store).

1. Unzip the download.
2. Open **Terminal** and run (drag the folder into the Terminal window to insert its path):
   ```
   xcrun safari-web-extension-converter /path/to/country-preferred
   ```
3. Xcode opens the generated project. Press **⌘R** (Product → Run).
4. In Safari: **Settings → Advanced** → enable **"Show features for web developers"**.
5. **Develop** menu → enable **"Allow Unsigned Extensions"** (you have to do this again after every Safari restart).
6. **Safari → Settings → Extensions** → enable **Country Preferred** and allow it on all websites.

### iPhone & iPad – Safari (advanced)

iOS does not allow installing extensions from a download. It is only possible for developers:

1. You need a **Mac with Xcode** and your iPhone/iPad connected via cable.
2. Follow the macOS Safari steps 1–2 above (the converter creates an iOS target as well).
3. In Xcode, select the **iOS** app target, choose your device, sign in with your Apple ID under *Signing & Capabilities*, and press **Run**.
4. On the device: **Settings → Apps → Safari → Extensions** → enable Country Preferred and allow all websites.

*With a free Apple ID the app expires after 7 days and must be reinstalled from Xcode.*

### Android

Google Chrome for Android **does not support extensions**. You need an Android browser that can install Chrome extensions from a file, for example **Lemur Browser** or **Quetta** (Play Store):

1. Download the ZIP to your phone.
2. Open the browser's extensions page (usually in the menu → *Extensions*).
3. Enable **Developer mode** and choose **Load / + (from .zip)**.
4. Select the downloaded ZIP file.
5. Open the extension's settings from the menu and pick your country.

*Mobile browsers change often — if an option is missing or named differently, look in the browser's extension menu.*

### Firefox

Not officially supported yet. Firefox only installs unsigned extensions temporarily (they disappear after a restart). A Firefox version is planned.

---

## How to use

1. Click the Country Preferred icon in your toolbar.
2. Open **⚙ Settings**.
3. Search for your country – by name or code (e.g. "Germany", "DE", "DEU").
4. Add up to 5 countries and drag them into your preferred order.
5. Click **Save settings**.

That's it. From now on your country appears at the top of every country dropdown.

---

## Changelog

**1.2.0**
- Custom dropdowns (React-Select etc.) are now truly reordered instead of just highlighted
- Visual separator after your preferred countries
- New, consistent icons
- Privacy policy added

**1.1.1** – More accessible interface (system font, higher contrast, focus rings)
**1.1.0** – Redesigned settings page and popup
**1.0.0** – Initial release

---

**License:** MIT – free to use, modify and share.
