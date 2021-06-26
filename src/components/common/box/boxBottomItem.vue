<template>
  <div class="box-bottom-item">
    <div class="bottom-img"><slot name="bottom-img"></slot></div>
    <div class="bottom-title"><slot name="bottom-title"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'box-bottom',
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
.box-bottom-item{
  flex:1;
  text-align: center;
  margin-top: 8px;
  color:#707070
}
.bottom-img img{
  width: 36px;
  height: 36px;
}

.box-bottom-item .bottom-title{
  font-size: 12px;
  font-weight: 400;
  
  
}

</style>