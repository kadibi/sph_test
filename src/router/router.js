//引入路由组件
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: "/home",
        component: Home,
        meta: {
            show: true
        }
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/search/:keyword?",
        name: "search",
        component: Search,
        meta: {
            show: true
        },
        // props:true
        // props:{
        //     a:1,
        //     b:2
        // }
    },
    {
        //需要传params参数，要占位
        path: "/detail/:skuid",
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: "/addcartsuccess",
        name: 'addcartsuccess',
        component: AddCartSuccess,
        //显示底下的footer
        meta: {
            show: true
        }
    },
    {

        path: "/shopcart",
        component: ShopCart,
        //显示底下的footer
        meta: {
            show: true
        }
    },
    {

        path: "/trade",
        component: Trade,
        //显示底下的footer
        meta: {
            show: true
        }
    },
]
