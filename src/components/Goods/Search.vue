<template>
  <el-form class="search" :inline="true" ref="form" border="true" @submit.native.prevent>
    <div class="goods-search">
      <el-form-item>
        <el-input v-model="search"
                  suffix-icon="el-icon-search"
                  class="input-with-select"
                  @input="setSearch"
                  @change="setSearch"
                  @clear="setSearch"
                  placeholder="请输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item class="goods-types" style="margin-left: 40px" label="品质">
        <el-select @change="setSearch" v-model="types" placeholder="物品品质">
          <el-option v-for="(item,index) in qualityList" :label="item" :key="index" :value="index">
          </el-option>
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: '',
      types: 0,
      qualityList: ['全部', '普通', '少见', '稀有', '史诗', '传说']
    };
  },
  methods: {
    setSearch() {
      const name = this.search
      const types = this.types
      let filterGoods = []
      let allGoods = this.$store.state.allGoods
      if (types > 0) {
        for (let index in allGoods) {
          let item = allGoods[index]
          if (item.quality === types) {
            filterGoods.push(item)
          }
        }
      } else {
        filterGoods = allGoods
      }
      if (name !== '') {
        filterGoods = filterGoods.filter(function (item) {
          return item.name.indexOf(name) > 0
        })
      }
      this.$store.state.filterGoods = filterGoods
    }
  }
}
</script>

<style scoped>
.search {
  height: 60px;
  margin-top: 40px;
  position: relative;
}

.goods-search {
  width: 100%;
  margin-left: 40px;
  position: relative;
  text-align: left;
}

.goods-search >>> .el-input__inner {
  border-color: #B59758;
  border-width: 1px;
  background-color: #1f2b3e;
  height: 50px;
  color: white;
  font-size: 16px;
}

.goods-types >>> .el-select {
  height: 50px;
}

.goods-types >>> .el-form-item__label {
  height: 50px;
  color: white;
  font-size: 16px;
  padding-top: 5px;
}

.goods-types >>> .el-input__inner {
  height: 50px;
  width: 160px;
}

</style>
