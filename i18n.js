(function () {
  'use strict';

  // Returns the translated text for a key in the browser's UI language
  // (falls back to English via default_locale in manifest.json).
  function t(key, subs) {
    try { return chrome.i18n.getMessage(key, subs) || key; } catch (e) { return key; }
  }
  window.t = t;

  try { document.documentElement.lang = (chrome.i18n.getMessage('@@ui_locale') || 'en').replace('_', '-'); } catch (e) {}

  // data-i18n="key"          -> textContent
  // data-i18n-html="key"     -> innerHTML (for trusted strings with <code> etc.)
  // data-i18n-attr="placeholder:key;title:key"
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      const p = pair.split(':');
      if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
    });
  });
})();
