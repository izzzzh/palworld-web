<template>
  <div class="el-menu-vertical-demo">
    <el-menu
        router
        class="el-menu-vertical"
        :default-active="activeRoute"
        background-color="#0F1C2E"
        text-color="#fff"
        style="border: none"
        :collapse="$store.state.isCollapse"
        active-text-color="#ffd04b"
    >
      <div class="title">
        <div class="demo-image__lazy" v-show="!$store.state.isCollapse" style="cursor: pointer" @click="toIndex">
          <el-image class="palworld-title" :src="src">
          </el-image>
        </div>
      </div>
      <template v-if="isAdmin" class="adminSidebar">
        <template v-for="item in adminMenuItems">
          <el-submenu :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <el-menu-item v-for="subItem in item.children"
                          :key="subItem.name"
                          :index="subItem.path">
              <span slot="title">{{ subItem.name }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </template>
      <template v-else>
        <template v-for="item in menuItems">
          <el-menu-item :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <div class="sidebar-footer">
      <div style="padding: 20px;" v-if="$store.state.isCollapse">
        <i style="cursor: pointer" class="el-icon-s-unfold" title="点击展开" @click="handleSide"></i>
      </div>
      <div style="padding: 20px;" v-else>
        <i style="cursor: pointer" class="el-icon-s-fold" title="点击折叠" @click="handleSide"></i>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Sidebar',
  computed: {
    isAdmin() {
      return this.$route.path.includes("admin")
    },
    activeRoute() {
      return this.$route.path
    }
  },
  data() {
    return {
      src: '/src/assets/images/palworld-title.jpg',
      menuItems: [
        {path: '/pal/list', name: '帕鲁图鉴', icon: 'el-icon-menu'},
        {path: '/pal-mating', name: '帕鲁配种查询', icon: 'el-icon-menu'},
        {path: '/goods', name: '物品图鉴', icon: 'el-icon-menu'},
        {path: '/skills', name: '技能查询', icon: 'el-icon-menu'},
        {path: '/technology-tree', name: '科技树', icon: 'el-icon-menu'},
      ],
      adminMenuItems: [
        {
          path: '/admin', name: "首页", icon: 'el-icon-menu', children: [
            {
              path: '/admin/pal', name: '帕鲁管理', icon: 'el-icon-menu', children: [
                // {path: '/admin/pal/add', name: '添加帕鲁', icon: 'el-icon-menu'},
                // {path: '/admin/pal/edit', name: '编辑帕鲁', icon: 'el-icon-menu'},
              ]
            },
            {
              path: '/admin/goods', name: '物品管理', icon: 'el-icon-menu', children: [
                // {path: '/admin/goods/add', name: '添加物品', icon: 'el-icon-menu'}
              ]
            },
            {
              path: '/admin/skill', name: '技能管理', icon: 'el-icon-menu', children: [
                // {path: '/admin/skill/add', name: '添加技能', icon: 'el-icon-menu'}
              ]
            },
            {
              path: '/admin/technology-tree', name: '科技树管理', icon: 'el-icon-menu', children: [
                // {path: '/admin/skill/add', name: '添加技能', icon: 'el-icon-menu'}
              ]
            },
          ]
        },
        {
          path: '/users', name: '用户管理', icon: 'el-icon-menu', children: [
            {path: '/admin/users', name: '用户管理', icon: 'el-icon-menu'}
          ]
        },
        {
          path: '/servers', name: '服务管理', icon: 'el-icon-menu', children: [
            {
              path: '/admin/containers', name: '容器管理', icon: 'el-icon-menu'
            }
          ]
        }
      ]
    }
  },
  methods: {
    toIndex() {
      this.$router.push("/")
    },
    handleSide() {
      this.$store.state.sidebarWidth = 64
      this.$store.state.isCollapse = !this.$store.state.isCollapse;
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1001;
  border: none;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  border: none;
}

.demo-image__lazy {
  width: 100%;
  text-align: center;
  position: relative;
  background-color: #0F1C2E;
}

.palworld-title {
  width: 80px;
  border-radius: 50%;
  border: none;
}

.sidebar-footer {
  bottom: 0;
  line-height: 40px;
  position: absolute;
  z-index: 1002;
  font-size: 24px;
  color: white;
  width: 100%;
}

.title {
  position: relative;
  height: 100px;
  margin-top: 60px;
  transition: width .3s;
  margin-bottom: 100px;
}

</style>
