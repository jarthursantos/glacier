<template>
  <button tabindex="-1" :class="{ loading }" @click="click">
    <i class="ms-Icon ms-Icon--Clear" aria-hidden="true"></i>
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    click: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style scoped>
button {
  position: absolute;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  height: 32px;
  width: 32px;
  margin-right: 4px;
  transition: all 0.2s ease-in-out;
}

button.loading {
  right: 32px;
}

button > svg {
  fill: #605E5C;
  height: 24px;
  width: 24px;
}

button:hover {
  background-color: #eee;
}

button:active {
  background-color: #ddd;
}
</style>