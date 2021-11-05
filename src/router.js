import { createRouter, createWebHistory } from "vue-router";
import Search from "./views/Search.vue";
import Detail from "./views/Detail.vue";

const routes = [
  { path: "/", name: "Home", component: Search },
  { path: "/:city/:page(\\d+)/:keyword?", name: "Search", component: Search },
  { path: "/:lat/:lon/:page(\\d+)", name: "Nearby", component: Search },
  { path: "/D/:ID", name: "Detail", component: Detail },
  { path: "/:pathMatch(.*)*", name: "error", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
