import browser from 'webextension-polyfill';

function openPanel(tab) {
  browser.windows.create({
    url: browser.runtime.getURL("index.html"),
    type: "popup"
  });
}

browser.browserAction.onClicked.addListener(openPanel);
