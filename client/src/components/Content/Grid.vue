<template>
  <div class="grid__wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.grid__wrapper {
  display: grid;
  column-gap: 16px;
  row-gap: 16px;
  grid-template-columns: repeat(4, 1fr);

  padding: 16px 0 48px;
}

@media (max-width: 1050px) {
  .grid__wrapper { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 800px) {
  .grid__wrapper { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 550px) {
  .grid__wrapper { grid-template-columns: repeat(1, 1fr); }
}
</style>