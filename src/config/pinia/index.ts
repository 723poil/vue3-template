import type { Pinia, StoreGeneric } from "pinia";
import { createPinia } from "pinia";
import { cloneDeep } from "lodash";

export const pinia: Pinia = createPinia();

export default function resetStore({ store }: { store: StoreGeneric }) {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
}

pinia.use(resetStore);
