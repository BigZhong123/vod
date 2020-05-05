import Vue from 'vue';
import VueRouter from 'vue-router';
import Instroduce from '../views/Introduce/Introduce.vue';
import Comment from '../views/Comment/Comment.vue';
import MyPage from '../views/CenterInfo/component/MyPage.vue';
import MyCollect from '../views/CenterInfo/component/MyCollect.vue';
import MyFollow from '../views/CenterInfo/MyFollow.vue';
import MySubscribe from '../views/CenterInfo/MySubscribe.vue';
import Login from '../views/Login/Login.vue';
import Home from '../views/Home/Home.vue';
import Registration from '../views/Register/Register.vue';
import Popular from '../views/Popular/Popular.vue';
import Order from '../views/Order/Order.vue';
import Mine from '../views/Mine/Mine.vue';
import Watch from '../views/Watch/Watch.vue';
import UploadVideo from '../views/UploadVideo/UploadVideo.vue';
import Cropper from '../components/Image/Cropper.vue';
import CenterInfo from '../views/CenterInfo/CenterInfo.vue';
import SearchResult from '../views/Home/SearchResult.vue';
import ManageVideo from '../views/ManangeVideo/ManangeVideo.vue';
import Edit from '../views/EditVideo/EditVideo.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'home',
    component: Home
    // component: Home
  },
  {
    path: '/registration',
    name: 'register',
    component: Registration
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }, {
    path: '/popular/:id',
    name: 'popular',
    component: Popular
  }, {
    path: '/popular',
    name: 'popularNone',
    component: Popular
  }, {
    path: '/order',
    name: 'order',
    component: Order
  }, {
    path: '/mine',
    name: 'mine',
    component: Mine
  }, {
    path: '/watch',
    name: 'watch',
    component: Watch,
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
    component: UploadVideo
  }, {
    path: '/cropper',
    name: 'cropper',
    component: Cropper
  }, {
    path: '/centerInfo',
    name: 'centerInfo',
    component: CenterInfo,
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
    component: SearchResult
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
    component: ManageVideo
  }, {
    path: '/edit',
    name: 'edit',
    component: Edit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
