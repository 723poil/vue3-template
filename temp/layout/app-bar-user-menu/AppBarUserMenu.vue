<template>
  <div class="d-flex justify-end">
    <v-btn class="text-purple" @click="logout">
      <v-icon left>{{ icons.mdiLogoutVariant }}</v-icon>
      로그아웃
    </v-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mdiLogoutVariant } from "@mdi/js";
import { memberStore } from "@/store/member/member.store";

export default defineComponent({
  setup() {
    const store = memberStore();

    const { logout } = store;

    return {
      logout,
    };
  },
  data() {
    return {
      icons: {
        mdiLogoutVariant,
      },
    };
  },
});
</script>
