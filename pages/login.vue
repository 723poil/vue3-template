<template>
  <div class="w-full p-0">
    <main class="flex bg-gray-100 h-screen">
      <t-row class="w-full">
        <t-col class="flex flex-col items-center justify-center align-middle">
          <t-row>
            <t-col>
              <client-only>
                <t-card style="width: 400px; height: 450px" title-class="flex justify-center align-middle">
                  <template #title>
                    <div class="h-48 flex flex-col items-center justify-center align-middle"> 로그인 </div>
                  </template>
                  <template #content>
                    <t-row>
                      <t-col class="pt-3">
                        <t-text-field
                          placeholder="아이디"
                          :model-value="id"
                          @update:model-value="updateId"
                        ></t-text-field>
                      </t-col>
                      <t-col class="pt-3">
                        <t-text-field
                          placeholder="비밀번호"
                          :model-value="password"
                          @update:model-value="updatePassword"
                        ></t-text-field>
                      </t-col>
                      <t-col class="pt-3">
                        <t-button block @click="login">로그인</t-button>
                      </t-col>
                    </t-row>
                  </template>
                </t-card>
              </client-only>
            </t-col>
          </t-row>
        </t-col>
      </t-row>
    </main>
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from "vue";

const { $baseServerDefault } = useNuxtApp();

definePageMeta({
  name: "login",
  layout: "default",
});

const router = useRouter();

const id: Ref<string> = ref("");
const password: Ref<string> = ref("");

const updateId = (value: string) => {
  id.value = value.replaceAll(" ", "");
};

const updatePassword = (value: string) => {
  password.value = value.replaceAll(" ", "");
};

const login = async () => {
  // try {
  //   const result = await $baseServerDefault("/data");

  //   console.log("Data:", result);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }

  router.replace({ path: "/" });
};
</script>
