import Vue from 'vue'
import '@/assets/style/index.less'
import App from '@/app.vue'
import router from "@/router/router";
import components from "@/components";
import store from "@/store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


new Vue({
  el:"#app",
  template:'<App/>',
   //让vue知道我们的路由规则
   store,
   router, //可以简写router
  components:{App}
})
