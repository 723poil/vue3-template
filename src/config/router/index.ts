import type { Router } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { RouterInstance } from "./router";
import Login from "@/view/login/Login.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "login",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        layout: "blank",
      },
    },
  ],
});

RouterInstance.setRouter(router).then((r) => r);

export default router;
