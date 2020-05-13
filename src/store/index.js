import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const modules = {  };

const context = require.context("../views", true, /store\/index\.js$/);
context.keys().forEach((key) => {
  modules[key.replace(/^\.\/|\/store\/index\.js$/g, "")] = { namespaced: true, ...context(key).default };
});

console.log(modules, 'modules')
const store = new Vuex.Store({
  modules,
  strict: true,
});
export default store;
