<template>
  <div class="cart-nav">
    <nav-bar><div slot="center">购物车({{cartListLength}})</div></nav-bar>
  </div>
</template>

<script>
import navBar from 'components/common/navBar/navBar.vue'
export default {
  name: 'cartNav',
  components:{
    navBar
  },
  computed:{
    cartListLength(){
      return this.$store.state.cartList.length
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