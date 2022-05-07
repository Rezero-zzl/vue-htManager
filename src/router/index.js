import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import( '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 重置路由方法
export const resetRouter = () => {
  router.matcher = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}

// 注意！！，刷新页面会重置页面路由，所以要为每一个页面加载一次路由
export const setRoutes = () => {
  const storeMenus = localStorage.getItem("menus");
  if (storeMenus) {
    // 获取当前的路由对象的名称数组
    const currentRouteNames = router.getRoutes().map(v => v.name)
    // 这里的if是判断啥？？？？，解决登录和进入主页，对同一个页面（主页）设置了两次路由
    // 只有登录会触发到'/'路由，而登陆时以及设置过一次路由    路径‘/’可能会出bug
    if (!currentRouteNames.includes('Manage')){
      // 拼装动态路由
      const manageRoute = {path: '/',name: 'Manage', component: () => import( '../views/Manage.vue'),redirect: "/home",children: [
          // 固定路由（每个用户都能访问的路由）
          {path: 'person',name: '个人信息', component: () => import('../views/Person.vue')},
          {path: 'password',name: '修改密码', component: () => import('../views/Password.vue')}
        ]}
      const menus = JSON.parse(storeMenus)
      menus.forEach(item => {
        if (item.path) {
          let itemMenu = {path: item.path.replace("/",""), name: item.name,component: () => import( '../views/'+ item.pagePath +'.vue')}
          manageRoute.children.push(itemMenu)
          // 判断有不有子路由
        }else if (item.children.length) {
          item.children.forEach(item => {
            if (item.path) {
              let itemMenu = {path: item.path.replace("/", ""), name: item.name, component: () => import( '../views/' + item.pagePath + '.vue')}
              manageRoute.children.push(itemMenu)
            }
          })
        }
      })
      // 动态添加到现在的路由对象中去
      router.addRoute(manageRoute)
    }

  }
}

// 重置、刷新就再set一次路由，为每个页面加载一次路由
setRoutes()

// 设置路由守卫，为了再head里获取面包屑
router.beforeEach((to,from,next) => {
  localStorage.setItem("currentPathName",to.name)
  store.commit("setPath")

  // 未找到路由
  if (!to.matched.length) {
    const storeMenus = localStorage.getItem("menus")
    console.log("-------6666--------")
    if (storeMenus) {
      next("/404")
    } else {
      // 跳回登录界面
      next("/login")
    }
  }
  next()

})



export default router
