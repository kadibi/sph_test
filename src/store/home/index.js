import { reqCategoryList } from "@/api"//自己封装的api
import { reqBannerList,reqFloorList } from "@/api";
export default {
    state:{
        categoryList:[],
        bannerList:[],
        floorList:[],
    },
    mutations:{
    CATEGORYLIST(state,categoryList){
      state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
    },
    actions:{
        //通过Api里面的接口函数的调用，向服务器发请求，获取服务器的数据
       async categoryList({commit}){//这里的{commit}是解构
            let result = await reqCategoryList();
            // console.log(result);
            // console.log(result.data.data.slice(0,16));
           if(result.code == 200){
               commit("CATEGORYLIST",result.data.slice(0,16))
           }
        },
        //获取首页轮播图的数据
        async getBannerList({commit}){
            let result=await reqBannerList();
            commit('GETBANNERLIST',result.data)
        },
        //
        async getFloorList({commit}){
            let result = await reqFloorList()
            if(result.code==200){
                commit("FLOORLIST",result.data)
            }
        }
    }
}