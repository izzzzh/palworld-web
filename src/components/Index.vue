<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    <div class="fixed-header">
      <navbar></navbar>
    </div>
    <AppMain/>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AppMain from "./AppMain";

export default {
  name: "Index",
  components: {
    //注册组件
    Sidebar,
    Navbar,
    AppMain,
  },
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  height: 80px;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 200px);
  transition: width 0.28s;
  padding: 0;
}
</style>



