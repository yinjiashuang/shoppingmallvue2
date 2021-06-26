<template>
  <div id='detail'>
    <detail-nav-bar @titleClick='titleClick' ref="nav"></detail-nav-bar>
    <bscroll  class="detail-content"
              ref="scroll"
              :probe-type='3'
              @scroll='contentScroll'>
      <detail-swipper :top-images='topImages'></detail-swipper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :param-info='paramInfo' ref="param"></detail-param-info>
      <detail-comment-info :comment-info='commentInfo' ref="comment"></detail-comment-info>
      <detail-recommend-info :recommendList='recommendList' ref="recommend"></detail-recommend-info>    
    </bscroll>
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native='backTop'  v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import detailNavBar from 'views/detail/childcomponents/detailNavBar.vue'
import detailSwipper from 'views/detail/childcomponents/detailSwipper.vue'
import DetailBaseInfo from 'views/detail/childcomponents/DetailBaseInfo.vue'
import DetailShopInfo from 'views/detail/childcomponents/DetailShopInfo.vue'
import DetailGoodsInfo from 'views/detail/childcomponents/DetailGoodsInfo.vue'
import DetailParamInfo from 'views/detail/childcomponents/DetailParamInfo.vue'
import DetailCommentInfo from 'views/detail/childcomponents/DetailCommentInfo.vue'
import detailRecommendInfo from 'views/detail/childcomponents/DetailRecommendInfo.vue'
import DetailBottomBar from 'views/detail/childcomponents/DetailBottomBar.vue'

import bscroll from 'components/common/scroll/scroll.vue'
import backTop from 'components/content/backTop/backTop.vue'
// import {backTopMixin} from "common/mixin.js"
// import {BACKTOP_DISTANCE} from 'common/const.js'
import {getDetail, getRecommend ,GoodsInfo ,Shop ,GoodsParam} from 'network/detail.js'
import {debounce} from 'common/utils.js'

export default {
  name: 'detail',
  components:{
    detailNavBar,
    detailSwipper,
    DetailBaseInfo,
    DetailShopInfo,
    bscroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    detailRecommendInfo,
    backTop,
    DetailBottomBar
    
  },
  // mixins: [backTopMixin],
  data() { 
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendList:[],
      showBackTop:false,
      themeTopY:[],
      currentIndex:0
      
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
      // 保存评论信息
      if(data.rate.list){
        this.commentInfo=data.rate.list[0]
      }

      // // 使用$nextTick(()=>{}) 这个函数的参数为回调函数，作用将回调延迟到下次 DOM 更新循环之后执行。所以可以实现dom渲染好再进行操作
      // this.$nextTick(function(){
      //   // ❌错误原因根据最新的数据，DOM已经渲染出来了，但是图片依旧没有渲染出来 

      //   this.themeTopY.push(0);
      //   this.themeTopY.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopY)
      // })
    })

    getRecommend().then(res=>{
      // console.log(res)
      this.recommendList=res.data.list

    })

    
  },
  mounted(){
    // 图片加载完成的事件监听，将函数传进去不加小括号，加小括号函数直接执行将传进函数的返回值
    const refresh=debounce(this.$refs.scroll.refresh)

    // 3.在创建的时候就要定义好监听事件，监听item中图片加载完成
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
  }, 
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh();

      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.param.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopY) 
    },
    contentScroll(position) {
		    // 1.监听backTop的显示
        this.showBackTop = position.y < -1000
        // console.log(this.showBackTop)

        // 2.监听滚动到哪一个主题
        // this._listenScrollTheme(-position.y)
        const positionY=- position.y;
        let length=this.themeTopY.length

        for(let i=0;i<length;i++){
          if((this.currentIndex != i) && (i<length-1 && positionY >= this.themeTopY[i] && positionY<this.themeTopY[i+1]) || (i === length-1 && positionY >= this.themeTopY[i])){
            // console.log(i)
            this.currentIndex=i;
            // console.log(this.currentIndex)
            this.$refs.nav.currentIndex=this.currentIndex
            
          }
        }
    },
    backTop(){
        this.$refs.scroll.scrollTo(0,0,300)
    },
        
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],300)
    },
    addToCart(){
      // console.log('------')
      // 1.获取购物车需要展示的信息，为了方便先定义一个对象
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.newPrice
      product.iid=this.iid
      product.realPrice=this.goods.realPrice

      // 2.将商品加入购物车
      // 下面方法是用在mutation中的
      // this.$store.commit('addCart',product)
      // 用在action的方法是dispath，而dispatch可以返回一个promise
      this.$store.dispatch('addCart',product).then(res => {
        // console.log(res)
        this.$toast.showToast(res)
      })
    }
  }
 }
</script>

<style scoped>
#detail{
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color:#fff ;
}
.detail-content{
  position: absolute;
  top: 44px;
  bottom: 60px; 

  overflow: hidden;
}

</style>