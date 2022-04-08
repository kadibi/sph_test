import { reqShopCartList } from '@/api'
import { deleteGood, reqUpdateChecked } from '@/api'
const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  async getCartList({ commit }) {
    let result = await reqShopCartList()
    //购物车里拿不到数据，因为服务器不知道你是谁,加了uuid就可以拿到了
    // console.log(result);
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  async deleteGood({ commit }, skuId) {
    let result = await deleteGood(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //修改购物车某一个产品的选中状态
  async UpdateChecked({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateChecked(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //删除全部选中的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    //context可以就理解为小仓库
    // console.log(getters);
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {

      let promise = item.isChecked === 1 ? dispatch('deleteGood', item.skuId) : ''//这个返回的是一个promise对象，就是deletGood的结果,没删一个，返回一个Promise
      PromiseAll.push(promise)
    })
    // console.log(Promise.all(PromiseAll));
    return Promise.all(PromiseAll)

  },
  // 修改全部产品的状态
  updateAllChecked({dispatch,state},isChecked){
    let PromiseAll=[]
    // console.log(state);
    // console.log(state.cartList);
    // console.log(state.cartList[0].cartInfoList);
    state.cartList[0].cartInfoList.forEach(item=>{
     let promise = dispatch('UpdateChecked',{skuId:item.skuId,isChecked})
     PromiseAll.push(promise)
    })
    // console.log(PromiseAll);
    return Promise.all(PromiseAll)
  }
}
const getters = {
  cartList(state) {
    //这里的state就是模块里面的state
    return state.cartList[0] || {}
  },

}
export default {
  state,
  mutations,
  actions,
  getters
}