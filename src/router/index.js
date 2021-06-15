import Vue from 'vue'
import Router from 'vue-router'

// 4.懒加载路由界面
const home=()=>import('../views/home/home.vue')
const category=()=>import('../views/category/category.vue')
const shopcart=()=>import('../views/shopcart/shopcart.vue')
const profile=()=>import('../views/profile/profile.vue')
const detail=()=>import('../views/detail/detail.vue')

// 1.安装插件
Vue.use(Router)


// 2.创建路由对象
const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:home
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/shopcart',
    component:shopcart
  },
  {
    path:'/profile',
    component:profile
  },
  {
    path:'/detail/:iid',
    component:detail
  }

]

const router=new Router({
  routes,
  // 让网址看起来更加简介，不用hash模式，要用history模式
  mode:'history'
})
// 3.new完以后导出
export default router