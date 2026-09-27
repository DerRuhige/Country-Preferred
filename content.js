(function () {
  'use strict';

  const ATTR_PROCESSED  = 'data-cp-processed';
  const ATTR_PREFERRED  = 'data-cp-preferred';
  const ATTR_CLONE      = 'data-cp-clone';
  const SCORE_THRESHOLD = 45;
  const DEBOUNCE_MS     = 400;
  const SEPARATOR_TEXT  = '\u2500'.repeat(20);

  const KW_STRONG = /\b(country|countrycode|country[_-]code|nation(?:ality)?|land|staat|laend|herkunft|pays|pa[ií]s|nazione|paese)\b/i;
  const KW_MEDIUM = /\b(region|location|address|billing|shipping|destination|origin)\b/i;

  let settings = { enabled: true, preferredCountries: [], blacklist: [] };
  let mutationTimer = null;
  let initialized = false;

  const listboxObservers = new WeakMap();

  async function init() {
    if (initialized) return;
    initialized = true;
    await loadSettings();
    if (!settings.enabled) return;
    if (isBlacklisted()) return;
    processAll();
    setupMutationObserver();
    chrome.storage.onChanged.addListener(onStorageChange);
  }

  function loadSettings() {
    return new Promise(function (resolve) {
      chrome.storage.sync.get(
        { enabled: true, preferredCountries: [], blacklist: [] },
        function (data) { settings = data; resolve(); }
      );
    });
  }

  function onStorageChange(changes) {
    let changed = false;
    if (changes.enabled !== undefined)            { settings.enabled = changes.enabled.newValue; changed = true; }
    if (changes.preferredCountries !== undefined) { settings.preferredCountries = changes.preferredCountries.newValue; changed = true; }
    if (changes.blacklist !== undefined)          { settings.blacklist = changes.blacklist.newValue; }
    if (changed && settings.enabled && !isBlacklisted()) { resetAll(); processAll(); }
  }

  function isBlacklisted() {
    if (!settings.blacklist || !settings.blacklist.length) return false;
    const host = window.location.hostname.toLowerCase();
    return settings.blacklist.some(function (pattern) {
      const re = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
      return re.test(host);
    });
  }

  function processAll() {
    if (!settings.preferredCountries || !settings.preferredCountries.length) return;
    document.querySelectorAll('select:not([' + ATTR_PROCESSED + '])').forEach(processNativeSelect);
    processCustomDropdowns();
  }

  function resetAll() {
    document.querySelectorAll('select[' + ATTR_PROCESSED + ']').forEach(function (sel) {
      Array.from(sel.options).forEach(function (opt) {
        if (opt.getAttribute(ATTR_PREFERRED)) opt.remove();
      });
      sel.removeAttribute(ATTR_PROCESSED);
    });
    document.querySelectorAll('[' + ATTR_CLONE + ']').forEach(function (el) { el.remove(); });
    document.querySelectorAll('[role="listbox"][' + ATTR_PROCESSED + ']').forEach(function (el) {
      el.removeAttribute(ATTR_PROCESSED);
      if (listboxObservers.has(el)) {
        listboxObservers.get(el).disconnect();
        listboxObservers.delete(el);
      }
    });
  }

  function processNativeSelect(select) {
    if (select.options.length < 5) return;
    if (select.getAttribute(ATTR_PROCESSED)) return;
    if (scoreSelect(select) < SCORE_THRESHOLD) return;
    select.setAttribute(ATTR_PROCESSED, '1');
    reorderSelect(select);
    watchSelectOptions(select);
  }

  function scoreSelect(select) {
    let score = 0;
    const ctx = buildContext(select);
    const ac = (select.getAttribute('autocomplete') || '').toLowerCase();
    if (ac === 'country' || ac === 'country-name') score += 90;
    if (KW_STRONG.test(ctx))      score += 55;
    else if (KW_MEDIUM.test(ctx)) score += 15;
    const n = select.options.length;
    if (n >= 50 && n <= 300)    score += 20;
    else if (n >= 30 && n < 50) score += 10;
    else if (n < 10)            return 0;
    const sample = Math.min(30, n);
    let isoHits = 0;
    for (let i = 0; i < sample; i++) {
      const v = select.options[i].value.trim();
      if (/^[A-Z]{2}$/.test(v) || /^[A-Z]{3}$/.test(v)) isoHits++;
    }
    const isoRatio = isoHits / sample;
    if (isoRatio > 0.65)      score += 40;
    else if (isoRatio > 0.35) score += 20;
    const db = window.COUNTRY_PREFERRED_DATA;
    if (db && db.nameSet) {
      let nameHits = 0;
      for (let i = 0; i < sample; i++) {
        const t = select.options[i].text.trim().toLowerCase();
        if (t && db.nameSet.has(t)) nameHits++;
      }
      const nr = nameHits / sample;
      if (nr > 0.5)      score += 35;
      else if (nr > 0.2) score += 15;
    }
    return score;
  }

  function buildContext(el) {
    const parts = [
      el.name || '', el.id || '', el.className || '',
      el.getAttribute('aria-label') || '',
      el.getAttribute('autocomplete') || '',
      el.getAttribute('data-name') || '',
      el.getAttribute('placeholder') || ''
    ];
    if (el.id) {
      const lbl = document.querySelector('label[for="' + el.id + '"]');
      if (lbl) parts.push(lbl.textContent || '');
    }
    if (el.labels && el.labels.length) parts.push(el.labels[0].textContent || '');
    return parts.join(' ');
  }

  function reorderSelect(select) {
    if (!settings.preferredCountries.length) return;
    Array.from(select.options).forEach(function (opt) {
      if (opt.getAttribute(ATTR_PREFERRED)) opt.remove();
    });
    let insertPos = 0;
    if (select.options.length > 0 && isPlaceholder(select.options[0])) insertPos = 1;
    const toInsert = [];
    settings.preferredCountries.forEach(function (iso2) {
      const cd = window.COUNTRY_PREFERRED_DATA ? window.COUNTRY_PREFERRED_DATA.iso2Map.get(iso2) : null;
      if (!cd) return;
      const match = findOptionForCountry(select, cd);
      if (!match) return;
      toInsert.push({ option: match, country: cd });
    });
    for (let i = toInsert.length - 1; i >= 0; i--) {
      const item = toInsert[i];
      const clone = item.option.cloneNode(true);
      clone.setAttribute(ATTR_PREFERRED, '1');
      clone.style.fontWeight = 'bold';
      const wasSelected = item.option.selected;
      item.option.remove();
      if (insertPos < select.options.length) {
        select.insertBefore(clone, select.options[insertPos]);
      } else {
        select.appendChild(clone);
      }
      if (wasSelected) clone.selected = true;
    }
    if (toInsert.length > 0) {
      const sep = document.createElement('option');
      sep.disabled = true;
      sep.textContent = SEPARATOR_TEXT;
      sep.setAttribute(ATTR_PREFERRED, '1');
      const sepPos = insertPos + toInsert.length;
      if (sepPos < select.options.length) {
        select.insertBefore(sep, select.options[sepPos]);
      } else {
        select.appendChild(sep);
      }
    }
  }

  function isPlaceholder(option) {
    const v = option.value.trim();
    if (!v || v === '0' || v === '-1' || v === 'null' || v === 'undefined') return true;
    const t = option.text.trim().toLowerCase();
    return /^[-–—\s]*$/.test(t) ||
      /(select|choose|please|bitte|auswahl|wahlen|wahle|wählen|wähle|choisir|choisissez|sélectionne|seleccion|elige|elija|scegli|seleziona|selecione|escolha|kies|selecteer|wybierz|seçin|seç|välj|vælg|velg|valitse|vyberte|pick)/i.test(t);
  }

  function findOptionForCountry(select, country) {
    const allNames = [country.en, country.de].concat(country.aliases || [])
      .filter(Boolean).map(function (n) { return n.toLowerCase(); });
    const allCodes = [country.iso2, country.iso3].filter(Boolean);
    for (let i = 0; i < select.options.length; i++) {
      const opt = select.options[i];
      if (opt.getAttribute(ATTR_PREFERRED)) continue;
      const val  = opt.value.trim();
      const text = opt.text.trim().toLowerCase();
      if (allCodes.indexOf(val.toUpperCase()) !== -1) return opt;
      if (allNames.indexOf(val.toLowerCase()) !== -1)  return opt;
      if (allNames.indexOf(text) !== -1)               return opt;
    }
    return null;
  }

  function watchSelectOptions(select) {
    const obs = new MutationObserver(function (mutations) {
      let hasNew = false;
      for (let i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) { hasNew = true; break; }
      }
      if (!hasNew) return;
      select.removeAttribute(ATTR_PROCESSED);
      processNativeSelect(select);
    });
    obs.observe(select, { childList: true });
  }

  function processCustomDropdowns() {
    document.querySelectorAll('select.select2-hidden-accessible:not([' + ATTR_PROCESSED + '])').forEach(function (sel) {
      sel.setAttribute(ATTR_PROCESSED, '1');
      reorderSelect(sel);
      try {
        if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2) {
          window.jQuery(sel).trigger('change.select2');
        }
      } catch (e) {}
    });

    document.querySelectorAll('select.choices__input:not([' + ATTR_PROCESSED + '])').forEach(function (sel) {
      sel.setAttribute(ATTR_PROCESSED, '1');
      reorderSelect(sel);
    });

    document.querySelectorAll('[role="listbox"]:not([' + ATTR_PROCESSED + '])').forEach(insertPreferredInCustomListbox);
  }

  function isCountryListbox(listbox) {
    const db = window.COUNTRY_PREFERRED_DATA;
    if (!db) return false;
    const opts = listbox.querySelectorAll('[role="option"]:not([' + ATTR_CLONE + '])');
    if (opts.length < 5) return false;
    let hits = 0;
    const sample = Math.min(30, opts.length);
    for (let i = 0; i < sample; i++) {
      const text = opts[i].textContent.trim().toLowerCase();
      if (db.nameSet.has(text)) hits++;
    }
    return hits / sample >= 0.3;
  }

  function findCustomOption(listbox, country) {
    const allNames = [country.en, country.de].concat(country.aliases || [])
      .filter(Boolean).map(function (n) { return n.toLowerCase(); });
    const allCodes = [country.iso2, country.iso3].filter(Boolean).map(function (c) { return c.toUpperCase(); });
    const opts = listbox.querySelectorAll('[role="option"]:not([' + ATTR_CLONE + '])');
    for (let i = 0; i < opts.length; i++) {
      const opt  = opts[i];
      const text = opt.textContent.trim().toLowerCase();
      const val  = (
        opt.getAttribute('data-value') ||
        opt.getAttribute('value') ||
        opt.getAttribute('data-option-value') ||
        ''
      ).trim().toUpperCase();
      if (allNames.indexOf(text) !== -1) return opt;
      if (allCodes.indexOf(val) !== -1)  return opt;
    }
    return null;
  }

  function insertClonesAtTop(listbox) {
    listbox.querySelectorAll('[' + ATTR_CLONE + ']').forEach(function (el) { el.remove(); });

    if (!settings.preferredCountries.length) return;
    if (!window.COUNTRY_PREFERRED_DATA) return;

    const db = window.COUNTRY_PREFERRED_DATA;
    const firstRealOption = listbox.querySelector('[role="option"]:not([' + ATTR_CLONE + '])');
    if (!firstRealOption) return;

    const toInsert = [];
    settings.preferredCountries.forEach(function (iso2) {
      const country = db.iso2Map.get(iso2);
      if (!country) return;
      const match = findCustomOption(listbox, country);
      if (!match) return;
      toInsert.push({ match: match, country: country });
    });

    for (let i = toInsert.length - 1; i >= 0; i--) {
      const original = toInsert[i].match;
      const clone = original.cloneNode(true);
      clone.setAttribute(ATTR_CLONE, '1');
      clone.style.fontWeight = 'bold';

      clone.addEventListener('click', function (e) {
        e.stopPropagation();
        original.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      });
      clone.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        original.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
      });
      clone.addEventListener('mouseup', function (e) {
        e.stopPropagation();
        original.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
      });
      clone.addEventListener('touchend', function (e) {
        e.stopPropagation();
        original.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      });

      listbox.insertBefore(clone, firstRealOption);
    }

    if (toInsert.length > 0) {
      const sep = document.createElement('div');
      sep.setAttribute(ATTR_CLONE, '1');
      sep.setAttribute('role', 'separator');
      sep.setAttribute('aria-hidden', 'true');
      sep.className = 'cp-separator';
      listbox.insertBefore(sep, firstRealOption);
    }
  }

  function insertPreferredInCustomListbox(listbox) {
    if (!isCountryListbox(listbox)) return;
    listbox.setAttribute(ATTR_PROCESSED, '1');

    insertClonesAtTop(listbox);

    const obs = new MutationObserver(function () {
      obs.disconnect();
      insertClonesAtTop(listbox);
      obs.observe(listbox, { childList: true });
    });

    obs.observe(listbox, { childList: true });
    listboxObservers.set(listbox, obs);
  }

  function setupMutationObserver() {
    const observer = new MutationObserver(function (mutations) {
      let relevant = false;
      for (let i = 0; i < mutations.length; i++) {
        const m = mutations[i];
        if (m.type !== 'childList') continue;
        for (let j = 0; j < m.addedNodes.length; j++) {
          const node = m.addedNodes[j];
          if (node.nodeType !== 1) continue;
          if (node.tagName === 'SELECT') { relevant = true; break; }
          if (node.getAttribute && node.getAttribute('role') === 'listbox') { relevant = true; break; }
          if (node.querySelector && node.querySelector('select, [role="listbox"]')) { relevant = true; break; }
        }
        if (relevant) break;
      }
      if (!relevant) return;
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(function () {
        if (settings.enabled && !isBlacklisted()) processAll();
      }, DEBOUNCE_MS);
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  function injectStyles() {
    if (document.getElementById('cp-styles')) return;
    const s = document.createElement('style');
    s.id = 'cp-styles';
    s.textContent =
      '.cp-separator{height:1px;margin:4px 8px;background:rgba(0,0,0,.12);pointer-events:none}' +
      '@media(prefers-color-scheme:dark){.cp-separator{background:rgba(255,255,255,.18)}}';
    document.head.appendChild(s);
  }

  injectStyles();
  init().catch(function () {});
})();
