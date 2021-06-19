import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
})


Vue.config.productionTip = false
// 定义事件总线bug
Vue.prototype.$bus= new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
