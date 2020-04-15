import Vue from 'vue';
import VueRouter from 'vue-router';
import Instroduce from '../views/Introduce/Introduce.vue';
import Comment from '../views/Comment/Comment.vue';
import MyPage from '../views/CenterInfo/component/MyPage.vue';
import MyCollect from '../views/CenterInfo/component/MyCollect.vue';
import MyFollow from '../views/CenterInfo/MyFollow.vue';
import MySubscribe from '../views/CenterInfo/MySubscribe.vue';
import Login from '../views/Login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'home',
    component: () => import('../views/Home/Home.vue')
    // component: Home
  },
  {
    path: '/registration',
    name: 'register',
    component: () => import('../views/Register/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
  }, {
    path: '/centerInfo',
    name: 'centerInfo',
    component: () => import('../views/CenterInfo/CenterInfo.vue'),
    children: [
      {
        path: '/centerInfo/myPage/:id',
        name: 'myPage',
        component: MyPage,
      }, {
        path: '/centerInfo/myCollect/:id',
        name: 'myCollect',
        component: MyCollect
      }
    ],
    redirect: '/centerInfo/myPage/:id'
  }, {
    path: '/search',
    name: 'search',
    component: () => import('../views/Home/SearchResult.vue')
  }, {
    path: '/myFollow/:id',
    name: 'myFollow',
    component: MyFollow
  }, {
    path: '/mySubscribe/:id',
    name: 'mySubscribe',
    component: MySubscribe
  }, {
    path: '/management',
    name: 'manageVideo',
    component: () => import('../views/ManangeVideo/ManangeVideo.vue')
  }, {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/EditVideo/EditVideo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
