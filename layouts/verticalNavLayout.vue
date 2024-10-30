<template>
  <div class="w-full p-0">
    <nav class="bg-white">
      <div class="w-full mx-auto">
        <!-- 상단 바 -->
        <div class="flex items-center justify-between h-16">
          <!-- 왼쪽 상단 메뉴 -->
          <div>
            <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
              <button
                class="px-4 py-2 text-gray-700 rounded-lg text-2xl hover:bg-gray-200"
                @click="sideToggle = !sideToggle"
              >
                <t-icon :icon="mdiMenu"></t-icon>
              </button>
              <div class="flex items-center text-2xl font-bold ml-3">
                <a href="/">Home</a>
              </div>
            </div>
          </div>

          <!-- 상단 오른쪽 메뉴-->
          <div>
            <button
              class="flex items-center justify-between px-4 py-2 text-gray-700 rounded-lg text-2xl hover:bg-gray-200"
            >
              <t-icon :icon="mdiLogout" class="mr-1" :size="16"></t-icon>
              <span class="text-tiny">로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex bg-gray-100">
      <!-- 사이드 바 -->
      <Transition name="side">
        <aside
          v-if="!sideToggle"
          :class="bgColor"
          class="w-64 sm:hidden md:block shadow-[16px_0px_24px_-12px_rgba(0,0,15,0.7)]"
        >
          <nav class="block text-white text-base font-semibold pt-3">
            <t-side-item :icon="mdiViewDashboard" text="Dashboard"></t-side-item>
          </nav>
        </aside>
      </Transition>

      <div class="w-full flex flex-col h-screen overflow-y-hidden p-5">
        <!-- 모바일 전용 메뉴 -->
        <header v-if="sideToggle" class="sm:block md:hidden">모바일 메뉴</header>

        <!-- 메인 페이지 -->
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { type Ref, ref } from "vue";
import { mdiLogout, mdiMenu, mdiViewDashboard } from "@mdi/js";

const bgColor: string = "bg-blue-500";

const sideToggle: Ref<boolean> = ref(true);
</script>

<style scoped>
.side-enter-active,
.side-leave-active {
  transition: transform 0.5s ease;
}

.side-enter-from,
.side-leave-to {
  transform: translateX(-100%);
}
@media (max-width: 640px) {
  .sm\:hidden {
    display: none !important;
  }
}
</style>
