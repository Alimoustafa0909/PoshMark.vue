<template>
  <div id="app">
    <iframe
      src="http://localhost:8080/"
height="200" width="300"
      frameborder="300"
     >
    </iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
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
