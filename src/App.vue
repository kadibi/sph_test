<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // app根组件的mounted无论路由怎么跳转都只会执行一次
    this.$store.dispatch('categoryList');
    // console.log(this.$router,this.$route);
  },
}
</script>

<style>

</style>
