import Vue from 'vue'
import VueRouter from 'vue-router';
import './assets/style/index.less'
import App from './app.vue'
import Home from './components/home.vue'

//安装插件
Vue.use(VueRouter); //挂载属性
//创建路由对象并配置路由规则
let router = new VueRouter({
    routes: [
        { path: '/home', component: Home }
    ]
});
new Vue({
  el:"#app",
  template:'<App/>',
   //让vue知道我们的路由规则
   router: router, //可以简写router
  components:{App}
})
function a(b) {
  console.log(b)
}

a(1)