<template>
  <div id="app">
    <iframe
      src="http://localhost:8080/"
      height="200"
      width="300"
      frameborder="0"
      scrolling="yes"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    onMounted(() => {
      window.addEventListener('message', (ev) => {
        console.log('Message received in popup:', ev.data);
      
       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId !== undefined) {
        
          chrome.tabs.sendMessage(tabId, { action: 'startShare', data: ev.data });  
        } 
          });
      });
    });

    return {};
  }
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
