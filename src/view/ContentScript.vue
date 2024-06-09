<template>
  <section></section>
</template>

<script>
export default {
setup () {
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startShare') {
    console.log('Start share action received:', message.data);

    // Add your logic to handle the start sharing action here

    sendResponse({ status: 'Sharing started' });
  }
});
}
}
</script>

<style>

</style>