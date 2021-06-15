<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'scroll',
  data() { 
    return {
      scroll:null,
      message:'Jesmine'
    }
  },
  props:{
    // 解决各个组件对实时监听的需求不同问题，将probeType属性动态传入
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    // 1.创建BS对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      // click属性最好先设置成true，仿制后续div标签不能点击
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    // 2.监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // 将position传出去
      // console.log(position)
      this.$emit('scroll',position)
    })

    // 3.监听上拉事件
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多')
      this.$emit('pullingUp')
    })

  },
  methods:{
    scrollTo(x, y, time=300) {
      // 前面加上this.scroll用来避免再调用后续scroll相关函数时，scroll因网速原因未被创建
        this.scroll && this.scroll.scrollTo(x, y, time)
    },

    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },

    refresh(){
     this.scroll && this.scroll.refresh()
    },   
      
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>