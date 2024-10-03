<template>
  <a href="" class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6">
    <Icon class="mr-3" :icon="icon" :size="size"></Icon>
    {{ text }}
  </a>
</template>
<script setup lang="ts">
import { toRefs } from "vue";

definePageMeta({
  name: "sideItem",
});

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: 24,
  },
  text: {
    type: String,
    required: true,
  },
});

const { icon, size } = toRefs(props);
</script>
