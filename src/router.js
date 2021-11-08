import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Search from "./views/Search.vue";
import Detail from "./views/Detail.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/:mode/:city/:keyword?",
    name: "Search",
    component: Search,
  },
  {
    path: "/:mode/:lat(\\d+\\.\\d+)/:lon(\\d+\\.\\d+)",
    name: "Nearby",
    component: Search,
  },
  { path: "/D/:ID", name: "Detail", component: Detail },
  { path: "/:pathMatch(.*)*", name: "error", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
