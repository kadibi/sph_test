//登录和注册的共同仓库
import { reqGetCode } from '@/api'
import { reqUserRegister, reqUserLogin,reqUserInfo,reqLogout } from '@/api'

const state = {
  code: '',
  //一刷新就会重新调用home组件mounted里面的函数派发actions来捞用户的数据
  //初始还是空字符串不影响，因为最开始本地存储里面也没有，然后action发完请求之后存到了本地存储里，这样子每次刷新能拿到token（其实在请求拦截器那里拿数据的时候从本地存储里面拿，不从仓库拿应该也行）
  token:localStorage.getItem('TOKEN'),
  userInfo:{}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
  state.token = token
  },
  USERINFO(state,userInfo){
    state.userInfo = userInfo
  },
   //清除本地数据
   CLEAR(state){
    //帮仓库中先关用户信息清空
    state.token = '';
    state.userInfo={};
    //本地存储数据清空
    localStorage.removeItem('TOKEN')
  }

}
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //这里的获取验证码是把验证码返回来了，正常应该是后台把验证码发到用户手机上（要钱）
    let result = await reqGetCode(phone)
    // console.log(result);
    if (result.code == 200) {
      commit('GETCODE', result.data)
      //要告诉用户是否成功了
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户的注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    console.log(result);
    if (result.code == 200) {
      console.log(result);
      //没有返回的数据，只需要知道成功没
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户的登录
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user)
    if (result.code == 200) {
      //用户登录并且获取到token
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      localStorage.setItem('TOKEN',result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))

    }

  },
  //获取用户信息
 async getUserInfo({commit}){
    let result = await reqUserInfo()
    //没有带token会返回未登录,在请求拦截器那里给请求标头带上token之后就可以返回用户的信息了
    // console.log(result);
    if (result.code == 200) {
      commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))

    }
  },
async userLogout({commit}) {
    //只是向服务器发起一次请求，通知服务器清除token
    let result = await reqLogout();
    console.log(result);
    //action里面不能操作state，提交mutation修改state
    if(result.code==200){
      commit("CLEAR");
      // console.log(12);
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  },
}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}