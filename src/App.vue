<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <Transition name="loading">
      <div v-show="loading" class="fixed bottom-0 left-0 right-0 top-0 z-50 bg-[rgba(0,0,0,0.8)]">
        <div class="h-full w-full text-white">
          <div class="flex h-full flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5" />
              <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" />
              </path>
            </svg>
            <span class="p-4 text-lg">正在加载英雄数据</span>
          </div>
        </div>
      </div>
    </Transition>
    <Notify v-bind="notifyProps" v-model:show="showNotify" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { store } from "@/store";
import { reqHeroData } from "@/api";
import Notify from "@/components/Notify/Notify.vue";

let loading = ref<null | boolean>(null);
let showNotify = ref(false);
const notifyProps = ref({});

(async () => {
  try {
    loading.value = true;
    const { code, data } = await reqHeroData();
    if (code == 200) {
      store.setHeros(data); //把英雄数据存入store
      notifyProps.value = { msg: "数据已经准备好了!" };
    } else {
      throw new Error("英雄数据请求失败");
    }
  } catch (error) {
    notifyProps.value = { type: "danger", msg: "英雄数据加载失败，请刷新重试!" };
  } finally {
    loading.value = false;
    showNotify.value = true;
    setTimeout(() => (showNotify.value = false), 3000);
  }
})();
</script>

<style scoped>
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.3s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
