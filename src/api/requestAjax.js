//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';

// 引入进度条样式
import "nprogress/nprogress.css"
// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
// const requests = axios.create({
//     baseURL:'/mock',
//     timeout:5000,
// });
const mockRequests  = axios
mockRequests .interceptors.request.use((config)=>{
// console.log(111, config.baseURL);
//config:配置对象，对象里有一个属性很重要，header请求头
// 进度条开始动
    nprogress.start();
    // console.log(111);
    return config
})
mockRequests .interceptors.response.use((res)=>{
    nprogress.done()
    return res.data;

},(erro)=>{
    return Promise.reject(new Error('faile'))//中止promise
});

//对外暴露
export default mockRequests ;