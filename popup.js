(function () {
  'use strict';

  const $enabled     = document.getElementById('popup-enabled');
  const $chips       = document.getElementById('country-chips');
  const $noCtry      = document.getElementById('no-countries');
  const $statusDot   = document.getElementById('status-dot');
  const $statusTxt   = document.getElementById('status-text');
  const $btnSettings = document.getElementById('btn-settings');

  chrome.storage.sync.get(
    { enabled: true, preferredCountries: [], blacklist: [] },
    function (data) {
      $enabled.checked = data.enabled;
      renderChips(data.preferredCountries || []);
      setStatus(data.enabled);
    }
  );

  $enabled.addEventListener('change', function () {
    chrome.storage.sync.set({ enabled: $enabled.checked });
    setStatus($enabled.checked);
  });

  $btnSettings.addEventListener('click', function () {
    chrome.runtime.openOptionsPage();
    window.close();
  });

  function renderChips(list) {
    $chips.innerHTML = '';
    if (!list.length) { $noCtry.classList.remove('hidden'); return; }
    $noCtry.classList.add('hidden');
    const db = window.COUNTRY_PREFERRED_DATA;
    list.forEach(function (iso2, i) {
      const c = db ? db.iso2Map.get(iso2) : null;
      const li = document.createElement('li');
      li.className = 'citem';
      li.innerHTML =
        '<span class="c-num">' + (i + 1) + '</span>' +
        '<span class="c-flag">' + flag2(iso2) + '</span>' +
        '<span class="c-name">' + esc(c ? c.local : iso2) + '</span>' +
        '<span class="c-iso">' + esc(iso2) + '</span>';
      $chips.appendChild(li);
    });
  }

  function setStatus(enabled) {
    if (enabled) {
      $statusDot.className = 'sdot on';
      $statusTxt.textContent = t('active');
    } else {
      $statusDot.className = 'sdot off';
      $statusTxt.textContent = t('inactive');
    }
  }

  function flag2(iso2) {
    if (!iso2 || iso2.length !== 2) return '🏳';
    const pts = iso2.toUpperCase().split('').map(function (c) { return 0x1F1E6 + c.charCodeAt(0) - 65; });
    return String.fromCodePoint(pts[0], pts[1]);
  }

  function esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
})();
