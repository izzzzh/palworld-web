<template>
  <div class="navbar">
    <div class="pal-title">
      <el-link :underline="false" style="font-size: 20px;color: #B59758">幻兽帕鲁资讯中心</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
.navbar {
  position: fixed;
  margin-top: 0;
  height: 80px;
  width: 100%;
  background-color:#374357;
  color: #333;
}

.pal-title {
  color: #B59758;
  margin-left: 40px;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center
}
</style>
