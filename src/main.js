import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "bootstrap";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.css";
import "./scss/custom.css";

createApp(App).use(store).use(router).mount("#app");
