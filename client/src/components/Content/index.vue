<template>
  <div class="wrapper">
    <div class="content">
      <Separator label="Solicitações Pendentes" />
      <Pending />
      
      <Separator label="Solicitações Concluidas" />
      <Completed />
    </div>
  </div>
</template>

<script>
import Separator from './Separator'
import Pending from './Pending'
import Completed from './Completed'

export default {
  components: {
    Separator,
    Pending,
    Completed,
  }
}
</script>

<style scoped>
.wrapper {
  grid-area: CONTENT;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 32px 24px;
}

.content {
  width: 100%;
  max-width: 1080px;
}
</style>