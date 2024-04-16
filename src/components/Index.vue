<template>
  <div class="app-wrapper">
    <sidebar></sidebar>
    <navbar></navbar>
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
  background-color: #0F1C2E;
}

</style>



