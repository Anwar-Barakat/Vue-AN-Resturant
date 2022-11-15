import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import "./index";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/ProfileView.vue";
import ErrorView from "../views/ErrorView.vue";

const routes = [
    { path: "/", name: "home", component: HomeView },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    { path: "/register", name: "register", component: RegisterView },
    { path: "/login", name: "login", component: LoginView },
    { path: "/profile", name: "profile", component: ProfileView },
    { path: "/:catchAll(.*)", name: "404", component: ErrorView },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to) => {
    if (to.params.pageTitle != undefined) {
        document.title = `${process.env.VUE_APP_TITLE} | ${to.params.pageTitle}`;
    } else {
        if (to.name == null) {
            document.title = `${process.env.VUE_APP_TITLE}`;
        } else if (to.params.pageTitle != undefined) {
            document.title = `${process.env.VUE_APP_TITLE} | ${to.params.pageTitle} `;
        } else {
            document.title = `${process.env.VUE_APP_TITLE} | ${to.name} `;
        }
    }
});

export default router;
