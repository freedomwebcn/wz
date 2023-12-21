import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("../pages/Home/Home.vue");
const Heros = () => import("../pages/Heros/Heros.vue");
const Search = () => import("../pages/Search/Search.vue");

const routes = [
  {
    path: "/",
    redirect: {
      name: "Home",
    },
  },

  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/heros/:id/:type",
    name: "Heros",
    component: Heros,
    props: true,
  },
  {
    path: "/search/:name",
    name: "Search",
    component: Search,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
