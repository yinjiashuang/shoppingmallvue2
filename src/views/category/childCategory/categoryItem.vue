<template>
  <div class="category-item">
    <div v-for="(item,index) in categoryDetailList" :key="index" class="category-detail-item">
      <div>
        <a :href="item.link"><img :src="item.image" alt=""></a>
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'categoryItem',
  props:{
    categoryDetailList:{
      type:Array
    }
  },
  data() { 
    return {

    }
  },
  mounted(){
    
  }
 }
</script>

<style scoped>
.category-item{
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  width: 100%;
  padding: 10px;
}

.category-detail-item{
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 100px;
  margin-bottom: 10px;


}

.category-detail-item img{
  width: 45px;
  margin-bottom: 7px;
}

.category-detail-item div{
  font-size: 12px;
}
</style>