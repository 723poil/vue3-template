<template>
  <div :class="computedClass">
    <h2 class="font-bold text-xl mb-2">
      <slot name="title" />
    </h2>
    <p class="text-gray-700 text-base">
      <slot name="content" />
    </p>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { tBgColor } from "~/type/css/t.bg.color";

const props = defineProps({
  rounded: {
    type: Boolean,
    default: true,
  },
  bgColor: {
    type: String,
    default: tBgColor.white,
  },
  width: {
    type: String,
    default: "w-full",
  },
});

const computedClass = computed(
  () => `${props.bgColor} ${props.rounded ? "rounded" : ""} ${props.width} overflow-hidden shadow-lg p-6`,
);
</script>
