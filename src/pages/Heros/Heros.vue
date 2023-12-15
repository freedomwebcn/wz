<template>
  <div class="list | text-white">
    <header class="sticky top-0 flex items-center px-3 py-4">
      <button class="relative z-40" @click="$router.go(-1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
            />
            <path
              fill="currentColor"
              d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.121 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122L7.938 13.06Z"
            />
          </g>
        </svg>
      </button>
      <div
        class="absolute left-0 right-0 flex h-[3.99921875em] items-center bg-[var(--bg)]"
        :style="{ opacity: opval }"
      >
        <span class="absolute left-[2.5em] text-xl font-bold">Type</span>
      </div>
    </header>
    <div class="mx-auto mb-6 max-w-[1200px] px-3 pt-12">
      <h2 class="mb-12 px-8 text-3xl font-bold">Type</h2>

      <ul
        class="grid grid-cols-[repeat(var(--column-count),minmax(0,1fr))] gap-[0.625em]"
      >
        <li
          class="flex cursor-pointer flex-col items-center rounded-md bg-[var(--bg)] p-[0.66664em] md:px-0"
          v-for="hero in filterHerosData"
        >
          <img
            class="mb-2 h-[3.7299em] rounded object-cover"
            :src="hero.iconUrl"
          />
          <span class="text-[0.9375em]">{{ hero.cname }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps(["id"]); //路由参数
let opval = ref(0); //opacity值

const localherosData = JSON.parse(
  window.sessionStorage.getItem("heros") || "[]",
);

const filterHerosData = computed(() => {
  return localherosData.filter((item) => item.hero_type === props.id * 1);
});

// 监听页面滚动事件
window.addEventListener("scroll", function (e) {
  opval.value = Math.max(Math.min(1 - (118 - window.scrollY) / 118, 1));
});
</script>

<style scoped>
.list {
  --column-count: 4;
  --bg: #181818;
  background-image: linear-gradient(rgba(83, 83, 83, 0.8), transparent 14rem);
}

@media (min-width: 415px) {
  .list {
    --column-count: 5;
  }
}

@media (min-width: 560px) {
  .list {
    --column-count: 6;
  }
}

@media (min-width: 768px) {
  .list {
    --column-count: 7;
  }
}
@media (min-width: 1024px) {
  .list {
    --column-count: 8;
  }
}
</style>
