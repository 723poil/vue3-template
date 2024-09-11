import type { AxiosInstance } from "axios";
import { storeToRefs } from "pinia";
import type { Router } from "vue-router";
import type { VueCookies } from "vue-cookies";
import { RouterInstance } from "../router/router";
import { Cookies } from "../cookies/cookies";
import { axiosInterceptorStore } from "@/store/axios/axios.interceptor.store";
import { memberStore } from "@/store/member/member.store";
import { sleep } from "@/util/sleep";

const errorHandler = async (axiosInstance: AxiosInstance, error: any) => {
  const router: Router = RouterInstance.getRouter();
  const cookies: VueCookies = Cookies.getCookies();
  const mutex = axiosInterceptorStore();

  const { removeSequence } = mutex;
  const { resetMemberInfo } = memberStore();

  const curPath: string = await RouterInstance.getCurrentRoutePath();

  const needReissueToken = error.response && error.response.status === 401 && error.response.data.errorCode === "0006";
  const unAuthorization =
    error.response && error.response.status === 401 && curPath !== "/login" && error.response.data.errorCode !== "0006";

  if (unAuthorization) {
    resetMemberInfo();

    cookies.remove("accessToken");
    cookies.remove("refreshToken");

    alert("장시간 미사용으로 로그아웃되었습니다.");
    await router.replace("/login");
    location.reload();
  }

  if (needReissueToken) {
    try {
      //   await Auth.refreshToken();

      await removeSequence();
    } catch (error: any) {
      if (curPath !== "/login") {
        resetMemberInfo();

        cookies.remove("accessToken");
        cookies.remove("refreshToken");

        alert("장시간 미사용으로 로그아웃되었습니다.");
        await router.replace("/login");
        location.reload();
      } else {
        return Promise.reject({ error });
      }
    }

    return axiosInstance.request(error.config);
  }

  if (curPath === "/login" && error.response && error.response.status === 401) {
    await removeSequence();
    return Promise.reject({ error });
  }

  if (error && error.response.data) {
    console.error(error);
    alert(`${error.response.data.message} (코드: ${error.response.data.errorCode})`);

    if (error.response.status === 403 && error.response.data.errorCode === "0403") {
      resetMemberInfo();
      cookies.remove("accessToken");
      cookies.remove("refreshToken");

      alert("부적절한 접근으로 로그아웃됩니다.");
      await router.replace("/login");
    } else if (error.response.status === 403 && error.response.data.errorCode === "0407") {
      location.reload();
    }
  }

  await removeSequence();
  return Promise.reject({ error });
};

export const setAxiosInterceptor = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(async (config) => {
    const router: Router = RouterInstance.getRouter();
    const cookies: VueCookies = Cookies.getCookies();
    const mutex = axiosInterceptorStore();
    const member = memberStore();

    // const { getUserId } = storeToRefs(user);

    const { canUseMySequence } = storeToRefs(mutex);
    const { addSequence, removeSequence } = mutex;

    const curPath: string = await RouterInstance.getCurrentRoutePath();

    const mySequence: number = await addSequence();

    if (canUseMySequence.value !== mySequence) {
      let waitTime: number = 0;
      while (canUseMySequence.value !== mySequence) {
        await sleep(50).then(async () => {
          waitTime += 1;

          if (waitTime > 20) {
            await removeSequence();
          }
        });
      }
    }

    // healthCheck로 이름 가져오기
    // if (curPath !== "/login" && config.url !== "/auth/health" && !getUserId.value) {
    // }

    const accessToken = cookies.get("accessToken");

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    async (response) => {
      const store = axiosInterceptorStore();
      const { removeSequence } = store;

      await removeSequence();

      return response;
    },
    async (error) => {
      return errorHandler(axiosInstance, error);
    },
  );
};
