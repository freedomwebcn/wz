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

reqHeroData().then((res) => {
  const { code, data } = res;
  try {
    if (code === 200) {
      window.sessionStorage.setItem("heros", JSON.stringify(data));
      return;
    }
    throw res;
  } catch (err) {
    show.value = true;
    notifyProps.value = { type: "danger", msg: "Heros数据加载失败" };
    setTimeout(() => {
      show.value = false;
    }, 3000);
  }
});
</script>
