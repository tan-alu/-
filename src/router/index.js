import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/User.vue'
import Right from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Categoties from '../components/goods/Categories.vue'
import Params from '../components/goods/Params.vue'
import Goods from '../components/goods/Goods.vue'

Vue.use(VueRouter)

const routes = [
  // 路由重定向
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: User },
      { path: '/rights', component: Right },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Categoties },
      { path: '/params', component: Params },
      { path: '/goods', component: Goods }

    ] }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果是登录页的话放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (tokenStr === '') return next('/login')
  next()
})
export default router
