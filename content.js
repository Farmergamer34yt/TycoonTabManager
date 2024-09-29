// Default refresh interval is 5 minutes if not set by the user
let defaultInterval = 5;

// Get refresh interval and auto-refresh toggle from storage
chrome.storage.sync.get(['refreshInterval', 'autoRefreshEnabled'], (data) => {
    let refreshInterval = data.refreshInterval || defaultInterval;
    let autoRefreshEnabled = data.autoRefreshEnabled !== undefined ? data.autoRefreshEnabled : true;

    // Convert minutes to milliseconds
    let refreshIntervalMs = refreshInterval * 60 * 1000;

    // If auto-refresh is enabled, start the refresh cycle
    if (autoRefreshEnabled) {
        setInterval(() => {
            window.location.reload();
        }, refreshIntervalMs);
    }
});
// Function to extract cookies per second from the page
function getCookiesPerSecond() {
    const cpsElement = document.querySelector("#cookiesPerSecond");
    if (cpsElement) {
        const cpsText = cpsElement.innerText.replace("per second: ", "").trim();
        return parseFloat(cpsText);
    }
    return 0;
}

// Send the cookies per second value to the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'getCookiesPerSecond') {
        const cookiesPerSecond = getCookiesPerSecond();
        sendResponse({ cookiesPerSecond });
    }
});
