<template>
  <div class="box">
    <div class="box-top"><slot name="box-top"></slot></div>
    <div class="box-bottom"><slot name='box-bottom'></slot></div>

  </div>
</template>

<script>
export default {
  name: 'box',
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
.box{
  margin: 10px;
  border:1px solid rgba(128, 128, 128, .5);
  border-radius: 10px;
}
</style>