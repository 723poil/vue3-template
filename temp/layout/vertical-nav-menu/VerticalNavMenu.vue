<template>
  <v-navigation-drawer
    :model-value="openDrawer"
    app
    floating
    elevation="1"
    width="260"
    class="app-navigation-menu px-2"
  >
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img :src="icon" width="103.2px" height="32.4px" alt="template" contain eager class="app-logo me-3"></v-img>
      </router-link>
    </div>
    <v-divider class="mb-1 mt-1"></v-divider>

    <v-list v-if="selectedItems.length === 0" expand dense class="mb-6">
      <v-list-item
        v-for="(item, index) in group"
        :key="index"
        :class="{
          'v-list-item--active': item.activeRoutes
            ? item.activeRoutes!.includes($route.name?.toString() as string)
            : null,
        }"
        rounded="lg"
        :title="item.title"
        :value="item.title"
        @click="clickGroupItem(item)"
      >
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <template v-if="item.isGroup" #append>
          <v-icon>{{ icons.mdiChevronRight }}</v-icon>
        </template>
      </v-list-item>
    </v-list>

    <v-list v-else expand dense class="mb-6">
      <v-list-item rounded="lg" title="돌아가기" value="돌아가기" @click="resetItems">
        <template #prepend>
          <v-icon size="15">{{ icons.mdiArrowLeft }}</v-icon>
        </template>
      </v-list-item>
      <v-list-item
        v-for="(item, index) in selectedItems"
        :key="index"
        :class="{
          'v-list-item--active': item.activeRoutes
            ? item.activeRoutes.includes($route.name?.toString() as string)
            : null,
        }"
        rounded="lg"
        :title="item.title"
        :value="item.title"
        @click="clickListItem(item)"
      >
        <template #prepend>
          <v-icon size="15">{{ icons.mdiCheckboxBlankCircleOutline }}</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  mdiAccountMultiple,
  mdiAlphaCBox,
  mdiArrowLeft,
  mdiCheckboxBlankCircleOutline,
  mdiChevronRight,
  mdiStore,
} from "@mdi/js";
import { computed, defineComponent, onMounted, ref, type Ref, type WritableComputedRef } from "vue";

import icon from "@/assets/icon.png";
import type { Router } from "vue-router";
import { useDisplay } from "vuetify";
import type { NavGroupDto } from "./models/nav.group.dto";
import type { NavItemDto } from "./models/nav.item.dto";
import { RouterInstance } from "@/config/router/router";

export default defineComponent({
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const group: NavGroupDto[] = [
      {
        title: "고객관리",
        icon: mdiAccountMultiple,
        isGroup: true,
        activeRoutes: [],
        items: [
          { title: "고객관리", to: { name: "customerMgmt" }, activeRoutes: ["customerMgmt", "customerMgmtDetail"] },
          { title: "고객포인트관리", to: { name: "customerPoint" }, activeRoutes: ["customerPoint"] },
        ],
      },
    ];

    const router: Router = RouterInstance.getRouter();
    const { xs, md, sm } = useDisplay();

    const isSelected: Ref<boolean> = ref(false);
    const selectedItems: Ref<NavItemDto[]> = ref([]);

    const clickGroupItem = (item: NavGroupDto) => {
      if (item.isGroup) {
        selectedItems.value = item.items!;
      } else {
        selectedItems.value = [];

        // router.push(item.to!);
      }
    };

    const clickListItem = (item: NavItemDto) => {
      if (xs.value || md.value || sm.value) {
        ctx.emit("update:is-drawer-open", false);
      }
      //   router.push(item.to);
    };

    const resetItems = () => {
      selectedItems.value = [];
    };

    const openDrawer: WritableComputedRef<boolean> = computed({
      get() {
        return props.isDrawerOpen;
      },
      set(value: boolean) {
        ctx.emit("update:is-drawer-open", value);
      },
    });

    onMounted(async () => {
      const currentRouteName: string = await RouterInstance.getCurrentRouteName();
      for (let groupItem of group) {
        if (!groupItem.isGroup && groupItem.activeRoutes!.includes(currentRouteName)) break;
        if (groupItem.isGroup) {
          for (let item of groupItem.items!) {
            if (item.activeRoutes.includes(currentRouteName)) {
              selectedItems.value = groupItem.items;
              break;
            }
          }
        }
      }
    });

    return {
      group,
      router,
      isSelected,
      selectedItems,

      clickGroupItem,
      clickListItem,
      resetItems,

      openDrawer,
    };
  },
  data() {
    return {
      icons: {
        mdiCheckboxBlankCircleOutline,
        mdiArrowLeft,
        mdiChevronRight,
        mdiAccountMultiple,
        mdiStore,
        mdiAlphaCBox,
      },
      mini: false,
      icon: icon,
    };
  },
});
</script>
<style></style>
