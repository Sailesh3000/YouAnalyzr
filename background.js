chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      chrome.runtime.sendMessage({ action: 'get_comments_and_url' }, (response) => {
        chrome.storage.local.set({ videoUrl: response.videoUrl, comments: response.comments });
      });
    }
  });
});
