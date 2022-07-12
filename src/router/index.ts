import { createRouter, createWebHashHistory } from 'vue-router'
// import { useUserStore } from '@/store/user'
const routes = [
  {
    path: '/',
    redirect: '/pageConfigure'
  },
  {
    path: '/pageConfigure',
    name: 'pageConfigure',
    component: () => import('../view/page-configure/index.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // const userStore = useUserStore()
  if (to.meta.requireAuth) {
    // if (userStore.token) {
    next()
    // } else {
    //   next({ path: '/login' })
    // }
  } else {
    next()
  }
})

export default router
