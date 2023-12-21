<template>
  <Transition name="overlay">
    <div
      class="fixed bottom-0 left-0 right-0 top-0 z-30 bg-[rgba(0,0,0,0.1)] backdrop-blur-3xl"
      :style="`backdrop-filter:blur(${blurVal}px);background-color:${bg};
        transform:translateZ(0)`"
      v-if="show"
      @click="$emit('update:show', false)"
    >
      <button class="absolute right-5 top-5 hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#333333] text-black active:scale-90 md:flex md:hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="2em" viewBox="0 0 12 16">
          <path fill-rule="evenodd" d="M7.48 8l3.75 3.75l-1.48 1.48L6 9.48l-3.75 3.75l-1.48-1.48L4.52 8L.77 4.25l1.48-1.48L6 6.52l3.75-3.75l1.48 1.48L7.48 8z" fill="currentColor" />
        </svg>
      </button>

      <slot></slot>
    </div>
  </Transition>
</template>

<script setup>
defineProps(["show", "blurVal", "bg"]);
defineEmits(["update:show"]);
</script>
<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
