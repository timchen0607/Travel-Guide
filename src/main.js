import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/_reset.scss";
import "./assets/scss/_myIcon.scss";
import "./assets/scss/_global.scss";
import "./assets/scss/_print.scss";

createApp(App).use(router).mount("#app");
