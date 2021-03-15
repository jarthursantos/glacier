<template>
  <div class="icon__container">
    <i class="ms-Icon ms-Icon--Search" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.icon__container {
  position: absolute;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 24px;
  margin-left: 12px;
}

.icon__container > i {
  color: #004578;

  transition: fill 0.2s ease-in-out;
}
</style>