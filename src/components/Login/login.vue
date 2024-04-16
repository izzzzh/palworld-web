<template>
  <el-dialog
      :visible.sync="$store.state.dialogVisible"
      class="login-dialog"
      width="20%"
      top="25vh"
      @close="handleClose">
    <span slot="title" class="dialog-title">{{ title }}</span>
    <div class="dialog-body">
      <div>
        <el-form label-position="left" ref="loginForm" style="text-align: left" label-width="auto">
          <el-form-item>
            <el-input class="dialog-input" v-model="username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item v-show="!isLogin">
            <el-input type="password" v-model="confirm_password" placeholder="请确认密码"></el-input>
          </el-form-item>
          <div style="display: flex;grid-column-gap: 20px">
            <el-form-item v-show="!isLogin" style="width: 50%">
              <el-input type="dialog-input" v-model="captcha" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-image v-show="!isLogin" style="width: 120px;height: 40px;" :src="captcha_image"></el-image>
          </div>
          <el-form-item>
            <el-button style="width: 100%;margin-top: 10px" type="primary" @click="handleSubmit">{{ title }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-link @click="handleRegister">{{ link }}</el-link>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {getCaptcha, login, register} from "~/api/user/user";
import {setToken, setUserInfo} from "~/utils/auth";

const FormData = require('form-data');

export default {
  name: "Login",
  data() {
    return {
      isLogin: true,
      username: '',
      password: '',
      confirm_password: '',
      captcha: '',
      captcha_image: '',
      captcha_id: '',
    }
  },
  created() {

  },
  computed: {
    getIsLogin() {
      return this.isLogin
    },
    title() {
      return this.isLogin ? "登录" : "注册"
    },
    link() {
      return this.isLogin ? "账号注册" : "账号登录"
    }
  },
  watch: {
    getIsLogin() {
      if (!this.getIsLogin) {
        this.getCap()
      }
    }
  },
  methods: {
    getCap() {
      getCaptcha().then(res => {
        this.captcha_image = res.data.captcha_base64
        this.captcha_id = res.data.captcha_id
      }).catch(() => {
      })
    },
    handleClose() {
      this.$store.state.dialogVisible = false
      this.isLogin = true
    },
    handleRegister() {
      this.isLogin = !this.isLogin
    },
    handleSubmit() {
      let data = new FormData()
      data.append("username", this.username)
      data.append("password", this.password)
      if (this.isLogin) {
        this.loginUser(data)
      } else {
        data.append("captcha_code", this.captcha)
        data.append("captcha_id", this.captcha_id)
        data.append("confirm_password", this.confirm_password)
        this.registerUser(data)
      }
    },
    registerUser(data) {
      register(data).then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        });
        this.$store.state.dialogVisible = false
        setToken(res.data.token.access_token, res.data.token.refresh_after / 3600 / 24)
        let userInfo = {
          username: res.data.user_info.username,
          isAdmin: res.data.user_info.role === "管理员",
          userId: res.data.user_info.id,
          avatar: res.data.user_info.avatar,
        }
        let jsonString = JSON.stringify(userInfo);
        setUserInfo(jsonString, res.data.token.refresh_after / 3600 / 24)
        location.href = "/"
      }).catch((res) => {
        this.$message({
          message: res.message,
          type: 'error'
        });
      })
    },
    loginUser(data) {
      login(data).then(res => {
        this.$store.state.dialogVisible = false
        setToken(res.data.token.access_token, res.data.token.refresh_after / 3600 / 24)
        let userInfo = {
          username: res.data.user_info.username,
          isAdmin: res.data.user_info.role === "管理员",
          userId: res.data.user_info.id,
          avatar: res.data.user_info.avatar,
        }
        let jsonString = JSON.stringify(userInfo);
        setUserInfo(jsonString, res.data.token.refresh_after / 3600 / 24)
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        location.href = "/"
      }).catch((res) => {
        if (res.response.data) {
          this.$message({
            message: res.response.data.message,
            type: 'error'
          });
        }
      })
    },
  }
}
</script>

<style scoped>
.login-dialog {
  text-align: left;
}

.dialog-title {
  font-size: 24px;
  text-align: left;
}

.dialog-body {
  padding: 20px 40px;
}

.dialog-body >>> .el-input__inner {
  font-size: 16px;
  color: #0F1C2E;
  border-color: #0F1C2E;
}

</style>
