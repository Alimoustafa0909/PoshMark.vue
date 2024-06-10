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
      
        
          chrome.runtime.sendMessage({ action: 'startShare', data: ev.data }, (response) => {
            console.log('Response from background script:', response);
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
