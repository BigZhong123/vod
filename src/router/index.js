import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/registration',
    name: 'register',
    component: () => import('../views/Register/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/Home.vue')
  }, {
    path: '/popular/:id',
    name: 'popular',
    component: () => import('../views/Popular/Popular.vue')
  }, {
    path: '/popular',
    name: 'popularNone',
    component: () => import('../views/Popular/Popular.vue')
  }, {
    path: '/order',
    name: 'order',
    component: () => import('../views/Order/Order.vue')
  }, {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/Mine/Mine.vue')
  }, {
    path: '/watch',
    name: 'watch',
    component: () => import('../views/Watch/Watch.vue'),
    redirect: '/watch/introduce',
    children: [
      {
        path: '/watch/introduce',
        name: 'watchIntroduce',
        component: () => import('../views/Introduce/Introduce.vue')
      },
      {
        path: '/watch/comment',
        name: 'watchComment',
        component: () => import('../views/Comment/Comment.vue')
      }
    ]
  }, {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/UploadVideo/UploadVideo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
