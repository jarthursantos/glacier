<template>
  <div class="panel__wrapper">
    <slot></slot>

    <div class="panel__footer">
      <div>
        <small>TAB</small> ou <small>Shift</small> <small>TAB</small> para navegar
      </div>

      <div>
        <small>Enter</small> para selecionar
      </div>

      <div>
        <small>Esc</small> para fechar
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.panel__wrapper {
  position: absolute;
  background-color: #FFF;
  margin-top: 4px;
  border-radius: 2px;
  width: 100%;
  z-index: 1;
  padding-top: 8px;
}

section + section {
  margin-top: 8px;
}

.panel__footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid #ccc;
  padding: 12px 16px;
  font-size: 13px;
}

small {
  display: inline-block;

  background-color: #333;
  color: #fff;
  border-radius: 2px;
  padding: 2px 6px;
  font-weight: 500;
  text-transform: uppercase;
}


@media (max-width: 550px) {
  .panel__footer { display: none; }
}
</style>