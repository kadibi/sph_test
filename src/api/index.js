// api进行统一管理
import requests from './request'
import mockRequests from './requestAjax'

//三级联动
///api/product/getBaseCategoryList get 无参数 
export const reqCategoryList = () => requests({
    url: '/api/product/getBaseCategoryList',
    method: 'get'
})
//暴露接口
export const reqBannerList = () => mockRequests.get('/mock/banner')
export const reqFloorList = () => mockRequests.get('/mock/floor')

//当前这个接口，给服务器传递参数params，至少是一个空对象，没有失败
// 发请求传参对象的写法
export const reqSearchInfo = (params) => requests({
    url:'/api/list',
    method:'post',
    data:params,
})
// 将产品添加到购物车中或者获取更新某一个产品的个数，需要传参skunum和skuid
// 发请求模板字符串的写法
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({
    url:`/api/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'//大小写都可以
})
//获取购物车列表数据的接口
export const reqShopCartList = ()=>requests({
    url:'/api/cart/cartList',
    method:'get'
})
//获取产品详细信息的接口 URL：/api/item/{skuID} 请求方式 ：get
export const reqGoodsInfo = (skuId)=>requests({url:`/api/item/${skuId}`,method:'get'});
 

//删除某一个产品/api/cart/deleteCart/{skuId}
export const deleteGood =(skuId)=>requests({
    url:`/api/cart/deleteCart/${skuId}`,
    method:'delete'
})
//修改商品选中状态 /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateChecked=(skuId,isChecked)=>requests({
    url:`/api/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})
//获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode=(phone)=>requests({
    url:`/api/user/passport/sendCode/${phone}`,
    method:'get'
})
//注册的接口/api/user/passport/register
export const reqUserRegister = (data)=>requests({
    url:'/api/user/passport/register',
    method:'post',
    data:data
})
//登录的接口/api/user/passport/login
export const reqUserLogin = (data)=>requests({
    url:'/api/user/passport/login',
    method:'post',
    data
})
//获取用户信息/api/user/passport/auth/getUserInfo
export const reqUserInfo = ()=>requests({
    url:'/api/user/passport/auth/getUserInfo',
    method:'get'
})
export const reqLogout = ()=> requests({url:'/api/user/passport/logout',method:'get'});

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:'/api/user/userAddress/auth/findUserAddressList',method:'get'});

//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = ()=>requests({url:'/api/order/auth/trade',method:'get'});

//提交订单的接口
export const reqSubmitOrder = (tradeNo,data)=>requests({
  url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method:'post',
  data
})



