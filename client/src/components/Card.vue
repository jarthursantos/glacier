<template>
  <div>
    <slot></slot>
  </div>  
</template>

<script>
export default {

}
</script>

<style scoped>
div {
  background: #ffffff;
  box-shadow: 0px 1.2px 3.6px rgba(0, 0, 0, 0.1),
    0px 6.4px 14.4px rgba(0, 0, 0, 0.13);
  border-radius: 2px;
  padding: 0 24px;
  min-width: 0;
}
</style>