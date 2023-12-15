<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import { reqHeroData } from "@/api";

reqHeroData().then((data) => {
  window.sessionStorage.setItem('heros',JSON.stringify(data))
});
</script>
