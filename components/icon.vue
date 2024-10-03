<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
  >
    <path :d="icon" />
  </svg>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";

definePageMeta({
  name: "icon",
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
});

const { icon, size } = toRefs(props);

const viewBox = computed(() => `0 0 24 24`);
</script>
