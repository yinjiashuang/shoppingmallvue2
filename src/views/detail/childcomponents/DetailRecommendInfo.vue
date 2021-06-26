<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <!-- <grid-view>
      <goods-list-item v-for="(item, index) in recommendList" :key="index" :goods="item"></goods-list-item>
    </grid-view> -->
    <good-list :goods='recommendList'></good-list>
  </div>
</template>

<script>
  // import GridView from 'components/common/gridView/GridView.vue'
  // import GoodsListItem from 'views/home/childComponents/GoodsListItem.vue'
  import goodList from 'components/content/goods/goodsList.vue'

	export default {
		name: "DetailRecommendInfo",
    components: {
		  // GridView,
      // GoodsListItem
      goodList
    },
    props: {
		  recommendList: {
		    type: Array
      }
    }
	}
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
