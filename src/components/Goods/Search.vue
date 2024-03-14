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
        <el-select @change="setQuality" v-model="types" placeholder="物品品质">
          <el-option label="全部" :value="0"></el-option>
          <el-option label="普通" :value="1"></el-option>
          <el-option label="少见" :value="2"></el-option>
          <el-option label="稀有" :value="3"></el-option>
          <el-option label="史诗" :value="4"></el-option>
          <el-option label="传说" :value="5"></el-option>
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
      attribute: '全部属性',
      search: '',
      types: '全部'
    };
  },
  methods: {
    setQuality(value) {
      this.$store.state.goodsQuality = value
    },
    setSearch(name) {
      this.$store.state.goodsName = name.trim()
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.goodsName = ""
    this.$store.state.goodsQuality = 0
    this.$store.state.goodsTypes = 0
    next()
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
  background-color: #464452;
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
