<template>
  <section>
    <strong>{{ label }}</strong>

    <hr>

    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    label: String
  }
}
</script>

<style scoped>
strong {
  display: block;
  color: #333;
  font-size: 13px;
  font-weight: 500;
  margin-left: 16px;
  margin-bottom: 8px;
}

hr {
  border: none;
  border-bottom: 1px solid #ccc;
}
</style>