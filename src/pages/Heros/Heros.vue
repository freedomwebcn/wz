<template>
  <div class="heros—page | text-white">
    <header class="sticky top-0 flex items-center px-3 py-4">
      <button class="relative z-40 md:hover:text-green-400" @click="$router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <g fill="none" fill-rule="evenodd">
            <path
              d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
            />
            <path fill="currentColor" d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.121 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122L7.938 13.06Z" />
          </g>
        </svg>
      </button>
      <div class="absolute left-0 right-0 flex h-[3.99921875em] items-center bg-[var(--bg)]" :style="{ opacity: opval }">
        <span class="absolute left-[2.5em] animate-fadeIn text-xl font-bold" v-if="opval === 1">Type</span>
      </div>
    </header>
    <div class="mx-auto mb-6 max-w-5xl px-3 pt-12">
      <h2 class="mb-12 px-8 text-3xl font-bold">{{ type }}</h2>

      <ul class="grid grid-cols-[repeat(var(--column-count),minmax(0,1fr))] gap-[0.625em]">
        <!-- 展示英雄数据 -->
        <li
          class="flex cursor-pointer flex-col items-center rounded-md bg-[var(--bg)] p-[0.66664em] transition-colors duration-200 ease-in active:bg-transparent md:px-0 md:hover:bg-[#282828]"
          v-for="hero in filterHerosData"
          @click="openOverlay(hero)"
        >
          <img class="mb-2 h-[3.7299em] rounded object-cover" :src="hero.iconUrl" />
          <span class="text-[0.9375em]">{{ hero.cname }}</span>
        </li>
      </ul>
    </div>
  </div>
  <Overlay v-model:show="showOverlay" blurVal="0" bg="rgba(0,0,0,0.7)" />
  <Dialog v-model:show="showOverlay">
    <div class="h-[23.4375em] w-[80vw] overflow-hidden rounded-md bg-[rgb(13,18,24)] font-bold min-[414px]:w-[25em]">
      <div class="relative h-[7.5em] w-full" :class="[!imgloaded && 'loading']">
        <img class="h-full w-full object-cover transition-opacity duration-500 ease-in" src="./imgs/bg.jpg" @load="imgloaded = true" :style="`opacity:${imgloaded ? 1 : 0}`" />
      </div>
      <!-- tab -->
      <div
        class="relative grid h-[2.96em] grid-cols-4 text-center text-base text-gray-50 before:absolute before:-top-full before:left-0 before:right-0 before:h-full before:bg-gradient-to-t before:from-[rgb(13,18,24)] before:to-transparent"
      >
        <!-- index === activeTab + 1 && 'rounded-bl-lg', index === activeTab - 1 && 'rounded-br-lg' -->
        <button class="relative flex-1 cursor-pointer" :class="[index === activeTab && ' text-green-500']" @click="getHeroPowerData(index)" v-for="(item, index) in types">
          {{ item.type }}
        </button>
      </div>

      <!-- 展示数据 -->
      <div class="relative z-10 grid animate-fadeIn gap-6 px-4 pt-4 text-green-500" v-if="powerData?.province">
        <div class="grid grid-cols-[2em_2fr_1fr]">
          <span>省</span>
          <span>{{ powerData.province }}</span>
          <span class="justify-self-end">{{ powerData.provincePower }}分</span>
        </div>
        <div class="grid grid-cols-[2em_2fr_1fr]">
          <span>市</span>
          <span>{{ powerData.city }}</span>
          <span class="justify-self-end">{{ powerData.cityPower }}分</span>
        </div>
        <div class="grid grid-cols-[2em_2fr_1fr]">
          <span>区</span>
          <span>{{ powerData.area }}</span>
          <span class="justify-self-end">{{ powerData.areaPower }}分</span>
        </div>

        <p class="justify-self-end pb-5">数据更新时间:{{ powerData.updatetime }}</p>
      </div>

      <div class="grid gap-4 px-4 pt-4" v-if="!powerData?.province && loadingError == null">
        <div class="loading | relative h-[2em] overflow-hidden rounded-2xl bg-[#333]"></div>
        <div class="loading loading-delay_100ms | relative h-[2em] animate-[100ms] overflow-hidden rounded-2xl bg-[#333]"></div>
        <div class="loading loading-delay_200ms | relative h-[2em] animate-[200ms] overflow-hidden rounded-2xl bg-[#333]"></div>
        <div class="loading loading-delay_300ms | relative h-[2em] w-8/12 animate-[300ms] justify-self-end overflow-hidden rounded-2xl bg-[#333]"></div>
      </div>

      <!-- 加载中 -->
      <!-- <div class="loading relative z-20 flex h-[calc(100%_-_10.46em)] items-center justify-center text-gray-200" v-if="!powerData?.province && loadingError == null">
        <svg xmlns="http://www.w3.org/2000/svg" width="4.6em" height="4.6em" viewBox="0 0 24 24">
          <circle cx="18" cy="12" r="0" fill="currentColor">
            <animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
          </circle>
          <circle cx="12" cy="12" r="0" fill="currentColor">
            <animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
          </circle>
          <circle cx="6" cy="12" r="0" fill="currentColor">
            <animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
          </circle>
        </svg>
      </div> -->
      <!-- 加载失败 -->
      <div class="relative z-20 flex h-[calc(100%_-_10.46em)] cursor-pointer flex-col items-center justify-center gap-y-5 text-gray-500" v-if="loadingError" @click="getHeroPowerData(activeTab)">
        <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m14.436 15.497l6.283 6.284a.75.75 0 0 0 1.061-1.061L3.28 2.22a.75.75 0 1 0-1.06 1.06L5.939 7l-1.836 5.153a1.75 1.75 0 0 0 1.642 2.337l1.568.006l-1.269 5.669c-.33 1.477 1.487 2.459 2.541 1.371zm5.21-5.377l-3.122 3.222l-9.47-9.47l.37-1.041A1.25 1.25 0 0 1 8.602 2h6.453a1.25 1.25 0 0 1 1.186 1.645L14.79 8h3.958c1.104 0 1.666 1.327.898 2.12"
          />
        </svg>
        <p class="text-white">数据请求失败，点击重试！</p>
      </div>
    </div>
  </Dialog>

  <Notify v-bind="notifyProps" v-model:show="showNotify" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Overlay from "../../components/Overlay/Overlay.vue";
import Dialog from "../../components/Dialog/Dialog.vue";
import Notify from "../../components/Notify/Notify.vue";
import { reqHeroPower } from "@/api";
import types from "@/assets/types.json";
import type { heroPowerResType } from "#/axios";
type herosInfoType = { cname: string; hero_type: number; iconUrl: string };

import { store } from "@/store";
const props = defineProps(["id", "type"]); //路由参数
let opval = ref(0); //opacity值
let showOverlay = ref(false);
let activeTab = ref<number>(0);
let powerData = ref<heroPowerResType | null>();
let currentHeroName = "";
let loadingError = ref<boolean | null>(null); //请求战力数据状态
let showNotify = ref(false);
const notifyProps = ref({});
let imgloaded = ref(false);

const openOverlay = (currentHero: herosInfoType) => {
  showOverlay.value = true;
  currentHeroName = currentHero.cname;
  getHeroPowerData(0); //每次打开overlay都默认请求第一个tab数据
};

async function getHeroPowerData(index: number) {
  powerData.value = null;
  activeTab.value = index;
  loadingError.value = null;
  const type = types[activeTab.value].param;

  try {
    const { code, data } = await reqHeroPower({ currentHeroName, type });
    if (code !== 200) throw new Error("战力数据请求失败");
    powerData.value = data;
  } catch (err) {
    loadingError.value = true; //请求失败--显示加载失败时的svg
    showNotify.value = true; //显示加载失败通知
    notifyProps.value = { type: "danger", msg: "战力数据请求失败" };
    setTimeout(() => (showNotify.value = false), 3000);
  }
}

const filterHerosData = computed(() => store.heros.filter((item) => item.hero_type === props.id * 1));

watch(showOverlay, (val) => {
  document.querySelector("body")!.style.overflow = val ? "hidden" : "auto";
});

// 监听页面滚动事件
window.addEventListener("scroll", () => (opval.value = Math.max(Math.min(1 - (118 - window.scrollY) / 118, 1))));
</script>

<style scoped>
.heros—page {
  --column-count: 4;
  --bg: #181818;
  background-image: linear-gradient(rgba(83, 83, 83, 0.8), transparent 13rem);
}

.loading::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(90deg, transparent, hsla(0, 0%, 100%, 0.1), transparent);
  animation: shimmer 2s infinite;
}

.loading-delay_100ms::before {
  animation-delay: 100ms;
}
.loading-delay_200ms::before {
  animation-delay: 200ms;
}
.loading-delay_300ms::before {
  animation-delay: 300ms;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}

@media (max-width: 319px) {
  .heros—page {
    --column-count: 3;
  }
}

@media (max-width: 240px) {
  .heros—page {
    --column-count: 2;
  }
}

@media (min-width: 415px) {
  .heros—page {
    --column-count: 5;
  }
}

@media (min-width: 560px) {
  .heros—page {
    --column-count: 6;
  }
}

@media (min-width: 768px) {
  .heros—page {
    --column-count: 7;
  }
}
@media (min-width: 1024px) {
  .heros—page {
    --column-count: 9;
  }
}
</style>
