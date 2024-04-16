<template>
  <div class="tree-manager">
    <div style="text-align: left;margin-bottom: 20px">
      <el-button type="primary">新增科技</el-button>
    </div>
    <el-table
        v-loading="loading"
        :data="treeData"
        stripe
        :header-cell-style="{'background-color':'#464452','height':'60px','color':'white'}"
        class="tree-table">
      <el-table-column
          prop="level"
          label="解锁等级"
          align="center"
          width="80">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图片"
          align="center"
          width="160">
        <template v-slot="scope">
          <el-image :src="'/src/assets'+scope.row.icon" style="width: 40px" lazy></el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述">
      </el-table-column>
      <el-table-column
          prop="id"
          label="制造材料">
        <template v-slot="scope">
          <el-tag v-for="item in scope.row.material" :key="item.id" style="margin-right: 10px">
            {{item.name }}x{{ item.count }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="cost"
          label="消耗科技点"
          align="center"
          width="120">
      </el-table-column>
      <el-table-column
          prop="ancient"
          label="是否古代科技"
          align="center"
          width="120">
        <template v-slot="scope">
          <span>{{ scope.row.ancient ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="160"
      >
        <div>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getTechnologyTree} from "~/api/technology/technology";

export default {
  name: "TreeManager",
  data() {
    return {
      treeData: [],
      loading: true
    }
  },
  created() {
    this.getTechnologyTree()
  },
  methods: {
    getTechnologyTree() {
      setTimeout(() => {
        getTechnologyTree().then(res => {
          let data = res.data
          for (let technology of data) {
            for (let item of technology.data) {
              item.level = technology.level
              this.treeData.push(item)
            }
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 300)
    },
  }
}
</script>

<style scoped>
.tree-manager {
  padding: 40px;
}

.tree-table {
  border-radius: 10px;
}
</style>
