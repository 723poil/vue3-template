<template>
  <a href="" class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6">
    <t-icon class="mr-3" :icon="icon" :size="size"></t-icon>
    {{ text }}
  </a>
</template>
<script setup lang="ts">
import { toRefs } from "vue";

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
