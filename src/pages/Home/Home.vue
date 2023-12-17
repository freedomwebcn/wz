<template>
  <!-- bg-[rgba(0,0,0,.5)] -->
  <div class="md:pb-20 lg:pb-28">
    <header>
      <div class="mx-auto">
        <div class="mx-3 py-4 text-white">
          <div class="flex items-center text-lg font-bold md:text-xl">
            <h1>{{ getGreetingMsg() }}</h1>
            <div class="ml-auto hidden lg:flex">{{ getDay() }}</div>
          </div>
        </div>
      </div>
    </header>
    <div class="relative z-40 mx-auto px-3 md:mt-48 md:max-w-[700px] md:px-0">
      <div
        class="absolute ml-2 flex h-full items-center text-[hsla(0,0%,100%,.7)] md:ml-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M8.195 0c4.527 0 8.196 3.62 8.196 8.084a7.989 7.989 0 0 1-1.977 5.267l5.388 5.473a.686.686 0 0 1-.015.98a.71.71 0 0 1-.993-.014l-5.383-5.47a8.23 8.23 0 0 1-5.216 1.849C3.67 16.169 0 12.549 0 8.084C0 3.62 3.67 0 8.195 0Zm0 1.386c-3.75 0-6.79 2.999-6.79 6.698c0 3.7 3.04 6.699 6.79 6.699s6.791-3 6.791-6.699c0-3.7-3.04-6.698-6.79-6.698Z"
          />
        </svg>
      </div>

      <input
        class="h-12 w-full border-0 bg-[#242424] px-8 text-lg text-white outline-0 placeholder:text-[#b3b3b3] hover:bg-[#333333] md:h-[52px] md:rounded-[26px] md:px-9"
        type="text"
        placeholder="搜索"
        @focus="focus"
      />
      <!-- <div class="relative top-5 w-full rounded-md bg-slate-50 py-3"
      v-show="showOverlay"
      >
        <span class="block h-10 px-6">1</span>
      </div> -->
    </div>
  </div>
  <h2
    class="mx-auto max-w-[1200px] px-3 py-4 text-xl font-bold text-white md:text-2xl lg:mb-4 xl:px-0"
  >
    英雄职业
  </h2>
  <div
    class="column | mx-auto mb-8 grid max-w-[1200px] auto-rows-[var(--row-h)] grid-cols-[repeat(var(--column-count),minmax(0,1fr))] gap-3 px-3 text-white xl:px-0"
  >
    <a
      class="relative cursor-pointer overflow-hidden rounded-md p-[0.78125em] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:transition-colors after:duration-200 after:ease-in hover:after:bg-[rgba(0,0,0,.2)] lg:p-[0.88888em]"
      v-for="(item, index) in herosType"
      :style="`background-color:${item.bgcolor}`"
      @click="$router.push(`/heros/${index + 1}`)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center shadow-[0_2px_4px_0_rgb(0_0_0_/_20%)]"
          :src="item.ico"
          alt=""
        />
        <span
          class="absolute z-10 font-bold text-white"
          style="font-size: var(--type-size)"
          >{{ item.type }}</span
        >
      </div>
    </a>
  </div>
  <Overlay v-model:show="showOverlay" />
</template>

<script setup>
import { ref } from "vue";

import Overlay from "../../components/Overlay/Overlay.vue";
import herosType from "./herosType.json";

let showOverlay = ref(false);

const focus = () => (showOverlay.value = true);

const getDay = () => {
  const options = { weekday: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
};

const getGreetingMsg = () => {
  const hours = new Date().getHours();
  let greeting;

  switch (true) {
    case hours > 4 && hours <= 11:
      greeting = "Good morning";
      break;
    case hours > 11 && hours <= 18:
      greeting = "Good afternoon";
      break;
    case hours > 18 && hours <= 23:
      greeting = "Good evening";
      break;
    default:
      greeting = "Good night";
  }

  return greeting;
};
</script>
<style>
.column {
  --column-count: 2;
  --row-h: 7.2em;
  --img-size: 4em;
  --type-size: 1.1em;
  --type-bg-1: rgb(132, 0, 231);
  --type-bg-2: rgb(20, 138, 8);
  --type-bg-3: rgb(13, 115, 236);
  --type-bg-4: rgb(233, 20, 41);
  --type-bg-5: rgb(30, 50, 100);
  --type-bg-6: rgb(225, 51, 0);
  --type-bg-7: rgb(232, 17, 91);
  --type-bg-8: rgb(80, 55, 80);
  --type-bg-9: rgb(225, 17, 140);
}

@media (min-width: 540px) {
  .column {
    --column-count: 3;
  }
}

@media (min-width: 1024px) {
  .column {
    --column-count: 5;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
