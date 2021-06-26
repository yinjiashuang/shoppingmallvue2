<template>
  <box class="box">
      <box-top slot="box-top">
        <div slot='top-left'>我的订单</div>
        <div slot='top-right'>
          <span>全部</span>
          <img src="~assets/img/profile/jesmine/pointer.png" alt="">
        </div>
        <div slot="horizon"></div>
      </box-top>
      <div slot="box-bottom" class="bottom">
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/toPayment.png" alt="">
          <div slot="bottom-title">待付款</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/toShipment.png" alt="">
          <div slot="bottom-title">待发货</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/toBeReceived.png" alt="">
          <div slot="bottom-title">待收货</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/comments.png" alt="">
          <div slot="bottom-title">评价</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/afterSales.png" alt="">
          <div slot="bottom-title">售后</div>
        </box-bottom>  
      </div>    
         
  </box>
</template>

<script>
import box from 'components/common/box/box.vue'
import boxTop from 'components/common/box/boxTopItem.vue'
import boxBottom from 'components/common/box/boxBottomItem.vue'

export default {
  name: 'secondPart',
  components:{
    box,
    boxTop,
    boxBottom
  }
 }
</script>

<style scoped>
.box{
  padding: 8px;
}
.bottom{
 display: flex;
}
</style>