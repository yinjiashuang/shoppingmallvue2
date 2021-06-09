<template>
  <div id='home'>
    <nav-bar class="home_nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
            ref='home_scroll' 
            :probe-type='3'
            @scroll='contentScroll'
            :pull-up-load='true'
            @pullingUp='loadMore'>
      <home-swiper :banners='banners'/>
      <recommend-view :recommends='recommends'></recommend-view>
      <weekly-feature></weekly-feature>
      <tab-control class='tab-control'
                  :titles="['流行','新款','精品']"
                  @tabClick='tabClick'></tab-control>
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
import TabControl from 'components/content/TabControl/TabControl.vue'
import goodsList from 'components/content/goods/goodsList.vue'
import scroll from 'components/common/scroll/scroll.vue'
import backTop from 'components/content/backTop/backTop.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'


export default {
  name: 'home',
  components:{
    homeSwiper,
    recommendView,
    weeklyFeature,
    NavBar,
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

      isShowBackTop:false
  
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
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
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
    },

    backTop(){
      // !!scrollTo方法是实现滚到到目标位置x，y，直接调用配置目标位置就可
      // 记得要在scroll组件中先定义一下要调用的函数
      this.$refs.home_scroll.scrollTo(0, 0)
      
      // console.log(this.$refs.home_scroll.message)
    },

    contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
    },
    
    loadMore(){
      // console.log("上拉加载更多")
      this.getHomeGoods(this.currentType);

      // this.$refs.scroll.scroll.refresh()
    }
    
    

  }

}
</script>

<style scoped>
  #home{
    padding-top:44px;
    height: 100vh;
    position: relative;
  }
  .home_nav{
    background-color: var(--color-tint);
    color:#fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;

  }
  .tab-control{
    position:sticky;
    top:44px;

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