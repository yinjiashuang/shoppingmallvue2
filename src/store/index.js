import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'


// 1.安装插件
Vue.use(Vuex)
// 2.创建Vuex实例
// **修改任何state里面的东西都要经过mutation
const store=new Vuex.Store({
  getters,
  state:{
    cartList:[]
  },
  mutations:{
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      state.cartList.push(payload)
    }
  },
  actions:{
    addCart(context,payload ){
      return new Promise((resolve,reject) => {
        // 1.先判断是否为同一商品反复添加，payload为添加商品，在push之前先判断cartList里有没有payload
        // **使用find函数,find函数会将箭头函数中复合条件的item返回
        let oldProduct=context.state.cartList.find(item => item.iid ===payload.iid)
        // 2.计算加入购物车数量
        if(oldProduct){
          // oldProduct.count +=1
          context.commit('addCounter',oldProduct)
          resolve('当前商品数量+1')
        }else{
          payload.count = 1
          payload.checked=true
          // state.cartList.push(payload)
          context.commit('addToCart',payload)
          resolve('添加新的商品')
        }
      })
    }
  }
})

// 3.挂载在vue实例上
export default store