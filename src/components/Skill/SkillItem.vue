<template>
  <div>
    <div class="skill-item">
      <el-table
          :data="skillData"
          stripe
          v-loading="loading"
          :header-cell-style="{'background-color':'#464452','height':'60px','color':'white'}"
          :cell-style="{'color':'black','border-top': 'solid 1px #B59758'}"
          class="skill-table"
          style="width: 100%">
        <el-table-column
            label="属性"
            align="center"
            width="140">
          <template v-slot="scope">
            <el-image :src="getAttributeImageUrl(scope.row.attribute_id)"
                      style="width: 30px"
                      class="skill-item-attribute">
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
            label="技能描述"
            width="auto">
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
      </el-table>
    </div>
  </div>
</template>

<script>
import {listSkill} from "~/api/skill/skill";

export default {
  name: 'SkillItem',
  data() {
    return {
      activeNames: "",
      skillData: [],
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
.skill-item {
  padding: 40px;
}

.skill-table {
  margin-top: 40px;
  margin-right: 40px;
  border-radius: 10px;
  border: solid 1px #B59758;
}

.skill-item-attribute {
  width: 40px;
}

.loading {
  margin-left: 40px;
  width: 80%;
  height: 100px;
}

</style>
