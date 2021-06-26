<template>
  <div id="shop-cart">
    <!-- 导航 -->
    <cart-nav class="cart-nav"></cart-nav>

    <!-- 商品列表 -->
    <scroll class="content"
            ref="scroll">
      <cart-list></cart-list>
      
      
    </scroll>
    <!-- 底部汇总 -->
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import cartNav from 'views/shopcart/childComponents/cartNav.vue'
import cartList from 'views/shopcart/childComponents/cartList.vue'
import bottomBar from 'views/shopcart/childComponents/BottomBar.vue'

import scroll from 'components/common/scroll/scroll.vue'

export default {
  name: 'shopcart',
  components:{
    cartNav,
    cartList,
    scroll,
    bottomBar
  },
  activated(){
    this.$refs.scroll.refresh()
    // console.log('shopcart active')
  }
}
</script>

<style scoped>
#shop-cart{
  /* position:relative; */
  /* height: 100vh; */
}

.cart-nav{
  background-color: var(--color-tint);
  color:#fff;
}

.content {
    /* position: absolute; */
    /* margin-top: 44px; */
    height: calc(100vh  - 44px - 94px);
    overflow: hidden;
  }


</style>