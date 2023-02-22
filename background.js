chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("linkedin.com/search/results/people"))
    chrome.tabs.sendMessage(tabId, {
      type: "TAB_UPDATE",
    });
});
