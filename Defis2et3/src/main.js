import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';
import { createPinia } from 'pinia';
import router from './router/router.js'
createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app');
