<template>
  <div :class="computedClass">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { tCols } from "~/type/css/t.cols";

const props = defineProps({
  cols: {
    type: String,
    default: tCols[12],
  },
  md: {
    type: String,
    default: "md:" + tCols[12],
  },
  sm: {
    type: String,
    default: "sm:" + tCols[12],
  },
  rounded: {
    type: Boolean,
    default: true,
  },
});

const computedClass = computed(() => `${props.cols} ${props.md} ${props.sm} ${props.rounded ? "rounded" : ""} px-2`);
</script>
