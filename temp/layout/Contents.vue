<template>
  <v-main>
    <div class="app-content-container boxed-container pa-6">
      <slot></slot>
    </div>
  </v-main>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Contents",
});
</script>
