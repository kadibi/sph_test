//对于axios进行二次封装
import axios from 'axios'
// console.log(axios);
//引入进度条
import nprogress from 'nprogress';

// 引入进度条样式
import "nprogress/nprogress.css"
//在当前模块中，引入store
import store from '@/store'
// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    baseURL:'/',
    timeout:5000,
});
// const requests = axios
requests.interceptors.request.use((config)=>{
// console.log(111, config.baseURL);
//config:配置对象，对象里有一个属性很重要，header请求头
// 进度条开始动
//    console.log(store);
//    console.log(111);
 if(store.state.detail.uuid_token){
     //在请求头添加一个字段，和后台商量好
     config.headers.userTempId = store.state.detail.uuid_token
 }
 if(store.state.user.token){
    //在请求头添加一个字段，和后台商量好
    config.headers.token = store.state.user.token
}
    nprogress.start();
    return config
})
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data;

},(erro)=>{
    return Promise.reject(new Error('faile'))//中止promise
});
// console.log(requests);
//对外暴露
export default requests;