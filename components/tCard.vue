<template>
  <div :class="computedClass">
    <h2 class="font-bold text-3xl text-gray-500 mb-2" :class="titleClass">
      <slot name="title" />
    </h2>
    <p class="text-gray-700 text-base">
      <slot name="content" />
    </p>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from "vue";
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
  flat: {
    type: Boolean,
    default: false,
  },
  titleClass: {
    type: String,
    default: "",
  },
});

const { bgColor, rounded, width, flat, titleClass } = toRefs(props);

const computedClass = computed(
  () =>
    `${bgColor.value} ${rounded.value ? "rounded" : ""} ${width.value} overflow-hidden ${flat.value ? "" : "shadow-lg"} p-6`,
);
</script>
