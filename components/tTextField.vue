<template>
  <div class="relative">
    <label v-if="label" :for="id" class="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="computedModelValue"
      :class="[
        'block w-full px-4 py-2 border rounded-md transition duration-200 ease-in-out',
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        'focus:outline-none focus:ring-1',
      ]"
      @input="updateValue($event)"
    />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: " ",
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

const id = computed(() => `input-${Math.random().toString(36).substring(2, 10)}`);

const computedModelValue = computed(() => {
  return props.modelValue;
});

const updateValue = (event: Event) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
