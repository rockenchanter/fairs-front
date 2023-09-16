import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vtfy from './plugins/vuetify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vtfy)

app.mount('#app')
