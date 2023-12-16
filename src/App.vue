<template>
  <div>
    <RouterView />
    <Notify v-bind="ops" v-model:show="show" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { reqHeroData } from "@/api";
import Notify from "./components/Notify/Notify.vue";

const ops = ref({});
let show = ref(false);

reqHeroData().then((res) => {
  const { code, data } = res;
  try {
    if (code === 200) {
      show.value = true;
      ops.value = { msg: "Heros数据加载成功" };
      window.sessionStorage.setItem("heros", JSON.stringify(data));
      return;
    }
    throw res;
  } catch (err) {
    show.value = true;
    ops.value = { type: "danger", msg: "Heros数据加载失败" };
  } finally {
    setTimeout(() => {
      show.value = false;
    }, 3000);
  }
});
</script>
