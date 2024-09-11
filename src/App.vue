<template>
  <component :is="resolveLayout">
    <router-view />
    <v-snackbar v-model="snackbar">
      {{ snackText }}
    </v-snackbar>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import layoutBlank from "@/components/layout/Blank.vue";
import layoutContent from "@/components/layout/Wrap.vue";
import { useRoute } from "vue-router";
import { memberStore } from "./store/member/member.store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "App",
  components: {
    layoutBlank,
    layoutContent,
  },
  setup: function () {
    const router = useRoute();
    const store = memberStore();

    const { snackbar, snackText } = storeToRefs(store);

    const resolveLayout = computed(() => {
      if (router.name === null) return null;

      if (router.meta.layout === "blank") {
        return "layout-blank";
      }

      return "layout-content";
    });

    return {
      resolveLayout,

      snackbar,
      snackText,
    };
  },
});
</script>
