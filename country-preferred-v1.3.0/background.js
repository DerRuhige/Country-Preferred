'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      enabled: true,
      preferredCountries: [],
      blacklist: []
    }, function () {
      chrome.runtime.openOptionsPage();
    });
  }
});

chrome.runtime.onMessage.addListener(function (msg, _sender, sendResponse) {
  switch (msg.type) {
    case 'GET_SETTINGS':
      chrome.storage.sync.get(
        { enabled: true, preferredCountries: [], blacklist: [] },
        function (data) { sendResponse({ ok: true, data: data }); }
      );
      return true;
    case 'SET_SETTINGS':
      chrome.storage.sync.set(msg.data, function () {
        sendResponse({ ok: !chrome.runtime.lastError });
      });
      return true;
    case 'OPEN_OPTIONS':
      chrome.runtime.openOptionsPage();
      sendResponse({ ok: true });
      break;
    default:
      sendResponse({ ok: false, error: 'Unknown message type' });
  }
});
