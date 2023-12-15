import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("../pages/Home/Home.vue");
const Heros = () => import("../pages/Heros/Heros.vue");

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
    path: "/heros/:id",
    name: "Heros",
    component: Heros,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
