<template>
  <div class="goods">
    <good-list-item v-for='item in goods' :goodsItem="item"></good-list-item>
    
  </div>
</template>

<script>
import goodListItem from './goodsListItem.vue'

export default {
  name: 'goodsList',
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    goodListItem
  },
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
/* 一行显示两个 */
.goods {
  display: flex;
  /* 规定在灵活的项目在必要的时候拆行或拆列 */
  flex-wrap: wrap;
  /* 项目位于各行之前、之间、之后都留有空白的容器内 */
  justify-content: space-around;

  padding: 2px;
}




</style>