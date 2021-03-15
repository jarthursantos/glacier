<template>
  <div class="wrapper">
    <div class="content">
      <Separator label="Recém Acessados" />
      <Recents />

      <Separator label="Solicitações Pendentes" />
      <Pending />
      
      <Separator label="Solicitações Concluidas" />
      <Pending />
    </div>
  </div>
</template>

<script>
import Separator from './Separator'
import Pending from './Pending'
import Recents from './Recents'

export default {
  components: {
    Separator,
    Pending,
    Recents,
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