<template>
  <div class="list | text-white">
    <header class="sticky top-0 flex items-center px-3 py-4">
      <button class="relative z-40" @click="$router.go(-1)">
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
        <Transition>
          <span class="absolute left-[2.5em] text-xl font-bold" v-if="opval === 1">Type</span>
        </Transition>
      </div>
    </header>
    <div class="mx-auto mb-6 max-w-5xl px-3 pt-12">
      <h2 class="mb-12 px-8 text-3xl font-bold">Type</h2>

      <ul class="grid grid-cols-[repeat(var(--column-count),minmax(0,1fr))] gap-[0.625em]">
        <li
          class="flex cursor-pointer flex-col items-center rounded-md bg-[var(--bg)] p-[0.66664em] transition-colors duration-200 ease-in md:px-0 md:hover:bg-[#282828]"
          v-for="hero in filterHerosData"
          @click="showOverlay = true"
        >
          <img class="mb-2 h-[3.7299em] rounded object-cover" :src="hero.iconUrl" />
          <span class="text-[0.9375em]">{{ hero.cname }}</span>
        </li>
      </ul>
    </div>
  </div>
  <Overlay v-model:show="showOverlay" blurVal="0" bg="rgba(0,0,0,0.7)" />
  <Dialog v-model:show="showOverlay">
    <div class="h-[17em] w-[18.665625em] rounded-md bg-[#242424] font-bold">
      <img class="absolute left-1/2 top-1/2 h-[10.078125em] w-[7.8125em] -translate-x-1/2 -translate-y-1/2 opacity-40" src="./img/01.png" alt="" />
      <div class="flex w-full items-start justify-center text-center text-[#b3b3b3]">
        <span
          class="flex-1 cursor-pointer bg-[#1a1a1a] py-3"
          :class="[
            {
              'active-tab': activeTab === index,
            },
            index == activeTab + 1 && 'tab-bl',
            index == activeTab - 1 && 'tab-br',
          ]"
          @click="activeTab = index"
          v-for="(tab, index) in tabs"
        >
          {{ tab }}
        </span>
      </div>

      <div class="relative z-10 grid auto-rows-[3em] items-center px-4 py-5 text-[#b3b3b3]" v-if="false">
        <div class="grid grid-cols-[2em_2fr_1fr]">
          <span>省</span>
          <span>香港</span>
          <span class="justify-self-end">6555分</span>
        </div>
        <div class="grid grid-cols-[2em_2fr_1fr]">
          <span>市</span>
          <span>白城市</span>
          <span class="justify-self-end">6555分</span>
        </div>
        <div class="grid grid-cols-[2em_2fr_1fr]">
          <span>区</span>
          <span>萨迦县</span>
          <span class="justify-self-end">6555分</span>
        </div>
        <p class="justify-self-end">数据更新时间:2023/12/17 04:50:29</p>
      </div>
      <div class="loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200">
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
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Overlay from "../../components/Overlay/Overlay.vue";
import Dialog from "../../components/Dialog/Dialog.vue";

const props = defineProps(["id"]); //路由参数
let opval = ref(0); //opacity值
let showOverlay = ref(false);
let activeTab = ref(0);
let tabs = ref(["安卓QQ", "安卓WX", "苹果QQ", "苹果WX"]);

const tabRounded = computed(() => {
  return (index) => {
    if (index === activeTab - 1 || index === activeTab + 1) {
      console.log();
      return `tab-${index % 2 === 0 ? 1 : 2}-${index % 2 === 0 ? "br" : "bl"} : ''`;
    }
  };
});
watch(showOverlay, (val) => {
  document.querySelector("body").style.overflow = val ? "hidden" : "auto";
});

const localherosData = JSON.parse(window.sessionStorage.getItem("heros") || "[]");

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
  background-image: linear-gradient(rgba(83, 83, 83, 0.8), transparent 13rem);
}

.active-tab {
  background-color: #242424;
  color: white;
}

/* 点击第二个tab时 第一个tab右下角改变radius */

.tab-bl {
  border-bottom-left-radius: 0.46875em;
}
.tab-br {
  border-bottom-right-radius: 0.46875em;
}

@media (max-width: 319px) {
  .list {
    --column-count: 3;
  }
}

@media (max-width: 240px) {
  .list {
    --column-count: 2;
  }
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
    --column-count: 9;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
