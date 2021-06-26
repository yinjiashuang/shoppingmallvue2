<template>
  <box class="box">
      <box-top slot="box-top">
        <div slot='top-left'>我的设置</div>
        <div slot="horizon"></div>
      </box-top>
      <div slot="box-bottom" class="bottom">
        <div class="first-line">
          <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/打卡.png" alt="">
          <div slot="bottom-title">签到</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/地图.png" alt="">
          <div slot="bottom-title">地图</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/定位.png" alt="">
          <div slot="bottom-title">定位</div>
        </box-bottom>
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/收藏.png" alt="">
          <div slot="bottom-title">收藏</div>
        </box-bottom>
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/卡包.png" alt="">
          <div slot="bottom-title">平台</div>
        </box-bottom>
        </div>
        <div class="second-line">
          <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/优惠券.png" alt="">
          <div slot="bottom-title">优惠卷</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/积分.png" alt="">
          <div slot="bottom-title">积分</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/卡包.png" alt="">
          <div slot="bottom-title">卡包</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/红包.png" alt="">
          <div slot="bottom-title">红包</div>
        </box-bottom> 
        <box-bottom>
          <img slot='bottom-img' src="~assets/img/profile/jesmine/个人设置.png" alt="">
          <div slot="bottom-title">个人设置</div>
        </box-bottom>  
      </div>
    </div>    
         
  </box>
</template>

<script>
import box from 'components/common/box/box.vue'
import boxTop from 'components/common/box/boxTopItem.vue'
import boxBottom from 'components/common/box/boxBottomItem.vue'

export default {
  name: 'thirdPart',
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
.first-line, .second-line{
  display: flex;
}
</style>