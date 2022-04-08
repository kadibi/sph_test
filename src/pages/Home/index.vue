<template>
    <div>
   <!-- 三级联动组件的使用:已经是全局组件，不需要再次引入 -->
   <TypeNav />
   <ListContainer />
   <Recommend />>
   <Rank />
   <Like />
   <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
   
   <Brand />
   
    </div>
</template>
<script>
//引入其他组件
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
   name:'Home',
   //注册组件
   components:{
   ListContainer,
   Recommend,
   Rank,
   Like,
   Floor,
   Brand
   },
   data() {
      return {
      }
   },
   mounted() {
       //派发actions，获取floor组件的数据
      this.$store.dispatch('getFloorList')
      //获取用户信息在首页展示
      this.$store.dispatch('getUserInfo')
  },
   computed:{
   ...mapState({
           floorList:state=>state.home.floorList
       })
   },
}
</script>
<style lang="less" scoped>

</style>
