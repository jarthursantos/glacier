<template>
  <header>
    <div></div>
    
    <SearchBar />

    <div></div>
  </header>  
</template>

<script>
import SearchBar from "./SearchBar/index";

export default {
  components: {
    SearchBar
  }
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  grid-area: HEADER;
  height: 48px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: #0078D4;
}
</style>