<template>
  <div class="wrapper" :class="{ active: loading }">
    <LoadingIndicator />
  </div>
</template>

<script>
import LoadingIndicator from '../../LoadingIndicator'

export default {
  components: {
    LoadingIndicator
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  right: 0;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

  height: 32px;
  width: 40px;

  transition: all 0.2s ease-in-out;
}

.wrapper.active {
  opacity: 1;
}

svg {
  height: 20px;
  width: 20px;
  fill: #666;
}
</style>