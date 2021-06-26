<template>
  <div class="category-view">
    <category-nav class="category-nav"><div slot="center">分类</div></category-nav>
    <bscroll class="title-content"
             ref="title-scroll"
             :probeType='3'
             >
      <category-title :categoryList='categoryList'
                      @getclickItem='getclickItem'></category-title>
    </bscroll>
    <bscroll class="detail-content"
             ref="item-scroll">
      <category-item :categoryDetailList='categoryDetailList'></category-item>
      <category-tabbar :titles="['流行','精选','新款']" ref="tabControl" @tabClick="tabClick"></category-tabbar>
      <good-list :goods='categoryRcommendList'></good-list>

    </bscroll>
  </div>
</template>

<script>
import categoryNav from 'components/common/navBar/navBar.vue'
import categoryTitle from 'views/category/childCategory/categoryTitle.vue'
import categoryItem from 'views/category/childCategory/categoryItem.vue'

import bscroll from 'components/common/scroll/scroll.vue'
import categoryTabbar from 'components/content/TabControl/TabControl.vue'
import goodList from 'components/content/goods/goodsList.vue'

import {getCategory,getCategoryInfo,getCategoryDetail} from 'network/category.js'
export default {
  name: 'category',
  components:{
    categoryNav,
    categoryTitle,
    bscroll,
    categoryItem,
    categoryTabbar,
    goodList
  },
  data(){
    return{
      categoryDetailList:[],
      categoryList:[],
      categoryRcommendList:[],
      currentIndex:0
      
      
    }
  },
  created(){
    getCategory().then(res=>{
      // console.log(res)
      const item=res.data.category
      this.categoryList=item.list


      this.$nextTick(() => {
        this.getCategoryInfo(this.categoryList[0].maitKey);
        this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
      });
    })


  },
  
  methods: {
    getclickItem({maitKey,index}){
      this.currentIndex=index

      // 每次切换分类初始化tabControl的下标
      this.$refs.tabControl.currentIndex= 0

      // 点击侧边栏时，推荐栏从pop开始
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
      // 点击侧边栏，显示对应的分类
      this.getCategoryInfo(maitKey)
      
    },

    getCategoryInfo(key){
      getCategoryInfo(key).then(res=>{
        // console.log(res)
        this.categoryDetailList=res.data.list
        // console.log(this.categoryDetailList)
      })
    },

   getCategoryDetail(key,type){
     getCategoryDetail(key,type).then(res=>{
       console.log(res)
       this.categoryRcommendList=res
     })
   },

   tabClick(index) {
     console.log('click')
      const typeList = ["pop", "new", "sell"];
      // 切换类型数据
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index]);
    }
  },
}
</script>

<style scoped>
.category-view{
  /* height: 100vh; */
  /* position: relative; */
}
.category-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
  .title-content{
    /* height: calc(100vh  - 44px - 50px);
    overflow: hidden; */
    position: fixed;
    top: 44px;
    left: 0;
    bottom: 49px;
    left: 0;
    overflow: hidden;
    width: 100px;
  }  
  .detail-content{
    position: fixed;
    top: 44px;
    right: 0;
    bottom: 50px;
    left: 100px;
    overflow: hidden;
    
    
}
</style>