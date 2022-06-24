import { createRouter, createWebHistory } from "vue-router";
import AutorizationView from "../views/AutorizationView.vue";
import AnalyticsView from "../views/AnalyticsView.vue";

const routes = [
  {
    path: "/",
    name: "AutorizationView",
    component: AutorizationView,
  },
  {
    path: "/analytics",
    name: "AnalyticsView",
    component: AnalyticsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
