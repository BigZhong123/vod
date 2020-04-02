import Vue from 'vue';
import VueRouter from 'vue-router';
import Instroduce from '../views/Introduce/Introduce.vue';
import Comment from '../views/Comment/Comment.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '*',
  //   name: 'home',
  //   component: () => import('../views/Home/Home.vue')
  // },
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
    children: [
      {
        path: '/watch/introduce',
        name: 'watchIntroduce',
        component: Instroduce
      },
      {
        path: '/watch/comment',
        name: 'watchComment',
        component: Comment
      }
    ],
    redirect: '/watch/introduce',
  }, {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/UploadVideo/UploadVideo.vue')
  }, {
    path: '/cropper',
    name: 'cropper',
    component: () => import('../components/Image/Cropper.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
