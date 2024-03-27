<template>
  <div class="sidebar">
    <div class="title">
      <div class="demo-image__lazy">
        <el-image :src="src" class="palworld-title">
        </el-image>
      </div>
    </div>
    <div>
      <el-menu
          router
          :default-active="activeRoute.toString()"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#0F1C2E"
          text-color="#fff"
          :collapse="isCollapse"
          active-text-color="#ffd04b"
      >
        <template v-for="item in menuItems">
          <el-menu-item :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  computed: {
    // 从 Vuex store 中获取 activeRoute 状态
    activeRoute() {
      return this.$store.state.activeRoute;
    },
    menuItems() {
      return this.$store.state.menuItems;
    }
  },
  data() {
    return {
      isCollapse: false,
      src: '/src/assets/images/palworld-title.jpg'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      let menuItems = this.$store.state.menuItems
      for (let item in menuItems) {
        if (menuItems[item].path === key) {
          this.$store.state.activeMenu = menuItems[item].name
        }
      }
    }
  }
};
</script>

<style scoped>
.sidebar {
  transition: width 0.28s;
  width: 200px;
  background-color: #0F1C2E;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.el-menu-vertical-demo {
  width: 100%;
  margin-top: 140px;
}

.sidebar-el-item {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
}

.title {
  height: 100px;
  margin-top: 60px
}

.demo-image__lazy {
  width: 100%;
  text-align: center;
  position: relative;
  background-color: #0F1C2E;
  border: 0;
}

.palworld-title {
  width: 80px;
  border-radius: 50%;
  border: none;
}

</style>
