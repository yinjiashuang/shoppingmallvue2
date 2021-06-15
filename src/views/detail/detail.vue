<template>
  <div id='detail'>
    <detail-nav-bar></detail-nav-bar>
    <bscroll  class="detail-content"
              ref="scroll">
      <div>
        <detail-swipper :top-images='topImages'></detail-swipper>
        <detail-base-info :goods='goods'></detail-base-info>
        <detail-shop-info :shop='shop'></detail-shop-info>
        <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
        <detail-param-info :param-info='paramInfo'></detail-param-info>
      </div>
    </bscroll>
  </div>
</template>

<script>
import detailNavBar from 'views/detail/childcomponents/detailNavBar.vue'
import detailSwipper from 'views/detail/childcomponents/detailSwipper.vue'
import DetailBaseInfo from 'views/detail/childcomponents/DetailBaseInfo.vue'
import DetailShopInfo from 'views/detail/childcomponents/DetailShopInfo.vue'
import DetailGoodsInfo from 'views/detail/childcomponents/DetailGoodsInfo.vue'
import DetailParamInfo from 'views/detail/childcomponents/DetailParamInfo.vue'

import bscroll from 'components/common/scroll/scroll.vue'

import {getDetail, GoodsInfo,Shop,GoodsParam} from 'network/detail.js'

export default {
  name: 'detail',
  components:{
    detailNavBar,
    detailSwipper,
    DetailBaseInfo,
    DetailShopInfo,
    bscroll,
    DetailGoodsInfo,
    DetailParamInfo
    
  },
  data() { 
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{}
      
    }
  },
  created(){
    // 保存传入的iid
    this.iid=this.$route.params.iid

    // 根据iid请求详细数据
    getDetail(this.iid).then(res =>{
      console.log(res)
      const data=res.result;
      // 获取顶部图片轮播系列
      this.topImages=data.itemInfo.topImages;
      // 获取商品信息
      this.goods=new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取商家信息
      this.shop=new Shop(data.shopInfo)
      // 产品细节图
      this.detailInfo=data.detailInfo
      // 产品参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
 }
</script>

<style scoped>
#detail{
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color:#fff ;
}
.detail-content{
  position: absolute;
  top: 44px;
  bottom: 60px; 

  overflow: hidden;
}
</style>