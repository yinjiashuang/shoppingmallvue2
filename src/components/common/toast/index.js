import Toast from './toast'

const obj={}
// 在main中安装toast插件，会自动来到这里调用insatll函数,自动将Vue作为参数传回到install的函数中
// 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。

obj.install = function(Vue){
  // 1.创建组建构造器
  // 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
  // data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数
  const toastConstructor=Vue.extend(Toast);
  // 2.new的方式根据组件构造器可以查创建出来一个组件对象
  const toast=new toastConstructor()
  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是 'div'
  document.body.appendChild(toast.$el)


  Vue.prototype.$toast=toast

}

export default obj