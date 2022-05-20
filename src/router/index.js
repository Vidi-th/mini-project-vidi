import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue"
import About from "@/views/About.vue"
import Installation from "@/views/Installation.vue"
import Statistic from "@/views/Statistics.vue"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/About",
        name: "About",
        component: About,
    },
    {
        path: "/Installation",
        name: "Installation",
        component: Installation,
    },
    {
        path: "/Statistics",
        name: "Statistics",
        component: Statistic,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
