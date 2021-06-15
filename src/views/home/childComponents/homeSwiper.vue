<template>
  <swiper>
      <swiper-item v-for='item in banners' >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'

export default {
  name: 'homeSwiper',
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return{
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swipperImageLoad')
        this.isLoad=true
      }
    }
    
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  }
 }
</script>

<style scoped>
</style>