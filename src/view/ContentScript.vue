<template>
  <section></section>
</template>

<script setup lang="ts">
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchName") {
    const post = document.querySelector('[data-finite-scroll-hotkey-item="0"]');
    if (post) {
      const impressionContainer = post.querySelector(
        "#fie-impression-container"
      );
      let name = "Name not found";
      if (impressionContainer) {
        const actorElement = impressionContainer.querySelector(
          ".update-components-actor.display-flex"
        );
        if (actorElement) {
          const metaElement = actorElement.querySelector(
            ".update-components-actor__meta.relative"
          );
          if (metaElement) {
            const nameElement = metaElement.querySelector(
              ".update-components-actor__name.hoverable-link-text.t-14.t-bold"
            );
            if (nameElement) {
              const nameSpan = nameElement.querySelector(
                'span[dir="ltr"] > span[aria-hidden="true"]'
              );
              if (nameSpan) {
                name = nameSpan.textContent?.trim() || "Name not found";
              }
            }
          }
        }
      }
    }
    console.log("Name found:", name);
    chrome.runtime.sendMessage({ action: "sendName", name: name });
  }

  if (message.action === "startShare") {
    detectPost();
    console.log("Detecting post");
  }
  if (message.type === "success") {
    // Send a message to the popup
    chrome.runtime.sendMessage({ action: "sendIframe", share: message.share });
    window.location.reload();
    console.log(message.share);
  }
});

const detectPost = () => {
  const post = document.querySelector('[data-et-prop-unit_position="3"]');

  if (post) {
    console.log(post);
    // Get the post ID from the element
    const postId = post.getAttribute("data-et-prop-listing_id");

    // Send a message with the action and post ID
    chrome.runtime.sendMessage({ action: "post_detected", postId });
  } else {
    chrome.runtime.sendMessage({ action: "no_post_detected" });
  }
};
</script>

<style>
</style>
