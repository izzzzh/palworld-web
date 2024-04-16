<template>
  <div class="navbar" :style="{'left': $store.state.isCollapse ? '64px' : '200px'}">
    <div class="pal-title">
      <div>
        <el-link :underline="false" style="font-size: 20px;color: #B59758">幻兽帕鲁资讯中心</el-link>
      </div>
      <div style="margin-left: auto;margin-right: 100px;display: flex;flex-direction: row">
        <div v-if="isLogin" style="margin-left: 40px">
          <el-dropdown>
                <span class="el-dropdown-link" style="color: #B59758;cursor: pointer;font-size: 18px">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-show="isAdmin">
                <el-link :underline="false" href="/admin/pal">后台管理</el-link>
              </el-dropdown-item>
              <div @click="logOut">
                <el-dropdown-item>
                  <el-link :underline="false" >登出</el-link>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else style="margin-left: 50px" @click="handleLogin">
          <el-link :underline="false" style="font-size: 20px;color: #B59758">登录</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getToken, getUserInfo, removeToken} from "~/utils/auth";

export default {
  name: 'Navbar',
  computed: {
    isLogin() {
      return getToken();
    },
    isAdmin() {
      let userInfo = JSON.parse(getUserInfo());
      return userInfo.isAdmin
    }
  },
  methods: {
    handleLogin() {
      this.$store.state.dialogVisible = true
    },
    logOut() {
      removeToken()
      this.$store.state.userInfo = {}
      location.href = "/"
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  right: 0;
  top: 0;
  height: 80px;
  background-color: #374357;
  color: #333;
  transition: left 0.3s;
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
