<template>
  <div class="box-top">
    <div class="top-left"><slot name="top-left"></slot></div>
    <div class="top-right"><slot name="top-right"></slot></div>
    <div class="clear"></div>
    <div class="horizon"></div>
  </div>
</template>

<script>
export default {
  name: 'boxTop',
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
.top-left{
  float: left;
  font-size: 18px;
}
.top-right{
  float: right;
  font-size: 14px;
  
}
.top-right img{
  
  width: 14px;
  height: 14px;
  padding-left: 2px;
  padding-top: 4px;

}
.clear{
  clear: both;;
}
.horizon{
  margin: auto;
  margin-top: 10px;
  width: 98%;
  height: 1px;
  border-top:solid rgba(128, 128, 128, .3);
}
</style>