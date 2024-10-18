import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueToast, {
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
});

import { useAuthStore } from '@/stores/useAuthStore';
const authStore = useAuthStore();
authStore.loadUserFromStorage();

app.mount('#app')
