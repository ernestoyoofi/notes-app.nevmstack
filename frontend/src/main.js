import "./global.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

const render = createApp(App)

render.use(router)
render.mount("#app")