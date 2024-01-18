<template>
  <div @keyup.down="handleKeyboardNavigation(-1)" @keyup.up="handleKeyboardNavigation" @keyup.enter="search">
    <!-- bg-[rgba(0,0,0,.5)] -->
    <div class="md:pb-16">
      <header class="h-14 md:h-[72px]">
        <div class="mx-3 h-full text-white">
          <div class="flex h-full items-center text-lg font-bold md:text-xl">
            <h1>{{ getGreetingMsg() }}</h1>
            <div class="ml-auto hidden md:flex">{{ getDay() }}</div>
          </div>
        </div>
      </header>
      <div class="hidden md:block">
        <img
          class="peer absolute left-1/2 z-10 h-[10.078125em] w-[7.8125em] -translate-x-1/2 cursor-pointer transition-opacity duration-1000 hover:opacity-20"
          src="https://pic.imgdb.cn/item/659652a1871b83018acfd47d.png"
          alt=""
          @mouseenter="showScriptures = true"
          @mouseleave="showScriptures = false"
        />

        <Transition name="scriptures">
          <div class="text-center font-bold text-yellow-500 transition-all duration-700 ease-linear" v-if="showScriptures">
            <div class="absolute flex w-full flex-row-reverse justify-center gap-1 text-sm lg:gap-2 lg:text-base xl:gap-4">
              <p class="w-5">观自在菩萨</p>
              <p class="w-5">行深般若波罗蜜多时</p>
              <p class="w-5">照见五蕴皆空度一切苦厄</p>
              <p class="w-5">舍利子色不异空空不异色</p>
              <p class="w-5">色即是空空即是色</p>
              <p class="w-5">受想行识亦复如是</p>
              <p class="w-5">舍利子是诸法空相</p>
              <p class="w-5">不生不灭不垢不净不增不减</p>
              <p class="w-5">是故空中无色无受想行识</p>
              <p class="w-5">无眼耳鼻舌身意</p>
              <p class="w-5">无色声香味触法</p>
              <p class="w-5">无眼界乃至无意识界</p>
              <p class="w-5">无无明亦无无明尽</p>
              <p class="w-5">乃至无老死亦无老死尽</p>
              <p class="w-5">无苦集灭道无智亦无得</p>
              <p class="w-5">以无所得故菩提萨埵</p>
              <p class="w-5">依般若波罗蜜多故心无罣碍</p>
              <p class="w-5">无罣碍故无有恐怖</p>
              <p class="w-5">远离颠倒梦想究竟涅槃</p>
              <p class="w-5">三世诸佛依般若波罗蜜多故</p>
              <p class="w-5">得阿耨多罗三藐三菩提</p>
              <p class="w-5">故知般若波罗蜜多</p>
              <p class="w-5">是大神咒是大明咒</p>
              <p class="w-5">是无上咒是无等等咒</p>
              <p class="w-5">能除一切苦真实不虚</p>
              <p class="w-5">故说般若波罗蜜多咒</p>
              <p class="w-5">即说咒曰</p>
              <p class="w-5">揭谛揭谛波罗揭谛</p>
              <p class="w-5">波罗僧揭谛菩提萨婆诃</p>
            </div>
          </div>
        </Transition>
      </div>
      <div class="relative z-10 mx-auto px-3 md:mt-80 md:max-w-[700px] md:px-0">
        <div class="absolute ml-2 flex h-full items-center text-[hsla(0,0%,100%,.7)] md:ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              d="M8.195 0c4.527 0 8.196 3.62 8.196 8.084a7.989 7.989 0 0 1-1.977 5.267l5.388 5.473a.686.686 0 0 1-.015.98a.71.71 0 0 1-.993-.014l-5.383-5.47a8.23 8.23 0 0 1-5.216 1.849C3.67 16.169 0 12.549 0 8.084C0 3.62 3.67 0 8.195 0Zm0 1.386c-3.75 0-6.79 2.999-6.79 6.698c0 3.7 3.04 6.699 6.79 6.699s6.791-3 6.791-6.699c0-3.7-3.04-6.698-6.79-6.698Z"
            />
          </svg>
        </div>
        <input
          class="h-12 w-full cursor-text border-0 bg-[#242424] px-9 text-lg text-white outline-0 placeholder:text-[#b3b3b3] md:h-[52px] md:rounded-[26px] md:px-10"
          type="text"
          placeholder="搜索"
          @focus="openOverlay"
        />
      </div>
    </div>
    <h2 class="mx-auto max-w-[1200px] px-3 py-4 text-xl font-bold text-white md:text-2xl lg:mb-4 xl:px-0">英雄职业</h2>
    <div class="column | mx-auto mb-6 grid max-w-[1200px] auto-rows-[var(--row-h)] grid-cols-[repeat(var(--column-count),minmax(0,1fr))] gap-3 px-3 text-white xl:px-0">
      <a
        class="relative cursor-pointer overflow-hidden rounded-md p-[0.78125em] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:transition-colors after:duration-200 after:ease-in hover:after:bg-[rgba(0,0,0,.2)] lg:p-[0.88888em]"
        v-for="(item, index) in heroTypes"
        :style="`background-color:${item.bgcolor}`"
        @click="$router.push(`/heros/${index + 1}/${item.type}`)"
      >
        <div>
          <img
            class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center shadow-[0_2px_4px_0_rgb(0_0_0_/_20%)]"
            :src="item.ico"
            alt=""
          />
          <span class="absolute z-10 font-bold text-white" style="font-size: var(--type-size)">{{ item.type }}</span>
        </div>
      </a>
    </div>

    <Overlay v-model:show="showOverlay">
      <div class="mx-auto md:mt-[calc(20rem_+_72px)] md:max-w-[700px]" @click.stop>
        <!-- 搜索 -->
        <div class="relative mt-4 px-3 md:mt-0 md:px-0">
          <div class="absolute ml-2 flex h-full items-center text-[hsla(0,0%,100%,.7)] md:ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 20 20">
              <path
                fill="currentColor"
                d="M8.195 0c4.527 0 8.196 3.62 8.196 8.084a7.989 7.989 0 0 1-1.977 5.267l5.388 5.473a.686.686 0 0 1-.015.98a.71.71 0 0 1-.993-.014l-5.383-5.47a8.23 8.23 0 0 1-5.216 1.849C3.67 16.169 0 12.549 0 8.084C0 3.62 3.67 0 8.195 0Zm0 1.386c-3.75 0-6.79 2.999-6.79 6.698c0 3.7 3.04 6.699 6.79 6.699s6.791-3 6.791-6.699c0-3.7-3.04-6.698-6.79-6.698Z"
              />
            </svg>
          </div>

          <input
            class="h-12 w-full border-0 bg-[#242424] px-9 text-lg text-white outline-0 placeholder:text-[#b3b3b3] md:h-[52px] md:rounded-[26px] md:px-10"
            type="text"
            placeholder="搜索"
            v-model.trim="keyword"
            ref="overlayInputRef"
          />
        </div>

        <!-- 查询结果 -->
        <div class="py-3" v-if="filterDataBySearchKeyword.length">
          <div class="px-3 md:px-0">
            <div class="flex flex-col gap-y-4 rounded-xl bg-slate-50 py-4">
              <div
                v-for="(item, index) in filterDataBySearchKeyword"
                class="group flex cursor-pointer items-center gap-x-3 px-6 hover:bg-[rgba(52,167,255,.07)]"
                @click="$router.push(`search/${item.cname}`)"
                :style="`background:${index == activeIndex ? 'linear-gradient(90deg,#edeeef,transparent)' : ''};
            `"
              >
                <img :src="item.iconUrl" class="h-[3em] rounded-md object-cover" alt="" />
                <span class="text-lg text-[#858c96] group-hover:text-black" :style="`color:${index == activeIndex ? '#0d141e' : ''}`">
                  {{ item.cname }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 未查询到结果 -->
        <div class="mt-32 w-full text-white" v-if="!filterDataBySearchKeyword.length && keyword">
          <div class="px-3 text-center md:px-0">没有搜到相关英雄</div>
        </div>
      </div>
    </Overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, computed, onDeactivated } from "vue";
import { useRouter } from "vue-router";
import Overlay from "../../components/Overlay/Overlay.vue";
import heroTypes from "./heroTypes.json";
import { store } from "@/store";

const router = useRouter();
const keyword = ref("");
const overlayInputRef = ref<HTMLInputElement | null>(null);
let activeIndex = ref(-1);
const showScriptures = ref<boolean>();
let showOverlay = ref(false);

const filterDataBySearchKeyword = computed(() => {
  return store.heros.filter((hero) => {
    if (keyword.value) {
      return hero.cname.includes(keyword.value);
    }
  });
});

async function openOverlay() {
  showOverlay.value = true;
  await nextTick();
  overlayInputRef.value?.focus();
}

watch(showOverlay, (val) => !val && (keyword.value = ""));

watch(
  () => keyword.value.length,
  (val) => !val && (activeIndex.value = -1),
);

onDeactivated(() => (showOverlay.value = false));

function handleKeyboardNavigation(n: number | KeyboardEvent) {
  let len = filterDataBySearchKeyword.value.length;
  if (!len) return;
  if (n == -1) {
    activeIndex.value = (activeIndex.value + 1) % len;
  } else {
    activeIndex.value = ((activeIndex.value < 0 ? 0 : activeIndex.value) - 1 + len) % len;
  }
}

function search() {
  if (activeIndex.value < 0) return;
  const heroName = filterDataBySearchKeyword.value[activeIndex.value].cname;
  router.push(`/search/${heroName}`);
}

const getDay = () => {
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
};

const getGreetingMsg = () => {
  const hours = new Date().getHours();
  let greeting;

  switch (true) {
    case hours > 4 && hours <= 11:
      greeting = "Good Morning";
      break;
    case hours > 11 && hours <= 18:
      greeting = "Good Afternoon";
      break;
    case hours > 18 && hours <= 23:
      greeting = "Good Evening";
      break;
    default:
      greeting = "Good Night";
  }

  return greeting;
};
</script>
<style scoped>
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

.scriptures-enter-active,
.scriptures-leave-active {
  transition: opacity 0.6s linear;
}

.scriptures-enter-from,
.scriptures-leave-to {
  opacity: 0;
}
</style>
