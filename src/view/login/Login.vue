<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner" style="width: 380px">
      <v-card class="auth-card" flat>
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/login" class="d-flex align-center">
            <v-img :src="images.icon" width="103.2px" height="32.4px" alt="템플릿" contain class="me-3"></v-img>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text class="pb-0">
          <p class="d-flex justify-center text-lg-h5 font-weight-bold"> 템플릿 로그인 </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="id"
              outlined
              label="템플릿 이이디"
              placeholder="아이디입력"
              hide-details
              variant="outlined"
              required
              class="mb-3"
            ></v-text-field>
            <v-text-field
              v-model="password"
              outlined
              variant="outlined"
              hide-details
              required
              label="템플릿 비밀번호"
              placeholder="············"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              @keyup.enter="adminLogin"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox v-model="idSave" label="아이디 기억하기" hide-details class="mt-1"></v-checkbox>
            </div>

            <v-btn block size="x-large" color="primary" @click="adminLogin">로그인</v-btn>
          </v-form>
        </v-card-text>
        <v-card-text class="d-flex align-center justify-center flex-wrap pt-0">
          <span>Copyright © 2018 Shopchain Co.,Ltd</span>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import icon from "@/assets/icon.png";
import { Cookies } from "@/config/cookies/cookies";
import { RouterInstance } from "@/config/router/router";
import { memberStore } from "@/store/member/member.store";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import { defineComponent, onMounted, type Ref, ref } from "vue";
import type { Router } from "vue-router";

export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    // const loginRepository = new LoginRepository();
    const router: Router = RouterInstance.getRouter();
    const $cookies: Cookies = new Cookies();
    const store = memberStore();
    const { /*setUserInfo*/ floatMessage } = store;

    const id: Ref<string> = ref("");
    const password: Ref<string> = ref("");
    const isPasswordVisible: Ref<boolean> = ref(false);
    const emptyFields: Ref<boolean> = ref(false);
    const idSave: Ref<boolean> = ref(false);

    const adminLogin = async () => {
      if (idSave.value) {
        $cookies.set<string>("idCookie", id.value, new Date(2099, 12, 31));
        $cookies.set<boolean>("idSaveCheck", true, new Date(2099, 12, 31));
      } else {
        $cookies.set("idCookie", "");
        $cookies.set("idSaveCheck", false);
      }

      if (id.value.trim() === "" || password.value.trim() === "") {
        emptyFields.value = true;
        floatMessage("아이디 또는 비밀번호를 입력해 주세요.");
        return;
      }

      try {
        // const value: ApiResponse<AuthResDto> = await loginRepository.requestLogin({
        //   id: id.value,
        //   password: password.value,
        // });
        // if (value.result) {
        //   await setUserInfo(value.data!.id, value.data!.name);
        //   Cookies.setTokenCookie(value.data!.accessToken, value.data!.refreshToken);
        //   floatMessage("정상적으로 로그인 되었습니다.");
        //   setTimeout(() => {
        //     router.push({ name: "customerMgmt" });
        //   }, 700);
        // } else {
        //   emptyFields.value = true;
        //   floatMessage("올바르지 않은 아이디 또는 비밀번호입니다.");
        // }
      } catch (error: any) {
        emptyFields.value = true;
        alert(`${error.response.data.message}`);
      }
    };

    const mounted = onMounted(() => {
      if ($cookies.get<boolean>("idSaveCheck")) {
        idSave.value = true;
        id.value = $cookies.get<string>("idCookie");
      } else {
        idSave.value = false;
        id.value = "";
      }
    });

    return {
      id,
      password,
      isPasswordVisible,
      emptyFields,
      idSave,

      adminLogin,

      mounted,
    };
  },
  data() {
    return {
      icons: {
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
      images: {
        icon: icon,
        // authTree: authTree,
        // authTree3: authTree3,
      },
    };
  },
});
</script>
