document.addEventListener('DOMContentLoaded', function() {
  const analyzeButton = document.getElementById("analyze");
  
  if (analyzeButton) {
    analyzeButton.addEventListener("click", function() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;

        // Inject content script if it's not running
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content.js"]
        }, () => {
          // Now send message to the content script
          chrome.tabs.sendMessage(tabId, { action: "getVideoId" }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Runtime error:", chrome.runtime.lastError.message);
              return;
            }

            if (response && response.videoId) {
              fetch('http://localhost:5000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoId: response.videoId })
              })
              .then((res) => res.json())
              .then((data) => {
                  console.log("Analysis Result: ", data);
                  document.getElementById("result").textContent = JSON.stringify(data);
              })
              .catch((error) => {
                  console.error('Error:', error);
              });
            } else {
              console.error('Error: Video ID not found.');
            }
          });
        });
      });
    });
  }
});
