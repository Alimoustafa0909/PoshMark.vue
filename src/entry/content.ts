import { createApp } from 'vue';
import ContentScript from '../view/ContentScript.vue';

// Ensure the script runs after the DOM is fully loaded
    const mountElement = document.createElement('section');
    document.body.appendChild(mountElement);
    mountElement.id = "form-finder";

    createApp(ContentScript).mount("#form-finder");