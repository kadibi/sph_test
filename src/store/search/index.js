import {reqSearchInfo} from '@/api'
export default {
    state:{
     searchList:{},
    },
    mutations:{
        GETSEARCHLIST(state,searchList){
            state.searchList = searchList
        }
    },
    actions:{
    async getSearchList({commit},params={}){
         let result = await reqSearchInfo(params)
        
         if(result.code==200){
             commit('GETSEARCHLIST',result.data)
         }
     }
    },
    //getters简化仓库中的数据
    getters:{
      goodsList(state){
       return state.searchList.goodsList||[];
      },
      trademarkList(state){
        return state.searchList.trademarkList;
      },
      attrsList(state){
          return state.searchList.attrsList;
      }
    }
}