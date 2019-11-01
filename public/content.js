function onClicked(request, sender, sendResponse) {
    console.log('Message received!');
    console.log(request, sender, sendResponse);
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

console.log('Listening to commands...');
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        let url = window.location.href
        console.log(request, sender, url);
        sendResponse({ url }); 
        return true;
    }
);
