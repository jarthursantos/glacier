<template>
  <div class="backdrop" :class="{ open }" />
</template>

<script>
export default {
  name: 'SearchBarBackdrop',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  pointer-events: none;

  transition: background-color 0.2s ease-in-out;
}

.backdrop.open {
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: initial;
}
</style>