<template>
  <router-view />
</template>

<style>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0;
  margin: 0;
  outline: 0;
}

button {
  cursor: pointer;
}

ul {
  list-style: none;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  background-color: #F8F8F8;
  overflow-x: hidden;
}
</style>
