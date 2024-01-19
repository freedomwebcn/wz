<template>
  <div class="heros—page | text-white">
    <header class="sticky top-0 flex h-[4em] items-center px-3 py-4">
      <button class="relative z-40 md:hover:text-green-400" @click="$router.replace('/home')">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <g fill="none" fill-rule="evenodd">
            <path
              d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
            />
            <path fill="currentColor" d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.121 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122L7.938 13.06Z" />
          </g>
        </svg>
      </button>
      <div class="absolute left-0 right-0 flex h-full items-center bg-[var(--bg)] px-[3em]" :style="{ opacity: opval }">
        <Transition name="hero-type">
          <span class="text-xl font-bold transition-all duration-700 ease-linear" v-if="opval === 1">{{ type }}</span>
        </Transition>
      </div>
    </header>
    <div class="mx-auto mb-6 max-w-5xl px-3 pt-12">
      <h2 class="mb-12 px-8 text-3xl font-bold" ref="heroTypeRef">{{ type }}</h2>

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
  <Overlay v-model:show="showOverlay" blurVal="0" bg="rgba(0,0,0,0.7)" :isShowBtn="false">
    <Dialog>
      <div class="h-[23.4375em] w-[80vw] overflow-hidden rounded-md bg-[rgb(13,18,24)] font-bold min-[414px]:w-[25em]">
        <div class="relative h-[7.5em] w-full bg-[#333]" :class="[!imgloaded && 'loading']">
          <img
            class="h-full w-full object-cover transition-opacity duration-500 ease-in"
            src="https://pic.imgdb.cn/item/65a5e68a871b83018a4111d1.jpg"
            @load="imgloaded = true"
            :style="`opacity:${imgloaded ? 1 : 0}`"
          />
        </div>
        <!-- tab -->
        <div
          class="relative flex h-[2.96em] justify-center text-base text-[#6a6a6a] before:absolute before:-top-full before:left-0 before:right-0 before:h-full before:bg-gradient-to-t before:from-[rgb(13,18,24)] before:to-transparent"
        >
          <button class="relative z-10 flex-1 cursor-pointer" :class="[index === activeTab && 'text-gray-300']" @click="getHeroPowerData(index)" v-for="(item, index) in types">
            {{ item.type }}
          </button>
          <span class="hairline | absolute h-full w-[95%]"></span>
        </div>

        <!-- 展示数据 -->
        <div class="relative z-10 grid animate-fadeIn gap-6 px-4 pt-4 text-gray-300" v-if="powerData?.province">
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

          <p class="justify-self-end">数据更新时间:{{ powerData.updatetime }}</p>
        </div>

        <!-- 加载中 -->
        <div class="relative z-20 flex h-[calc(100%_-_10.46em)] items-center justify-center text-gray-200" v-if="!powerData?.province && loadingError == null">
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
        <!-- 加载失败 -->
        <div class="relative z-20 flex h-[calc(100%_-_10.46em)] cursor-pointer flex-col items-center justify-center gap-y-5 text-gray-500" v-if="loadingError" @click="getHeroPowerData(activeTab)">
          <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
            <path fill="#e11d48" d="M11.001 10h2v5h-2zM11 16h2v2h-2z" />
            <path
              fill="#e11d48"
              d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968zM4.661 19L12 5.137L19.344 19z"
            />
          </svg>
          <p class="text-white">数据请求失败，点击重试 !</p>
        </div>
      </div>
    </Dialog>
  </Overlay>

  <Notify v-bind="notifyProps" v-model:show="showNotify" />
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import Overlay from "../../components/Overlay/Overlay.vue";
import Dialog from "../../components/Dialog/Dialog.vue";
import Notify from "../../components/Notify/Notify.vue";
import { reqHeroPower } from "@/api";
import types from "@/assets/gameTypes.json";
import type { heroPowerResType } from "#/axios";
import { store } from "@/store";
type herosInfoType = { cname: string; hero_type: number; iconUrl: string };

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
const heroTypeRef = ref<HTMLElement | null>(null);

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
    setTimeout(() => (powerData.value = data), getRandomInt(500, 1000));
  } catch (err) {
    loadingError.value = true; //请求失败--显示加载失败时的svg
    showNotify.value = true; //显示加载失败通知
    notifyProps.value = { type: "danger", msg: "战力数据请求失败" };
    setTimeout(() => (showNotify.value = false), 3000);
  }
}

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const filterHerosData = computed(() => store.heros.filter((item) => item.hero_type === props.id * 1));

// 查询战力模态框显示时 禁止页面滚动
watch(showOverlay, (val) => (document.querySelector("body")!.style.overflow = val ? "hidden" : "auto"));

function throttle(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return function () {
    if (timer === null) {
      fn();
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}

let totalDistance: number;
const getPos = throttle(() => {
  const CH = heroTypeRef.value?.clientHeight ?? 0;
  const OT = heroTypeRef.value?.offsetTop ?? 0;
  totalDistance = CH + OT;
}, 500);

window.addEventListener("resize", getPos);
onMounted(() => getPos());

// Math.abs(window.scrollY) / totalDistance: 获取页面滚动距离与指定元素距离页面顶部 + 自身高度的比例
window.addEventListener("scroll", () => (opval.value = Math.min(Math.abs(window.scrollY) / totalDistance, 1)));
</script>

<style scoped>
.heros—page {
  --column-count: 4;
  --bg: #181818;
  background-image: linear-gradient(rgba(83, 83, 83, 0.8), transparent 13rem);
}

.hairline::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  border-bottom: 1px solid #636363;
  transform-origin: left top;
  transform: scale(0.5);
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

.hero-type-enter-active,
.hero-type-leave-active {
  transition: opacity 0.6s linear;
}

.hero-type-enter-from,
.hero-type-leave-to {
  opacity: 0;
}
</style>
