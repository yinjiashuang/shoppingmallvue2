// 所有关于首页的网络请求
import {request} from './request'

export function getHomeMultidata(){
  // 将目标地址发送到对服务器网络请求
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}