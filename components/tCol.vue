<template>
  <div :class="computedClass">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from "vue";
import { tCols } from "~/type/css/t.cols";

const props = defineProps({
  lg: {
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

const { lg, md, sm, rounded } = toRefs(props);

const computedClass = computed(() => `${lg.value} ${md.value} ${sm.value} ${rounded.value ? "rounded" : ""} px-2`);
</script>
