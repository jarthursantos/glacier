<template>
  <button @click="click" :class="{ primary, secondary }">
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  props: {
    label: String,
    primary: {
      type: Boolean,
      default: false
    },
    click: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    secondary: function () {
      return !this.primary
    }
  }
}
</script>

<style scoped>
/* base common */
button {
  border-radius: 2px;
  outline: 0;
  padding: 1px;
}

button > span {
  display: block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding-left: 20px;
  padding-right: 20px;
  letter-spacing: 0.5px;
}

/* base primary */

button.primary {
  background-color: #0078D4;
  border: 2px solid #0078D4;
}

button.primary > span {
  color: #fff;
  padding-bottom: 3px;
  padding-top: 3px;
}

/* base secondary */

button.secondary {
  background-color: #FFF;
  border: 1px solid #8A8886;
}

button.secondary > span {
  color: #201F1E;
  border: 1px solid #FFF;
  padding-bottom: 3px;
  padding-top: 3px;
}

/* hover */

button.primary:hover:not(:disabled) {
  background-color: #106EBE;
  border-color: #106EBE;
}

button.secondary:hover:not(:disabled) {
  background-color: #F3F2F1;
  border-color: #8A8886;
}

button.secondary:hover:not(:disabled) > span {
  border-color: #F3F2F1;
}

/* active */

button.primary:active:not(:disabled) {
  background-color: #005A9E;
  border-color: #005A9E;
}

button.secondary:active:not(:disabled) {
  background-color: #EDEBE9;
  border-color: #8A8886;
}

button.secondary:active:not(:disabled) > span {
  border-color: #EDEBE9;
}

/* focused */

button.primary:focus-visible:not(:active) {
  background-color: #FFF;
  border-color: #0078D4;
}

button.primary:focus-visible:not(:active) > span {
  background-color: #0078D4;
}

button.secondary:focus-visible:not(:active) {
  background-color: #fff;
  border-color: #8A8886;
}

button.secondary:focus-visible:not(:active) > span {
  border: 1px solid #323130;
  color: #201F1E;
}

/* disabled */

button:disabled {
  cursor: default;
  background-color: #F3F2F1;
  border-color: #F3F2F1;
}

button:disabled > span {
  color: #A19F9D;
  background-color: #F3F2F1;
  border-color: #F3F2F1;
}
</style>