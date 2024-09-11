import { defineStore } from "pinia";
import type { ComputedRef, Ref } from "vue";
import { computed, ref } from "vue";

export const axiosInterceptorStore = defineStore("axiosInterceptor", () => {
  const sequences: Ref<number[]> = ref([]);
  const curIndex: Ref<number> = ref(0);
  const validToken: Ref<boolean> = ref(true);

  async function addSequence(): Promise<number> {
    sequences.value.push(curIndex.value);
    return curIndex.value++;
  }

  async function removeSequence(): Promise<void> {
    sequences.value.splice(0, 1);
  }

  async function setValidToken(valid: boolean): Promise<void> {
    validToken.value = valid;
  }

  const canUseMySequence: ComputedRef<number> = computed(() => sequences.value[0]);

  return {
    // variable
    validToken,

    // setter
    addSequence,
    removeSequence,
    setValidToken,

    // getter
    canUseMySequence,
  };
});
