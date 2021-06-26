<template>
  <div class="profile">
    <nav-bar class="profile-nav"><div slot="center">我的</div></nav-bar>
    <second-part></second-part>
    <third-part></third-part>
    <div class="login-out">退出登录</div>
  </div>
</template>

<script>
import navBar from 'components/common/navBar/navBar.vue'
import secondPart from 'views/profile/childProfile/secondPart.vue'
import thirdPart from 'views/profile/childProfile/thirdPart.vue'

export default {
  name: 'profile',
  components:{
    secondPart,
    thirdPart,
    navBar
  }
  

}
</script>

<style scoped>
  
  .profile-nav{
    background-color: var(--color-tint);
    color:#fff;
  }

  .login-out{
    width: 98%;
    margin: auto;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: var(--color-tint);
    color: #fff;
    border-radius: 10px;
  }
  
</style>