<template>
  <div id="app">
    <iframe
      id="iframe"
      src="http://localhost:8080/"
      height="200"
      width="300"
      frameborder="0"
      scrolling="yes"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  window.addEventListener("message", function(event) {
    if (event.data.action === "Sharee") {
      console.log("Message received in popup:", event.data);

      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tabId = tabs[0]?.id;
        if (tabId !== undefined) {
          chrome.tabs.sendMessage(tabId, {
            action: "startShare",
            data: event.data
          });
        }
      });
    } else if (event.data.action === "fetchName") {
      console.log("Fetching name via content script");
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tabId = tabs[0]?.id;
        if (tabId !== undefined) {
          chrome.tabs.sendMessage(tabId, { action: "fetchName" });
        }
      });
    }
  });

  chrome.runtime.onMessage.addListener(message => {
    if (message.action === "sendIframe") {
      const iframe = document.getElementById("iframe") as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: "fetchComplete" }, "*");
      }
      console.log("Fetch complete message received from content script.");
    } else if (message.action === "sendName") {
      const iframe = document.getElementById("iframe") as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { action: "sendName", name: message.name },
          "*"
        );
      }
    }
  });
});
</script>

<style scoped>
#app {
  text-align: center;
}

iframe {
  border: none;
}
</style>
