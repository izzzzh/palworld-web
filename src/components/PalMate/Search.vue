<template>
  <el-form class="search" :inline="true" ref="form" border="true" @submit.native.prevent>
    <div class="pal-mate-search">
      <el-form-item class="pal-mate-select" label="配种一">
        <el-select filterable v-model="parent_one">
          <div v-for="item in pals">
            <el-option :label="item.name" :value="item.id"></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item class="pal-mate-select" filterable style="margin-left: 40px" label="配种二">
        <el-select filterable v-model="parent_two">
          <div v-for="item in pals">
            <el-option :label="item.name" :value="item.id"></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item class="pal-mate-select" filterable style="margin-left: 40px" label="配种结果">
        <el-select filterable v-model="result">
          <div v-for="item in pals">
            <el-option :label="item.name" :value="item.id"></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: 40px">
        <el-button type="info" class="submit-button" @click="onSubmit">确认筛选</el-button>
        <el-button type="info" class="submit-button" @click="onReset">重置</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import {listPal} from "~/api/pals/pals";

export default {
  name: 'Search',
  data() {
    return {
      parent_one: 0,
      parent_two: 0,
      result: 0,
      pals: []
    };
  },
  created() {
    this.listPal()
  },
  methods: {
    listPal() {
      listPal().then(res => {
        let data = res.data
        data.unshift({id: 0, name: "未选择"})
        this.pals = data
      }).catch(() => {
      })
    },
    onSubmit() {
      this.$store.state.parentOne = this.parent_one
      this.$store.state.parentTwo = this.parent_two
      this.$store.state.result = this.result
      let params = {
        "parent_one": this.$store.state.parentOne,
        "parent_two": this.$store.state.parentTwo,
        "result": this.$store.state.result,
        "page": 1,
      }
      this.$emit("searchPalMate", params)
    },
    onReset() {
      this.parent_one = 0
      this.parent_two = 0
      this.result = 0
      let params = {
        "parent_one": 0,
        "parent_two": 0,
        "result": 0,
        "page": 1,
      }
      this.$emit("searchPalMate", params)
    }
  },
}
</script>

<style scoped>
.search {
  height: 60px;
  margin-top: 40px;
  position: relative;
}

.pal-mate-search {
  width: 100%;
  margin-left: 40px;
  position: relative;
  text-align: left;
}

.pal-mate-search >>> .el-input__inner {
  border-color: #B59758;
  border-width: 1px;
  background-color: #1f2b3e;
  height: 50px;
  color: white;
  font-size: 16px;
}

.pal-mate-select >>> .el-select {
  height: 50px;
}

.pal-mate-select >>> .el-form-item__label {
  height: 50px;
  color: white;
  font-size: 16px;
  padding-top: 5px;
}

.pal-mate-select >>> .el-input__inner {
  height: 50px;
  width: 160px;
}

.submit-button {
  height: 50px;
  background-color: #1f2b3e;
  border-color: #B59758;
}

</style>
