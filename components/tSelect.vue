<template>
  <div class="relative">
    <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-600">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="computedModelValue"
      :class="[
        'block w-full px-4 py-2 border rounded-md transition duration-200 ease-in-out',
        error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500',
        'focus:outline-none focus:ring-1',
        'bg-white',
      ]"
      @change="updateValue($event)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";

const props = defineProps({
  id: {
    type: String,
    default: `select-${Math.random().toString(36).substring(2, 10)}`,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  options: {
    type: Array as PropType<{ [key: string]: any }[]>,
    required: true,
    default: () => [],
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

const computedModelValue = computed(() => {
  return props.modelValue;
});

const updateValue = (event: Event) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
