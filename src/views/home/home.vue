<template>
  <div id='home'>
    <nav-bar class="home_nav">
      <div slot="center">购物街</div>
      <div slot="right"><search-bar></search-bar></div>
    </nav-bar>

    <tab-control ref='tabcontrol1'
                  :titles="['流行','新款','精品']"
                  @tabClick='tabClick'
                  calss='tab-control'
                  v-show="isTabFixed"
                  ></tab-control>

    <scroll class="content" 
            ref='home_scroll' 
            :probe-type='3'
            @scroll='contentScroll'
            :pull-up-load='true'
            @pullingUp='loadMore'>
      <home-swiper :banners='banners'
                   @swipperImageLoad='swipperImageLoad'/>
      <recommend-view :recommends='recommends'></recommend-view>
      <weekly-feature></weekly-feature>
      <tab-control ref='tabcontrol2'
                  :titles="['流行','新款','精品']"
                  @tabClick='tabClick'
                  ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native='backTop'
              v-show='isShowBackTop'></back-top>
    
  </div>

  
</template>

<script>

import homeSwiper from 'views/home/childComponents/homeSwiper.vue'
import recommendView from 'views/home/childComponents/homeRecommendView.vue'
import weeklyFeature from 'views/home/childComponents/homeWeeklyFeature.vue'

import NavBar from 'components/common/navBar/navBar.vue'
import searchBar from 'views/home/childComponents/search.vue'
import TabControl from 'components/content/TabControl/TabControl.vue'
import goodsList from 'components/content/goods/goodsList.vue'
import scroll from 'components/common/scroll/scroll.vue'
import backTop from 'components/content/backTop/backTop.vue'
import {debounce} from 'common/utils.js'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'


export default {
  name: 'home',
  components:{
    homeSwiper,
    recommendView,
    weeklyFeature,
    NavBar,
    searchBar,
    TabControl,
    goodsList,
    scroll,
    backTop
  },
  data(){
    return{
      // result:null
      banners:[],
      recommends:[],
      
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },

      currentType:'pop',

      isShowBackTop:false,

      tapOffsetTop:0,
      // 默认情况下不需要吸顶
      isTabFixed:false,

      saveY:0
  
    }
  },


  // 在首页组件创建完进行网络请求
  created(){
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted(){
    // 图片加载完成的事件监听，将函数传进去不加小括号，加小括号函数直接执行将传进函数的返回值
    const refresh=debounce(this.$refs.home_scroll.refresh)

    // 3.在创建的时候就要定义好监听事件，监听item中图片加载完成
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
  }, 
  // 钩子函数
  activated() {
      this.$refs.home_scroll.scrollTo(0,this.saveY,100);
      this.$refs.home_scroll.refresh()
      
    },
  deactivated() {
      this.saveY= this.$refs.home_scroll.getScrollY()
    },

  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    // // 防抖函数:func执行函数，delay需要等多久
    // debounce(func,delay){
    //   // 用timer来记录有没有定时器
    //   let timer=null

    //   return function(...args){
    //     // 如果有timer就先销毁timer
    //     if(timer) clearTimeout(timer)

    //     timer=setTimeout(()=>{
    //       func.apply(this,args)
    //     },delay)
    //   }
    // },
    // 网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
     
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        
        //将一个数组原封不动的塞进另一个数组的方法 ：...+目标数组
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1

        // 完成上拉加载更多，当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
        this.$refs.home_scroll.finishPullUp()

      })
    },
    // 事件监听相关方法
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
        
      }

      this.$refs.tabcontrol1.currentIndex=index;
      this.$refs.tabcontrol2.currentIndex=index;
    },

    backTop(){
      // !!scrollTo方法是实现滚到到目标位置x，y，直接调用配置目标位置就可
      // 记得要在scroll组件中先定义一下要调用的函数
      this.$refs.home_scroll.scrollTo(0, 0)
      
      // console.log(this.$refs.home_scroll.message)
    },
    // 监听首页位置
    contentScroll(position) {
        //1判断backtop是否显示
        this.isShowBackTop = (-position.y) > 1000

        //2决定tabControl是否吸顶,判断大小之后，看tabcontrol的动态类中是否有position：fixed的样式
        this.isTabFixed=(-position.y) > this.tapOffsetTop
    },
    
    loadMore(){
      this.getHomeGoods(this.currentType)
    },

    //获取tabControlde offsetTop//距离父组件的距离，只在html元素层面
    // *所有组件都有$el属性：用于获取组件中的元素
    // console.log(this.$refs.tabcontrol)
    swipperImageLoad(){
      // console.log(this.$refs.tabcontrol2.$el.offsetTop)
      this.tapOffsetTop=this.$refs.tabcontrol2.$el.offsetTop;
    }
    
    

  }

}
</script>

<style scoped>
  #home{
    
    height: 100vh;
    position: relative;
  }
  .home_nav{
    background-color: var(--color-tint);
    color:#fff;

    /* 使用浏览器原声滚动的时候使用，完成吸顶效果所以注释掉 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */

  }
  
  .tab-control{
    position:relative;
    z-index: 9;
  }

  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>