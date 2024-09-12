<template>
  <v-app>
    <div
      v-click-outside="{
        handler: outsideClickHandler,
        include,
      }"
    />
    <!-- Header -->
    <vertical-nav-menu
      class="non-outside"
      :is-drawer-open="cIsDrawerOpen"
      @update:is-drawer-open="changeDrawerOpen"
    ></vertical-nav-menu>
    <v-app-bar app flat absolute>
      <div class="boxed-container w-100">
        <div class="d-flex justify-space-around align-center mx-2">
          <!-- Left Content -->
          <!-- <v-app-bar-nav-icon class="d-block me-2" @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon> -->
          <v-btn
            :icon="true"
            size="small"
            class="me-2 ml-2 non-outside-btn"
            elevation="1"
            @click="changeDrawerOpen(undefined)"
          >
            >
            <v-icon v-if="cIsDrawerOpen">
              {{ icons.mdiViewQuilt }}
            </v-icon>

            <v-icon v-else>
              {{ icons.mdiDotsVertical }}
            </v-icon>
          </v-btn>
          <!-- 접속자 -->
          <div class="mt-1">
            <p class="mb-0">
              <span class="text-h6 font-weight-bold text-purple">{{ name }}</span>
              님 반갑습니다!
            </p>
          </div>
          <!-- //접속자 -->
          <!-- //Left Content -->
          <v-spacer></v-spacer>
          <app-bar-user-menu></app-bar-user-menu>

          <!-- Right Content -->
        </div>
      </div>
    </v-app-bar>
    <!-- //Header -->
    <!-- Contents -->
    <v-main>
      <div class="app-content-container boxed-container py-6 px-2" style="background-color: #f6f7fb; height: 100%">
        <slot></slot>
      </div>
    </v-main>

    <!-- //Contents -->
  </v-app>
</template>
<script lang="ts">
import VerticalNavMenu from "./vertical-nav-menu/VerticalNavMenu.vue";
import { mdiBellOutline, mdiDotsVertical, mdiMagnify, mdiViewQuilt } from "@mdi/js";
import { computed, type ComputedRef, onMounted, ref, type Ref } from "vue";
// import { userStore } from "../stores/user.store";
import AppBarUserMenu from "./app-bar-user-menu/AppBarUserMenu.vue";
import type { Router } from "vue-router";
import { useDisplay } from "vuetify";
import { RouterInstance } from "@/config/router/router";

export default {
  name: "Wrap",
  components: {
    VerticalNavMenu,
    AppBarUserMenu,
  },
  setup() {
    // const store = userStore();
    const router: Router = RouterInstance.getRouter();
    const { xs, md, sm } = useDisplay();

    // const { getUserNm } = storeToRefs(store);
    // const { checkHealth } = store;
    const isDrawerOpen: Ref<boolean> = ref(true);

    const cIsDrawerOpen: ComputedRef<boolean> = computed(() => {
      if (xs.value || md.value || sm.value) {
        return !isDrawerOpen.value;
      } else {
        return isDrawerOpen.value;
      }
    });

    const changeDrawerOpen = (val?: boolean) => {
      if (val) {
        if (xs.value || md.value || sm.value) {
          isDrawerOpen.value = !val;
        } else {
          isDrawerOpen.value = val;
        }
      } else {
        isDrawerOpen.value = !isDrawerOpen.value;
      }
    };

    const outsideClickHandler = () => {
      if ((xs.value || md.value || sm.value) && cIsDrawerOpen.value) {
        isDrawerOpen.value = true;
      }
    };

    const include = () => {
      return [document.querySelector(".non-outside"), document.querySelector(".non-outside-btn")];
    };

    const mounted = onMounted(async () => {
      // if (!getUserNm.value) {
      //   try {
      //     await checkHealth();
      //     if (router.currentRoute.value.name === 'login') {
      //       await router.push({ name: 'presentCondition' });
      //     }
      //   } catch (e) {
      //     console.error(e);
      //
      //     if (router.currentRoute.value.name !== 'login') {
      //       alert('장시간 미사용으로 로그아웃 되었습니다.');
      //       await router.push({ name: 'login' });
      //     }
      //   }
      // }
    });

    return {
      name: "", //getUserNm,
      isDrawerOpen,
      cIsDrawerOpen,

      changeDrawerOpen,
      outsideClickHandler,
      include,

      mounted,
    };
  },
  data() {
    return {
      icons: {
        mdiMagnify,
        mdiBellOutline,
        mdiDotsVertical,
        mdiViewQuilt,
      },
    };
  },
};
</script>
