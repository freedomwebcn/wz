<template>
  <Transition>
    <div class="fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2" @click.stop>
      <slot></slot>
    </div>
  </Transition>
</template>
