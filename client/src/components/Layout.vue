<template>
  <main>
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style scoped>
main {
  display: grid;

  grid-template-columns: 100vw;
  grid-template-rows: 48px calc(100vh - 48px);
  grid-template-areas:
    'HEADER'
    'CONTENT';
}
</style>