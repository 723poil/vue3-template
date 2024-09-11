import { defineStore } from "pinia";
import type { ComputedRef, Ref } from "vue";
import { computed, ref } from "vue";
// import { CustomAxios } from "@/common/axios";
// import { Auth } from "@/common/axios/auth";
import type { Router } from "vue-router";
import type { VueCookies } from "vue-cookies";
import { RouterInstance } from "@/config/router/router";
import { Cookies } from "@/config/cookies/cookies";
import { sleep } from "@/util/sleep";

export const memberStore = defineStore("memberStore", () => {
  const id: Ref<string> = ref("");
  const name: Ref<string> = ref("");

  const router: Router = RouterInstance.getRouter();
  const cookies: VueCookies = Cookies.getCookies();

  const snackbar: Ref<boolean> = ref(false);
  const snackText: Ref<string> = ref("");

  function floatMessage(value: string) {
    snackbar.value = false;
    snackText.value = value;
    snackbar.value = true;
  }

  //   async function setUserInfo(adminId: string, adminNm: string): Promise<void> {
  //     id.value = adminId;
  //     name.value = adminNm;
  //   }

  //   async function checkHealth(): Promise<void> {
  //     const value: ApiResponse<AuthHealthResDto> = await CustomAxios.checkHealth();

  //     await setUserInfo(value.data!.id, value.data!.name);
  //   }

  function resetMemberInfo(): void {
    id.value = "";
    name.value = "";
  }

  async function logout(): Promise<void> {
    // await Auth.logout();
    resetMemberInfo();

    cookies.remove("accessToken");
    cookies.remove("refreshToken");

    alert("정상적으로 로그아웃 되었습니다.");
    await router.push({ name: "login" });
  }

  const getMemberId: ComputedRef<Promise<string>> = computed(async () => {
    while (!id.value) {
      await sleep(5).then(() => undefined);
    }
    return id.value;
  });
  const getMemberNm: ComputedRef<string> = computed(() => name.value);

  return {
    // variable
    id,
    name,
    snackbar,
    snackText,

    // setter
    // setUserInfo,
    // checkHealth,
    resetMemberInfo,
    logout,
    floatMessage,

    // getter
    getMemberId,
    getMemberNm,
  };
});
