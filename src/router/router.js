import Vue from 'vue';
import Router from 'vue-router';

const context = require.context("@/views", true, /route\.js/);
let routes = [];
context.keys().forEach(url => {
  const {route} = context(url)
  routes = routes.concat(route);
});

Vue.use(Router);

export default new Router({
  routes
})