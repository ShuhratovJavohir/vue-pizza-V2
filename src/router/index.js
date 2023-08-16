import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Pizzas.vue";

const routers = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "Pizzas", component: Home }],
});

export default routers;
