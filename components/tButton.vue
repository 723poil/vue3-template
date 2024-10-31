<template>
  <button :type="type" :class="buttonClasses" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  color: {
    type: String,
    default: "primary", // 기본 색상을 'primary'로 설정
  },
  variant: {
    type: String,
    default: "filled", // 기본 스타일을 'filled'로 설정
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["click"]);

const buttonClasses = computed(() => {
  const baseClasses = [
    "px-4",
    "py-2",
    "rounded",
    "font-semibold",
    "transition",
    "duration-200",
    "ease-in-out",
    props.block ? "w-full" : "inline-block", // block이 true일 때 w-full 적용
  ];

  if (props.disabled) {
    return [...baseClasses, "bg-gray-300", "text-gray-500", "cursor-not-allowed"];
  }

  if (props.variant === "filled") {
    if (props.color === "primary") {
      return [...baseClasses, "bg-blue-500", "hover:bg-blue-600", "text-white"];
    } else if (props.color === "secondary") {
      return [...baseClasses, "bg-gray-500", "hover:bg-gray-600", "text-white"];
    }
  } else if (props.variant === "outlined") {
    if (props.color === "primary") {
      return [...baseClasses, "border", "border-blue-500", "text-blue-500", "hover:bg-blue-100"];
    } else if (props.color === "secondary") {
      return [...baseClasses, "border", "border-gray-500", "text-gray-500", "hover:bg-gray-100"];
    }
  }

  return baseClasses;
});
</script>
