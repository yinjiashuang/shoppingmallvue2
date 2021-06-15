<template>
  <div class="detailSwipper">
    <swiper class='topImageswiper'>
      <swiper-item v-for='item in topImages'>
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'detailSwipper',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,SwiperItem
  },
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
.topImageswiper{
  height: 300px;
}
</style>