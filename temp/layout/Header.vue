<template>
  <div>
    <vertical-nav-menu v-model:bind="isDrawerOpen"></vertical-nav-menu>

    <v-app-bar app flat absolute color="transparent">
      <v-app-bar-nav-icon class="d-block d-lg-none me-2" @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import VerticalNavMenu from "./vertical-nav-menu/VerticalNavMenu.vue";

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Header",
  components: {
    VerticalNavMenu,
  },
  setup() {
    const isDrawerOpen = ref(false);

    return {
      isDrawerOpen,
    };
  },
});
</script>
