import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {vuetify} from "@/js/plugins.js";

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
