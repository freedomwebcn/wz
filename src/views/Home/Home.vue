<template>
  <!-- bg-[rgba(0,0,0,.5)] -->
  <div class="md:pb-20 lg:pb-28">
    <header>
      <div class="mx-auto">
        <div class="mx-3 py-4 text-white">
          <div class="flex items-center text-lg font-bold md:text-2xl">
            <h1>Good Morning</h1>
            <div class="ml-auto hidden lg:flex">nav</div>
          </div>
        </div>
      </div>
    </header>
    <div class="relative z-40 mx-auto px-3 md:mt-48 md:max-w-[700px] md:px-0">
      <div
        class="absolute left-5 top-2.5 h-5 w-5 text-[hsla(0,0%,100%,.7)] md:left-3 md:top-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M8.195 0c4.527 0 8.196 3.62 8.196 8.084a7.989 7.989 0 0 1-1.977 5.267l5.388 5.473a.686.686 0 0 1-.015.98a.71.71 0 0 1-.993-.014l-5.383-5.47a8.23 8.23 0 0 1-5.216 1.849C3.67 16.169 0 12.549 0 8.084C0 3.62 3.67 0 8.195 0Zm0 1.386c-3.75 0-6.79 2.999-6.79 6.698c0 3.7 3.04 6.699 6.79 6.699s6.791-3 6.791-6.699c0-3.7-3.04-6.698-6.79-6.698Z"
          />
        </svg>
      </div>

      <!-- <input
        class="h-10 w-full rounded-[26px] border-0 bg-[#242424] px-[52px] text-white outline-0 placeholder:text-[#b3b3b3] lg:h-[52px]"
        type="text"
        placeholder="搜索"
      /> -->

      <input
        class="h-10 w-full border-0 bg-[#242424] px-8 text-white outline-0 placeholder:text-[#b3b3b3] md:h-[52px] md:rounded-[26px] md:px-9"
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
    class="mx-auto max-w-[1200px] px-3 py-4 text-xl font-bold text-white md:text-2xl lg:mb-4 lg:text-3xl xl:px-0"
  >
    Hero Type
  </h2>
  <div
    class="column | mx-auto mb-8 grid max-w-[1200px] auto-rows-[var(--row-h)] grid-cols-[repeat(var(--column-count),minmax(0,1fr))] gap-3 px-3 text-white xl:px-0"
  >
    <a
      href=""
      class="relative overflow-hidden rounded-lg bg-[var(--type-bg-1)]"
      style="padding: var(--type-pd)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center"
          src="https://i.scdn.co/image/ab67fb8200008e2c64adf130003faa51378e3d2b"
          alt=""
        />
        <span class="absolute font-bold" style="font-size: var(--type-size)"
          >欢乐假日</span
        >
      </div>
    </a>

    <a
      href=""
      class="relative overflow-hidden rounded-lg bg-[var(--type-bg-2)]"
      style="padding: var(--type-pd)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center"
          src="https://i.scdn.co/image/ab67fb8200008e2c64adf130003faa51378e3d2b"
          alt=""
        />
        <span class="absolute font-bold" style="font-size: var(--type-size)"
          >欢乐假日</span
        >
      </div>
    </a>

    <a
      href=""
      class="relative overflow-hidden rounded-lg bg-[var(--type-bg-3)]"
      style="padding: var(--type-pd)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center"
          src="https://i.scdn.co/image/ab67fb8200008e2c64adf130003faa51378e3d2b"
          alt=""
        />
        <span class="absolute font-bold" style="font-size: var(--type-size)"
          >欢乐假日</span
        >
      </div>
    </a>

    <a
      href=""
      class="relative overflow-hidden rounded-lg bg-[var(--type-bg-4)]"
      style="padding: var(--type-pd)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center"
          src="https://i.scdn.co/image/ab67fb8200008e2c64adf130003faa51378e3d2b"
          alt=""
        />
        <span class="absolute font-bold" style="font-size: var(--type-size)"
          >欢乐假日</span
        >
      </div>
    </a>

    <a
      href=""
      class="relative overflow-hidden rounded-lg bg-[var(--type-bg-5)]"
      style="padding: var(--type-pd)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center"
          src="https://i.scdn.co/image/ab67fb8200008e2c64adf130003faa51378e3d2b"
          alt=""
        />
        <span class="absolute font-bold" style="font-size: var(--type-size)"
          >欢乐假日</span
        >
      </div>
    </a>

    <a
      href=""
      class="relative overflow-hidden rounded-lg bg-[var(--type-bg-6)]"
      style="padding: var(--type-pd)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center"
          src="https://i.scdn.co/image/ab67fb8200008e2c64adf130003faa51378e3d2b"
          alt=""
        />
        <span class="absolute font-bold" style="font-size: var(--type-size)"
          >欢乐假日</span
        >
      </div>
    </a>

    <a
      href=""
      class="relative overflow-hidden rounded-lg bg-[var(--type-bg-7)]"
      style="padding: var(--type-pd)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center"
          src="https://i.scdn.co/image/ab67fb8200008e2c64adf130003faa51378e3d2b"
          alt=""
        />
        <span class="absolute font-bold" style="font-size: var(--type-size)"
          >欢乐假日</span
        >
      </div>
    </a>

    <a
      href=""
      class="relative overflow-hidden rounded-lg bg-[var(--type-bg-8)]"
      style="padding: var(--type-pd)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center"
          src="https://i.scdn.co/image/ab67fb8200008e2c64adf130003faa51378e3d2b"
          alt=""
        />
        <span class="absolute font-bold" style="font-size: var(--type-size)"
          >欢乐假日</span
        >
      </div>
    </a>

    <a
      href=""
      class="relative overflow-hidden rounded-lg bg-[var(--type-bg-9)]"
      style="padding: var(--type-pd)"
    >
      <div>
        <img
          class="absolute bottom-0 right-0 h-[var(--img-size)] w-[var(--img-size)] translate-x-[18%] translate-y-[-2%] rotate-[25deg] object-cover object-center"
          src="https://i.scdn.co/image/ab67fb8200008e2c64adf130003faa51378e3d2b"
          alt=""
        />
        <span class="absolute font-bold" style="font-size: var(--type-size)"
          >欢乐假日</span
        >
      </div>
    </a>
  </div>

  <Teleport to="body">
    <Transition>
      <div
        class="absolute bottom-0 left-0 right-0 top-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-3xl"
        v-show="showOverlay"
        @click="showOverlay = false"
      >
        <div
          class="absolute right-5 top-5 hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#333333] text-white md:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="2em"
            viewBox="0 0 12 16"
          >
            <path
              fill-rule="evenodd"
              d="M7.48 8l3.75 3.75l-1.48 1.48L6 9.48l-3.75 3.75l-1.48-1.48L4.52 8L.77 4.25l1.48-1.48L6 6.52l3.75-3.75l1.48 1.48L7.48 8z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";

let showOverlay = ref(false);

const focus = () => (showOverlay.value = true);
</script>
<style>
.column {
  --column-count: 2;
  --row-h: 8em;
  --img-size: 4em;
  --type-size: 1.2em;
  --type-pd: 8px;
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

@media (min-width: 321px) {
  .column {
    /* --row-h: 90px; */
    /* --img-size: 50px; */
    /* --type-size: 16px; */
  }
}

@media (min-width: 376px) {
  .column {
    /* --row-h: 100px; */
    /* --img-size: 55px; */
  }
}

@media (min-width: 415px) {
  .column {
    /* --row-h: 116px; */
    /* --img-size: 60px; */
    /* --type-size: 17px; */
  }
}

@media (min-width: 540px) {
  .column {
    --column-count: 3;
    /* --row-h: 125px; */
  }
}

@media (min-width: 768px) {
  .column {
    --column-count: 4;
    /* --row-h: 130px; */
    /* --img-size: 65px; */
    /* --type-size: 20px; */
  }
}

@media (min-width: 1024px) {
  .column {
    --column-count: 5;
    /* --row-h: 156px; */
    /* --img-size: 75px; */
    /* --type-size: 24px; */
    --type-pd: 16px;
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
