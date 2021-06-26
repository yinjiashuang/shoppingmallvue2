import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import toast from 'components/common/toast/index.js'

Vue.use(VueLazyLoad, {
  
  // lazyLoad的站位图，在加载过程中展示的图
  loading: require('assets/img/common/placeholder.png')
})


Vue.config.productionTip = false
// 定义事件总线bug，protoType为原型
Vue.prototype.$bus= new Vue()

// 导入toast插件后还要再安装一下,一旦使用.use，就可以调用括号中插件的install，也就是安装了你之前封装好的插件中的insatll函数
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
