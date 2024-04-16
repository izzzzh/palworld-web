<template>
  <div class="pal-manager">
    <div style="text-align: left;margin-bottom: 20px">
      <el-button type="primary" @click="addPal">新增帕鲁</el-button>
    </div>
    <el-table
        v-loading="loading"
        :data="pals"
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
          label="名字"
          align="center"
          width="100">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图片"
          align="center"
          width="120">
        <template v-slot="scope">
          <el-image :src="scope.row.icon" style="width: 40px;height: 40px"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="attribute_ids"
          label="属性"
          width="160">
        <template v-slot="scope">
          <el-image v-for="item in scope.row.attribute_ids"
                    :src="getAttributeImageUrl(item)"
                    :title="attributeMap[item - 1]"
                    :key="item"
                    style="margin-right: 20px;width: 30px">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="abilities"
          label="工作能力">
        <template v-slot="scope">
          <el-tag v-for="item in scope.row.abilities"
                  :key="item.name"
                  style="margin-right: 20px">
            {{ item.name }}:Lv{{ item.level }}
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
  </div>
</template>

<script>
import {listPal} from "~/api/pals/pals";

export default {
  name: 'PalManager',
  data() {
    return {
      pals: [],
      attributeMap: ['无', '暗', '龙', '冰', '火', '草', '土', '雷', '水'],
      loading: true
    }
  },
  computed: {
    getAttributeImageUrl: function () {
      return function (id) {
        return '/src/assets/icon/' + id + '.png'
      }
    },
  },
  created() {
    this.listPal()
  },
  methods: {
    listPal() {
      setTimeout(() => {
        listPal().then(res => {
          this.pals = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 300)
    },
    addPal() {

    }
  }
}
</script>

<style>
.pal-manager {
  padding: 40px;
}
</style>
