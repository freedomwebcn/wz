<template>
  <div>
    <RouterView />
    <Notify v-bind="notifyProps" v-model:show="show" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { reqHeroData } from "@/api";
import Notify from "./components/Notify/Notify.vue";

const notifyProps = ref({});
let show = ref(false);

// 每次刷新页面时 APP组件会请求最新的英雄数据 从 其他路由(Heros Search) 返回 Home页 时不需要频繁请求最新英雄数据。
reqHeroData().then((res) => {
  const { code, data } = res;
  try {
    if (code !== 200) throw res;
    window.sessionStorage.setItem("heros", JSON.stringify(data));
  } catch (err) {
    show.value = true;
    notifyProps.value = { type: "danger", msg: "Heros数据加载失败" };
    setTimeout(() => (show.value = false), 3000);
  }
});
</script>
