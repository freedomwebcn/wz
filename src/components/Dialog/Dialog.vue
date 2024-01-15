<template>
  <Transition>
    <div class="fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2" v-if="show">
        <slot></slot>
    </div>
  </Transition>
</template>
<script setup lang="ts">
defineProps(["show"]);
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
