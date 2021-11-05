import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Search from "./views/Search.vue";
import Detail from "./views/Detail.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/:city/:page(\\d+)/:keyword?", name: "Search", component: Search },
  { path: "/:lat/:lon/:page(\\d+)", name: "Nearby", component: Search },
  { path: "/D/:ID", name: "Detail", component: Detail },
  { path: "/:pathMatch(.*)*", name: "error", redirect: "/" },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
