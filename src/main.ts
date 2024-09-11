import { createApp } from "vue";
import VueCookies from "vue-cookies";

import router from "./config/router";
import { pinia } from "./config/pinia";

import Vue3DraggableResizable from "vue3-draggable-resizable";
import App from "./App.vue";
import { Cookies } from "./config/cookies/cookies";
import vuetify from "./config/vuetify";
import { memberStore } from "./store/member/member.store";
import { axiosInterceptorStore } from "./store/axios/axios.interceptor.store";

const app = createApp(App);

app.use(Vue3DraggableResizable).use(router).use(vuetify).use(VueCookies, { expires: "14d" }).use(pinia);

app.mount("#app");

Cookies.getCookies();

memberStore(pinia);
axiosInterceptorStore(pinia);
