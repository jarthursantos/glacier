<template>
  <div>
    <strong>{{ label }}</strong>
    
    <hr>
  </div>  
</template>

<script>
export default {
  props: {
    label: String
  }
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;

  /* margin: 0 12px; */
}

strong {
  color: #201F1E;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}

hr {
  flex: 1;
  margin-left: 12px;
  border: none;
  border-bottom: 1px solid #EDEBE9;
}
</style>