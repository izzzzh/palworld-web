<template>
  <div class="user-manager">
    <el-table
        :data="users"
        :header-cell-style="{'background-color':'#cee8ff','height':'60px','color':'#3c3c3c'}"
        stripe
        lazy
        style="width: 100%;border-radius: 10px">
      <el-table-column
          prop="id"
          label="ID"
          width="160">
      </el-table-column>
      <el-table-column
          prop="username"
          label="姓名"
          width="160">
      </el-table-column>
      <el-table-column
          prop="avatar"
          label="头像"
          width="160">
        <template v-slot="scope">
          <el-image :src="scope.row.avatar" style="width: 40px;height: 40px"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="role"
          label="角色"
          width="160">
      </el-table-column>
      <el-table-column
          prop="created_at"
          label="注册时间">
      </el-table-column>
      <el-table-column
          label="操作">
        <div>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {listUser} from "~/api/user/user";

export default {
  name: 'UserManager',
  data() {
    return {
      users: [],
      page: 1,
      pageSize: 10,
    }
  },
  created() {
    this.listUser()
  },
  methods: {
    listUser() {
      let params = {
        page: this.page,
        page_size: this.pageSize
      }
      listUser(params).then(res => {
        this.users = res.data.list
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
.user-manager {
  padding: 40px;
}

</style>
