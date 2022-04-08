import { reqGoodsInfo } from "@/api";
import { reqAddOrUpdateShopCart } from '@/api'
//封装游客临时UUID的模块生成的随机字符串，生成之后不在改变
import {getuuid} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    uuid_token:getuuid()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    //获取产品信息
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);

        if (result.code === 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    // 将产品添加到购物车中
    //加入购物车发请求，不需要服务器返回数据，不需要捞数据三连环，服务器写入数据成功就行
    // 要将加入购物车给服务器发请求的结果是成功还是失败告诉组件，成功了就跳转路由
    async addShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // console.log(result);
        if(result.code==200){
            return '我成功了'
        }else{
            return Promise.reject(new Error('faile'))
        }

    }
};
const getters = {
    categoryView(state) {
        //最开始state.goodInfo是个空对象，空对象的categoryView会是个undefined,至少要返回一个空对象
        return state.goodInfo.categoryView || {}

    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}