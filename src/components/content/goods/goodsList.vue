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
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}




</style>