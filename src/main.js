import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from './components/TypeNav'
import Carousel from './components/carousel'
import Pagination from './components/Pagination'
//注册全剧组件，第一个参数是全局组件的name，第二个参数是哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

//引入路由
import router from '@/router'
//统一接口api文件夹里面全部请求函数
import * as API from '@/api'
// console.log(API);
// import {reqCategoryList} from '@/api'
// reqCategoryList();
import '@/mock/mockServe';
// 引样式
import "swiper/css/swiper.css"
// 引入仓库
import store from './store'
new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由(KV省略V，router要小写)，组件身上都拥有$route,$router属性
  router,
  //注册仓库：组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
