<template>
  <div class="app-wrapper">
    <router-view class="animate__animated  animate__fadeIn animate__slow"></router-view>
  </div>
</template>

<script>

export default {
  name: "Admin",
  data() {
    return {}
  },
}
</script>

<style scoped>
.app-wrapper {
  background-color: #4d648d;
  transition: margin-left .28s;
  min-height: 100%;
  height: calc(100% - 80px);
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}

.app-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.app-wrapper::-webkit-scrollbar-thumb {
  background-color: #B59758;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}


</style>



