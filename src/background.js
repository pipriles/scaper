import browser from 'webextension-polyfill';

let opened = null;

function openPanel(tab) {

  console.log(tab, opened)

  if (opened !== null) 
    return;

  console.log('opening')
  const p = browser.windows.create({
    url: browser.runtime.getURL("index.html"),
    type: "popup",
    width: 900,
    height: 600
  });

  p.then((w) => opened = w.id);
}

browser.browserAction.onClicked.addListener(openPanel);
browser.windows.onRemoved.addListener((windowId) => {
  console.log(windowId, opened)
  if ( windowId === opened ) opened = null;
});

