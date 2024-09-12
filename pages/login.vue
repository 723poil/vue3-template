<script setup lang="ts">
import icon from "@/assets/icon.png";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import { onMounted } from "vue";

onMounted(() => {});

const icons = {
  mdiEyeOffOutline,
  mdiEyeOutline,
};
const images = {
  icon: icon,
};
</script>
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
            <!-- <v-text-field
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
            ></v-text-field> -->

            <div class="d-flex align-center justify-space-between flex-wrap">
              <!-- <v-checkbox v-model="idSave" label="아이디 기억하기" hide-details class="mt-1"></v-checkbox> -->
            </div>

            <!-- <v-btn block size="x-large" color="primary" @click="adminLogin">로그인</v-btn> -->
          </v-form>
        </v-card-text>
        <v-card-text class="d-flex align-center justify-center flex-wrap pt-0">
          <span>Copyright © 2018 Shopchain Co.,Ltd</span>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
