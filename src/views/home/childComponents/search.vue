<template>
  <div class="search-view">
    <div class="searchIcon" @click="showSearchArea">
      <div v-if="!isShow">
        <img class='search-icon' src="~assets/img/home/searchIcon.png" alt="" >
      </div>
      <div v-else>
        <img class='search-icon' src="~assets/img/home/searchIcon_active.png" alt="" >
      </div>
      
      </div>
    <div class="search-area" v-show='isShow'>
      <div class="search-box">
        <input class="search-text" type="text">
        <button class="search-btn" type="submit">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchView',
  data() { 
    return {
      isShow:false
    }
  },
  methods:{
    showSearchArea(){
      this.isShow=!this.isShow
    }
  }
 }
</script>

<style scoped>

.search-view img{
  margin-top: 13px;
  width: 20px;
  height: 20px;
}
.search-view .search-area{
  background-color: rgba(253, 131, 153, .8);
  position: absolute;
  width: 100%;
  left: 0;
  top: 44px;
  z-index: 999;

  display: flex;
  
}

.search-area .search-box{
  flex:1;
  width: 80%;
  height: 34px;
  margin: 15px;
  
  border: 2px solid #fff;
  border-radius: 18px;
}

.search-box .search-text{
  height: 30px;
  width: 80%;

  position: relative;
  top: -7px;
  /* left: -12px; */

  outline: none;
  border: none;
  padding-left: 10px;

  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}

.search-box .search-btn{
  height: 30px;
  /* line-height: 30px; */
  width: 20%;
  position: relative;
  top: -8px;
  outline: none;
  border: none;

  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  font-size: 15px;
  
}




</style>