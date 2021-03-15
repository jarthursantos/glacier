<template>
  <Layout>
    <Header />
    <Content />
  </Layout>
</template>

<script>
import Content from "./components/Content/index";
import Header from "./components/Header/index";
import Layout from "./components/Layout";

export default {
  name: "App",
  components: {
    Content,
    Header,
    Layout,
  },
};
</script>

<style>
* {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
  outline: 0;
  box-sizing: border-box;
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
