function onResponse(request, sender, sendResponse) {
    if ( request.message === "open_new_tab" ) {
        chrome.tabs.create({ "url": request.url });
    }
}

function openPanel(tab) {
    chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        type: "popup"
    });
}

chrome.browserAction.onClicked.addListener(openPanel);
// chrome.runtime.onMessage.addListener(onResponse);
