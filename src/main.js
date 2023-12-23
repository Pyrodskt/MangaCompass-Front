/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify/lib/framework.mjs'
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
const vuetify = createVuetify()
registerPlugins(app)

app.use(vuetify).mount('#app')
