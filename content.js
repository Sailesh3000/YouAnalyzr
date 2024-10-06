// content.js

function getVideoIdFromUrl(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getVideoId") {
      const videoId = getVideoIdFromUrl(window.location.href);
      
      if (videoId) {
          sendResponse({ videoId: videoId });
      } else {
          sendResponse({ error: "Video ID not found" });
      }
  }
});
