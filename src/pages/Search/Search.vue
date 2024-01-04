<template>
  <div class="before:fixed before:h-full before:w-full before:bg-[url('https://pic.imgdb.cn/item/65964cb5871b83018abf1870.png')] before:bg-[length:25em_20.13em] before:bg-center before:bg-no-repeat before:opacity-70">
    <header class="flex items-center px-3 py-4 text-white">
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
    </header>
    <div class="mx-auto max-w-5xl text-white" style="height: calc(var(--vh) - 4em)">
      <div class="relative z-50 h-full px-3" v-if="data.length">
        <div class="grid h-full grid-rows-[2.5em_23%_23%_23%_23%]">
          <div class="grid grid-cols-[1fr_2fr_1fr] justify-items-center border-b-[1px]">
            <span>区服</span>
            <span>地区(省/市/区标)</span>
            <span>分数</span>
          </div>
          <div
            class="grid grid-cols-[1fr_2fr_1fr] items-center justify-items-center"
            v-for="(item, index) in data"
            :style="`border-bottom: ${index == data.length - 1 ? 'none' : '1px  solid #EBEDF0'}`"
          >
            <span class="row-span-3"> {{ types[index].type }} </span>
            <span>{{ item.province }} </span>
            <span> {{ item.provincePower }}分 </span>
            <span>{{ item.city }}</span>
            <span> {{ item.cityPower }}分 </span>
            <span>{{ item.area }} </span>
            <span> {{ item.areaPower }}分 </span>
          </div>
        </div>
      </div>

      <div class="loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200" v-if="!data.length && loadingError == null">
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

      <div class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center" v-if="loadingError">
        <div class="flex cursor-pointer flex-col items-center" @click="getHeroPower">
          <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
            <path
              fill="#e11d48"
              d="m14.436 15.497l6.283 6.284a.75.75 0 0 0 1.061-1.061L3.28 2.22a.75.75 0 1 0-1.06 1.06L5.939 7l-1.836 5.153a1.75 1.75 0 0 0 1.642 2.337l1.568.006l-1.269 5.669c-.33 1.477 1.487 2.459 2.541 1.371zm5.21-5.377l-3.122 3.222l-9.47-9.47l.37-1.041A1.25 1.25 0 0 1 8.602 2h6.453a1.25 1.25 0 0 1 1.186 1.645L14.79 8h3.958c1.104 0 1.666 1.327.898 2.12"
            />
          </svg>
          <p class="text-white">数据请求失败，点击重试！</p>
        </div>
      </div>
    </div>
  </div>

  <Notify v-bind="notifyProps" v-model:show="showNotify" />
</template>

<script setup>
import { ref } from "vue";
import { reqHeroPower } from "@/api";
import types from "@/assets/types.json";
import Notify from "../../components/Notify/Notify.vue";

const props = defineProps(["name"]);
const data = ref([]);
let resArr = [];
const loadingError = ref(null);
const notifyProps = ref({});
let showNotify = ref(false);

function getHeroPower() {
  loadingError.value = null;
  resArr = [];
  types.forEach((typeObj) => {
    resArr.push(
      new Promise((resolve, reject) => {
        reqHeroPower({ currentHeroName: props.name, type: typeObj.param }).then((val) => {
          const { code, data } = val;
          if (code != 200) reject(val);
          resolve(data);
        });
      }),
    );
  });

  Promise.all(resArr)
    .then((vals) => {
      data.value = vals;
    })
    .catch((error) => {
      loadingError.value = true;
      showNotify.value = true;
      notifyProps.value = { type: "danger", msg: `${error.msg}` };
      setTimeout(() => (showNotify.value = false), 3000);
    });
}
getHeroPower();
</script>
