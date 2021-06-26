<template>
  <div class="cart-list">
   <cart-list-item v-for="(item,index) in getCartList" 
                   :itemInfo='item'
                   :key="index"></cart-list-item>
  </div>
</template>

<script>
import cartListItem from './cartListItem.vue'

export default {
  name: 'cartList',
  components:{
    cartListItem
  },
  computed:{
    getCartList(){
      return this.$store.state.cartList
    }
  },
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>

</style>