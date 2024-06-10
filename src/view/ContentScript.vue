<template>
  <section></section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'detecting'){
    detectPost()
  }

});


const detectPost = () => {
  const post = document.querySelector('[data-et-prop-unit_position="3"]');
  
  if (post) {
    // Get the post ID from the element
    const postId = post.getAttribute('data-et-prop-listing_id');
    
    // Send a message with the action and post ID
    chrome.runtime.sendMessage({ action: 'post_detected', postId: postId});
  } else {
    chrome.runtime.sendMessage({ action: 'no_post_detected' });
  }
};


</script>

<style>

</style>