<template>
  <div class="goods-manager">
    <div style="text-align: left;margin-bottom: 20px">
      <el-button type="primary">新增物品</el-button>
    </div>
    <el-table
        v-loading="loading"
        :data="goods"
        :header-cell-style="{'background-color':'#cee8ff','height':'60px','color':'#3c3c3c'}"
        stripe
        lazy
        style="width: 100%;border-radius: 10px">
      <el-table-column
          prop="id"
          label="ID"
          align="center"
          width="80">
        <template v-slot="scope">
          <span style="text-align: center">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          width="200">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图片"
          align="center"
          width="120">
        <template v-slot="scope">
          <el-image :src="'/src/assets'+scope.row.image" style="width: 40px;height: 40px"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述">
      </el-table-column>
      <el-table-column
          prop="types"
          label="类别"
          width="120">
      </el-table-column>
      <el-table-column
          prop="id"
          label="制造材料"
          width="500">
        <template v-slot="scope">
          <el-tag v-for="item in scope.row.materials" :key="item.id" style="margin-right: 10px;">
            {{ item.name }}x{{ item.count }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="160">
        <div>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
        style="text-align: right;margin-top: 20px;"
        background
        :current-page="page"
        @current-change="change"
        layout="prev, pager, next"
        :total="200">
    </el-pagination>
  </div>
</template>

<script>
import {listGoods} from "~/api/goods/goods";

export default {
  name: 'GoodsManager',
  data() {
    return {
      goods: [],
      loading: true,
      page: 1,
      pageSize: 20,
    }
  },
  created() {
    this.listGoods()
  },
  methods: {
    listGoods() {
      this.loading = true
      let params = {
        "page": this.page,
        "page_size": this.pageSize,
      }
      setTimeout(() => {
        listGoods(params).then(res => {
          this.goods = []
          this.goods = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 300)
    },
    change(val) {
      this.page = val
      this.listGoods()
    }
  }
}
</script>

<style scoped>
.goods-manager {
  padding: 40px;
}

.number {
  width: 50px;
}
</style>
