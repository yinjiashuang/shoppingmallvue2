<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  data() { 
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    // 可以给参数一个默认时间
    showToast(message,duraion=1500){
      this.isShow=true
      this.message=message

      setTimeout(()=>{
        this.isShow=false;
        this.message=''
      },duraion)
    }
  }
 }
</script>
  
<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    padding:10px;
    border-radius: 10px;

    color:#fff;
    background-color: rgba(0, 0, 0, .75);
  }
</style>