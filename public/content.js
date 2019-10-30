function onClicked(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
        let anchor = $("a[href^='http']").eq(0);
        let href = anchor.attr("href");
        console.log(href);
        let payload = {
            "message": "open_new_tab",
            "url": href
        };
        chrome.runtime.sendMessage(payload);
    }
}

chrome.runtime.onMessage.addListener(onClicked);
