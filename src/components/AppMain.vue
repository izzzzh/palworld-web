<template>
  <div class="app-main" :style="{'margin-left': $store.state.isCollapse ? '64px' : '200px'}">
    <div class="app-content">
      <div>
        <Login></Login>
      </div>
      <router-view class="animate__animated  animate__fadeIn animate__slow"></router-view>
    </div>
  </div>
</template>

<script>
import '../assets/styles/list.css'
import Breadcrumb from "~/components/Breadcrumb";
import Login from "~/components/Login/login";

export default {
  name: 'AppMain',
  components: {
    Login,
    Breadcrumb
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.app-main {
  transition: margin-left .3s;
  margin-top: 80px;
  position: relative;
  text-align: center;
  background-image: url("../assets/images/palworld.jpg");
  background-size: cover;
  background-position: center 0; /* 调整图像位置为居中顶部 */
  height: calc(100% - 80px);
}

.app-content {
  transition: margin-left .28s;
  min-height: 100%;
  height: calc(100% - 80px);
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
}

.app-content::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.app-content::-webkit-scrollbar-thumb {
  background-color: #B59758;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}


</style>
