import {
  createRouter,
  createWebHistory
} from "vue-router";
import Home from "@/pages/Pizzas.vue";

const routers = createRouter({
  history: createWebHistory(),
  routes: [{
      path: "/",
      name: "Pizzas",
      component: Home
    },
    {
      path: '/cart',
      name: "Cart",
      component: () => import("@/pages/Cart.vue")
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("@/pages/404.vue")
    }
  ],
});

export default routers;