<template>
  <div class="container-list">
    <router-view></router-view>
    <el-table
        v-loading="loading"
        :data="containers"
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
          prop="name"
          label="名字"
      >
      </el-table-column>
      <el-table-column
          prop="image"
          label="镜像"
      >
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态"
          width="100">
      </el-table-column>
      <el-table-column
          label="查看日志"
          width="150">
        <template v-slot="scope">
          <el-button
              type="primary"
              size="mini"
              @click="handleClick(scope.row.id)">
            查看日志
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {listCont} from '~/api/containers/container'

export default {
  name: 'ContainerList',
  data() {
    return {
      containers: [],
      loading: true
    }
  },
  created() {
    this.listContainer()
  },
  methods: {
    listContainer() {
      setTimeout(() => {
        listCont().then(res => {
          this.containers = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 300)
    },
    handleClick(id) {
      this.$router.push("/admin/containers/logs?id=" + id)
    }
  }
}
</script>

<style>
.container-list {
  padding: 40px;
}
</style>
