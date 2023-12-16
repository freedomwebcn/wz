<template>
  <Transition>
    <div
      class="notify | absolute top-0 z-[999] flex h-14 w-full items-center justify-center text-lg text-white"
      v-if="show"
      :style="`background-color: ${bgcolor} `"
    >
      <p>{{ msg }}</p>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  show: Boolean,

  msg: {
    default: "这是一条通知",
    validator(value) {
      if (!value || typeof value != "string") {
        return false;
      }
      return true;
    },
  },

  type: {
    type: String,
    default: "success",
  },
});

const bgcolor = computed(() => {
  switch (props.type) {
    case "success":
      return "var(--success-bg)";
    case "danger":
      return "var(--danger-bg)";
    default:
      return "var(--primary-bg";
  }
});
</script>

<style scoped>
.notify {
  --primary-bg: #1989fa;
  --success-bg: rgb(34, 197, 94);
  --danger-bg: #ee0a24;
}
.v-enter-active,
.v-leave-active {
  transform: translateY(0);
  transition: 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
