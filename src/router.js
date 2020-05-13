import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component:() => import('@/views/home.vue'),
    }
  ]
})