<template>
  <div class="category-title">
    <div v-for="(item,index) in categoryList" 
         :key="index">
      <div class="single-title" @click='getclickItem(item,index)'
                                :class="{active: currentIndex==index}">{{item.title}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'categoryTitle',
  props:{
    categoryList:{
      type:Array
    }
  },
  data() { 
    return {
      currentIndex:0,
      maitKey:0
    }
  },
  
  methods:{
    getclickItem(item,index){
      const obj={
        maitKey:item.maitKey,
        index

      }
      this.currentIndex=index;
      this.$emit("getclickItem",obj)
      

    }
  }
}
</script>

<style scoped>
.category-title{
  /* height: 100%; */
  width:100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(235, 235, 235, .3);
}

.category-title .single-title{
  height: 40px;
  line-height: 40px;
  width: 100px;
  flex: 1;
  text-align: center;
  font-size: 12px;
  /* border-bottom: 1px solid #8a8a8a; */
}

.active{
  color: var(--color-high-text);
  border-left: 0.2px solid var(--color-high-text);
  background-color: #fff;
}

</style>