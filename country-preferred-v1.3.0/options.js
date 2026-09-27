(function () {
  'use strict';

  const MAX = 5;
  let state = { enabled: true, preferredCountries: [], blacklist: [] };
  let dragItem = null;

  const $enabled    = document.getElementById('enabled');
  const $search     = document.getElementById('country-search');
  const $acList     = document.getElementById('autocomplete-list');
  const $prefList   = document.getElementById('preferred-list');
  const $empty      = document.getElementById('empty-state');
  const $badge      = document.getElementById('count-badge');
  const $blList     = document.getElementById('blacklist-list');
  const $blEmpty    = document.getElementById('blacklist-empty');
  const $addBlBtn   = document.getElementById('add-blacklist');
  const $blRow      = document.getElementById('blacklist-input-row');
  const $blInput    = document.getElementById('blacklist-input');
  const $blOk       = document.getElementById('blacklist-confirm');
  const $blCancel   = document.getElementById('blacklist-cancel');
  const $saveBtn    = document.getElementById('btn-save');
  const $savedMsg   = document.getElementById('saved-msg');
  const $exportBtn  = document.getElementById('btn-export');
  const $importFile = document.getElementById('btn-import-file');

  document.getElementById('version').textContent = chrome.runtime.getManifest().version;

  chrome.storage.sync.get(
    { enabled: true, preferredCountries: [], blacklist: [] },
    function (data) {
      state = { ...data, preferredCountries: data.preferredCountries || [], blacklist: data.blacklist || [] };
      renderAll();
    }
  );

  function renderAll() {
    $enabled.checked = state.enabled;
    document.getElementById('toggle-label').textContent = state.enabled ? t('active') : t('inactive');
    renderPref();
    renderBl();
  }

  function renderPref() {
    Array.from($prefList.children).forEach(function (c) { if (c.id !== 'empty-state') c.remove(); });
    $badge.textContent = state.preferredCountries.length + ' / ' + MAX;
    if (!state.preferredCountries.length) { $empty.classList.remove('hidden'); return; }
    $empty.classList.add('hidden');
    state.preferredCountries.forEach(function (iso2, i) {
      const c = getCountry(iso2);
      if (c) $prefList.appendChild(buildPrefItem(c, i));
    });
  }

  function buildPrefItem(country, idx) {
    const li = document.createElement('li');
    li.className = 'pref-item';
    li.draggable = true;
    li.dataset.iso2 = country.iso2;
    li.innerHTML =
      '<span class="pref-num">' + (idx + 1) + '</span>' +
      '<span class="pref-flag">' + flag2(country.iso2) + '</span>' +
      '<div class="pref-names">' +
        '<div class="pref-en">' + esc(country.local) + '</div>' +
        '<div class="pref-de">' + esc(country.local !== country.en ? country.en : '') + '</div>' +
      '</div>' +
      '<span class="pref-iso">' + esc(country.iso2) + '</span>' +
      '<span class="pref-grip" aria-hidden="true">⠿</span>' +
      '<button class="pref-del" aria-label="' + esc(t('remove', country.local)) + '" data-iso2="' + esc(country.iso2) + '">' +
        '<svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
      '</button>';
    li.addEventListener('dragstart', onDragStart);
    li.addEventListener('dragover',  onDragOver);
    li.addEventListener('drop',      onDrop);
    li.addEventListener('dragend',   onDragEnd);
    li.addEventListener('dragenter', onDragEnter);
    li.addEventListener('dragleave', onDragLeave);
    li.querySelector('.pref-del').addEventListener('click', function () {
      state.preferredCountries = state.preferredCountries.filter(function (c) { return c !== country.iso2; });
      renderPref();
    });
    return li;
  }

  function addCountry(iso2) {
    if (state.preferredCountries.includes(iso2)) { nudge(t('alreadyInList')); return; }
    if (state.preferredCountries.length >= MAX)  { nudge(t('maxCountries', String(MAX))); return; }
    state.preferredCountries.push(iso2);
    renderPref();
    $search.value = '';
    closeAc();
    $search.focus();
  }

  $search.addEventListener('input', function () {
    const q = $search.value.trim();
    if (!q) { closeAc(); return; }
    const db = window.COUNTRY_PREFERRED_DATA;
    if (!db) return;
    renderAc(db.searchCountries(q, 8));
  });

  $search.addEventListener('keydown', function (e) {
    const items = Array.from($acList.querySelectorAll('li'));
    const ai = items.findIndex(function (li) { return li.classList.contains('active'); });
    if (e.key === 'ArrowDown')  { e.preventDefault(); setActive(items, items[(ai + 1) % items.length]); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(items, items[ai <= 0 ? items.length - 1 : ai - 1]); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const a = $acList.querySelector('li.active');
      if (a) addCountry(a.dataset.iso2);
      else if (items.length === 1) addCountry(items[0].dataset.iso2);
    } else if (e.key === 'Escape') { closeAc(); }
  });

  document.addEventListener('click', function (e) {
    if (!$search.contains(e.target) && !$acList.contains(e.target)) closeAc();
  });

  function renderAc(results) {
    $acList.innerHTML = '';
    if (!results.length) { $acList.classList.add('hidden'); return; }
    results.forEach(function (c) {
      const li = document.createElement('li');
      li.dataset.iso2 = c.iso2;
      li.setAttribute('role', 'option');
      const already = state.preferredCountries.includes(c.iso2);
      li.innerHTML =
        '<span class="ac-flag">' + flag2(c.iso2) + '</span>' +
        '<span class="ac-en">' + esc(c.local) + (already ? ' ✓' : '') + '</span>' +
        '<span class="ac-de">' + esc(c.local !== c.en ? c.en : '') + '</span>' +
        '<span class="ac-iso">' + esc(c.iso2) + '</span>';
      if (already) li.style.opacity = '.55';
      li.addEventListener('click', function () { addCountry(c.iso2); });
      $acList.appendChild(li);
    });
    $acList.classList.remove('hidden');
  }

  function setActive(items, target) {
    items.forEach(function (li) { li.classList.remove('active'); });
    if (target) target.classList.add('active');
  }

  function closeAc() { $acList.classList.add('hidden'); $acList.innerHTML = ''; }

  function nudge(msg) {
    const orig = $search.placeholder;
    $search.placeholder = msg;
    setTimeout(function () { $search.placeholder = orig; }, 2200);
  }

  function onDragStart(e) { dragItem = this; this.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
  function onDragOver(e)  { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
  function onDragEnter()  { if (this !== dragItem) this.classList.add('drag-over'); }
  function onDragLeave()  { this.classList.remove('drag-over'); }
  function onDrop(e) {
    e.preventDefault(); this.classList.remove('drag-over');
    if (!dragItem || dragItem === this) return;
    const from = state.preferredCountries.indexOf(dragItem.dataset.iso2);
    const to   = state.preferredCountries.indexOf(this.dataset.iso2);
    if (from === -1 || to === -1) return;
    state.preferredCountries.splice(from, 1);
    state.preferredCountries.splice(to, 0, dragItem.dataset.iso2);
    renderPref();
  }
  function onDragEnd() {
    this.classList.remove('dragging');
    document.querySelectorAll('.pref-item').forEach(function (el) { el.classList.remove('drag-over'); });
    dragItem = null;
  }

  function renderBl() {
    Array.from($blList.children).forEach(function (c) { if (c.id !== 'blacklist-empty') c.remove(); });
    if (!state.blacklist.length) { $blEmpty.classList.remove('hidden'); return; }
    $blEmpty.classList.add('hidden');
    state.blacklist.forEach(function (p) {
      const li = document.createElement('li');
      li.className = 'bl-item';
      li.innerHTML =
        '<span>' + esc(p) + '</span>' +
        '<button class="pref-del" aria-label="' + esc(t('remove', p)) + '">' +
          '<svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
        '</button>';
      li.querySelector('.pref-del').addEventListener('click', function () {
        state.blacklist = state.blacklist.filter(function (x) { return x !== p; });
        renderBl();
      });
      $blList.appendChild(li);
    });
  }

  $enabled.addEventListener('change', function () {
    document.getElementById('toggle-label').textContent = $enabled.checked ? t('active') : t('inactive');
    save();
  });

  $addBlBtn.addEventListener('click', function () { $blRow.classList.remove('hidden'); $blInput.focus(); });
  $blOk.addEventListener('click', function () {
    const v = $blInput.value.trim();
    if (v && !state.blacklist.includes(v)) { state.blacklist.push(v); renderBl(); }
    $blInput.value = ''; $blRow.classList.add('hidden');
  });
  $blCancel.addEventListener('click', function () { $blInput.value = ''; $blRow.classList.add('hidden'); });
  $blInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') $blOk.click();
    if (e.key === 'Escape') $blCancel.click();
  });

  $saveBtn.addEventListener('click', save);

  function save() {
    chrome.storage.sync.set({
      enabled: $enabled.checked,
      preferredCountries: state.preferredCountries,
      blacklist: state.blacklist
    }, function () {
      $savedMsg.classList.remove('hidden');
      setTimeout(function () { $savedMsg.classList.add('hidden'); }, 2500);
    });
  }

  $exportBtn.addEventListener('click', function () {
    const blob = new Blob([JSON.stringify({
      _app: 'Country Preferred', _v: chrome.runtime.getManifest().version, _ts: new Date().toISOString(),
      enabled: $enabled.checked, preferredCountries: state.preferredCountries, blacklist: state.blacklist
    }, null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'country-preferred.json' });
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
  });

  $importFile.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = function (ev) {
      try {
        const d = JSON.parse(ev.target.result);
        if (d.preferredCountries) state.preferredCountries = d.preferredCountries;
        if (d.blacklist) state.blacklist = d.blacklist;
        if (typeof d.enabled !== 'undefined') state.enabled = d.enabled;
        renderAll(); save();
      } catch (err) { alert(t('importFailed')); }
    };
    r.readAsText(file); e.target.value = '';
  });

  function getCountry(iso2) {
    const db = window.COUNTRY_PREFERRED_DATA;
    if (!db) return { iso2, iso3: '', en: iso2, de: iso2, local: iso2, aliases: [] };
    return db.iso2Map.get(iso2) || { iso2, iso3: '', en: iso2, de: iso2, local: iso2, aliases: [] };
  }

  function flag2(iso2) {
    if (!iso2 || iso2.length !== 2) return '🏳';
    const pts = iso2.toUpperCase().split('').map(function (c) { return 0x1F1E6 + c.charCodeAt(0) - 65; });
    return String.fromCodePoint(pts[0], pts[1]);
  }

  function esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
})();
