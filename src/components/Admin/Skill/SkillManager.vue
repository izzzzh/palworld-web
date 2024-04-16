<template>
  <div>
    <div class="skill-manager">
      <div style="text-align: left;margin-bottom: 20px">
        <el-button type="primary">新增技能</el-button>
      </div>
      <el-table
          :data="skillData"
          v-loading="loading"
          stripe
          :header-cell-style="{'background-color':'#464452','height':'60px','color':'white'}"
          :cell-style="{'color':'black','border-top': 'solid 1px #B59758'}"
          class="skill-table"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="ID"
            align="center"
            width="80">
        </el-table-column>
        <el-table-column
            label="属性"
            align="center"
            width="140">
          <template v-slot="scope">
            <el-image :src="getAttributeImageUrl(scope.row.attribute_id)" style="width: 30px;">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="技能名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="desc"
            label="技能描述">
        </el-table-column>
        <el-table-column
            prop="power"
            label="威力"
            width="100">
        </el-table-column>
        <el-table-column
            prop="ct"
            label="冷却"
            width="100">
        </el-table-column>
        <el-table-column
            label="可学习帕鲁"
            type="expand"
            align="center"
            width="160">
          <template>
            <div style="width: 100%;height: 100px"></div>
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
    <div class="loading" v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0)"
         element-loading-text="拼命加载中..."
    ></div>
  </div>
</template>

<script>
import {listSkill} from "~/api/skill/skill";

export default {
  name: 'SkillManager',
  data() {
    return {
      loading: true,
      skillData: [],
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
    this.initSkill()
  },
  methods: {
    initSkill() {
      setTimeout(() => {
        listSkill().then(res => {
          this.skillData = res.data
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
.skill-manager {
  padding: 40px;
}

.skill-table {
  border-radius: 10px;
}
</style>
