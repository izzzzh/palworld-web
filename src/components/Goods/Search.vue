<template>
  <el-form class="search" :inline="true" ref="form" border="true" @submit.native.prevent>
    <div class="goods-search">
      <div style="width:auto">
        <el-form-item>
          <span style="color: white;">物品名称</span>
          <br>
          <el-input v-model="search"
                    suffix-icon="el-icon-search"
                    class="input-with-select"
                    @input="setSearch"
                    @change="setSearch"
                    @clear="setSearch"
                    placeholder="请输入搜索内容"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item class="goods-types" style="margin-left: 40px">
          <span style="color: white;">物品品质</span>
          <br>
          <el-select @change="setSearch" v-model="quality" placeholder="物品品质">
            <el-option v-for="(item,index) in qualityList" :label="item" :key="index" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item class="goods-types" style="margin-left: 40px">
          <span style="color: white;">物品类型</span>
          <br>
          <el-select @change="setSearch" v-model="types" placeholder="物品类型">
            <el-option v-for="(item,index) in typesList" :label="item" :key="index" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: '',
      types: '全部',
      quality: 0,
      qualityList: ['全部', '少见', '稀有', '史诗', '传说'],
      typesList: ['全部', '素材', '帕鲁蛋', '武器', '设计图', '头部防具', '药品', '食物', '身体防具', '弹药', '帕鲁装置', '科技书', '技能果实', '护盾', '饰品', '消耗品', '滑翔伞', '重要物品']
    };
  },
  methods: {
    setSearch() {
      if (this.types !== '全部') {
        this.$store.state.goodsTypes = this.types
      } else {
        this.$store.state.goodsTypes = ''
      }
      this.$store.state.goodsName = this.search
      this.$store.state.goodsQuality = this.quality
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
  display: flex;
  justify-content: flex-start;
}

.goods-search >>> .el-input__inner {
  border-color: #B59758;
  border-width: 1px;
  background-color: #1f2b3e;
  color: white;
  font-size: 16px;
}

.goods-types >>> .el-select {
  height: 50px;
}

.goods-types >>> .el-form-item__label {
  color: white;
  font-size: 16px;
  padding-top: 5px;
  height: 40px;
}

.goods-types >>> .el-input__inner {
  height: 40px;
  width: 160px;
}

</style>
