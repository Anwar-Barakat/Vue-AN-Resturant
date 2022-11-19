import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas);
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "normalize.css";
import "./scss/custom.css";

createApp(App)
    .use(store)
    .component("FontAwesome", FontAwesomeIcon)
    .use(router)
    .mount("#app");
