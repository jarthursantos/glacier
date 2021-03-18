<template>
  <Layout>
    <Header />

    <Content />
    <router-view />
  </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import Content from '@/components/Content/index'
import Header from '@/components/Header/index'

export default {
  name: 'Home',
  components: {
    Content,
    Layout,
    Header
  }
}
</script>
