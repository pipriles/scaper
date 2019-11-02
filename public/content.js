console.log('Listening to commands...');
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        let url = window.location.href
        console.log(request, sender, url);
        sendResponse({ url }); 
        return true;
    }
);
