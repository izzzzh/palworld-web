<template>
  <div class="search">
    <el-form :inline="true" ref="form" border="true" @submit.native.prevent>
      <div class="pal-search">
        <el-form-item>
          <el-input v-model="search"
                    suffix-icon="el-icon-search"
                    @input="setSearch"
                    @change="setSearch"
                    @clear="setSearch"
                    placeholder="请输入搜索内容"></el-input>
        </el-form-item>
        <el-form-item class="pal-attribute">
          <el-radio-group v-model="attribute" @input="setSearch">
            <el-radio-button v-show="false"></el-radio-button>
            <el-radio-button v-for="(item,index) in attributeMap" :label="index">
              {{ item }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      attribute: 0,
      search: '',
      attributeMap: ['全部', '无', '暗', '龙', '冰', '火', '草', '土', '雷', '水'],
    };
  },
  methods: {
    setSearch() {
      const name = this.search
      const attribute = this.attribute
      let filterPal = []
      let allPal = this.$store.state.allPal
      if (attribute > 0) {
        for (let index in allPal) {
          let item = allPal[index]
          if (item.attribute_ids.includes(attribute)) {
            filterPal.push(item)
          }
        }
      } else {
        filterPal = allPal
      }
      if (name !== '') {
        filterPal = filterPal.filter(function (item) {
          return item.name.indexOf(name) > 0
        })
      }
      this.$store.state.filterPal = filterPal
    }
  },
}
</script>
<style scoped>

.search {
  height: 60px;
  margin-top: 40px;
}

.pal-search {
  width: 100%;
  height: 50px;
  margin-left: 40px;
  text-align: left;
  position: relative;
}

.pal-search >>> .el-input__inner {
  background-color: #464452;
  border-color: #B59758;
  border-width: 1px;
  height: 50px;
  color: white;
  font-size: 16px;
}

.pal-attribute {
  height: 50px;
  margin-left: 40px;
  text-align: left;
}

.pal-attribute >>> .el-radio-button__inner {
  background-color: #464452;
  border-top: 1px solid #464452;
  border-bottom: 1px solid #464452;
  border-right: 1px solid #B59758;
  height: 50px;
  width: 70px;
  color: white;
  padding-top: 17px;
}

.pal-attribute >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border-color: #B59758;
  color: #B59758;
  font-weight: bolder;
  font-size: 16px;
  box-shadow: -3px 5px 5px 1px #B59758;
}

.pal-attribute >>> .el-radio-button:first-child .el-radio-button__inner {
  box-shadow: -3px 5px 5px 1px #B59758;
}


.pal-attribute >>> .el-radio-button:first-child:checked .el-radio-button__inner {
  border-color: #B59758;
  color: #B59758;
  font-weight: bolder;
  box-shadow: -3px 5px 5px 1px #B59758;
}

</style>
