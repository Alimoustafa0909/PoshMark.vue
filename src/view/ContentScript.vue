<template>
  <section></section>
</template>

<script setup lang="ts">
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startShare') {
    detectPost();
    console.log('Detecting post');
  }
  if (message.type === 'success') {
    // Send a message to the popup
    chrome.runtime.sendMessage({ action: 'sendIframe', share: message.share });
    window.location.reload();
    console.log(message.share);
  }
});

const detectPost = () => {
  const post = document.querySelector('[data-et-prop-unit_position="3"]');

  if (post) {
    console.log(post);
    // Get the post ID from the element
    const postId = post.getAttribute('data-et-prop-listing_id');

    // Send a message with the action and post ID
    chrome.runtime.sendMessage({ action: 'post_detected', postId });
  } else {
    chrome.runtime.sendMessage({ action: 'no_post_detected' });
  }
};
</script>

<style>
</style>
